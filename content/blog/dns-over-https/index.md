---
title: "dns over https"
date: "2019-04-22T00:00:00.000Z"
description: "This had been an interesting dive into the next generation of securing DNS interactions. I’ll deal with DOT (DNS over TLS) in a seperate post to focus on DOH (D"
---

This had been an interesting dive into the next generation of securing DNS interactions. I’ll deal with DOT (DNS over TLS) in a seperate post to focus on DOH (DNS over HTTPS) in this post.

## DNS over HTTPS:

Why would has the IETF decided to use this approach? From the RFC. Well frankly DNSSEC failed to get wide spread adoption, and since DNS was designed in the days where security the use and protocol was not really a consideration there has to be a new approach to help prevent bad actors poisoning and interfering with DNS operation. DOH albeit controvercially has been given the green light by the IETF. So per the RFC, why DOH:

These use cases are preventing on-path devices from interfering with DNS operations(1), and also allowing web applications to access DNS information via existing browser APIs (2) in a safe way
consistent with Cross Origin Resource Sharing (CORS)

Okay, so the plan is (1) to prevent DNS operations from being messed with by upstream DNS services, as the resolvers communications will be encrypted between the client and the DNS server/resolver (HTTPS). This has some interesting implications:

The client can choose to ignore an invalid certificate presented by DOH DNS resolver, but in general terms this is an issue with any HTTPS/TLS situation for any web service.

Pretty much means anyone can stand up a server with a valid cert and start serving DOH, as long as the CA from the cert is on the Mozilla list.

Controlling client DNS queries from within a corporate network to outside resolvers is often something network/firewall admins do to help protectect there networks. This may prove be more difficult with DOH, as browsers/applications could be setup to drectly make DNS queries to resolvers outside the network and bypass proxies/UTM DNS checking. In saying this UTM’s could potentially prevent queries using certain content or header evaluations to detect that are particular to DOH and prevent them, not as simple as blocking UDP/TCP on port 53.

One will need a DNS proxy to allow for applications that do not natively support DOH for the time being. More modern application in the future may have the application logic and libraries integrated to support DOH much like Chrome and Firefox have.

## CORS

CORS (2) support by resolvers ensures requests can be made across domains thereby allowing for browsers/applications supporting CORS responses to use DOH without further client security hoops to jump through.
So, how does this work in actuallity?

There are only a handful resolvers supporting DOH at the moment, I’ve run some tests against Cloudflare and Google using curl (I used an older version that doesn’t support DOH natively).

Using the HTTPS endpoints provided by google using curl (GET) demostrates the request and responses structure [a]. There are some interesting items that come out of a simple test here:

DNS query is also available via QUIC / HTTP3. Which means TLS1.3 goodness over UDP or TCP

cache-control header response value matched the TTL of the DNS record, however if run many times showed wildly variying times, appears to be some caching issue or something along these line - a little more digging (see what I did there) into this is going to be needed.

I used jq (third-party) to help prettify the JSON output
(Cloudflare)[https://developers.cloudflare.com/1.1.1.1/dns-over-https/json-format/] has an implmentation that allows for both JSON and DNS wire format. I noticed whilst curling the cache-control mirrored the DNS record TTL and wasn’t all over the place as with the Google tests (ie TTL counted down as you’d expect for bog (udp, port 53) standard DNS queries) [b].

Suffice to say the change to use DOH will require some further consideration before implmeneting. But I believe overall that this is a step in the right direction (to secure DNS communications) that can be easily adopted however I guess time will tell. Been fun playing with this! I found that when testing CloudFlares 1.1.1.1 Andriod App that DNS latency performance for DOH was notibly faster than DOT, but more on that later.

As a side note about no zero days; whilst I may not post every day I am working on such posts over a number of days. I may change this approach, but this is working for now :)

[a] Google Query:

```
curl -v https://dns.google.com/resolve?name=www.news24.com -H "Origin: www.someorigin.com" | jq
....
> GET /resolve?name=www.news24.com HTTP/1.1
> Host: dns.google.com
...
> Origin: www.someorigin.com
> 
 GET /dns-query?name=www.news24.com&type=A HTTP/1.1
> Host: cloudflare-dns.com
> User-Agent: curl/7.54.0
> accept: application/dns-json
>
