---
title: "working with maxmind geoip"
date: "2019-04-20T00:00:00.000Z"
description: "scripting querys against the maxmind db’s with python There comes a time when one needs to check for an IP’s likely physical location, in my case I’ve been play"
---

scripting querys against the maxmind db’s with python


There comes a time when one needs to check for an IP’s likely physical location, in my case I’ve been playing with DNS of HTTPS and DNS over TLS and part of the workflow I had whilst testing was to check the responses GEO location against the free Maxmind database, but more on that another time.


So I downloaded the GeoLite2 (Free) City + ASN Databases from maxmind, install the prereq’s via pip and built a simple python script to test.


Found maxmind’s project maxmind (on github) that made building the script easier:


```code
pip3 install geoip2 --user
brew install libmaxminddb
import geoip2.database
import json

# This creates a Reader object. You should use the same object
# across multiple requests as creation of it is expensive.
reader = geoip2.database.Reader('./GeoLite2-City_20190416/GeoLite2-City.mmdb')
reader2 = geoip2.database.Reader('/./GeoLite2-ASN_20190416/GeoLite2-ASN.mmdb')

# Replace "city" with the method corresponding to the database
# that you are using, e.g., "country".
ip = '72.163.4.185'
response = reader.city(ip)
response2 = reader2.asn(ip)

output = {
    "IP":ip, 
    "Details":
    [
        {"ISO":response.country.iso_code}, 
        {"Country":response.country.name}, 
        {"City":response.city.name},
        {"ASN":response2.autonomous_system_number}
        ]
    }

print (json.dumps(output, indent=4))

reader.close()

```
