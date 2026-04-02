---
title: "load testing with h2load"
date: "2019-05-08T00:00:00.000Z"
description: "some basic load testing wirth h2load - there are far better tools for load testing, but sometimes one needs a quick n dirty load testing tool which h2load can h"
---

some basic load testing wirth h2load - there are far better tools for load testing, but sometimes one needs a quick n dirty load testing tool which h2load can help with.


## Why did I use h2load?


h2load is a HTTP2 and HTTP1.1 tool from the nghttp2 package, the implementation of HTTP2 is pretty solid and verbose logging is pretty detailed. Also very easy to get going, for instance here is a basic command to hit an endpoint with 100 requests:


```
> h2load -n100 http://someendpoint

```

To really start pushing some numbers start to play with the number of threads and clients:


```
> h2load --warm-up-time 5 https://yourtestwebsite -c10 -t2 -n100
starting benchmark...
spawning thread #0: 5 total client(s). 50 total requests
spawning thread #1: 5 total client(s). 50 total requests
TLS Protocol: TLSv1.2
Cipher: ECDHE-RSA-AES128-GCM-SHA256
Server Temp Key: ECDH P-256 256 bits
progress: 10% done
progress: 20% done
progress: 30% done
progress: 40% done
progress: 50% done
progress: 60% done
progress: 70% done
progress: 80% done
progress: 90% done
progress: 100% done

finished in 26.75s, 3.74 req/s, 1.79MB/s
requests: 100 total, 100 started, 100 done, 100 succeeded, 0 failed, 0 errored, 0 timeout
status codes: 100 2xx, 0 3xx, 0 4xx, 0 5xx

traffic: 47.78MB (50102431) total, 107.52KB (110100) headers (space savings 0.00%), 47.64MB (49951217) data
                     min         max         mean         sd        +/- sd
time for request:   690.85ms       5.95s       2.06s       1.43s    79.00%
time for connect:    24.21ms     27.18ms     25.01ms      1.11ms    80.00%
time to 1st byte:   261.91ms    875.21ms    415.44ms    247.46ms    80.00%
req/s           :       0.37        0.78        0.51        0.13    60.00%

```

Monitor for 5xx errors and time for requests, connection and to 1st byte, high values could indicate an issue that needs to be dealt with (ie add some caching in, etc etc)


## References

- [nghttp2 h2load documentation](https://nghttp2.org/documentation/h2load.1.html)
