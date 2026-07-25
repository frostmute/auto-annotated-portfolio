---
type: ProjectLayout
title: AMPLENOTE SPACED REPETITION
colors: colors-a
date: '2026-07-05'
client: OPEN SOURCE · AMPLENOTE PLUGIN · 2026
description: Zero-dependency FSRS-5 flashcards built inside Amplenote, using ordinary Markdown tables and unobtrusive local review state.
featuredImage:
  type: ImageBlock
  url: /images/featured-Image1.jpg
  altText: Abstract blue and red gradient representing memory intervals
media:
  type: ImageBlock
  url: /images/featured-Image1.jpg
  altText: Abstract blue and red gradient representing memory intervals
---
## Learning without leaving the note

This plugin turns any Markdown table with `Question` and `Answer` columns into a spaced-repetition deck. Review state stays in the table, and a generated dashboard tracks sessions, retention, and review history.

I implemented the FSRS-5 scheduling logic in vanilla JavaScript, built a fault-tolerant parser for Amplenote's table output, and designed both an animated sidebar review experience and a native-dialog fallback.

**Role:** Product design, algorithm implementation, plugin development, parser design, UX, testing

**Stack:** JavaScript, Amplenote Plugin API, FSRS-5, Jest

[View the source](https://github.com/frostmute/Amplenote-Spaced-Repetition)
