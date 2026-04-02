---
title: "opencanary honey pot - part of my zero day initiative"
date: "2019-09-23T00:00:00.000Z"
description: "It’s been a while :] But back to the grind stone, my nextr 1 day project was based out of curiousity about what was happening on my DSL router as as an attack s"
---

It’s been a while :] But back to the grind stone, my nextr 1 day project was based out of curiousity about what was happening on my DSL router as as an attack surface after reading about common attacks to type home routers.

Fair warning - don’t open your router up to the net without understanding the risks - you’re letting the world into your home. I used a spare router…

## The plan

So the plan was to grab inbound UDP and TCP connection data to ports 80(HTTP), 22(SSH) and 21(FTP). Unfortunately I couldn’t capture ICMP due to the router used (locked config by upstream provider)

Further ideas would be to capture any scans within my network for SMB(Samba / File Shares) and all DNS queries as a trip wire as to check if someone is in the network.

This is where OpenCanary was of interest for me, I wanted to gather data to see what type of attacks where occurring, from where and gather a user/password list of all the attack/discovery attempts. OpenCanary allows open to get going pretty quickly, it simulates services so that attackers attempt to connect which is then logged in detail….

## Why use a honeypot?

The attempts to connect to ‘fake’ services allows SecOps (seucity operations) staff to understand what attackers are trying to do and potentially block IP address, put checks in place in production systems, prevent username and/or password combinations from being used on networks and the internet.

OpenCanary can easily be used within a LAN or on the internet, attackers could already be in your network :[…

## Equipment used for my test

I used stock kit provided by my ISP, with only the and decided to dust of my Raspberry Pi (rpi) with the out the box rasbian OS. This was the only item connected as I don’t want the world having the opertunity to have access to my home network.

Oversimplified install steps:

- Configure router to port forward, disable any DDOS, port triggering
- Rasberry Pi - install rasbian, configure sshd to use port 222 and configure ufw, limit port 222 to listen to a particular IP from which admin actions will be done, allow port 80, 21, 22 access from any ip (for the honey pot to capture)
- Install OpenCanary and configure the services in /etc/opencanaryd/opencanary.conf
- Configure opencanaryd to start at boot using your prefer method…


## Logs

I started receiving attempts against all ports immediately, the logs for

- web services land in /var/tmp/opencanary.log
- samba/SMB land in /var/log/samba-audit.log…


```
{"dst_host": "10.0.0.2", "dst_port": "22", "local_time": "2019-09-01 13:13:36.569491", "logdata": {"DF": "", "ID":"34943", "IN": "xxxx", "LEN": "60", "MAC": "zz:zz:z3:3z:zz:11:11:11:00:22:44:17:28:00", "OUT": "", "PREC": "0x00", "PROTO": "TCP", "RES": "0x00", "SYN": "", "TOS": "0x00", "TTL": "42", "URGP": "0", "WINDOW": "14440"}, "logtype": 5001, "node_id": "my-rpi-canary", "src_host": "11.11.112.71", "src_port": "60831"}
{"dst_host": "10.0.0.2", "dst_port": 22, "local_time": "2019-09-01 13:13:37.530184", "logdata": {"SESSION": "603"}, "logtype": 4000, "node_id": "my-rpi-canary", "src_host": "11.11.112.71", "src_port": 60831}
{"dst_host": "10.0.0.2", "dst_port": 22, "local_time": "2019-09-01 13:13:41.151453", "logdata": {"LOCALVERSION": "SSH-2.0-OpenSSH_5.1p1 Debian-4", "REMOTEVERSION": "SSH-2.0-PUTTY"}, "logtype": 4001, "node_id": "my-rpi-canary", "src_host": "11.11.112.71", "src_port": 60831}
{"dst_host": "10.0.0.2", "dst_port": 22, "local_time": "2019-09-01 13:13:43.225079", "logdata": {"LOCALVERSION": "SSH-2.0-OpenSSH_5.1p1 Debian-4", "PASSWORD": "daniel", "REMOTEVERSION": "SSH-2.0-PUTTY", "USERNAME": "root"}, "logtype":4002, "node_id": "my-rpi-canary", "src_host": "11.11.112.71", "src_port": 60831} 

```

There is an ability to push alerts to Slack and push logs using the OpenCanary Correlator, more on this soon.
