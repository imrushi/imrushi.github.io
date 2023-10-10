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

**TL;DR** If you want start Creating GitHub Action without backstory head over to [Creating a GitHub Action](#creating-a-github-action) section.

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
- Program will handle everything and post content to Medium

But when I have written everything for actions. Program working as expected and passing unit test cases. I thought it will be now just create `action.yml` with `composite action` and take all inputs and pass it to binary. I am happy and excited to test it 😁.

As expected it is not going to run on first try. I got some errors; actions were not able to fetch the binary (I have written script for that). To solve this issue I have removed the script and place the `Go action` which will directly install `Go` in system then I can build binary and execute it. It sounds simple so written below actions:

<!-- prettier-ignore-start -->
{{< code language="yaml" title="action.yml" expand="Show" collapse="Hide" isCollapsed="false" >}}
name: "Markdown Or Hugo To Medium"
description: "Push hugo markdown post to medium"

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

branding:
  icon: "book-open"
  color: "blue"
{{< /code >}}
<!-- prettier-ignore-end -->

This time I thought everything looks good. But I was getting this error `FATA[2023-09-29T11:17:24Z] repository does not exist`. This error was generating from binary because it is not able to find `.git` directory because I was using it to take latest commit message.

Conclusion for me was I am not going to use the `composite actions`. Now I have two option:

1. `JavaScript actions`
2. `Docker actions`

If I use `JavaScript actions` I will have to write my logic again in JavaScript which I have written in `Go`. So I decided to use `Docker action` which was easy to implement.

Just need to write `Dockerfile` and update `action.yml`.

What I learn form this mistake is that I will have to do proper planning next time 🤞.

---

Let check how to create custom GitHub Actions. In this I am going to create `Docker actions` but action.yml will have the almost similar syntax.

## Creating a GitHub Action

As we are creating `Docker actions` we need to write `Dockerfile`. In your projects root directory, create a new `Dockerfile` file. Make sure that your filename is capitalized correctly `D` should be capital like shown above. We will be writing `Dockerfile` for my [markdown-or-hugo-to-medium](https://github.com/imrushi/markdown-or-hugo-to-medium).

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

What is going on in above Dockerfile:

- We are pulling golang:1.21.1 alpine image
- Installing git because if program required
- Copying all the required local file in to /home/src folder of container
- Changing Working Directory
- In this golang:1.21.1 alpine image golang is already installed. We will use that to build out binary for linux OS with amd64 architecture.
- Update the file permission to execute.
- After building image when it runs it should directly run the binary so we have added the ENTRYPOINT for that.

If you want to know more about the Dockerfile instructions for GitHub Action check this [Document](https://docs.github.com/en/actions/creating-actions/dockerfile-support-for-github-actions#about-dockerfile-instructions).

## Creating Action File

Create a new `action.yml` file in the root directory of your project. This action file will contains what inputs should we get, what should be the output and what it should run.

There are 7 basic parameters:

- `name`\* : It will be used to display the name in the Actions tab.
- `author`: Name of the action's author.
- `description`\* : A short description of the action.
- `input`: It allow you to specify data that the action expects to use during runtime.
  - `input.<input_id>`\* : A string identifier to associate with the input. It should be unique identifier.
  - `description`\* : A string description of the input parameter.
  - `required`: A boolean to indicate whether the action requires the input parameter.
  - `default`: A string representing the default value.
  - `deprecationMessage`: If the input parameter is used, this string is logged as a warning message. You can use this warning to notify users that the input is deprecated and mention any alternatives.
- `output`: It allows you to declare data that an action sets. Actions that run later in a workflow can use the output data set in previously run actions.
- `runs`\*: It specifies whether this is a JavaScript action, a composite action, or a Docker container action and how the action is executed.

This just overview of the parameter what are they for you can check these parameters in details on [GitHub Docs](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#about-yaml-syntax-for-github-actions).

Below is sample `action.yml` for `Docker actions`:

<!-- prettier-ignore-start -->
{{< code language="yaml" title="action.yml" expand="Show" collapse="Hide" isCollapsed="false" >}}
name: "Markdown Or Hugo To Medium"
description: "Push hugo markdown post to medium"

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

runs:
  using: "docker"
  image: "Dockerfile"
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

In above `action.yml` file I have specified `name` which will be used to show in Actions tab. On next line short `description` what it does. I am taking five inputs each where each on starts with variable name where input will be stored. For instance `markdown-or-hugo` and it has own description what is variable for along with if this variable should be `required` or optional and also set the `default` value to it. Same done for other four inputs.

In `runs` section with `using` parameters we specifies which type of actions we are using in this using `docker` and we also have to configure which `image` to use if you specify `Dockerfile` as value it will build docker image and then use it. You can also directly use public Docker registry containers by specifying `docker://image-name:tag`. If your program takes arguments you can pass it with `args` parameter and if you want to pass the above taken input you can use `${{ inputs.input_variable_name }}`.

I don't want to store anything for output variable. So, I haven't used the output parameter but if you want to show something you can do something like this:

<!-- prettier-ignore-start -->
{{< code language="yaml" title="" expand="Show" collapse="Hide" isCollapsed="false" >}}
outputs:
  output_parameter:
    description: 'This will show the output which will be set from container'
{{< /code >}}
<!-- prettier-ignore-end -->

Note that if we want to use this approach we need to update Dockerfile and Entrypoint will be shell script from that shell script we can set output variable.

<!-- prettier-ignore-start -->
{{< code language="bash" title="entrypoint.sh" expand="Show" collapse="Hide" isCollapsed="false" >}}
#!/bin/sh

# Run your Go program and set GITHUB_OUTPUT
program_input=$(your_go_program)

# Set the output variable
echo "output_parameter=$program_input" >> $GITHUB_OUTPUT
{{< /code >}}
<!-- prettier-ignore-end -->

you can checkout more about output [here](https://docs.github.com/en/actions/using-jobs/defining-outputs-for-jobs).

`branding` uses icon and color to create a badge to personalize and distinguish your action. Badges are shown next to your action name in GitHub Marketplace. You can find icon [here](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#omitted-icons).

Here you have written you first custom github action.

## Testing the GitHub Action

Before we publish our GitHub Action we need to test it first. It is strange there is no way to test this GitHub action I think GitHub should have provide something from which we can easily test this.

At the time of testing faced some problem I am not able to understand [testing document](https://docs.github.com/en/actions/creating-actions/creating-a-docker-container-action#testing-out-your-action-in-a-workflow) properly. So I took wrong way I have published the action and then tested. Please avoid this mistakes.

There are the two ways to test it:

- If your repository public you can test it by assign `uses` with `<username>/<repo-name>@<branch-name>` in `steps`. with this method you can test action in other repositories also. This workflow YAML should be located at `.github/workflows/filename.yml`

<!-- prettier-ignore-start -->
{{< code language="yaml" title=".github/workflows/publish-medium.yml" expand="Show" collapse="Hide" isCollapsed="false" >}}
on: [push]

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    name: A job to say hello
    steps:
      - name: test action step
        uses: imrushi/markdown-or-hugo-to-medium@main # uses an action from given repo
        with:
          markdown-or-hugo: 'hugo'
          shortcodes: "./shortcodes.json"
          replaceHyperlinkToLink: false
          frontmatterFormat: "yaml"
          draft: true
{{< /code >}}
<!-- prettier-ignore-end -->

- If you want to test it in current repository you can use `./` in `uses`. `./` syntax to use an action available in the same repository. This option will works on both public and private repository.

<!-- prettier-ignore-start -->
{{< code language="yaml" title=".github/workflows/publish-medium.yml" expand="Show" collapse="Hide" isCollapsed="false" >}}
on: [push]

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    name: A job to say hello
    steps:
      - name: test action step
        uses: ./ # Uses an action in the root directory
        with:
          markdown-or-hugo: 'hugo'
          shortcodes: "./shortcodes.json"
          replaceHyperlinkToLink: false
          frontmatterFormat: "yaml"
          draft: true
{{< /code >}}
<!-- prettier-ignore-end -->

Once you satisfied with you testing. It is time for deploy.

## Publishing the GitHub Action

To publish GitHub Action to GitHub Marketplace your action repository should be public. Follow below steps to make it public:

- First create [git tag](https://git-scm.com/docs/git-tag) with version as per [semver](https://semver.org/). `git tag -a v1.0.0 -m "release message"`
- Push tag to GitHub repo. `git push origin v1.0.0`
- On GitHub Repository go to Releases -> Create/Draft a new release

  - Mark with ✔️ Publish this Action to the GitHub Marketplace
  - It also show required things are done or not
  - Select Primary category and Another Category
  - Choose a tag -> select v1.0.0
  - Give Release title -> v1.0.0
  - Provide Release Notes
  - If you want to provide any assets drag and drop in box
  - If your action is not production ready mark ✔️ Set as a pre-release
  - ✔️ Set as the latest release
  - If everything looks good Hit **Publish release** button.

Congratulations your action is now available in GitHub Marketplace!

[^1]: "Runner" refers to a virtual machine or container environment where your GitHub Action workflows are executed.
