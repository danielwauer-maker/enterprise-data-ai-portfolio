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
