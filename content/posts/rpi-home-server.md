---
title: "RPi Home Server"
date: "2024-05-16T15:04:04+05:30"
author: "Rushi Panchariya"
authorTwitter: "RushiPanchariya" #do not include @
cover: "https://ik.imagekit.io/ruship/RPi-Home-Server/cover.jpg?tr=w-500,h-350"
tags:
  [
    "RPi",
    "HomeServerSetup",
    "MediaStreaming",
    "TorrentManagement",
    "NetworkSecurity",
    "cloud",
  ]
keywords:
  [
    "raspberry pi setup",
    "raspberry pi home server",
    "media streaming",
    "network security",
    "rpi docker applications",
    "plex alternative",
    "jellyfin",
    "diy home server",
    "self-hosted services",
    "personal cloud storage",
    "tailscale",
    "wireguard vpn",
    "immitch",
    "open-source software",
    "raspberry pi projects",
    "casaos",
    "adguard",
  ]
description: "Dive into the intricate setup of a Raspberry Pi Home Server, showcasing storage solutions, media streaming capabilities, torrent management, and secure network access. Discover how to optimize resources, manage services, and plan for future upgrades to enhance your home server experience."
showFullContent: false
readingTime: true
draft: false
hideComments: false
color: "" #color from the theme settings
---

I did a project on the Raspberry Pi in college. Since then, my Raspberry Pi has been lying in a box. I had the idea to create an FPV drone from it, which I am still planning to do 😅. Until I work on that, I'm thinking of creating a mini server (which I was inspired to do after seeing a RPi stack server photo on Twitter/X).

I was planning to make something like the following:

- Store documents, codes (unfinished or WIP), videos, and photos.
- Stream Movies and TV Shows
- Block ads, trackers, and malware over the network.
- Access all these over the internet

## Raspberry Pi 4 Model B Specs:

- 2GB RAM
- 128GB SD Card
- 15W USB-C Power Supply
- 1.8GHz Quad Core Processor

I know the specs are low, but they get the job done for now. In the future, I will upgrade to RPi 5 and connect an SSD.

I am running Debian GNU/Linux 12 (Bookworm) OS along with Docker.

## Application Setups:

### CasaOS:

