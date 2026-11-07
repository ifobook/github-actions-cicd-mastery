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

---

## Advanced CI/CD Architecture

The enhanced GitHub Actions pipeline contains four dependent jobs, including a two-version test matrix.

### Job 1: Build, Audit and Package

- Checks out the repository.
- Configures Node.js 24 with npm caching.
- Installs dependencies using `npm ci`.
- Validates the application build.
- Performs an npm security audit.
- Creates and uploads an npm package artifact.

### Job 2: Automated Test Matrix

Uses GitHub Actions matrix strategy to execute tests independently on:

- Node.js 22
- Node.js 24

The test job depends on the successful completion of the build job.

### Job 3: Docker Build and Smoke Test

Runs after the build and matrix tests succeed.

- Builds the application Docker image.
- Starts a container.
- Calls the `/health` endpoint.
- Verifies the application responds successfully.
- Captures container logs and cleans up.

### Job 4: Publish Docker Image to GHCR

Runs only on pushes to `main` or manual executions on `main`, after all preceding jobs succeed.

- Authenticates to GitHub Container Registry.
- Uses the automatically generated `GITHUB_TOKEN`.
- Grants `packages: write` permission only to the publishing job.
- Builds and publishes the Docker image.
- Tags the image with `latest` and the Git commit SHA.

### Published Container Image

Registry:

    ghcr.io/ifobook/github-actions-cicd-mastery

Pull the latest image:

    docker pull ghcr.io/ifobook/github-actions-cicd-mastery:latest

Run the image:

    docker run --rm -p 127.0.0.1:3001:3000 \
      ghcr.io/ifobook/github-actions-cicd-mastery:latest

Verify:

    curl http://127.0.0.1:3001/health

The image must be publicly accessible for unauthenticated pulls.

## CI/CD Security

The workflow demonstrates:

- Restricted repository permissions.
- Job-specific package publishing permissions.
- Secure GHCR authentication using GitHub-managed credentials.
- No hardcoded access tokens.
- Dependency auditing.
- Reproducible npm installations.
- Docker execution as a non-root user.

## Pipeline Monitoring and Troubleshooting

### YAML Syntax Error

During implementation, GitHub Actions initially rejected the publishing workflow because the `publish` job was incorrectly indented.

The issue was diagnosed using GitHub Actions annotations and resolved by correcting the YAML structure.

### Workflow Validation

The corrected pipeline subsequently completed successfully, including Docker image publishing.

### Monitoring

Workflow execution can be monitored under the repository's Actions tab.

Individual job logs provide detailed evidence of dependency installation, build execution, automated tests, Docker validation, and image publishing.

## Advanced Pipeline Evidence

- [Node.js Test Matrix](screenshots/github-actions-matrix.png)
- [Docker CI Execution](screenshots/github-actions-docker-ci.png)
- [Successful Full CI/CD Pipeline](screenshots/github-actions-ghcr-success.png)
- [GHCR Publishing Logs](screenshots/github-actions-ghcr-publish.png)
- [Published GHCR Package](screenshots/github-container-registry.png)
- [Local Docker Build](screenshots/docker-build-success.png)
- [Local Docker Container](screenshots/docker-container-running.png)
- [Docker Health Check](screenshots/docker-health-check.png)

## Development History

The project was implemented incrementally through dedicated Git commits covering:

1. Initial CI pipeline.
2. Workflow modernization and documentation.
3. Docker containerization.
4. Multi-job CI and Node.js matrix testing.
5. GHCR publishing.
6. Workflow troubleshooting and correction.
7. Final evidence and documentation.
