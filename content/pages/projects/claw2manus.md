---
type: ProjectLayout
title: CLAW2MANUS
colors: colors-a
date: '2026-07-11'
client: OPEN SOURCE · DEVELOPER TOOLING · 2026
description: Converts OpenClaw and ClawHub skill packages into Manus-compatible skills with configurable tool mapping, validation, and conversion reports.
featuredImage:
  type: ImageBlock
  url: /images/featured-Image4.jpg
  altText: Abstract dark image representing format translation
media:
  type: ImageBlock
  url: /images/featured-Image4.jpg
  altText: Abstract dark image representing format translation
---
## Portability for agent skills

Claw2Manus automates the repetitive parts of moving a skill between incompatible agent ecosystems. It converts local files or whole directories, fetches skills from GitHub or ClawHub, maps tools through configuration, generates Manus behavior files, validates output, and writes a report for anything that still needs human judgment.

I extended and hardened the Python CLI with configurable mappings, interactive resolution, fetching fallbacks, validation, batch conversion, tests, and performance fixes.

**Role:** Python development, CLI design, interoperability research, testing, open-source maintenance

**Stack:** Python, Click, YAML, GitHub API, pytest

[View the source](https://github.com/frostmute/claw2manus)