| Website                                          | Source                                           | Category | Similar Apps |
| ------------------------------------------------ | ------------------------------------------------ | -------- | ------------ |
| [CasaOS](https://github.com/IceWhaleTech/CasaOS) | [GitHub](https://github.com/IceWhaleTech/CasaOS) | cloud os | -            |

Casa OS is an open-source project that creates a personal cloud experience. It provides a web-based interface for managing your personal cloud and applications. It is set up and installed with a single command. Casa OS uses Docker containers to run applications. It has an app store with lots of apps that are easy to manage through the UI. It also provides CLI access to the RPi over the web. I really like its design, ease of setup, and installation of apps. Its dashboard offers monitoring options for CPU, Memory, Disk, Network, etc.

[Demo](http://demo.casaos.io/)

username - casaos

password - casaos

### NextCloud

| Website                             | Source                                        | Category | Similar Apps |
| ----------------------------------- | --------------------------------------------- | -------- | ------------ |
| [Nextcloud](https://nextcloud.com/) | [GitHub](https://github.com/nextcloud/server) | storage  | -            |

Nextcloud is an open-source cloud server. I am using it for storing my documents and files. My other online storage service is also getting full. This is the best alternative for that. It works well and gets the job done, but it lags sometimes (I think because of my low resources). I am thinking of installing [NextcloudPi](https://github.com/nextcloud/nextcloudpi), which I think is a lightweight version of Nextcloud.

### Immich

| Website                       | Source                                        | Category | Similar Apps |
| ----------------------------- | --------------------------------------------- | -------- | ------------ |
| [Immich](https://immich.app/) | [GitHub](https://github.com/nextcloud/server) | storage  | -            |

Immich is a promising self-hosted alternative to **_App-Which-Must-Not-Be-Named_**, particularly for users who value privacy and control over their data. It is an open-source app with client applications available for Android and iOS, allowing users to share photos with friends and family. I am using it for storing my photos and videos. Immich offers features similar to **_App-Which-Must-Not-Be-Named_**, including photo organization, face recognition, mobile app, and sharing options. However, since Immich is under active development, some features might be less polished compared to **_App-Which-Must-Not-Be-Named_**. Nonetheless, it works well and gets the job done.

Check out the [comparison between Immich and various OpenSource Photo Libraries.](https://meichthys.github.io/foss_photo_libraries/)

### Syncthing

| Website                             | Source                                           | Category | Similar Apps |
| ----------------------------------- | ------------------------------------------------ | -------- | ------------ |
| [Syncthing](https://syncthing.net/) | [GitHub](https://github.com/syncthing/syncthing) | storage  | -            |

Syncthing is an open-source file synchronization application that keeps our data consistent across multiple devices. It offers real-time updates, multi-device compatibility, and efficient file management.

I have been using Syncthing for syncing the projects which I am working on my PC. While I know there is GitHub to push the project, I prefer not to push buggy code or unfinished features. Syncthing makes it easy to access the code on the RPi from anywhere.

### AdGuard

| Website                                               | Source                                               | Category | Similar Apps |
| ----------------------------------------------------- | ---------------------------------------------------- | -------- | ------------ |
| [AdGuard](https://github.com/AdguardTeam/AdGuardHome) | [GitHub](https://github.com/AdguardTeam/AdGuardHome) | privacy  | Pi-Hole      |

I have been using uBlock Origin in the browser for a long time, but it only securely blocks ads in my browser. I wanted a solution that blocks ads over my entire network. AdGuard is a free and open-source privacy blocker that blocks ads, trackers, and malware. There are many options to filter ads, trackers, and malware:

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

This list is easy to maintain if there are any updates to the block list. It can be updated with just one click.

I have configured my router to use the Raspberry Pi as the primary DNS server, allowing me to extend AdGuard's protection to all devices on my network. This way, every device benefits from an ad-free and secure browsing experience.

---

Now it's time for the best part, setting up Movies and TV Show streaming over the network. I'm using Torrents to download movies and TV shows.

For this setup, a group of applications are deployed and interconnected. First, I'll provide information about each application, and then I'll explain how to set it up.

### Jackett

| Website                                       | Source                                       | Category | Similar Apps |
| --------------------------------------------- | -------------------------------------------- | -------- | ------------ |
| [Jackett](https://github.com/Jackett/Jackett) | [GitHub](https://github.com/Jackett/Jackett) | torrent  | -            |

Jackett is an open-source application that acts as a middleman between your favorite torrent downloader and various torrent indexing websites. It allows you to search across a vast array of indexing sites from a single, user-friendly interface. Jackett seamlessly integrates with popular torrent downloaders like Sonarr, Radarr, qBittorrent, and many more, eliminating the need to configure individual search settings for each downloader.

Jackett acts as a proxy server. When anyone initiates a search through your compatible downloader, Jackett translates the request into a format understandable by the specific torrent indexing site. It then fetches the results, parses them, and delivers them back to your downloader in a standardized format.

I mostly use the following indexers for searching torrents:

- YTS :- [https://yts.mx/](https://yts.mx/)
- TheRARBG :- [https://therarbg.to/](https://therarbg.to/)

> **_Note_**: It's important to remember that Jackett itself is a legal tool. However, the legality of the content you download using Jackett depends on the copyright laws in your region and the specific content itself. Always ensure you're downloading content that is legally available in your area.

### Radarr

| Website                         | Source                                     | Category | Similar Apps |
| ------------------------------- | ------------------------------------------ | -------- | ------------ |
| [Radarr](https://radarr.video/) | [GitHub](https://github.com/Radarr/Radarr) | torrent  | Sonarr       |

If you're a movie buff who relies on BitTorrent to build your collection, then Radarr is your new best friend. This open-source software automates the process of finding, downloading, and organizing your movie library and keeps your collection up-to-date. Tell Radarr which movies you want (and in what quality), and it scours the web using your Jackett indexers. Once it finds a match, Radarr automatically downloads the movie for you. You can add upcoming movies to Radarr's watchlist, and it will automatically download them on their release date or whenever they become available on your chosen indexers.

### Plex

| Website                      | Source                                          | Category | Similar Apps |
| ---------------------------- | ----------------------------------------------- | -------- | ------------ |
| [Plex](https://www.plex.tv/) | [GitHub](https://github.com/plexinc/pms-docker) | torrent  | -            |

Plex is a media server application that lets you stream your own collection of movies, TV shows, music, and photos to various devices. It's like a personal streaming service, but with complete control over your content and how you access it. Plex centralizes your media collection, offers flexible streaming options, and provides a user-friendly interface for various devices. Add your movies, TV shows, music, and photos to a server (computer, NAS) running the Plex Media Server software. Then, access that content from any Plex app on various devices like smartphones, tablets, smart TVs, game consoles, and even streaming devices.

### Overseerr

| Website                             | Source                                     | Category | Similar Apps |
| ----------------------------------- | ------------------------------------------ | -------- | ------------ |
| [Overseerr](https://overseerr.dev/) | [GitHub](https://github.com/sct/overseerr) | torrent  | -            |

Overseerr is an open-source software application designed to simplify Movie and TV show requests within your Plex media server setup. It integrates seamlessly with Plex, Sonarr (for TV shows), and Radarr (for movies), creating a centralized hub for managing user requests. It provides a user-friendly interface for your Plex users to request movies and TV shows they'd like to see added to your library. They can browse through suggestions, search for specific titles, and submit requests with a few clicks.

### Transmission

| Website                                     | Source                                                 | Category | Similar Apps |
| ------------------------------------------- | ------------------------------------------------------ | -------- | ------------ |
| [Transmission](https://transmissionbt.com/) | [GitHub](https://github.com/transmission/transmission) | torrent  | -            |

Transmission is an open-source BitTorrent client, known for its simplicity, speed, and cross-platform compatibility. It allows us to download files from the BitTorrent network, a decentralized peer-to-peer file-sharing system.

## Working of Streaming Setup

After reviewing the information about all the components I used, let's delve into their connectivity.

{{< image src="https://ik.imagekit.io/ruship/RPi-Home-Server/streaming-setup.svg" alt="pat api" position="center" style="border-radius: 8px;" caption="Pass-by-value" captionPosition="center">}}

- Movie or TV show requests will come to Radarr with parameters like quality, tags, etc.
- Radarr will search for the Movie/TV show using the Jackett torrent indexer and fetch torrent information.
- Once Radarr obtains the torrent information, it sends it to Transmission for downloading and monitors the torrent's download progress.
- After Transmission completes the download, it saves the content to a specific path.
- Radarr then moves the downloaded content to the Plex content directory.
- The content is now accessible on Plex for streaming.

> **Note**: Sometimes, certain TV shows will not be downloaded through Radarr; in such cases, use Sonarr.

---

To securely access my home network over the internet, I am using VPN.

Initially, I set up the WireGuard VPN with DDNS. However, due to my ISP's use of [CGNAT](https://en.wikipedia.org/wiki/Carrier-grade_NAT), I was unable to access the internet.

Then, I learned about Tailscale from a friend.

### Tailscale

| Website                             | Source                                           | Category | Similar Apps |
| ----------------------------------- | ------------------------------------------------ | -------- | ------------ |
| [Tailscale](https://tailscale.com/) | [GitHub](https://github.com/tailscale/tailscale) | VPN      | -            |

Tailscale is a peer-to-peer VPN service designed to make your devices and applications accessible securely from anywhere in the world. It also utilizes WireGuard VPN in the backend. Tailscale employs a mesh network approach to connect multiple devices, allowing up to 100 devices in the free tier. It is available on all platforms, making device connectivity seamless. Additionally, Tailscale offers useful features such as inviting members to access your network and sharing specific devices.

---

As I continue to refine my Raspberry Pi Home Server setup, I'm considering changing the streaming components by replacing:

- Plex => [Jellyfin](https://github.com/jellyfin/jellyfin)
- Overseerr => [Jellyseer](https://github.com/Fallenbagel/jellyseerr)

With only 2 GB of RAM, running all these services simultaneously can be challenging. As a result, I've opted not to run more resource-intensive services like Immich continuously. Instead, I activate this service when I need to periodically back up my data.

Looking ahead, I'm contemplating upgrading my Raspberry Pi to a Raspberry Pi 5 with 8 GB of RAM and attaching an SSD to it. This upgrade would provide more power and storage capacity, allowing for smoother operation and greater flexibility in running multiple services concurrently.

This concludes my setup for the Raspberry Pi Home Server. Any changes or additional components will be detailed in future posts.
