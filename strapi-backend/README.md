# Strapi Backend - Projects & Libraries

This Strapi v5 project manages users, their projects, and component libraries tied to those projects. Built with TypeScript and optimized for local development using SQLite.

## Current Data Models

- ### Project

  Each project belongs to one user and may link to multiple libraries. Authenticated users can only access their own projects thanks to custom route policies.

  - `name` (required)
  - `description`
  - `repository`
  - `user` (required) → linked to User

- ### Library
  Each library can be linked to multiple projects.
  - `name` (required) → gets capitalized on save
  - `slug` → auto-generated from name if not set
  - `projects` → linked to Project

## Getting Started

### Start in development mode (autoReload)

```bash
npm run develop
# or
yarn develop
```

### Build admin panel (after changes)

```bash
npm run build
# or
yarn build
```

### Start in production mode

```bash
npm run start
# or
yarn start
```

## Directory Structure

Key folders and files:

- `src/api/project` – "Project" content type

  - See ./routes/ and ./middlewares/ for logic enforcing project ownership and authorization

- `src/api/library` – "Library" content type

- `src/document-service-middlewares.ts` – Handles document-related lifecycle logic

## Next Steps

- **Enforce Required Relations**

  Prevent saving Project or Library entries without required relations (e.g. user). May exploit plugin [Required Relation Field](https://market.strapi.io/plugins/strapi-plugin-required-relation-field).

- **Track Permissions in Git**

  Use plugin [Config Sync](https://market.strapi.io/plugins/strapi-plugin-config-sync) to sync User Permissions and other configuration to the repo.

- **Add Unit Tests**

  Introduce unit tests for lifecycle hooks, slug generation, and permission logic using [Jest](https://jestjs.io/).

- **Create a Simple UI for Testing**

  Build a minimal web UI using any framework (e.g. Vue, React, or Svelte) to test authentication and CRUD operations via the Strapi API.
