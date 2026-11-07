# GitHub Actions CI/CD Pipeline Mastery

A DevOps project demonstrating automated Continuous Integration using GitHub Actions, Node.js 24 LTS, Express.js, and npm.

## Overview

The project uses GitHub Actions to automatically validate application changes on GitHub-hosted Ubuntu runners.

## Technologies

- GitHub Actions
- Ubuntu GitHub-hosted runners
- Node.js 24 LTS
- Express.js
- npm
- Git and GitHub

## Project Structure

- `.github/workflows/ci.yml` — CI/CD workflow
- `src/app.js` — Express application
- `tests/app.test.js` — Automated tests
- `package.json` — Application scripts and dependencies
- `package-lock.json` — Dependency lockfile
- `.nvmrc` — Node.js version
- `screenshots/` — Execution evidence

## Workflow Triggers

The workflow runs automatically on:

- Pushes to `main`
- Pull requests targeting `main`

It also supports manual execution through `workflow_dispatch`.

## Pipeline Steps

1. **Checkout repository:** Downloads the repository onto the runner.
2. **Setup Node.js:** Installs Node.js 24 and enables npm caching.
3. **Install dependencies:** Runs `npm ci` for reproducible installation.
4. **Build application:** Runs `npm run build` to validate application syntax.
5. **Run automated tests:** Runs `npm test`, checking the homepage, health endpoint, and unknown routes.
6. **Security audit:** Runs `npm audit --audit-level=high`.
7. **Package application:** Generates a distributable npm `.tgz` archive.
8. **Upload build artifact:** Uploads the archive to the GitHub Actions run.

The workflow fails when a required build, test, security audit, or packaging step fails.

## Security and Optimization

- Read-only repository permissions using `contents: read`.
- No hardcoded secrets or credentials.
- GitHub's automatically managed token is used for repository checkout.
- npm caching reduces repeated dependency downloads.
- `npm ci` uses the committed lockfile.

This project does not require custom GitHub Actions secrets because it does not deploy to an external service.

## Local Validation

Activate Node.js 24:

    nvm use 24

Install dependencies:

    npm ci

Build:

    npm run build

Test:

    npm test

Security audit:

    npm audit --audit-level=high

Generate an artifact:

    mkdir -p artifacts
    npm pack --pack-destination artifacts

## Verified GitHub Actions Execution

The initial push-triggered workflow completed successfully.

- Trigger: push to main
- Build: successful
- Automated tests: passed
- Security audit: successful
- Artifact: application-package
- Duration: approximately 13 seconds

The final workflow update must also pass before submission.

## Troubleshooting and Improvements

### Deprecated GitHub Actions Runtime

The initial workflow used older versions of checkout and setup-node, producing a Node.js 20 deprecation warning.

The workflow was updated to newer supported action versions.

### GitHub-hosted Runner Environment

GitHub Actions uses a fresh runner for each workflow execution. Dependencies must therefore be installed during each run.

The workflow uses npm caching to improve subsequent execution times.

## Evidence

- [Local Validation](screenshots/local-validation.png)
- [Successful Workflow](screenshots/github-actions-success.png)
- [Workflow Job Steps](screenshots/github-actions-steps.png)
- [Uploaded Artifact](screenshots/github-actions-artifact.png)

## Repository

https://github.com/ifobook/github-actions-cicd-mastery

## Conclusion

This project demonstrates event-driven CI, workflow-as-code, automated testing, dependency auditing, caching, and artifact generation using GitHub Actions.
