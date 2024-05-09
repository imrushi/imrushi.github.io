---
title: "RPi Home Server"
date: "2024-05-07T09:57:04+05:30"
author: ""
authorTwitter: "" #do not include @
cover: ""
tags: ["", ""]
keywords: ["", ""]
description: ""
showFullContent: false
readingTime: true
draft: true
hideComments: false
color: "" #color from the theme settings
---

I have done project on raspberry pi in my college. Since then my raspberry pi was laying in box. I had idea to create FPV Drone from it which I am still planning to do 😅. Until work on that I was thinking to create Mini Server (which i was inspired by seeing rpi stack server photo on twitter/X.).

I was planning to make something like where I can do following things:

- Store documents, codes(unfinished or WIP), videos, photos
- Stream Movies & TV shows
- Block Ads, Trackers & Malware's over network
- Access all these over internet

## Raspberry Pi 4 Model B Specs:

- 2GB RAM
- 128GB SD Card
- 15W USB-C Power Supply
- 1.8GHz Quad Core Processor

I know specs are low but it get works done for now. In future I will upgrading to RPi 5 and connect an SSD.

I am running Debain GNU/Linux 12 (bookworm) OS along with docker.

## Application Setups:

### CasaOS:

| Website                                          | Source                                           | Category | Similar Apps |
| ------------------------------------------------ | ------------------------------------------------ | -------- | ------------ |
| [CasaOS](https://github.com/IceWhaleTech/CasaOS) | [GitHub](https://github.com/IceWhaleTech/CasaOS) | cloud os | -            |

Casa OS is an open-source project that creates a personal cloud experience. It provides a web-based interface for managing your personal cloud and applications. It is setup and install with single command. Casa OS uses Docker containers to run applications. It has app store which has lots of apps. And they are easy to manage through UI. Also provides a cli access of RPi over web. I really like its design, easy of setup and installation of apps. It dashboard gives monitoring option of CPU, Memory, Disk, Network, etc.

[Demo](http://demo.casaos.io/)
username - casaos
password - casaos

### NextCloud

| Website                             | Source                                        | Category | Similar Apps |
| ----------------------------------- | --------------------------------------------- | -------- | ------------ |
| [Nextcloud](https://nextcloud.com/) | [GitHub](https://github.com/nextcloud/server) | storage  | Google Drive |
