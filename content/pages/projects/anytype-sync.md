---
type: ProjectLayout
title: ANYTYPE SYNC
colors: colors-a
date: '2026-07-24'
client: IN DEVELOPMENT · OBSIDIAN PLUGIN · 2026–PRESENT
description: A local-first bridge that translates Anytype's object graph and JSON block AST into portable Obsidian Markdown and structured YAML.
featuredImage:
  type: ImageBlock
  url: /images/projects/anytype-sync-obsidian.jpg
  altText: Anytype Sync hero — Obsidian vault fed from Anytype
media:
  type: ImageBlock
  url: /images/projects/anytype-sync-obsidian.jpg
  altText: Anytype Sync hero — Obsidian vault fed from Anytype
---
## Local data, useful files

Anytype Sync connects to the official Anytype headless daemon over localhost, extracts spaces, objects, properties, and block content, then writes ordinary Markdown into an Obsidian vault.

I built the TypeScript plugin around JSON AST conversion, frontmatter type mapping, collision-safe filenames, skip-on-unchanged imports, a spaces picker, configurable routing, and guarded back-sync for the active note. The remote-newer check refuses destructive writes unless the user explicitly overrides it.

**Role:** Product design, plugin architecture, TypeScript development, data mapping, test and build tooling

**Stack:** TypeScript, Obsidian API, Anytype local REST API, esbuild, Node test runner

[View the project on GitHub](https://github.com/frostmute/anytype-sync)
