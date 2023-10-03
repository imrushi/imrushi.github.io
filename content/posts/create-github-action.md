---
title: "Create Github Action"
date: 2023-10-03T09:44:47+05:30
draft: true
author: "Rushi Panchariya"
authorTwitter: "RushiPanchariya"
categories: ["GitHub"]
tags: ["github", "actions", "go"]
keywords: ["github actions", "custom github actions", "create github actions"]
description: ""
showFullContent: false
readingTime: true
hideComments: false
toc: false
---

After writing my Go Dash blog, I got an idea what if I can push same blog to Medium. I started looking for way to automate this thing. I started looking for GitHub action which can push content to Medium directly. I found the GitHub action [hugo-to-medium](https://github.com/pr4k/hugo-to-medium) by [Prakhar Kaushik](https://github.com/pr4k).

This GitHub action was perfect but there was one issue. In hugo I mostly use [shortcodes](https://gohugo.io/content-management/shortcodes/) to showcase the sample codes and images. There was no way from which I can remove this in publishing process. So this issue inspired me create my own GitHub action which allows:
- Select and replace shortcodes using regex
- Removes frontmatter of YAML, TOML, or JSON formats from post.
- Extract title and tag from frontmatter
- Support both Markdown and Hugo Markdown formats.