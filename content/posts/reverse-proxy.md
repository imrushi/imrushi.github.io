---
title: "Reverse Proxy"
date: "2024-03-27T11:51:07+05:30"
author: "Rushi Panchariya"
authorTwitter: "RushiPanchariya" #do not include @
cover: ""
tags: ["reverse proxy", "proxy", "go"]
keywords: ["", ""]
description: ""
showFullContent: false
readingTime: true
draft: true
hideComments: false
---

A proxy server acts as a middleware between client machines and the servers. It works by routing your traffic through its own IP address before delivering the response back to you. This adds a layer of complexity but can offer several advantages, including enhanced security, improved performance, and even content filtering.

There are different types of proxy servers but all of them can be generalized into two:

- Forward Proxy
- Reverse Proxy

## Forward Proxy

> It is server that sits in front of a group of client machines. When those computers make requests to sites and services on internet, the proxy server intercept those requests and then communicates with web servers on behalf of those client, like a middleware.

## Reverse Proxy

> A reverse proxy is a server that sits in front of one or more web servers, intercepting requests from clients. This is different from a forward proxy, where the proxy sits in front of the clients. With a reverse proxy, when clients send requests to the origin server of a website, those requests are intercepted at the network edge by the reverse proxy server. The reverse proxy server will then send requests to and receive responses from the origin server.

Both of the above information is explained in detail by [Cloudflare](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/).
