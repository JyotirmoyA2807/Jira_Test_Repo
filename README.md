# MERN Notes App (Sample Local Repo)

This is a **simple local MERN notes app** created as a sample project for an autonomous Jira ticket analyzer.
It intentionally contains a few bugs and missing features so that Jira tickets can be generated against real code.

## Stack
- MongoDB + Mongoose
- Express.js
- React
- Node.js

## Intentional issues included
- Notes list can crash if `notes` is undefined.
- Search API can crash when query is missing.
- Update note route uses the wrong route parameter.
- Delete note flow on frontend uses `note.id` instead of `note._id`.
- Create note route does not safely handle missing `tags`.

## Example local base directory
Use this repo folder as the `local.base_path` in your central project config.

## Database Pooling and Connectivity
- The backend now uses a configurable connection pool size for MongoDB (default: 20, override with `DB_MAX_POOL_SIZE` env variable).
- Connection errors and pool exhaustion warnings are logged for easier debugging under load.
