# API Fetch Demo
This is just a basic do nothing of much value type demo that illustrates some html and CSS techniques but the key point is to call an API using the asynchronous Fetch function to illustrate its use and to demonstrate CORS.

This demo illustrates an async call to an API to return Formula1 results. This is a particularly slow API and it looks like the thread is blocked. However, put a breakpoint on the console.log at the end of the drivers.js and see it hits that whilst waiting for the data. The UI is clearly not held up as you can still interact with the dropdown. The reason it looks like it's blocked the thread is because there isn't anything else for it to do whilst it waits.

This also illustrates the use of CORS. The origin of the API call is not the same as that the page is loaded from so the server needs to allow CORS at least for GET requests

## Important headers
When making a basic GET request, i.e. the one that works, note the request headers:

**sec-fetch-mode: cors**
How was the request created. Values can be **navigate** - something like a link was clicked, or a URL typed i.e. user initiated not script initiated.

**cors** - script initiated using something like fetch() and cors is required

**no-cors** - is a request that cannot expose the response to JavaScript so data is safe

**same-origin** - the request is from the same origin as the web page so no cors needed

**sec-fetch-site: cross-site**
This is telling the server where the request came from. 

**same origin** - exactly what it says

**same-site** - different origin but same registered domain. e.g., http://tonynicol.com and https://tonynicol.com

**cross-site** - request comes from a completely different site. Server needs to implement cors policy

**none** - request was triggered by a top-level navigation or user action, not by a document. e.g., user typed a url or clicked a bookmark

## CORS demo
Uncomment the PUT request or the GET with a non-standard header. The browser won't send pre-flight check for basic requests such as GET with standard headers but it will if anything is non-standard or non-simple - e.g., data on the server could be changed

The browser looks like it sends the pre-flight OPTIONS request after the event, but look carefully, in the network timings, chrome registers the GET request but stalls it whilst it sends an OPTIONS request. If OPTIONS returns policy rules that don't match the request, the request is never sent. You can see that as the GET and PUT requests never receive any response at all

Look at the response headers for the pre-flight responses
**allow: GET, HEAD, OPTIONS**

HEAD is like GET but requests only headers and no response data
OPTIONS - effectively asking the server what it allows

OPTIONS request is the pre-flight request so returns information including allowable headers, methods and origins

## Important CORS headers
__access-control-allow-origin: *__ Accept a request from anywhere

**access-control-allow-headers: Content-Type, Authorization** Allow response only for these headers

**access-control-allow-methods: GET** Only this method allowed for cross origin request 

**access-control-max-age: 300** Cache the OPTIONS response for 300 seconds to avoid keep resending

**allow: GET, HEAD, OPTIONS** These are allowed but HEAD and OPTIONS send only metadata


## Enabling your site to handle CORS
```
const cors = require("cors");

app.use(cors({
  origin: ["https://tonynicol.com, http://tonynicol.com, https://itrustyou.com"],
  methods: ["GET", "POST", OPTIONS, HEAD],
  allowedHeaders: ["Content-Type"]
}));
```


