# Dean StoryFilm AI — frontend production replacements

These files replace the stale frontend integration layer.

## Main fixes
- Uses the production backend URL through `NEXT_PUBLIC_API_BASE_URL`.
- Uses the real asynchronous `/jobs/movie` API instead of the obsolete synchronous `/generate/movie/v5` flow.
- Polls `/jobs/{job_id}` for durable progress.
- Displays real scene/frame/job progress.
- Uses `/jobs/{job_id}/video` for completed output.
- Uses `/movies` for the real movie library.
- Uses `/health` with the backend's current 100% readiness contract.
- Removes dead sidebar links and supplies working queue/assets/memory/settings routes.
- Removes fake recent-project and fake queue data.
- Prevents a long render from being tied to one browser HTTP request.
- Keeps a stable owner ID in local storage so the current backend's `X-User-ID` ownership model works without pretending that server authentication exists.

## Important authentication note
The supplied production backend has no `/auth/login` or `/auth/register` endpoints. Therefore this frontend deliberately uses a stable local workspace identity rather than sending requests to endpoints that do not exist. This is suitable for the current private/personal phase, but real account authentication should be added before public multi-user commercialization.
