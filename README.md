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

## Database Pool Configuration
To avoid connection pool exhaustion under load, you can configure the following environment variables:

- `DB_MAX_POOL_SIZE`: Maximum number of concurrent database connections (default: 50)
- `DB_MIN_POOL_SIZE`: Minimum number of idle connections (default: 5)

Example `.env` additions:

```
DB_MAX_POOL_SIZE=50
DB_MIN_POOL_SIZE=5
```

