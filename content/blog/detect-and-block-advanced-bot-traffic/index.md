---
title: "Detect and block advanced bot traffic with AWS WAF"
date: "2022-11-11T00:00:00.000Z"
description: "I published a deep-dive on the AWS Security Blog covering the newly launched AWS WAF Bot Control for Targeted Bots — browser fingerprinting, JavaScript interrogation, token domains, and scope-down statements."
---

I published a post on the AWS Security Blog covering the newly launched **AWS WAF Bot Control for Targeted Bots**.

Targeted bots are the hard problem — they mimic human behaviour, rotate IPs, and bypass simple rate limits. The new targeted inspection level uses browser fingerprinting and client-side JavaScript interrogation to catch them, without requiring any changes to your application or architecture.

The post walks through:

- The difference between **common** and **targeted** bot inspection levels
- Configuring per-category actions — block, challenge, CAPTCHA, count, allow
- **Scope-down statements** to limit Bot Control to the URIs that actually need it (login, checkout) and keep costs sane
- **Token domains** — a single web ACL accepting WAF tokens across multiple domains and CloudFront distributions
- Embedding the **JavaScript Application Integration SDK** so WAF can reject tokenless requests outright
- Rule ordering and CloudWatch alarm setup for token-absent spikes

→ [Read the full post on the AWS Security Blog](https://aws.amazon.com/blogs/security/detect-and-block-advanced-bot-traffic/)
