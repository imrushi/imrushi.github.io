---
title: "OAuth2 and OpenID Connect"
date: 2023-08-20
draft: false
toc: true
author: "Rushi"
enableGitInfo: true
showLastUpdated: true
---

## OAuth 2.0

OAuth 2.0 is an open authorization protocol, which enables application to access each other's data. OAuth 2.0 does not share password data but instead uses authorization tokens to prove an identity between consumers and service providers. In simple term it uses authorization process to jump from one service to another without tapping in a new username and password. If you're logged into Google and used those credntials for any app (Sign with Google), you've used OAuth.

OAuth2 is the industry-standard protocol that enables secure machine-to-machine communication and grants limited access to data and services on behalf of users. The specification also covers delegated access to client types such as browser-based, server-side web, native/mobile apps, and connected devices.

OAuth was originally designed for applications to get access to API's (All they need to ability to access the API). OAuth doesn't communicate with user information. OpenID communicate with user information.

## OAuth 2.0 Actors

OAuth 2.0 has different actors defined in the authentication and authorization process. These actors work together to ensure that the user's information is kept secure and that the application only accesses the information that the user has explicitly granted permission for.
