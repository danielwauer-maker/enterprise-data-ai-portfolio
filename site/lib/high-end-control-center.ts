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

export function loadBCSentinelCoreGoLivePlan(): CoreGoLivePlan {
  return readJson<CoreGoLivePlan>(path.join("data", "bcsentinel-core-go-live-plan.json"));
}

export function loadBCSentinelDesignReadiness(): BCSentinelDesignReadiness {
  return readJson<BCSentinelDesignReadiness>(path.join("data", "bcsentinel-design-readiness.json"));
}
