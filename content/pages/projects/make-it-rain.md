---
type: ProjectLayout
title: MAKE IT RAIN
colors: colors-a
date: '2026-07-16'
client: OPEN SOURCE · OBSIDIAN PLUGIN · 2025–PRESENT
description: Pulls Raindrop.io bookmarks, highlights, notes, archives, and attachments into local Markdown with deterministic templates and vault-native organization.
featuredImage:
  type: ImageBlock
  url: /images/projects/make-it-rain.png
  altText: Make It Rain Obsidian plugin banner
media:
  type: ImageBlock
  url: /images/projects/make-it-rain.png
  altText: Make It Rain Obsidian plugin banner
---
## The problem

My research archive lived in Raindrop.io while my working knowledge base lived in Obsidian. Existing importers did not preserve the metadata, highlights, attachment files, and folder structure I needed for a library of more than 11,000 items.

## The work

I designed and developed Make It Rain as a local-first TypeScript plugin. It provides bulk and single-item imports, collection and tag filtering, a nesting-aware template parser, rich YAML mapping, safe overwrite controls, rate limiting, retries, archive-to-Markdown conversion, and native downloads for PDFs, EPUBs, audio, and video.

The plugin grew from my first public software release into the reference implementation for a wider family of tools that move personal data out of closed platforms and into portable Markdown.

**Role:** Product design, plugin architecture, TypeScript development, documentation, testing, release engineering

**Stack:** TypeScript, Obsidian API, Raindrop.io API, esbuild, Jest, GitHub Actions

[View the source and releases](https://github.com/frostmute/make-it-rain) · [Read the documentation](https://frostmute.github.io/make-it-rain/)
