---
title: "Personal Access Token Implementation"
date: "2024-03-22T13:48:34+05:30"
author: "Rushi Panchariya"
authorTwitter: "RushiPanchariya" #do not include @
cover: ""
tags: ["PAT", "Personal Access Token"]
keywords: ["", ""]
description: ""
showFullContent: false
readingTime: true
hideComments: false
draft: true
color: "" #color from the theme settings
---

I always had a question about how the Personal Access Token works and how it's generated and managed. In this blog, I will cover how to create your own PAT (Personal Access Token) system.

For years, logging in to things online relied on usernames and passwords. But sometimes passwords can be a pain! They're easy to forget and even harder to keep truly secure.

This is where Personal Access Tokens (PATs) come in. They're a new way to log in to apps and services, and they offer some big advantages over passwords.

Here's why passwords can be frustrating:

- Leaky: Hackers can steal passwords in all sorts of ways, leaving your accounts vulnerable.
- Forgettable: Who remembers dozens of complex passwords? We all reuse passwords, which is a security risk.
- Inflexible: Passwords are all-or-nothing. You either have access or you don't.

PATs aim to solve these problems by offering a more secure and flexible way to log in.

## What is PATs?

Personal Access Tokens (PATs) are **_long strings of random characters_** that act as digital credentials, enabling secure access to resources without the need for a password. These tokens are generated and managed by the user, granting them granular control over the scope of access granted to each PAT.

These tokens are stored in a database, and their validity is checked by performing a database lookup. But in this blog, I will also explain alternate approaches to checking the validity of a token. To revoke a token, you can simply delete it from the database. Once the token has been revoked, it can no longer be used.

PATs also called as **_Opaque Access Tokens (OATs)_** in OAuth 2.0.

You can check this **_[ORY documentation](https://www.ory.sh/docs/oauth2-oidc/jwt-access-token#opaque-access-tokens-versus-jwt)_** to learn more about PATs.

example of a PAT:

```
org_at_QlANllvSYMuPiEw_f0K_GrKW05PGRc29w7V5HZ4434.N0_lECUd927GnG71eEKq1D7p8UagEj4xdf8ivvge5QhjJZcL99HBWvYjkEK8eUaheUfBFYN0tbIqcdafarsZXA
```

In above PAT on is divided in two segments with dot operator (.) on left side of dot operator is 32-byte random string with base64 encoding and on right side of dot operator we have cryptographic signature with base64 encoding which generated from 32-byte random string.

### Advantages and Characteristics

PAT offers several distinct advantages over traditional passwords:

- Enhanced Security: PATs can be granted specific permissions, limiting the potential damage if compromised.
- Flexibility: PATs can be tailored to specific tasks or applications, enabling precise control over access privileges.
- Third-party Integration: PAT facilitates secure integration with third-party tools and applications, eliminating the need to share passwords.

PATs are characterized by several key features:

- Unique Generation: Each PAT is a unique string of characters, preventing unauthorized access.
- Granular Permission: PATs can be granted specific permissions, limiting their scope of access.
- Revocability: PATs can be revoked at any time, effectively disabling them in cases of compromise.

## Working & Implementation

Let's first understand the how token is formed.

```
org_at_QlANllvSYMuPiEw_f0K_GrKW05PGRc29w7V5HZ4434.N0_lECUd927GnG71eEKq1D7p8UagEj4xdf8ivvge5QhjJZcL99HBWvYjkEK8eUaheUfBFYN0tbIqcdafarsZXA
```

In the above PAT, it is divided into two segments with a dot operator (.). On the left side of the dot operator is a 32-byte random string with base64 encoding, and on the right side of the dot operator, we have a cryptographic signature with base64 encoding, which is generated from a 32-byte random string.

At the start, I have appended the `org_at_` prefix to the token to identify the organization and token type like here `_at_` is stands for `Access Token`. It is not mandatory; you can skip this.

### Working Overview

{{< image src="https://ik.imagekit.io/ruship/PAT/pat.png" alt="pat api" position="center" style="border-radius: 8px;" caption="Pass-by-value" captionPosition="center">}}

- App will request for PAT with scopes.
- PAT Generation will do below:
  - Generate: this will generate token with random string and sign that token with cryptographic algorithm which is HMAC. And store the token `name, signature, scope, granted scope` against the user id.
  - Verify: Verify will decode the token and again generates the hmac with decoded token (left side of dot) with signing key. Then it will compare both HMAC if it is equal the token is not tampered. If token not tampered it should check in database if signature entry exists.
  - Revoke: To revoke token we need to delete token from the database.
- Database is used to store the token related information.

<!-- {{< gist imrushi c025ae9c19d3b9ccba744aaaeb045fcd>}} -->

As we seen above for validating/checking the token is valid we have to do database lookup. We will see the database schema for Personal Access Token.

**_PAT Table_**:

| token_id                             | user_id            | name       | signature                | scope      | granted_scope | active | created_at          |
| ------------------------------------ | ------------------ | ---------- | ------------------------ | ---------- | ------------- | ------ | ------------------- |
| efaeb2c2-8654-4b83-a254-1ab1296614b2 | 6c1acbd1-602b-4235 | token-name | N0_lECUd927GnG71eEKq1... | email name | email         | 1      | 2024-01-24 12:09:22 |

<!-- prettier-ignore-start -->
{{< code language="sql" title="user token table" expand="Show" collapse="Hide" isCollapsed="false" >}}
CREATE TABLE user_tokens (  
    token_id VARCHAR(36) NOT NULL,  
    user_id VARCHAR(36) NOT NULL,  
    name VARCHAR(255) NOT NULL,  
    signature VARCHAR(255) NOT NULL,
	scope TEXT NOT NULL,
	granted_scope TEXT NOT NULL,
	active INTEGER NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY (token_id),  
    UNIQUE KEY unique_token (signature) USING BTREE,  
    KEY user_id_index (user_id) USING BTREE,  
    KEY name_index (name) USING BTREE
);
{{< /code >}}
<!-- prettier-ignore-end -->
