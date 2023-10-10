---
title: "System Design"
date: 2023-08-24
draft: false
toc: true
author: "Rushi Panchariya"
tags: ["system design", "notes"]
keywords: ["programming", "system design", "database", "scaling"]
categories: ["System Design"]
enableGitInfo: true
showLastUpdated: true
---

---

## Scale From Zero To Millions of Users

In this we will see that system that support single user and gradually scale it up to serve millions of users.

### Single Server Setup

Whatever we are developing/building alway start with a single basic step and this also goes same for complex systems. To start with something single, we will be running everything on a single server. below is figure of single server setup where it will be running: web, app, database, cache, etc.

{{< figure src="/img/notes/system-design/simple-web-server.png" alt="Single Server Setup" position="center" style="border-radius: 8px;" caption="Single Web Server Working" captionPosition="center" >}}
