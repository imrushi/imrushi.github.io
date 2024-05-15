---
title: "RPi Home Server"
date: "2024-05-07T09:57:04+05:30"
author: "Rushi Panchariya"
authorTwitter: "RushiPanchariya" #do not include @
cover: ""
tags: ["RPi", "home-server", "streaming"]
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
| [Nextcloud](https://nextcloud.com/) | [GitHub](https://github.com/nextcloud/server) | storage  | -            |

Nextcloud is an open source cloud server. I am using it for storing my documents and files. My other online storage service is also getting full. This is the best alternative for that. It works good and get the works done but it lags sometimes (i think because of my low resources). I am thinking to install [NextcloudPi](https://github.com/nextcloud/nextcloudpi) which i think is a lightweight version of Nextcloud.

### Immich

| Website                       | Source                                        | Category | Similar Apps |
| ----------------------------- | --------------------------------------------- | -------- | ------------ |
| [Immich](https://immich.app/) | [GitHub](https://github.com/nextcloud/server) | storage  | -            |

Immich is a promising self-hosted alternative to **_App-Which-Must-Not-Be-Named_**, particularly for users who value privacy and control over their data. It is an open-source app. It has a client application of Android and Ios. That allows users to share photos with friends and family. I am using it for storing my photos and videos. Immich offers features similar to **_App-Which-Must-Not-Be-Named_**, including photo organization, face recognition, mobile app, and sharing options. Immich is under active development, so some features might be less polished compared to **_App-Which-Must-Not-Be-Named_**. It works good and get the works done.

Check out the [comparison between Immich and various OpenSource Photo Libraries.](https://meichthys.github.io/foss_photo_libraries/)

### AdGuard

| Website                                               | Source                                               | Category | Similar Apps |
| ----------------------------------------------------- | ---------------------------------------------------- | -------- | ------------ |
| [AdGuard](https://github.com/AdguardTeam/AdGuardHome) | [GitHub](https://github.com/AdguardTeam/AdGuardHome) | privacy  | Pi-Hole      |

I have been using the uBlock origin in browser for a long time. But it only secure block the ads in my browser. I want solution that block the Ads over my network. AdGuard is a free and open-source privacy blocker that blocks ads, trackers and malware. There is many options to filter the ads, trackers and malware:

- DNS Blocklist :- Below is Blocklist which i am using:
  - AdGuard DNS filter :- https://adguardteam.github.io/HostlistsRegistry/assets/filter_1.txt
  - AdAway Default Blocklist :- https://adguardteam.github.io/HostlistsRegistry/assets/filter_2.txt
  - HaGeZi's Pro Blocklist :- https://adguardteam.github.io/HostlistsRegistry/assets/filter_48.txt
  - OISD Blocklist Big :- https://adguardteam.github.io/HostlistsRegistry/assets/filter_27.txt
  - Easylist :- https://easylist.to/easylist/easylist.txt
  - uBlock Filter :- https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt
- DNS Allowlist
- DNS Rewrite
- Blocked Services
- Custom Filterling Rules

Above list is easy maintain if there are any update to block list. It can be updated in one click.

I have configured my router to use Raspberry Pi as the primary DNS server. So I can extend the AdGuard's protection to all devices on my network. This way, every device benefits from an ad-free and secure browsing experience.

---

Now its time for best part, which is the setup of Movies and Tv Show streaming over network. I am using the Torrent to download movies and tv shows.

For this setup group of applications are deployed and its interconnection between those apps are done. First I will give information about the each application and then I will explain how to setup it.

### Jackett

| Website                                       | Source                                       | Category | Similar Apps |
| --------------------------------------------- | -------------------------------------------- | -------- | ------------ |
| [Jackett](https://github.com/Jackett/Jackett) | [GitHub](https://github.com/Jackett/Jackett) | torrent  | -            |

Jackett is an open-source application that acts as a middleman between your favorite torrent downloader and various torrent indexing websites. Jackett allows you to search across a vast array of indexing sites from a single, user-friendly interface. Jackett integrates seamlessly with popular torrent downloaders like Sonarr, Radarr, qBittorrent, and many more. This eliminates the need to configure individual search settings for each downloader.

Jackett acts as a proxy server. When anyone initiate a search through your compatible downloader, Jackett translates the request into a format understandable by the specific torrent indexing site. It then fetches the results, parses them, and delivers them back to your downloader in a standardized format.

I mostly use below to indexer for searching on torrents:

- YTS :- [https://yts.mx/](https://yts.mx/)
- TheRARBG :- [https://therarbg.to/](https://therarbg.to/)

> **_Note_**: It's important to remember that Jackett itself is a legal tool. However, the legality of the content you download using Jackett depends on the copyright laws in your region and the specific content itself. Always ensure you're downloading content that is legally available in your area.

### Radarr

| Website                         | Source                                     | Category | Similar Apps |
| ------------------------------- | ------------------------------------------ | -------- | ------------ |
| [Radarr](https://radarr.video/) | [GitHub](https://github.com/Radarr/Radarr) | torrent  | Sonarr       |

If you're a movie buff who relies on BitTorrent to build your collection, then Radarr is your new best friend. This is open-source software automates the process of finding, downloading, and organizing your movie library and keeps your collection up-to-date. Tell Radarr which movies you want (and in what quality), and it scours the web using your Jackett indexers. Once it finds a match, Radarr automatically downloads the movie for you. We can add upcoming movies to Radarr watchlist, and it will automatically download them on their release date or whenever they become available on your chosen indexers.

### Plex

| Website                      | Source                                          | Category | Similar Apps |
| ---------------------------- | ----------------------------------------------- | -------- | ------------ |
| [Plex](https://www.plex.tv/) | [GitHub](https://github.com/plexinc/pms-docker) | torrent  | -            |

Plex is a media server application that lets you stream your own collection of movies, Tv shows, music and photos to various devices. It's kind of personal stream services **_Service-Which-Must-Not-Be-Named_**, but with complete control over your content and how you access it. It centralizes your media collection, offers flexible streaming options, and provides a user-friendly interface for various devices. Add your movies, TV shows, music, and photos to a server (computer, NAS) running the Plex Media Server software. Then, access that content from any Plex app on various devices like smartphones, tablets, smart TVs, game consoles, and even streaming devices.

### Overseerr

| Website                             | Source                                     | Category | Similar Apps |
| ----------------------------------- | ------------------------------------------ | -------- | ------------ |
| [Overseerr](https://overseerr.dev/) | [GitHub](https://github.com/sct/overseerr) | torrent  | -            |

Overseerr is an open-source software application designed to simplify Movie and TV show requests within your Plex media server setup. It integrates seamlessly with Plex, Sonarr (for TV shows), and Radarr (for movies), creating a centralized hub for managing user requests. It provides a user-friendly interface for your Plex users to request movies and TV shows they'd like to see added to your library. They can browse through suggestions, search for specific titles, and submit requests with a few clicks.

### Transmission

| Website                                     | Source                                                 | Category | Similar Apps |
| ------------------------------------------- | ------------------------------------------------------ | -------- | ------------ |
| [Transmission](https://transmissionbt.com/) | [GitHub](https://github.com/transmission/transmission) | torrent  | -            |

Transmission is an open-source BitTorrent client, known for its simplicity, speed, and cross-platform compatibility. It allows us to download files from the BitTorrent network, a decentralized peer-to-peer file sharing system.s

## Working of Streaming Setup

Above we saw the information about all the components I used. Now we will see its connectivity.

{{< image src="https://ik.imagekit.io/ruship/RPi-Home-Server/streaming-setup.svg" alt="pat api" position="center" style="border-radius: 8px;" caption="Pass-by-value" captionPosition="center">}}

- Movie or TV shows request will come to Radarr with some parameters like quality, tag etc.
- Radarr will search for the Movie/Tv show with Jackett torrent indexer and it will fetch torrent information.
- Once Radarr got the torrent information it send it to Transmission to download it and monitor the torrent if its download is complete.
- After Transmission completed the download on specific path.
- Radarr will move the downloaded content to Plex content directory.
- Now content should be accessible on Plex to stream.

> **Note**: Sometime some of the TV shows will not be downloaded through Radarr for that use Sonarr.

---

I am thinking to change the streaming setup of my home server by replacing:

- Plex => [Jellyfin](https://github.com/jellyfin/jellyfin)
- Overseerr => [Jellyseer](https://github.com/Fallenbagel/jellyseerr)

As I have 2 GB RAM I can't run all this at same time. For that I am not running more resourceful service like Immitch. I run the service when i have to take back up periodically.

In future I might upgrade my raspberry pi to raspberry pi 5 with 8 GB of RAM and attach an SSD to it.

This is my setup for Raspberry Pi Home Server. If change anything or add more components I will update in next post.
