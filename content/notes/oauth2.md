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

OAuth 2.0 is an open authorization protocol, which enables application to access each other's data. OAuth 2.0 does not share password data but instead uses authorization tokens to prove an identity between consumers and service providers. In simple term it uses authorization process to jump from one service to another without tapping in a new username and password. If you're logged into Google and used those credentials for any app (Sign with Google), you've used OAuth.

OAuth2 is the industry-standard protocol that enables secure machine-to-machine communication and grants limited access to data and services on behalf of users. The specification also covers delegated access to client types such as browser-based, server-side web, native/mobile apps, and connected devices.

OAuth was originally designed for applications to get access to API's (All they need to ability to access the API). OAuth doesn't communicate with user information. OpenID communicate with user information.

### What exactly OAuth 2.0 do?

According to the [specification](https://datatracker.ietf.org/doc/html/rfc6749) that defines it:

> The OAuth 2.0 authorization framework enables a third-party application to obtain limited access to an HTTP service, either on behalf of a resource owner by orchestrating an approval interaction between the resource owner an the HTTP service, or by allowing the third-party application to obtain access on its own behalf.

OAuth is all about getting the right of access from one component of a system to another. In the OAuth world, a client application wants to gain access to a protected resources on behalf of a resource owner (usually an end user).

Components of OAuth:

- **_Resource Owner_** - It has access to an API and can delegate access to that API. The resource owner is usually a person and is generally assumed to have access to a web browser.

- **_Protected Resource_** - This is the component that the resource owner has access to. The communication can be of any form, but for the most part it's a web API of some kind. Even the name "resource" makes it sounds like this is something to be downloaded, these APIs can allow read, write, and other operations just as well.

- **_Client_** - This is the piece of software that accesses the protected resources on behalf of the resource owner. The name "client" might make you think this is the web browser, but that's not how the term is used here. If you take "client" in business terms you might think of person who's paying for your services, but that's not what it is. In OAuth, the **Client** is whatever software consumes the API that makes up the protected resource.

### Credential Sharing (Credential Theft)

- One approach, popular in the enterprise space, is to copy the user’s credentials and replay them on another service.
- Users uses the same credentials at both the client application (eg. Photo printer) and the protected resource (eg. storage site).
- When the user logs into the printer, the printer replays the user's username and password at the storage site, mimicking the user's authentication.
- User authenticates to the client using centrally controlled credentials eg. username/password, domain session cookie.
- Client replays the obtained credentials to the protected resource, acting as the user.
- The protected resource assumes direct user authentication, establishing the connection between the client and the resource.
- This approach requires that the user have the same credentials at the client application and the protected resource, which limits the effectiveness of this credential-theft technique to a single security domain.
- Successful if the printing and storage services are offered by the same company, and the user has the same account credentials on both services.

### Delegating access



## OAuth 2.0 Actors

OAuth 2.0 has different actors defined in the authentication and authorization process. These actors work together to ensure that the user's information is kept secure and that the application only accesses the information that the user has explicitly granted permission for.

{{< figure src="https://images2.imgbox.com/4d/c6/rYoOV6yD_o.png" alt="actors" position="center" style="border-radius: 8px;" caption="OAuth2 Actors" captionPosition="center" >}}
