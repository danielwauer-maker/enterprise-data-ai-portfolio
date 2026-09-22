import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

type AnyRecord = Record<string, any>;

export type ProjectView = {
  id: string;
  name: string;
  fullName: string;
  role: string;
  summary: string;
  environment: string;
  technologies: string[];
  repository: string | null;
  workstreamId: string;
  displayOrder: number;
  progressPct: number;
  status: "Complete" | "Active" | "Ready" | "Planned";
};

export type PortfolioData = {
  portfolio: AnyRecord;
  roadmap: AnyRecord;
  metrics: AnyRecord;
  website: AnyRecord;
  projects: ProjectView[];
  eoip: AnyRecord;
};

function findPortfolioRoot(): string {
  let current = process.cwd();

  while (true) {
    if (fs.existsSync(path.join(current, "data", "portfolio.yaml"))) {
      return current;
    }

    const parent = path.dirname(current);
    if (parent === current) {
      throw new Error(
        "Could not locate portfolio root containing data/portfolio.yaml.",
      );
    }
    current = parent;
  }
}

const ROOT = findPortfolioRoot();

function readYaml(relativePath: string): AnyRecord {
  const absolute = path.join(ROOT, relativePath);
  return YAML.parse(fs.readFileSync(absolute, "utf8")) as AnyRecord;
}

function readJson(relativePath: string): AnyRecord {
  const absolute = path.join(ROOT, relativePath);
  return JSON.parse(fs.readFileSync(absolute, "utf8")) as AnyRecord;
}

function workstreamProgress(
  roadmap: AnyRecord,
  workstreamId: string,
): { pct: number; status: ProjectView["status"] } {
  const packages = (roadmap.work_packages as AnyRecord[]).filter(
    (item) => item.workstream === workstreamId,
  );

  const total = packages.reduce(
    (sum, item) => sum + Number(item.weight ?? 0),
    0,
  );
  const done = packages
    .filter((item) => item.status === "done")
    .reduce((sum, item) => sum + Number(item.weight ?? 0), 0);

  const pct = total > 0 ? (done / total) * 100 : 0;

  if (packages.length > 0 && packages.every((item) => item.status === "done")) {
    return { pct, status: "Complete" };
  }
  if (
    packages.some((item) => item.status === "in_progress") ||
    packages.some((item) => item.status === "review") ||
    done > 0
  ) {
    return { pct, status: "Active" };
  }
  if (packages.some((item) => item.status === "ready")) {
    return { pct, status: "Ready" };
  }

  return { pct, status: "Planned" };
}

function loadProjects(roadmap: AnyRecord): ProjectView[] {
  const directory = path.join(ROOT, "data", "projects");
  const files = fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".yaml"))
    .sort();

  return files
    .map((file) => readYaml(path.join("data", "projects", file)).project)
    .filter((project) => project?.portfolio?.featured)
    .map((project) => {
      const workstreamId = String(project.portfolio.workstream_id);
      const progress = workstreamProgress(roadmap, workstreamId);
      const coreTechnology = (project.technology?.core ?? []) as string[];

      return {
        id: String(project.id),
        name: String(project.name),
        fullName: String(project.full_name),
        role: String(project.portfolio.role),
        summary: String(project.solution.summary),
        environment: String(project.environment),
        technologies: coreTechnology.slice(0, 6),
        repository: project.links?.repository_full_name
          ? String(project.links.repository_full_name)
          : null,
        workstreamId,
        displayOrder: Number(project.portfolio.display_order ?? 999),
        progressPct: Number(progress.pct.toFixed(1)),
        status: progress.status,
      };
    })
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function loadPortfolioData(): PortfolioData {
  const portfolio = readYaml("data/portfolio.yaml").portfolio;
  const roadmap = readYaml("data/roadmap.yaml");
  const metrics = readJson("data/metrics.json");
  const website = readYaml("data/website.yaml").website;
  const eoip = readYaml("data/projects/eoip.yaml").project;

  return {
    portfolio,
    roadmap,
    metrics,
    website,
    projects: loadProjects(roadmap),
    eoip,
  };
}
