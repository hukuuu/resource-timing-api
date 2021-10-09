# Sample project to explore [Resource Timing API](https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API)

## Run

1. run
 ```
npm i && node server.js
```
2. open http://localhost:8000/index.html
3. start the video
4.  open developer tools and type

```
calculateSpeed()
```

## Caveats 
- Streaming server must set the following header in order for the browser to be able to read response details such as content length
```
	'Timing-Allow-Origin': '*',
```

## TODO

- [ ] handle cached videos
- [ ] implement moving average
	- right now it calculates average on all requests