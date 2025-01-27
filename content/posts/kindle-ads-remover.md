---
title: "Ads on My Kindle? Not on My Watch!"
date: "2025-01-27T15:11:59Z"
author: "Rushi Panchariya"
authorTwitter: "RushiPanchariya" #do not include @
cover: "https://ik.imagekit.io/ruship/kindle-remove-ads.png?tr=w-540,h-500"
tags: [
  "Kindle",
  "RPi",
  "Bash",
]
keywords: [
  "Kindle ad removal",
  "Kindle ads",
  "block Kindle ads",
  "Kindle hacks",
  "remove ads from Kindle",
  "Kindle AdRemover",
  "Git Bash Kindle",
  "Kindle system directory",
  "Raspberry Pi Kindle connection",
  "PowerShell script Kindle",
  "Linux Kindle troubleshooting",
  "Kindle update ads",
  "ad-free Kindle",
  "Kindle 12th gen ads",
  "Kindle storage issue",
  "manual ad removal Kindle",
  "KindleAdRemover",
  "DIY solutions",
  "funny tech stories",
]
description: "Tired of intrusive ads on your Kindle? In this post, I share my step-by-step adventure of removing ads from my Kindle using simple scripts and a bit of tech wizardry. Join me in this fun (and slightly frustrating) journey to enjoy an ad-free reading experience!"
showFullContent: false
readingTime: true
draft: false
hideComments: false
color: "" #color from the theme settings
---

Today, while exploring the settings on my Kindle. To my surprise, there was a software update available. I was connected to Wi-Fi (I usually keep it in Airplane mode). After updating, I noticed an annoying change — my Kindle's lock screen was suddenly flooded with ads.

## I hate Ads

If you've read my previous posts, you know I have AdGuard installed to block ads because **no one loves ads.** I've already paid a lot for my Kindle, so why should I pay extra to remove ads?  

When I purchased my Kindle in Germany, there were two versions available: one with ads and one without. The ad-free version cost an additional 10 Euros, but I decided not to spend the extra money — I’d rather buy coffee or chocolates instead! At the time, I thought there might be a workaround to remove the ads, and since they didn’t show up initially, I ignored the issue.  

However, after installing today’s Kindle update, ads started showing up on the lock screen. They were bright and intrusive, completely ruining the experience ☹️.  

I initially considered adding the ad servers’ DNS to AdGuard but wanted a permanent solution.

## Kindle Ad Remover

After a bit of Googling, I found a GitHub repository called [KindleAdRemover](https://github.com/mariopepe/KindleAdRemover). According to the README, the process might require a Mac, which I have, but it's an office device, so I couldn’t use it for this purpose. Thankfully, the repo also provided a shell script, and I decided to give that a try.

The shell script was straightforward. It checked if the Kindle was connected and detected. Once detected, it navigated to the Kindle's `system` directory, deleted the `.assets` folder, and replaced it with an empty `.assets` file.

Following the instructions, I connected my Kindle to my Raspberry Pi.

> Life won't be easy/fun without Issue - this the one thing I've learned.

## Issue: Connecting Kindle with Linux
When I connected my Kindle to the Raspberry Pi, it appeared in `lsusb`, but the storage wasn’t mounting. I checked with `fdisk -l`, but no storage device was listed. Even `dmesg | tail` showed Kindle-related information but no mount path.

I suspect the issue lies with the latest Kindle (12th generation) update. The same problem occurred when I tried connecting it to a Mac (My Friends Macbook 😏).

> I’ll look into this issue further and try to fix it.

## Mission: Kill the Ads
Determined to get rid of the ads, I found a `PowerShell` script in the repository. I connected my Kindle to a Windows PC and saw the storage appear in File Explorer. Inside the `system` directory, I located the `.assets` folder.

Rather than deleting it manually, I tried running the `PowerShell` script, but it didn’t work. Instead, I used `Git Bash` to manually execute the required steps:

1. Navigated to the `.assets` directory inside the `system` folder.
2. Opened `Git Bash` in the Kindle storage directory.
3. Deleted the `.assets` folder using:
```bash
$ rm -r system/.assets
```
4. Created an empty .assets file using:
```bash
$ touch system/.assets
```
5. Disconnect Kindle.

After locking and unlocking the Kindle, all the ads were gone, and a nice wallpaper appeared instead.

>Note: These steps will need to be repeated after every software update, as updates revert the changes.

Now, my mind can fully enjoy reading without being distracted by ads! 😉