---
title: "AWS"
date: 2024-06-28T12:07:52+05:30
draft: false
toc: true
tags: ["AWS"]
keywords: ["Serverless"]
categories: ["Cloud"]
author: "Rushi"
---

AWS stands of Amazon Web Service. It offer broad range of cloud services.

## Traditional vs Serverless Web hosting

| Traditional                             | Serverless                                                             |
| --------------------------------------- | ---------------------------------------------------------------------- |
| Provision Capacity                      | Runs On-Demand (unlimited capacity Only pay for Code Executions)       |
| Scaling (Pay too much or server issues) | Scales Automatically (Pay What you need)                               |
| Update OS & Software                    | Runs on Managed AWS Infrastructure (up-to-date and secure environment) |
| Lots of Overhead for SPA + API Apps     | Great for SPA + API Apps                                               |

## API Gateway (REST API)

API Gateway is fully managed service that allows you to easily create, publish, maintain, monitor, secure API's at any scale. An API, acts as a "front door" for applications to access data, functionality, or business logic from your backend services like servers, databases or lambda.

Things API Gateway can do:

- Create RESTful API's and WebSockets API's
- Integration with backend services: API Gateway can route API requests to various backend services like AWS Lambda functions, Amazon EC2 instances, or other web apps.
- Manage Traffic: API Gateway handles tasks like traffic management, throttling to limit requests, and Cross-Origin Resource Sharing (CORS) for secure communication between different domains.
- Secure API's: API Gateway helps us to secure APIs with features like IAM authorization and access control.
- Monitor API's: API Gateway provides metrics and logging to help you monitor the health and performance of our API's.

{{< figure src="/img/notes/aws/aws-api-gateway.svg" alt="How it Works" position="center" style="border-radius: 8px;" caption="How it works" captionPosition="center" >}}

## Lambda (LOGIC)

It's designed to let us run our code without having to worry about provisioning or managing servers yourself.

- Serverless: We don't need to set up or manage servers. AWS Lambda takes care of all the underlying infrastructure, so we can focus on writing code.
- Event-driven: Our code (packaged as Lambda function) executes in response to events. These events can be triggered by various AWS services like S3 file upload, API Gateway requests, or DynamoDB changes.
- Automatic Scaling: Lambda automatically scales our code up or down to handle the workload. We have to only pay for the compute time for our code.
- Cost-effective: Since we only pay for what we use, Lambda can be a cost-effective way to run code that doesn't require constant uptime.
- Supported languages: Java, Go, Node.js, C#, Python, Ruby and PowerShell

## DynamoDB (DATA)

## Cognito (AUTH)

## S3 (Simple Storage Service) (Web APP)

## CloudFront (Cache service)

## Route53 (DNS)
