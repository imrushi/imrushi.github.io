---
title: "Personal Access Token (PAT)"
date: "2024-05-06T14:32:34+05:30"
author: "Rushi Panchariya"
authorTwitter: "RushiPanchariya" #do not include @
cover: ""
tags: ["PAT", "Personal Access Token"]
keywords:
  [
    "Personal Access Token",
    "PAT",
    "token generation",
    "token management",
    "token validation",
    "HMAC",
    "Hash-based Message Authentication Code",
    "token expiry",
    "OAuth2",
    "Opaque Access Tokens",
    "open source",
    "third-party integration",
    "security",
    "go",
    "generate PAT in go",
    "PAT in Golang",
  ]
description: "In this blog, we delve into the world of Personal Access Tokens (PATs), exploring their role in modern security and authentication systems. Learn how PATs offer a secure alternative to traditional passwords, discover the key concepts behind token generation and validation, and gain practical insights into implementing PATs for enhanced access control."
showFullContent: false
readingTime: true
hideComments: false
draft: false
color: "" #color from the theme settings
---

I always had a question about how the Personal Access Token works and how it's generated and managed. In this blog, I will cover how to create your own PAT (Personal Access Token) system.

For years, logging in to things online relied on usernames and passwords. But sometimes passwords can be a pain! They're easy to forget and even harder to keep truly secure.

This is where Personal Access Tokens (PATs) come in. They're a new way to log in to apps and services, and they offer some big advantages over passwords.

Here's why passwords can be frustrating:

- Leaky: Hackers can steal passwords in all sorts of ways, leaving your accounts vulnerable.
- Forgettable: Who remembers dozens of complex passwords? We all reuse passwords, which is a security risk.
- Inflexible: Passwords are all-or-nothing. You either have access or you don't.

PATs aim to solve this problems by offering a more secure and flexible way to log in.

## What are PATs?

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

- The app will request a PAT with scopes.
- PAT Generation will do below:
  - **Generate**: This will generate a token with a random string and sign that token with a cryptographic algorithm, which is HMAC[^1]. It will then store the token's name, signature, scope, granted scope against the user ID.
  - **Verify**: Verification will decode the token and again generate the HMAC[^1] with the decoded token (left side of the dot) with the signing key. Then it will compare both HMACs[^1]; if they are equal, the token is not tampered. If the token is not tampered, it should check in the database if a signature entry exists.
  - **Revoke**: To revoke a token, we need to delete the token from the database.
- Database is used to store the token related information.

As we have seen above, for validating/checking if the token is valid, we have to perform a database lookup. Let's examine the database schema for Personal Access Tokens.

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

#### PAT Generation

Generation of PAT using HMAC[^1]:

- We require 32-byte long secret. We can use one global secret or rotated secret. This secret will be used as signing key in HMAC[^1].

- We can take input for how long token key should be if it is not defined default should be 32-byte.

- Using above token entropy, we can generate random bytes of specified length.

- By given token key and signature key we can generate HMAC[^1].

- In HMAC, we can use sha512 or sha256. Using one them, create hash for token key (which is data) and hash key as signature key.

- With above HMAC process, we get signature. We create base64 for signature and random bytes.

- Concatenate above both base64 with dot operator as separator. Example `token_base64.signature_base64`.

When you are storing the token in the database, store its signature along with whatever data you want to store in the DB.

##### Implementation

**_main.go_**:

- Setting the token entropy to 32-byte for generating random bytes.

- Creating context for managing cancellation signals and deadlines across API boundaries.

- Generate function generates and encoded token and signature for provided context(request).

- Validate function verifies provided token and signature.

{{< gist imrushi 7c5b97e460bbd6c0165852e903498a50 main.go>}}

**_Generate function_**:

- Create a signing key array with a length of 32 bytes and copy the secret into it.

- Generate random bytes array of length equal to entropy.

- Generate an HMAC signature using the generated random string and the signing key.

  - Create a new hasher using SHA512/256.

  - Create a new HMAC instance using the hasher and the provided key.

  - Write the data into the HMAC.

  - Sum the HMAC and return the result.

- Encode the signature using base64.

- Store it in Database for later validation of token.

- Concatenate the base64-encoded random string and the encoded signature with a dot.

- Return the encoded token, encoded signature, and nil error.

{{< gist imrushi 7c5b97e460bbd6c0165852e903498a50 generateFunction.go>}}

**_Validate function_**:

- Decode the base64-encoded token and signature.

- Generate the HMAC signature using the decoded token and the signing key.

  - Create a new hasher using SHA512/256.

  - Create a new HMAC instance using the hasher and the provided key.

  - Write the data into the HMAC.

  - Sum the HMAC and return the result.

- Encode the signature using base64.

- Compare the generated HMAC signature with the encoded signature.

{{< gist imrushi 7c5b97e460bbd6c0165852e903498a50 validateFunction.go>}}

