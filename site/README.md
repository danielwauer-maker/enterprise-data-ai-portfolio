# Portfolio Website

The portfolio website is a static Next.js application under `site/`.

## Source of truth

The website does not maintain portfolio KPIs independently. At build time it reads the structured sources in the repository root:

- `data/portfolio.yaml`
- `data/roadmap.yaml`
- `data/metrics.json`
- `data/projects/*.yaml`
- `data/delivery-efficiency.yaml`
- `data/effort-log.yaml`

## Local development

From `site/`:

```bash
npm install
npm run dev
```

## Static build

```bash
npm run build
```

Next.js exports the static site to `site/out/`.

## GitHub Pages

`.github/workflows/portfolio-website.yml` validates the build on pull requests and deploys the static export from `main`.

The production build uses the repository base path `/enterprise-data-ai-portfolio`.


## Control Center v2

The portfolio site now includes a static `/control-center/` route built from the High-End program source of truth.

Source data:

- `data/high-end-program-v2.yaml`
- `data/sprint-readiness-v2.yaml`
- `data/effort-log.yaml`

Generated snapshot:

- `control-center/program.json`

Generation/validation:

- `scripts/generate_high_end_control_center.py`
- `scripts/validate_high_end_control_center.py`
