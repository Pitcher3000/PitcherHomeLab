# Onepage source snapshots

The public site is authored and published through the Onepage MCP. These files are source snapshots, not an automatic GitHub deployment pipeline.

`header/` contains the shared header's three files as updated on 2026-11-03. It depends on the site's existing `@siteui/button` and `@siteui/status-led` packages and Onepage runtime.

The Home link sits outside the navigation group hidden at narrow widths. Both Home and the brand link use the configurable landing-page URL and `_top` navigation. The existing visual style and links are retained.

The `posts/` directory at the repository root stores the release article in Markdown and its Onepage CMS field payload in JSON. Publication status and CMS identifiers are managed in Onepage.