Check out full [code here](https://gist.github.com/imrushi/7c5b97e460bbd6c0165852e903498a50#file-pat-go).

#### PAT Generation with Timestamp (including Token Expiry)

PAT generation remains similar to the process described above, with the addition of token expiry for enhanced security.

- We will generate a timestamp and append it with the token key with an expiry of 5 minutes. This will be used to check if the token is expired or not. Token expiry is crucial for security reasons, as it limits the window of opportunity for potential attackers to misuse a stolen token.

- We will create a base64 encoded string with generated random bytes and timestamp with a `~` sign as a separator. We are adding a separator so it will be easy to find the timestamp at the time of decoding/verification.

By incorporating token expiry into the generation process, we ensure that tokens have a limited lifespan, reducing the risk of unauthorized access if a token is compromised.

This addition enhances the security of our token-based authentication system, complementing the cryptographic measures already in place.

<!-- prettier-ignore-start -->
{{< code language="go" title="timestamp logic" expand="Show" collapse="Hide" isCollapsed="false" >}}
  // generate 32-byte random string
	tokenKey, err := RandomBytes(entropy)
	if err != nil {
		return "", "", err
	}

	// Adds the expiration timestamp in token
	// time.Minute * 5 can be replace by environment variable
	timestamp := time.Now().Add(time.Minute * 5).Unix()

	// In token we have separated it with ~
	// to detect extract the time
	tokenContent := fmt.Sprintf("%s~%s", b64.EncodeToString(tokenKey), b64.EncodeToString([]byte(strconv.FormatInt(timestamp, 10))))

	signature := generateHMAC(ctx, []byte(tokenContent), &signingKey)

	encodingSignature := b64.EncodeToString(signature)
	encodedToken := fmt.Sprintf("%s.%s", tokenContent, encodingSignature)
{{< /code >}}
<!-- prettier-ignore-end -->

An example of token with a timestamp:
`b-vKxoHTHh5ELdIDeGy4wppKcRb6m4LCZJETAUTjyGw~MTI1Nzg5NDMwMA.MS4upZ9Fr-XhcLriQbt7Q0-ZC6HTPWp4kqG5h8xEJDg`

In the above example, the `~` separator denotes the timestamp, ensuring easy extraction during token verification. The inclusion of token expiry adds an additional layer of security to our authentication system, safeguarding against potential threats.

By implementing token expiry, we ensure that even if a token is intercepted, its usefulness is limited, mitigating the risk of unauthorized access and enhancing overall system security.

##### PAT Verification

At time of verification we will:

- Split the tokenKey with `~` and decode it.
- Decode random bytes and timestamp.
- Generate HMAC similar to what we did in generation.
- Check token expiration using the timestamp from the token and current timestamp. And check if it is less than the current timestamp so it is expired. `tokenTimestamp < time.Now().Unix()`

<!-- prettier-ignore-start -->
{{< code language="go" title="timestamp validation" expand="Show" collapse="Hide" isCollapsed="false" >}}
  contentSplit := strings.Split(tokenKey, "~")
	
	// Extract timestamp from the token content
	if len(contentSplit) != 2 {
		return fmt.Errorf("Invalid token content format")
	}

	decodedTokenKey, err := b64.DecodeString(contentSplit[0])
	if err != nil {
		return err
	}

	decodedTimestamp, err := b64.DecodeString(contentSplit[1])
	if err != nil {
		return err
	}
	expectedMAC := generateHMAC(ctx, []byte(fmt.Sprintf("%s~%s", b64.EncodeToString(decodedTokenKey), b64.EncodeToString(decodedTimestamp))), &signingKey)
	if !hmac.Equal(expectedMAC, decodedTokenSignature) {
		return fmt.Errorf("Token signature mismatch")
	}

	tokenTimestamp, err := strconv.ParseInt(string(decodedTimestamp), 10, 64)
	if err != nil {
		return fmt.Errorf("Invalid token timestamp")
	}

	// Check token expiration
	// fmt.Println(fmt.Sprintf("%v, %v", tokenTimestamp, time.Now().Unix()))
	if tokenTimestamp < time.Now().Unix() || isRevoked(tokenSignature) {
		// active = false
		// c.updateActiveFlag(tokenSignature, 0)
		return fmt.Errorf("Token expired")
	}
{{< /code >}}
<!-- prettier-ignore-end -->

Check the full code for PAT with time expiry [here](https://gist.github.com/imrushi/7c5b97e460bbd6c0165852e903498a50#file-patwithtimestamp-go).

---

This research took lot of time, I am happy to share it with you. I'd like to extend my gratitude to [ORY's](https://www.ory.sh/) OpenSource community and their [Fosite](https://github.com/ory/fosite)[^2] project, from which I was able to learn about the generation and validation of Opaque Access Tokens.

OAuth 2 Opaque Access Tokens are also generated in same way as described above. You check out ORY's Fosite project for more details for only token part of [Fosite here](https://github.com/ory/fosite/tree/master/token/hmac).

[^1]: HMAC: https://www.okta.com/identity-101/hmac/
[^2]: Fosite: https://github.com/ory/fosite
