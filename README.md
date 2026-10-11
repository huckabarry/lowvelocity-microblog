# Low Velocity for Micro.blog

A Hugo/Micro.blog port of the Low Velocity Ghost theme. The homepage and article design use the Ghost theme CSS plus the live site's October 2026 typography and palette.

## Long and short posts

Classification is shared across the homepage, Field Notes, Posts, Updates, and archive views:

1. Listening and Check-ins categories retain their dedicated collections.
2. An Updates category puts a post in Updates, even if it has a title or Field Notes category.
3. Otherwise, a title or Field Notes category puts a post in Field Notes.
4. Remaining untitled posts go to Updates.

Category matching for this classification is case-insensitive. Word count does not decide placement. Topic categories such as Urbanism never turn an untitled update into an article. Gallery can show photographs from either stream.

The homepage shows only Field Notes in the original date/title list. Updates shows full short posts. Individual permalinks still work for both. Category pages separate articles from updates. Native RSS/JSON feeds and Micro.blog timeline behavior remain platform-managed; this is website separation, not a change to syndication.

## Pages to create in Micro.blog

| Page | URL | Display |
| --- | --- | --- |
| Field Notes | `/field-notes/` | Long-form article list |
| Updates | `/now/` | Full short posts |
| Gallery | `/gallery/` | Gallery / Photography categories |
| Listening | `/listening/` | Listening category |
| Check-ins | `/check-ins/` | Check-ins category |
| About | `/about/` | Editable page body |

`/updates/` also works for Updates, and `/posts/` shows articles only. Add the desired pages to Micro.blog navigation. Page introductions remain editable in Micro.blog. No custom post front matter is required.

## GitHub installation

Repository: https://github.com/huckabarry/lowvelocity-microblog

The theme files are at the repository root, ready for Micro.blog to import. Local sample content (`exampleSite/`) and review screenshots (`review/`) are excluded from Git. Select/install the repository through Micro.blog's custom theme or plug-in interface and use its GitHub refresh control for updates. Keep edits in GitHub to avoid overwritten web-editor changes.

The production layouts deliberately do not override `microblog_head.html`: Micro.blog supplies current platform metadata and integration hooks. The example site supplies a local preview stub only. Binary assets may be skipped by the theme importer; active typography uses externally hosted IBM Plex Mono and Fira Sans. Verify fonts on the hosted test blog.

## Conversations and cross-post links

After refreshing the theme from GitHub, enable **Include conversation on post page** under Micro.blog's Design settings. The theme respects `include_conversation`; it does not force it on. Individual article and short-post permalinks then load Micro.blog's native Conversation.js. Lists, archive pages, and ordinary pages do not load it.

Micro.blog supplies the collected replies and comment interface. Connect cross-posting/federation in Micro.blog to receive supported social replies. Webmentions supported by Micro.blog can appear too. This theme does not independently scrape social networks or import existing threads.

When Micro.blog supplies cross-post metadata, an **Also on** row links to Bluesky (`bluesky.link`), Mastodon (`mastodon.hostname`, `username`, `id`), and Threads (`threads.url`). These links carry `u-syndication` inside the original post's `h-entry`. Missing metadata produces no link. Threads link support does not imply Threads reply collection.

References: [Conversation.js](https://help.micro.blog/t/replies-with-conversation-js/67), [cross-post metadata](https://help.micro.blog/t/cross-posting-in-front-matter/1889).

## Local preview

The original development folder includes an untracked `exampleSite/` fixture. With that fixture and Hugo 0.117.0:

```sh
hugo server --source exampleSite --themesDir ../.. --theme microblog-theme --buildFuture
```

Run from this theme directory. `--buildFuture` allows the dated sample posts to render regardless of the local clock. For a fresh clone, use a Micro.blog Markdown/theme export as your local test site. The local samples exercise a titled article, an untitled topical update, an explicitly titled update, photos, listening, and check-ins.

## Validation completed

Built successfully with Hugo 0.117.0. Generated HTML checks verified article/update isolation, titled update overrides, category separation, full short-post content, and individual permalinks. Browser checks covered desktop homepage/article, a 390px mobile article and Updates page, menu operation, and light/dark switching. Screenshots are in `review/`. This uses sample content; hosted compatibility is not yet verified.

## Remaining hosted checks

Validate the selected Hugo version, imported assets, menus, native feeds, platform metadata, and real content on a Micro.blog test blog. Search, Ghost membership, middleware imports, custom feeds, maps, and AT Protocol engagement are outside this initial visual port. Gallery preserves image proportions and packs each image into the shortest available column (three desktop columns, two on smaller screens, one on phones). It repacks on image load and resize; without JavaScript it falls back to an uncropped grid. Keyboard focus and touch reveal the captions.
