---
type: ProjectLayout
title: TETROMINO
colors: colors-a
date: '2026-07-16'
client: OPEN SOURCE · OBSIDIAN PLUGIN · 2026–PRESENT
description: Deterministic, one-way import from Are.na channels into Obsidian as stable Markdown notes, metadata, comments, previews, and local attachments.
featuredImage:
  type: ImageBlock
  url: /images/projects/tetromino.png
  altText: Tetromino for Obsidian banner
media:
  type: ImageBlock
  url: /images/projects/tetromino.png
  altText: Tetromino for Obsidian banner
---
## Curation without captivity

Tetromino moves channels and blocks from Are.na into a user-controlled Obsidian vault. The same source produces the same file structure, and every run remains previewable and reversible.

I built the TypeScript import engine, API pagination and retry layer, Markdown and frontmatter renderers, attachment pipeline, channel indexes, template system, dry-run diff viewer, and the plugin's settings and release workflow. The design is intentionally one-way: no hidden cloud process and no push-back to Are.na.

**Role:** Product design, plugin architecture, TypeScript development, UX, documentation, testing, release engineering

**Stack:** TypeScript, Obsidian API, Are.na API v3, esbuild, Jest, GitHub Actions

[View the source, docs, and releases](https://github.com/frostmute/Tetromino)
