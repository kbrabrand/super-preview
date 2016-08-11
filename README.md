# Super preview client

## Response format
The response consist of three segments, structured in the following way:

```
42:33:<binary data>
```

By splitting out the first 6 characters of the response and prepending the headers that's the same for all files, we're able to recreate the JPEG file and make it possible to view it in the browser.