---
title: "Automate with Precision: Building Custom GitHub Actions"
date: 2023-10-11T11:10:47+05:30
draft: false
author: "Rushi Panchariya"
authorTwitter: "RushiPanchariya"
categories: ["GitHub"]
cover: "https://ik.imagekit.io/ruship/github-actions.png?updatedAt=1711085963514"
tags: ["github", "actions", "ci/cd", "docker", "go"]
keywords:
  [
    "GitHub Actions",
    "Docker Container Action",
    "Custom GitHub Actions",
    "GitHub Workflow",
    "GitHub Marketplace",
    "YAML Workflow",
    "Dockerfile for Actions",
    "GitHub Automation",
    "Publish GitHub Action",
    "GitHub Action Testing",
  ]
showFullContent: false
readingTime: true
hideComments: false
toc: false
---

After writing my Go Dash blog, I got an idea of whether I could push the same blog to Medium. I started looking for ways to automate this thing. I checked on the GitHub Marketplace for actions that can push content to Medium directly. I found the GitHub action [hugo-to-medium](https://github.com/pr4k/hugo-to-medium) by [Prakhar Kaushik](https://github.com/pr4k).

This GitHub action was good, but there were some issues. In Hugo, I mostly use [shortcodes](https://gohugo.io/content-management/shortcodes/) to showcase the sample codes, figures, and images. Another one is that it doesn’t remove any shortcodes. There was no way for me to remove this from the publishing process. So this issue inspired me to create my own GitHub action, which allows to:

- Select and replace shortcodes using regex.
- Remove the frontmatter of YAML, TOML, or JSON formats from the post.
- Extract the title and tag from the frontmatter.
- Support both Markdown and Hugo Markdown formats.

---

**TL;DR**: If you want to start creating a GitHub action without a backstory, head over to the [Creating a GitHub Action](#creating-a-github-action) section.

---

While I was researching on how to create my own or custom GitHub actions, I started with the GitHub [documentation](https://docs.github.com/en/actions/creating-actions) - it was straight-forward; there were a few steps, but there are three ways to create GitHub Actions:

- **_Docker container action_**:

  - It packages the entire environment needed for GitHub Actions.
  - They bundle not only your code but also the specific OS, dependencies, tools, and runtime environment.
  - This packaging approach ensures consistency and reliability because the consumers of your action don't need to worry about installing the necessary tools or dependencies themselves.
  - It tends to be slower than JavaScript action due to the time it takes to build and retrieve the container.
  - It can only execute on a Linux based operating system. If you're using self-hosted runners[^1], they must also be running a Linux based operating system and have Docker installed to execute Docker container actions.

- **_JavaScript action_**:

  - It runs directly on the runner[^1] machine.
  - These actions separate your action's code from the environment used to run that code.
  - It ensure compatibility with all GitHub-hosted runners[^1] (including Ubuntu, Windows, and macOS).
  - It uses pure JavaScript and existing runner binaries.
  - GitHub Actions Toolkit offers Node.js packages for faster development.

- **_Composite action_**:

  - Composite actions combine multiple workflow steps into one action.
  - Say you have several run commands that you frequently use together in your workflows. With composite actions, you can bundle these commands into a single, well-defined action.
  - It simplifies workflows by creating reusable actions.
  - Using this composite action in your workflow makes your workflow configuration cleaner and more maintainable.
  - It is great for organizing complex workflows efficiently.

Before we start, let's check what mistakes I have made so you can avoid these mistakes.

## Mistakes were made

{{< image src="https://media.tenor.com/uWx_Y53J7gEAAAAC/arrested-development-huge-mistake.gif" alt="mistake" position="center" style="border-radius: 8px; width: 420px; height: 230px;" >}}

Be clear about what you want to achieve. When I read the documentation, I was not clear about which action type I should use. I thought `composite action` would be the perfect option for me. Let me explain why.

I am thinking it will be straight forward that:

- I will write code or logic in [Go](https://go.dev)
- Build the program binary with the Linux AMD64 option.
- At the time of release, add it to the Assets of GitHub Releases.
- When action runs, it will fetch a binary from assets.
- Using that binary, I will pass the required arguments.
- The program will handle everything and post content to Medium.

But when I have written everything for actions, The program is working as expected and passing unit test cases. I thought now I had to create `action.yml` with `composite action` and take all inputs and pass them to the binary. I am happy and excited to test it 😁.

As expected, it is not going to run on the first try. I got some errors; actions were not able to fetch the binary (I wrote a script for that). To solve this issue, I removed the script and placed the `Go action` step, which will directly install `Go` in the system. Then I can build a binary and execute it. It sounds simple, so the actions are as follows:

<!-- prettier-ignore-start -->
{{< code language="yaml" title="action.yml" expand="Show" collapse="Hide" isCollapsed="false" >}}
name: "Markdown Or Hugo To Medium"
description: "Push hugo markdown post to medium"

# declaring input variables for workflow
inputs:
  markdownOrHugo:
    description: "Specify is it Markdown or Hugo Markdown"
    required: true
    default: markdown
  shortcodes:
    description: "Shortcodes JSON config file location"
    required: false
  replaceHyperlinkToLink:
    description: "Replace hyperlink to link for medium cards"
    required: false
    default: false
  frontmatterFormat:
    description: "Select frontmatter format [yaml, toml]"
    required: false
    default: "yaml"
  draft:
    description: "Publish as a draft on Medium"
    required: false
    default: false

# running steps
runs:
  using: "composite"
  steps:
    - name: Install jq
      run: sudo apt-get update && sudo apt-get install -y jq
      shell: bash
    
    - name: Check out the repository to the runner
      uses: actions/checkout@v4

    - name: Setup Go 1.21.x
      uses: actions/setup-go@v4
      with:
        go-version: '1.21.x'

    - name: Install dependencies and Build
      run: | 
        cd ${{ github.action_path }} && \
        go get . && \
        go build -o HugoToMedium main.go && \
        ./HugoToMedium \
        -markdown-or-hugo=${{ inputs.markdownOrHugo }} \
        -shortcodes-config-file=${{ inputs.shortcodes }} \
        -replace-hyperlink-to-link=${{ inputs.replaceHyperlinkToLink }} \
        -frontmatter=${{ inputs.frontmatterFormat }} \
        -draft=${{ inputs.draft }}
      shell: bash

# it will be used in GitHub Marketplace next to action name
branding:
  icon: "book-open"
  color: "blue"
{{< /code >}}
<!-- prettier-ignore-end -->

This time, I thought everything looked good. But I was getting this error: `FATA[2023-09-29T11:17:24Z] repository does not exist` - it was generated from binary; it was not able to find the `.git` directory. I was using it to take the latest commit message.

The conclusion for me was that I was not going to use the `composite actions`. Now I have two options:

1. `JavaScript actions`
2. `Docker actions`

If I use `JavaScript actions`, I will have to write my logic again in JavaScript, which I have written in `Go`. So I decided to use `Docker Action`, which was easy to implement.

Just need to write `Dockerfile` and update `action.yml`.

What I learn from this mistake is that I will have to do proper planning next time 🤞.

---

Let's check out how to create custom GitHub actions. In this, I am going to create `Docker actions`, but action.yml will have an almost similar syntax.

## Creating a GitHub Action

As we are creating `Docker actions`, we need to write a `Dockerfile`. In your project root directory, create a new `Dockerfile` file. Make sure that your filename is capitalized correctly. `D` should be capitalized, as shown above. We will be writing it for my [markdown-or-hugo-to-medium](https://github.com/imrushi/markdown-or-hugo-to-medium).

<!-- prettier-ignore-start -->
{{< code language="docker" title="Dockerfile" expand="Show" collapse="Hide" isCollapsed="false" >}}
FROM golang:1.21.1-alpine3.18

RUN apk add git

COPY . /home/src

WORKDIR /home/src

RUN GOOS=linux GOARCH=amd64 go build -o HugoToMedium main.go

RUN chmod +x HugoToMedium

ENTRYPOINT [ "/home/src/HugoToMedium" ]
{{< /code >}}
<!-- prettier-ignore-end -->

What is going on in the above Dockerfile:

- We are pulling golang:1.21.1 alpine image
- Installing git because if a program is required
- Copying all the required local files into the /home/src folder of the container
- Changing Working Directory
- In this golang:1.21.1 alpine image, golang is already installed. We will use that to build out a binary for the Linux OS with the AMD64 architecture.
- Update the file permissions to execute.
- After building the image, when it runs, it should directly run the binary, so we have added the ENTRYPOINT for that.

If you want to know more about the Dockerfile instructions for GitHub Action, check out this [Document](https://docs.github.com/en/actions/creating-actions/dockerfile-support-for-github-actions#about-dockerfile-instructions).

## Creating Action File

Create a new `action.yml` file in the root directory of your project. This action file will contain what inputs we should get, what the output should be, and what it should run

There are 7 basic parameters:

- `name`\* : It will be used to display the name in the Actions tab.
- `author`: Name of the action's author.
- `description`\* : A short description of the action.
- `input`: It allows you to specify the data that the action expects to use during runtime.
  - `input.<input_id>`\* : A string identifier to associate with the input. It should be a unique identifier.
  - `description`\* : A string description of the input parameter.
  - `required`: A boolean to indicate whether the action requires the input parameter.
  - `default`: A string representing the default value.
  - `deprecationMessage`: If the input parameter is used, this string is logged as a warning message. You can use this warning to notify users that the input is deprecated and mention any alternatives.
- `output`: It allows you to declare data that an action sets. Actions that run later in a workflow can use the output data set of previously run actions.
- `runs`\*: It specifies whether this is a JavaScript action, a composite action, or a Docker container action and how the action is executed.

This is just an overview of the parameters; what are they? For more information, you can check out these parameters in detail on [GitHub Docs](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#about-yaml-syntax-for-github-actions).

Below is a sample `action.yml` for `Docker actions`:

<!-- prettier-ignore-start -->
{{< code language="yaml" title="action.yml" expand="Show" collapse="Hide" isCollapsed="false" >}}
name: "Markdown Or Hugo To Medium"
description: "Push hugo markdown post to medium"

# input variables for data that the action expects at runtime
inputs:
  markdownOrHugo:
    description: "Specify is it Markdown or Hugo Markdown"
    required: true
    default: markdown
  shortcodes:
    description: "Shortcodes JSON config file location"
    required: false
  replaceHyperlinkToLink:
    description: "Replace hyperlink to link for medium cards"
    required: false
    default: false
  frontmatterFormat:
    description: "Select frontmatter format [yaml, toml]"
    required: false
    default: "yaml"
  draft:
    description: "Publish as a draft on Medium"
    required: false
    default: false

# configuration to run action
runs:
  using: "docker"
  image: "Dockerfile"
  # passing above inputs as argument to program
  args:
    - -markdown-or-hugo=${{ inputs.markdownOrHugo }}
    - -shortcodes-config-file=${{ inputs.shortcodes }}
    - -replace-hyperlink-to-link=${{ inputs.replaceHyperlinkToLink }}
    - -frontmatter=${{ inputs.frontmatterFormat }}
    - -draft=${{ inputs.draft }}

branding:
  icon: "book-open"
  color: "blue"
{{< /code >}}
<!-- prettier-ignore-end -->

In the above `action.yml` file, I have specified `name` which will be used to show in the Actions tab. On the next line, `description` what it does. I am taking five inputs, each of which starts with a variable name where the input will be stored. For instance, `markdown-or-hugo` has its own description of what the variable is or, along with whether this variable should be `required` or optional, and also sets the `default` value to it. The same is done for the other four inputs.

In the `runs` section with `using` parameter, we specify which type of actions we are using `docker`, and we also have to configure which `image` to use. If you specify `Dockerfile` as a value, it will build a docker image and then use it. You can also directly use public Docker registry containers by specifying `docker://image-name:tag`. If your program takes arguments, you can pass them with the `args` parameter, and if you want to pass the above-taken input you can use `${{ inputs.input_variable_name }}`.

I don't want to store anything for the output variable. So, I haven't used the output parameter, but if you want to show something you can do like this:

<!-- prettier-ignore-start -->
{{< code language="yaml" title="" expand="Show" collapse="Hide" isCollapsed="false" >}}
outputs:
  output_parameter:
    description: 'This will show the output which will be set from container'
{{< /code >}}
<!-- prettier-ignore-end -->

Note that if we want to use this approach, we need to update the Dockerfile, and Entrypoint will be a shell script. From that shell script, we can set the output variable.

<!-- prettier-ignore-start -->
{{< code language="bash" title="entrypoint.sh" expand="Show" collapse="Hide" isCollapsed="false" >}}
#!/bin/sh

# Run your Go program and set GITHUB_OUTPUT
program_input=$(your_go_program)

# Set the output variable
echo "output_parameter=$program_input" >> $GITHUB_OUTPUT
{{< /code >}}
<!-- prettier-ignore-end -->

You can check out more about the output [here](https://docs.github.com/en/actions/using-jobs/defining-outputs-for-jobs).

`branding` uses icons and colors to create a badge to personalize and distinguish your action. Badges are shown next to your action name in the GitHub Marketplace. You can find the icon [here](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#omitted-icons).

Here you have written your first custom github action.

## Testing the GitHub Action

Before we publish our GitHub Action, we need to test it. It is strange that there is no way to test this GitHub action locally. I think GitHub should have provided something from which we can easily test this.

At the time of testing, I faced some problems and wasn't able to understand the [testing document](https://docs.github.com/en/actions/creating-actions/creating-a-docker-container-action#testing-out-your-action-in-a-workflow) properly. So I took the wrong way, published the action, and then tested it. Please avoid these mistakes.

There are two ways to test it:

- If your repository is public, you can test it by assigning `uses` with `<username>/<repo-name>@<branch-name>` in `steps`. With this method, you can test actions in other repositories as well. This workflow YAML should be located at `.github/workflows/filename.yml`.

<!-- prettier-ignore-start -->
{{< code language="yaml" title=".github/workflows/publish-medium.yml" expand="Show" collapse="Hide" isCollapsed="false" >}}
on: [push]

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    name: A job to say hello
    steps:
      - name: test action step
        # uses an action from given repo
        uses: imrushi/markdown-or-hugo-to-medium@main 
        with:
          markdown-or-hugo: 'hugo'
          shortcodes: "./shortcodes.json"
          replaceHyperlinkToLink: false
          frontmatterFormat: "yaml"
          draft: true
{{< /code >}}
<!-- prettier-ignore-end -->

- Second way is to test it in the current repository, you can use `./` in `uses`. `./` syntax to use an action available in the same repository. This option will work on both public and private repositories.

<!-- prettier-ignore-start -->
{{< code language="yaml" title=".github/workflows/publish-medium.yml" expand="Show" collapse="Hide" isCollapsed="false" >}}
on: [push]

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    name: A job to say hello
    steps:
      - name: test action step
        # Uses an action in the root directory
        uses: ./ 
        with:
          markdown-or-hugo: 'hugo'
          shortcodes: "./shortcodes.json"
          replaceHyperlinkToLink: false
          frontmatterFormat: "yaml"
          draft: true
{{< /code >}}
<!-- prettier-ignore-end -->

## Publishing the GitHub Action

As soon as our action has been tested, it's time to publish it. Let's see how we can do that.

To publish GitHub Action to the GitHub Marketplace, your action repository should be public. Follow the below steps to make it public:

- First, create a [git tag](https://git-scm.com/docs/git-tag) with the version as per [semver](https://semver.org/). `git tag -a v1.0.0 -m "release message"`
- Push the tag to the GitHub repo. `git push origin v1.0.0`
- On the GitHub repository, go to Releases -> Create/Draft a new release.

  - Mark with ✔️ Publish this Action to the GitHub Marketplace.
  - It also shows if the required things are done or not.
  - Select the primary category and another category.
  - Choose a tag -> select v1.0.0
  - Give Release title -> v1.0.0
  - Provide Release Notes.
  - If you want to provide any assets, drag and drop in the box.
  - If your action is not production-ready, mark ✔️ Set as a pre-release.
  - ✔️ Set as the latest release
  - If everything looks good, Hit the **Publish release** button.

Congratulations! 🎉 Your action is now available on the GitHub Marketplace!

## How to Use the GitHub Action

- Start by creating a workflow in the .github/workflows directory of your repository (or create the directory if it doesn't exist).
- Create a YAML file (e.g., main.yml) to define your workflow. Here's an example of a workflow that uses the "Markdown Or Hugo To Medium" action

<!-- prettier-ignore-start -->
{{< code language="yaml" title="main.yml" expand="Show" collapse="Hide" isCollapsed="false" >}}
on:
  push:
    branches:
      - main

jobs:
  publish-to-medium:
    runs-on: ubuntu-latest
    env:
      POST_DIR: "content/posts"
      ACCESS_TOKEN: ${{ secrets.MEDIUM_ACCESS_TOKEN }}
    steps:
      - name: Checkout Code
        uses: actions/checkout@v2

      # using published GitHub Actions
      - name: Markdown Or Hugo To Medium
        uses: imrushi/markdown-or-hugo-to-medium@v1.0.0
        # providing inputs to the actions
        with:
          markdownOrHugo: "hugo"
          shortcodes: "./shortcodes.json"
          replaceHyperlinkToLink: false
          frontmatterFormat: "yaml"
          draft: true
{{< /code >}}
<!-- prettier-ignore-end -->

This workflow is configured to run when changes are pushed to the main branch. It checks out your code, and then it uses the "Markdown Or Hugo To Medium" action, passing the necessary inputs as specified in the with section.

- Commit this workflow YAML file to your repository.
- Your workflow will now be automatically triggered when you push changes to the main branch.

That's it! You've successfully created, published, and used your custom GitHub Action.

## Conclusion

In this blog post, we saw how to create a GitHub action using Docker containers. It covers how to prepare and use a Dockerfile and action.yml for GitHub actions.

This blog is about my experience, the mistakes I have made while creating my first GitHub action. I will be creating more GitHub actions for my use cases. You can check them out on my GitHub profile here.

I hope this blog will help you in making your first GitHub action. If you have any questions, please let me know in the comment section. If you find anything new in this blog, share it with others, and if you find any mistakes in it, please let me know and help me make it better. I will definitely fix it.

Thanks for reading! 😊

[^1]: "Runner" refers to a virtual machine or container environment where your GitHub Action workflows are executed.
