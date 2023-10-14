---
title: "System Design"
date: 2023-08-24
draft: false
toc: true
author: "Rushi Panchariya"
tags: ["system design", "notes"]
keywords: ["programming", "system design", "database", "scaling"]
categories: ["System Design"]
enableGitInfo: true
showLastUpdated: true
---

---

## Zero To Millions of Users

In this section, we will explores the process of scaling a system from supporting a single user to eventually serving millions of users.

### Single Server Setup

In any system development journey, it's best to begin with a simple step, and that applies even to complex systems. We initiate this process by running everything on a single server. This single server setup includes web services, applications, databases, caching, and more.

{{< figure src="/img/notes/system-design/simple-web-server.png" alt="Single Server Setup" position="center" style="border-radius: 8px;" caption="Single Web Server Working" captionPosition="center" >}}

1. User access websites through domain names, such as mysite.dev. Domain Name System (DNS) is a third-party paid service not hosted by our system.
2. DNS translates the domain name into an IP address, such as 10.43.23.18 in the figure.
3. Once the IP address is obtained, HTTP requests are sent directly to the web server.
4. The web server returns HTML pages or JSON response for rendering.

The traffic to this single server comes from two primary sources:

- **Web App**: It utilizes server-side languages (e.g., Java, Go, Python) for business logic and storage, along with client-side languages like HTML and JavaScript for presentation.
- **Mobile App**: HTTP protocol facilitates communication between the mobile app and the web server. JSON is commonly used for API responses due to its simplicity.

### Scaling with Multiple Servers

As the user base grows, relying on a single server is no longer sufficient. We need to move to a multi-server setup, separating web/mobile traffic from the database. This separation allows for independent scaling of web/mobile traffic servers and database servers.

{{< figure src="/img/notes/system-design/simple-web-server.png" alt="Single Server Setup" position="center" style="border-radius: 8px;" caption="Single Web Server with DB" captionPosition="center" >}}

#### Choosing the Right Database

When it comes to databases, there are two main categories to consider: Relational Database and Non-Relational Database.

**_Relational Databases_**:

- These are often referred to as relational database management system (RDBMS) or SQL database.
- Data is structured in tables and rows.
- SQL is used for joining data from different tables.
- Popular databases options: MySQL, PostgresSQL, Oracle database, MSSQL, etc.
- This technology has been around for more than 40 years.

If relational databases doesn't suit your specific use case, it's essential to explore beyond relational databases.

**_Non-Relational Databases_**:

- Also known as NoSQL databases.
- Categorized into:
  1. Key-value stores
  2. Graph stores
  3. Column stores
  4. Document stores
- Typically, non-relational databases do not support join operations.
- Popular databases options: CouchDB, Neo4j, Cassandra, MongoDB, Amazon DynamoDB, etc.
- Non-relational databases might be the right choice if:
  - Requires super-low latency.
  - Deal with unstructured data.
  - Need to store a massive amount of data.

#### Scaling the Database

There are two ways to scale database: Vertical Scaling and Horizontal Scaling

**_Vertical Scaling_**:

- This involves adding more power (CPU, RAM, etc.) to your existing servers.
- Vertical scaling is suitable when traffic is low, and its simplicity is an advantage.
- However, it has limitations, including a hard limit on resources and a lack of failover and redundancy.

**_Horizontal Scaling_**:

- This approach involves adding more servers to your resource pool.
- It is more suitable for large-scale applications, addressing the limitations of vertical scaling.

In the previous design, users connected directly to the web server, leading to potential issues like server unavailability or slow responses during high traffic. To address these challenges, load balancing comes into play.

### Load Balancer

Load balancers distribute incoming traffic evenly among a set of web servers defined in a load-balanced configuration.

{{< figure src="/img/notes/system-design/load-balancer.png" alt="Single Server Setup" position="center" style="border-radius: 8px;" caption="Single Web Server Working" captionPosition="center" >}}

As shown in above diagram:

- Users connect to the public IP of the load balancer directly.
- The load balancer then directs the request to one of the web servers via a private IP for enhanced security.
- Private IPs are used for server-to-server communication within the same network.

This setup resolves the issue of server unavailability and enhances web tier availability. For instance:

- If one server goes offline, traffic is automatically redirected to another server, preventing downtime.
- As website traffic grows, additional servers can be added to the pool, and the load balancer will distribute requests accordingly.

The current design includes a single database, which lacks failover and redundancy. To address this, let's explore database replication.

### Database Replication

Database replication involves establishing a master-slave relationship between the master and the slave databases.

- The master database primarily handles write operations.
- Slave databases replicate data from the master but are typically reserved for read operations.
- Any data-modifying commands, such as insertions, deletions, or updates, are directed to the master database.
- Most application requires a much higher ratio of reads to writes; thus, the number of slave db in system usually larger than the number of master db.

{{< figure src="/img/notes/system-design/db-replication.png" alt="Database Replication" position="center" style="border-radius: 8px;" caption="Database Replication" captionPosition="center" >}}

Advantages of database replication:

- Enhanced Performance: In a master-slave model, the master handles write and update operations, while read tasks are efficiently distributed to slave nodes, improving query processing performance.
- Reliability: Data is preserved, even in the event of natural disasters, preventing data loss. We do not need to worry about data loss because data is replicated across multiple locations.
- High availability: Even if one server breaks, the website continues to function, using data from another server, ensuring smooth operation.
