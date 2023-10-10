---
title: "Create Github Actions"
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

After writing my Go Dash blog, I got an idea what if I can push same blog to Medium. I started looking for way to automate this thing. I have checked on GitHub Marketplace for actions which can push content to Medium directly. I found the GitHub action [hugo-to-medium](https://github.com/pr4k/hugo-to-medium) by [Prakhar Kaushik](https://github.com/pr4k).

This GitHub action was good but there was some issues. In hugo I mostly use [shortcodes](https://gohugo.io/content-management/shortcodes/) to showcase the sample codes, figures and images. Another one is it doesn't remove any shortcodes. There was no way from which I can remove this in publishing process. So this issue inspired me create my own GitHub action which allows:

- Select and replace shortcodes using regex
- Removes frontmatter of YAML, TOML, or JSON formats from post.
- Extract title and tag from frontmatter
- Support both Markdown and Hugo Markdown formats.

---

While I was doing research how to create own/custom GitHub Actions. I started with GitHub [documentation](https://docs.github.com/en/actions/creating-actions) of create GitHub Action. Documentation were straight forward there were few steps, but there are three ways to create GitHub Actions:

- **Docker container action\_**:

  - It packages the entire environment needed for GitHub Actions.
  - They bundle not only your code but also the specific OS, dependencies, tools, and runtime environment.
  - This packaging approach ensures consistency and reliability because the consumers of your action don't need to worry about installing the necessary tools or dependencies themselves.
  - It is tends to be slower than JavaScript action due to the time it takes to build and retrieve the container.
  - It can only execute on runners[^1] with a Linux operating system. If you're using self-hosted runners[^1], they must also be running a Linux operating system and have Docker installed to execute Docker container actions.

- **_JavaScript action_**:

  - It runs directly on the runner[^1] machine.
  - These actions separate your action's code from the environment used to run that code.
  - Ensure compatibility with all GitHub-hosted runners[^1] (including Ubuntu, Windows, and macOS).
  - Use pure JavaScript and existing runner binaries.
  - GitHub Actions Toolkit offers Node.js packages for faster development.

- **_Composite action_**:

  - Composite actions combine multiple workflow steps into one action.
  - Imagine you have several run commands that you frequently use together in your workflows. With composite actions, you can bundle these commands into a single, well-defined action.
  - It simplifies workflows by creating reusable actions.
  - Using this composite action in your workflow makes your workflow configuration cleaner and more maintainable.
  - It is great for organizing complex workflows efficiently.

Before we start lets check what mistakes I have made. So, you can avoid these mistakes.

## Mistakes were made

{{< image src="https://media.tenor.com/uWx_Y53J7gEAAAAC/arrested-development-huge-mistake.gif" alt="mistake" position="center" style="border-radius: 8px; width: 420px; height: 230px;" >}}

Be clear what you want to achieve. When I read the documentations I was not clear about which action type I should use. I thought `composite action` would be perfect option for me. Let me explain why?

I am thinking it will be straight forward that:

- I will write code/logic in [Go](https://go.dev)
- Build the program binary with linux amd64 option
- At the time of release add it in Assets of GitHub Releases
- When action runs it will fetch binary from Assets
- Using that binary I will pass the required arguments



- Want to create something that would publish Markdown/Hugo content to Medium
- Create this application in [Go](https://go.dev)
-

- what inspired me to create custom github action
- mistakes were made while creating custom github actions
- process of creating github action
- testing github action
  - problem faced while testing
- publishing github action

[^1]: "Runner" refers to a virtual machine or container environment where your GitHub Action workflows are executed.
