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

In this we will see that system that support single user and gradually scale it up to serve millions of users.

### Single Server Setup

Whatever we are developing/building alway start with a single basic step and this also goes same for complex systems. To start with something single, we will be running everything on a single server. below is figure of single server setup where it will be running: web, app, database, cache, etc.

{{< figure src="/img/notes/system-design/simple-web-server.png" alt="Single Server Setup" position="center" style="border-radius: 8px;" caption="Single Web Server Working" captionPosition="center" >}}

1. User access websites through domain names, such as mysite.dev. Domain Name System (DNS) is paid service provided by 3rd parties and not hosted by our system.
2. DNS returns the IP address to the browser or mobile app. For example, In above figure DNS returning IP address 10.43.23.18.
3. Once the IP address is obtained, HTTP requests are sent directly to the web server.
4. The web server returns HTML pages or JSON response for rendering.

The traffic source coming from two sources:

- Web App: It uses a combination of server-side languages like Java, Go, Python, etc. to handle business logic, storage, etc., and client-side languages HTML and JavaScript for presentation.
- Mobile Application: Http protocol is used to communicate between mobile app and web server. JSON is commonly used for API response format to transfer data due to its simplicity.

### Database

With the growth of the user base, one server is not enough, and we need multiple servers: one for web/mobile traffic, the other for the database. Separating web/mobile traffic (web tire) and database (data tire) servers allows them to be scaled independently.

{{< figure src="/img/notes/system-design/simple-web-server.png" alt="Single Server Setup" position="center" style="border-radius: 8px;" caption="Single Web Server with DB" captionPosition="center" >}}

#### Database to use

We can choose between relational database and a non-relational database.

**_Relational Databases_**:

- It also called as relational database management system (RDBMS) or SQL database.
- It represent and store data in tables and rows.
- We can perform join operations using SQL across different database tables.
- Popular databases: MySQL, PostgresSQL, Oracle database, MSSQL, etc.
- It has been around for over 40 years.
- If relational databases are not suitable for your specific use case, It is critical to explore beyond relational databases.

**_Non-Relational Databases_**:

- It is also called as NoSQL databases.
- These databases are grouped into four categories:
  1. Key-value stores
  2. Graph stores
  3. Column stores
  4. Document stores
- Join Operations are generally not supported in non-relational databases.
- Popular databases: CouchDB, Neo4j, Cassandra, MongoDB, Amazon DynamoDB, etc.
- Non-relational databases might be the right choice if:
  - Your application requires super-low latency.
  - Your data are unstructured, or you do not have any relational data.
  - You only need to serialize and deserialize data (JSON, XML, YAML, etc.).
  - You need to store a massive amount of data.

#### Database Scaling

There are two ways to scale database: Vertical Scaling and Horizontal Scaling

**_Vertical Scaling_**:

- It is the process of adding more power (CPU, RAM, etc.) to your servers.
- When traffic is low, vertical scaling is great option, and the simplicity of vertical scaling is main advantage.
- Limitation of Vertical Scaling:
  - It has a hard limit. It is impossible to add unlimited CPU and memory to a single server.
  - It doesn't have failover and redundancy. If one server goes down, the website/app goes down with it completely.

**_Horizontal Scaling_**:

- It allow you to scale by adding more servers into your pool of resources.
- It is more desirable for large scale applications due to the limitations of vertical scaling.

In the pervious design, users are connected to the web server directly. If web server is offline user will unable to access the website. What if many users access the web server simultaneously and it reaches the web servers load limit, users generally experience slower response or fail to connect to the server. So how should to we should address this issue? with load balancer.

### Load Balancer

A load balancer evenly distributes incoming traffic among web servers that are defined in a load-balanced set.

{{< figure src="/img/notes/system-design/load-balancer.png" alt="Single Server Setup" position="center" style="border-radius: 8px;" caption="Single Web Server Working" captionPosition="center" >}}

As shown in above diagram:

- Users connect to the public IP of the load balancer directly.
- Now web server will be unreachable directly by clients.
- When request reaches to the load balancer it will pass request to one of the web server over private IP.
- For better security, private IP are used for communication between servers.
- A private IP is only reachable between servers in the same network.
- Private IP is unreachable over the internet.
- Load balancer is connected over private network with web servers.

This solves the no failover issue and improve the availability of of the web tier. For instance:

- If sever 1 goes offline, all the traffic will be routed to server 2. This prevents the website from going offline. We will also add a new healthy web server to the server pool to balance the load.
- If the website traffic grows rapidly, and two servers are not enough to handle the traffic, the load balancer can handle this problem gracefully. We only need to add more servers to the web server pool, and the load balancer automatically starts to send requests to them.

The current design has one database, so it does not support failover and redundancy. To solve this problem we need to look at Database replication.

### Database replication

Database replication can be used with a master/slave relationship between the master and the slaves.

- Master database generally only supports write operations.
- Slave database get copies of the data from the master db and only support read operations.
- All the data-modifying commands such as insert, delete, or update must be sent to the master db.
- Most application requires a much higher ratio of reads to writes; thus, the number of slave db in system usually larger than the number of master db.

{{< figure src="/img/notes/system-design/db-replication.png" alt="Database Replication" position="center" style="border-radius: 8px;" caption="Database Replication" captionPosition="center" >}}

Advantages of database replication:

- Enhanced Performance: In master-slave model, the master node exclusively handle write and update operations, while read tasks are efficiently spread across slave nodes. This approach enhances performance by enabling a higher degree of parallelism in query processing, which translates into the ability handle more query simultaneously.
- Reliability: In the event of a natural disaster, like a typhoon or earthquake, data still preserved. You do not need to worry about data loss because data is replicated across multiple locations.
- High availability: Even if one of the server is broken, your website still works. It can use the data from another server. So, your website keeps running smoothly.
