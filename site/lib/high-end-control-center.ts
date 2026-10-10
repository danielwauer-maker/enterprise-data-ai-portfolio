import fs from "node:fs";
import path from "node:path";

export type SprintDetailItem = {
  id: string;
  title: string;
  weight: number;
  status: string;
  evidence: string;
};

export type SprintRow = {
  id: string;
  title: string;
  start: string;
  end: string;
  planned_hours: number;
  actual_hours: number;
  remaining_hours: number;
  track: string;
  status: string;
  depends_on: string[];
  objective: string;
  result: string;
  readiness_pct: number;
  scope_readiness_pct: number;
  delivery_gate_readiness_pct: number;
  readiness_breakdown: Record<string, number>;
  detail_items: SprintDetailItem[];
  detail_done_count: number;
  detail_total_count: number;
  blocker_count: number;
};

export type HighEndControlCenter = {
  schema_version: number;
  program: Record<string, any>;
  readiness_model: Record<string, any>;
  scope_readiness_model: Record<string, any>;
  sprints: SprintRow[];
};

export type CoreGoLiveSprint = {
  id: string;
  phase: string;
  title_en: string;
  title_de: string;
  priority: string;
  status: string;
  readiness_after_pass_pct: number;
  objective_en: string;
  objective_de: string;
};

export type CoreGoLivePlan = {
  schema_version: number;
  updated_at: string;
  product: string;
  goal: string;
  status: string;
  readiness: {
    current_go_live_readiness_pct: number;
    program_completion_pct: number;
    core_scope_readiness_pct: number;
    design_template_readiness_pct: number;
    core_design_readiness_pct: number;
    note_en: string;
    note_de: string;
  };
  principles: string[];
  phases: Array<{
    id: string;
    title_en: string;
    title_de: string;
  }>;
  sprints: CoreGoLiveSprint[];
};

type CoreGoLivePlanSource = Omit<CoreGoLivePlan, "readiness"> & {
  readiness: {
    current_go_live_readiness_pct: number;
    note_en: string;
    note_de: string;
  };
};

export type BCSentinelDesignReadiness = {
  schema_version: number;
  updated_at: string;
  product: string;
  summary: {
    visual_design_readiness_pct: number;
    design_system_consistency_readiness_pct: number;
    product_truth_readiness_pct: number;
    implementation_readiness_pct: number;
    design_template_readiness_pct: number;
    core_product_design_readiness_pct: number;
    target_min_page_readiness_pct: number;
  };
  design_scope: Array<Record<string, any>>;
  missing_design_scope: Array<Record<string, any>>;
};

export type BCSentinelPrePilotClosureSprint = {
  id: string;
  title_en: string;
  title_de: string;
  status: string;
  progress_pct: number;
  evidence: string;
};

export type BCSentinelPrePilotClosurePlan = {
  schema_version: number;
  updated_at: string;
  product: string;
  purpose: string;
  official_go_live_readiness_source: string;
  official_go_live_readiness_pct: number;
  readiness_rule: string;
  sprints: BCSentinelPrePilotClosureSprint[];
  closure_readiness_pct: number;
  done_count: number;
  total_count: number;
};

function findPortfolioRoot(): string {
  let current = process.cwd();
  while (true) {
    if (fs.existsSync(path.join(current, "data", "high-end-program-v2.yaml"))) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      throw new Error("Could not locate High-End portfolio root.");
    }
    current = parent;
  }
}

function readJson<T>(relativePath: string): T {
  const root = findPortfolioRoot();
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8")) as T;
}

export function loadHighEndControlCenter(): HighEndControlCenter {
  return readJson<HighEndControlCenter>(path.join("control-center", "program.json"));
}

export function loadBCSentinelDesignReadiness(): BCSentinelDesignReadiness {
  return readJson<BCSentinelDesignReadiness>(path.join("data", "bcsentinel-design-readiness.json"));
}

export function loadBCSentinelPrePilotClosurePlan(): BCSentinelPrePilotClosurePlan {
  const source = readJson<Omit<BCSentinelPrePilotClosurePlan, "closure_readiness_pct" | "done_count" | "total_count">>(
    path.join("data", "bcsentinel-prepilot-closure-plan.json"),
  );
  const totalCount = source.sprints.length;
  const doneCount = source.sprints.filter((sprint) => sprint.status === "DONE").length;
  const closureReadiness = totalCount
    ? source.sprints.reduce((sum, sprint) => sum + Number(sprint.progress_pct ?? 0), 0) / totalCount
    : 0;
  return {
    ...source,
    closure_readiness_pct: Math.round(closureReadiness * 10) / 10,
    done_count: doneCount,
    total_count: totalCount,
  };
}

export function loadBCSentinelCoreGoLivePlan(): CoreGoLivePlan {
  const plan = readJson<CoreGoLivePlanSource>(path.join("data", "bcsentinel-core-go-live-plan.json"));
  const highEnd = loadHighEndControlCenter();
  const design = loadBCSentinelDesignReadiness();
  const coreSprintIds = new Set(["S01", "S02", "S03", "S04", "S05", "S06"]);
  const coreSprints = highEnd.sprints.filter((sprint) => coreSprintIds.has(sprint.id));
  const coreScopeReadiness = coreSprints.length
    ? coreSprints.reduce((sum, sprint) => sum + Number(sprint.scope_readiness_pct ?? 0), 0) / coreSprints.length
    : 0;

  return {
    ...plan,
    readiness: {
      ...plan.readiness,
      program_completion_pct: Number(highEnd.program.program_completion_pct ?? 0),
      core_scope_readiness_pct: Math.round(coreScopeReadiness * 100) / 100,
      design_template_readiness_pct: Number(design.summary.design_template_readiness_pct ?? 0),
      core_design_readiness_pct: Number(design.summary.core_product_design_readiness_pct ?? 0),
    },
  };
}
