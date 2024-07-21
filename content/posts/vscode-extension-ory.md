---
title: "VScode Extension: Ory"
date: 2024-06-23T16:08:19+05:30
draft: true
author: "Rushi"
---

Since last year, I have been working on a VSCode extension. In this blog post, I will cover what I was building, why I was building it, what the development process was like, and what I have learned.

I was building a VSCode extension for [Ory](https://ory.sh). Ory is an open-source community focused on cloud software application security. They provide various open-source solutions for authentication, authorization, and access control. In addition to these open-source solutions, they offer managed solutions through their cloud service, the [Ory Network](https://www.ory.sh/network/).

I was exploring Ory Network and playing around with its configuration. Whenever I wanted to change any configuration, I had to go to Ory Network.

## ORY CLI

I used the [ORY CLI](https://www.ory.sh/docs/guides/cli/installation) for configuration and development purposes, which greatly simplified my development process. It was a convenient and easy-to-use tool that helps manage and configure Ory Network projects. Its built-in proxy and tunneling mechanisms smoothly route application traffic during development.

---

Since Ory CLI was easy to use, every time I had to open up the terminal and remember the command I needed to run. Some people are not good with terminal commands. I know some guys who are good at coding and stuff but not command line 😕.

Lots of developers use VS Code, and I think many Ory users might be using VS Code. I came up with an idea: what if there was a VS Code extension through which all these configurations for Ory Network could be handled? This would make it easy for many people to configure from a GUI and manage Ory Network projects.

I reached out to Ory with this idea, and they loved it. Thanks to [@Vincent](https://github.com/vinckr) and [@Aeneas](https://github.com/aeneasr) (aka hackerman) for supporting the development journey.

---

Let me share some information about the development process, the challenges I faced, how fun it was, and, most importantly, what I learned.

## Development Process of VS Code Extension

This was my first time developing a VS Code extension. I had no idea where to start. I started looking for development docs, and it was not easy to understand. Some YouTube videos helped me with the basics, like how to create pop-up boxes, basic alert messages, etc., but there was no source to go to for advanced extension development.

Before starting development, I had a discussion with [@Vincent](https://github.com/vinckr) about how to approach it, like API-based development or what? He suggested using the existing Ory CLI instead of APIs. The plan was to call the Ory CLI app with inputs from the VS Code extension when we got all the information from the VS Code Extension.

{{< figure src="/img/ory/ory-extension-arch.svg" alt="extension flow" position="center" style="border-radius: 8px;" caption="Extension workflow" captionPosition="center" >}}

I started developing the first module, which checks the prerequisites, like if your system already has the [Ory CLI](https://www.ory.sh/docs/guides/cli/installation) installed it is good to go. If not, it will give you the option to install it directly from VS Code. I faced many challenges because there are many edge cases.

I got lots of ideas and inspiration from other open-source VS Code extensions for my first module prerequisite. Some ideas were hard to implement because I didn't know how to approach them. For example, I had an idea to show a list of projects, OAuth clients, users, and permissions in a tree view with relations. That's where these open-source VS Code extensions repos helped me a lot.

I went through their code, learned what they were doing, and put my idea pieces into their place.

There are two modules I had fun developing:

- **_ORY Permission List_**:- In this module, I wanted to show the permissions with their relations like a tree structure [find more](https://www.ory.sh/docs/keto/modeling/create-permission-model). It was fun to create the logic for this. On hover of each stage of the tree, it shows a statement like "Group:developer#members is viewers of Folder:keto"

{{< figure src="/img/ory/relationship.png" alt="relationship" position="center" style="border-radius: 8px;" caption="ORY Permission/Relationship in tree structure" captionPosition="center" >}}

- **_ORY Tunnel_** - This module was a little bit challenging for me. When we run the Ory Tunnel command, it creates a proxy tunnel with specified configurations. In this module, I wanted to give users the flexibility to create as many proxy tunnels as they wanted and provide a way to handle them. I really enjoyed the part where I had to create background processes and manage them.

{{< figure src="/img/ory/tunnel-running-process.png" alt="Tunnel" position="center" style="border-radius: 8px;" caption="Tunnel Running Process" captionPosition="center" >}}

Overall, during the development process, I faced lots of errors (which is expected), got stuck on how it should be implemented, and did lots of research for weeks. It was fun.

## What I Learn

This is the important part: what I learned on this journey.

- I learned that whenever you're stuck on a problem, there is always a solution. Just do the research and be patient.
- I learned a lot about the Ory ecosystem, like Ory Network, Ory CLI, and other Ory products.
- When you can't find an implementation solution in docs or on Google, find an open-source repo. They might have the solution or a way.
- I learned how to create advanced components in VS Code.

## How to Use the ORY Extension with Example

You can download the Ory Extension from the VS Code Marketplace.

To show you how to use it, I will provide an example of logging in and creating an Ory project.

- Once you install the Ory CLI, the first step is to log in.
- To `Login` with your `ORY CLI` account:
  - Open the VS Code `Command Palette` using `Ctrl/CMD + Shift + P`.
  - In the command palette, type > `Ory: Auth`
  - Fill in all the details like username and password.
  - It will show a "You are logged in successfully" message.
- To create a project, head over to the Command Palette again. Type `Ory: Create` and select it.
  - Then select the project from the drop-down menu.
    {{< figure src="/img/ory/Create-options.png" alt="create-options" position="center" style="border-radius: 8px;" >}}
  - In the next window, enter the project name, e.g.,`this-is-new-project`:
    {{< figure src="/img/ory/project-name.png" alt="project-name" position="center" style="border-radius: 8px;" >}}
  - The project will be created on the Ory Network. You can check it on your right side in the Ory section in VS Code:
    {{< figure src="/img/ory/list-project.png" alt="list project" position="center" style="border-radius: 8px;" >}}
  - To create further resources under this project, you will need to set that as the default. To do this, right-click on the project, and you will see multiple options. Select the `Use Project` option.
    {{< figure src="/img/ory/use-project.png" alt="list project" position="center" style="border-radius: 8px;" >}}
- Now you can create other options under `this-is-new-project`.

There are multiple options available; you just need to play around with them. You can upload your Ory config for specific configurations, pull and see your config in any format like JSON, YAML, etc. This is just a glimpse.

---

I truly enjoyed the development process of this VS Code extension. I hope it will significantly increase your productivity when working with Ory. If you have any feedback, discover any bugs, or think of any features you’d like to see added, please report them [here](https://github.com/ory/cli-vscode-extension/issues). I’m eager to improve the extension based on your input and continue developing new features.

For those interested in contributing to this project, it’s open-source and can be found [here](https://github.com/ory/cli-vscode-extension)

Special thanks to [@Vincent](https://github.com/vinckr) and [@Aeneas](https://github.com/aeneasr) (aka hackerman) for their coordination and support throughout this journey.

Thank you for reading, and happy coding!
