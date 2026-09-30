import fs from "node:fs";
import path from "node:path";

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
  readiness_breakdown: Record<string, number>;
  blocker_count: number;
};

export type HighEndControlCenter = {
  schema_version: number;
  program: Record<string, any>;
  readiness_model: Record<string, any>;
  sprints: SprintRow[];
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

export function loadHighEndControlCenter(): HighEndControlCenter {
  const root = findPortfolioRoot();
  const file = path.join(root, "control-center", "program.json");
  return JSON.parse(fs.readFileSync(file, "utf8")) as HighEndControlCenter;
}
