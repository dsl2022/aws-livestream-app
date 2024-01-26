In this exercise you will utilize our APIs and SDKs to build a video player for a live stream and additionally show some metadata associated with the stream to the viewer. The data can be requested via the provided APIs or from the created video player object. Clicking on the video in the view should toggle play / pause for the video and this state should also be reflected in the view.

The following metadata is associated with a live stream and the associated video player and needs to be show in the view.

1. Stream state
* whether the stream in live or not
* string values to put in the view: live, offline
2. Stream health
* whether the stream is healthy or having issues
* string values to put in the view:  healthy, not healthy
3. Viewer count
* how many people are viewing this stream
* number value to put in the view
4. Player state
* whether the player is playing or paused
* string values to put in the view:  playing, not playing


## Provided Files

The files relevant for you are as follows. Ignore rest of the files.

1. index.ts
* This is the only file you should modify to fill in your implementation
2. types.ts
* You do not need to modify this file.
* This holds the API response object structures, the events that the player fires, and the methods available on the player object.
* Familiarize yourself with all the objects and events you will work with in this exercise. These types can be imported into your implementation if needed.
3. ivs.ts
* You do not need to modify this file.
* This file exports the listStreams & getStream API functions.
4. player.ts
* You do not need to modify this file.
* This file exports the createPlayer function.
5. dom.ts
* You do not need to modify this file.
* This file exports the setPlayerState, setStreamHealth, setStreamState, setViewerCount functions.