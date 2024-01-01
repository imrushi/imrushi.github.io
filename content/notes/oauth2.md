---
title: "OAuth2 and OpenID Connect"
date: 2023-08-20
draft: false
toc: true
author: "Rushi"
enableGitInfo: true
showLastUpdated: true
---

## OAuth 1.0

In 2006, when several web services companies, including Twitter and Ma.Gnolia, had complementary applications and wanted their users to be able to connect them together. At the time, this type of connection was typically accomplished by asking the user for their credentials on the remote system and sending those credentials to the API. These websites let people log in using a shared login system called OpenID, so they didn't need to create separate accounts for each site. As a consequence, there were no username or passwords that could be used for the API.

To overcome this, the developers sought to create a protocol that would allow their users to delegate access to the API. They based their new protocol on several proprietary implementation of this same concept, including Google's AuthSub and Yahoo!'s BBAuth. In all of these, a client application is authorized by a user and receives a token that can then be used to access a remote API. These tokens were all issued with a public and private portion, and this protocol used a novel cryptographic singing mechanism so that it could be used over non-TLS HTTP connections. They called their protocol OAuth 1.0 and published it as an open standard on the web.

OAuth 1.0 was a monolithic protocol designed to provide one mechanism to solve all use cases, and it was venturing into uncomfortable territory. Soon after the publication of [RFC 5849](https://datatracker.ietf.org/doc/html/rfc5849), the Web Resource Access Protocol (WRAP) was published. WRAP did away with many of OAuth 1.0's more confusing and problem-prone aspects, such as its custom signature calculation mechanism. After much debate in the community, WRAP was decided on as the basis for the new OAuth 2.0 protocol. Where OAuth 1.0 was monolithic, OAuth 2.0 was modular. The modularity in OAuth 2.0 allowed it to be a framework that could be deployed and used in all of the ways that OAuth 1.0 had been in practice, but without twisting core aspects of the protocol.

In 2012, the core OAuth 2.0 specifications were ratified by the IETF, but the community was far from done with it. This modularity was further codified by splitting the specification into two complementary pieces:

- [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749) :- details how to get a token
- [RFC 6750](https://datatracker.ietf.org/doc/html/rfc6750) :- details how to use a particular type of token (the Bearer token) at a protected resource.

The core of [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749) details multiple ways to get a token and provides an extension mechanism. Instead of defining one complex method to fit different deployment models, OAuth 2.0 defines four different grant types, each suited to a different application type.

## OAuth 2.0

OAuth 2.0 is an open authorization protocol, which enables application to access each other's data. OAuth 2.0 does not share password data but instead uses authorization tokens to prove an identity between consumers and service providers. In simple term it uses authorization process to jump from one service to another without tapping in a new username and password. If you're logged into Google and used those credntials for any app (Sign with Google), you've used OAuth.

OAuth2 is the industry-standard protocol that enables secure machine-to-machine communication and grants limited access to data and services on behalf of users. The specification also covers delegated access to client types such as browser-based, server-side web, native/mobile apps, and connected devices.

OAuth was originally designed for applications to get access to API's (All they need to ability to access the API). OAuth doesn't communicate with user information. OpenID communicate with user information.

## OAuth 2.0 Actors

OAuth 2.0 has different actors defined in the authentication and authorization process. These actors work together to ensure that the user's information is kept secure and that the application only accesses the information that the user has explicitly granted permission for.

{{< figure src="https://images2.imgbox.com/4d/c6/rYoOV6yD_o.png" alt="actors" position="center" style="border-radius: 8px;" caption="OAuth2 Actors" captionPosition="center" >}}
