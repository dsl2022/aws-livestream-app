// You don't need to modify this file

// Listen to these events on the Player object
enum PlayerEvents {
  PLAYING = "Playing", // when the video is playing
  IDLE = "Idle", // when the video is paused or errored
  ERROR = "PlayerError", // when an error occurs
}

// Set this player state value in the DOM
enum PlayerState {
  PLAYING = "playing", // when the video is playing
  PAUSED = "not playing", // when the video is paused
}

// Set this stream health state value in the DOM
enum StreamHealth {
  HEALTHY = "healthy", // when stream is ok
  STARVING = "having problems", // when stream is having issues
}

// Set this stream state value in the DOM
enum StreamState {
  LIVE = "live", // when live streaming
  OFFLINE = "offline", // when nothing is streaming
}

interface StreamSummary {
  // ID of the stream for fetching more details about the stream
  id: string;
}

interface Stream {
  // ID of the stream, corresponds to the same in the above StreamSummary
  id: string;

  // Url of the stream to give to the video player
  playbackUrl: string;

  // The health of this stream
  health: keyof typeof StreamHealth;

  // The number of viewers of this stream
  viewerCount: number;

  // State of the stream
  state: keyof typeof StreamState;
}

// Wraps an underlying native HTMLVideoElement
interface Player {
  // Adds event listeners to the Player object
  // (not the underlying <video> element)
  addEventListener(name: PlayerEvents, callback: (args: any) => void): void;

  // Returns the underlying <video> element for any DOM manupilation
  // or DOM event handling
  getHTMLVideoElement(): HTMLVideoElement;
  
  // Returns if the video is paused or not
  isPaused(): boolean;

  // Loads the stream playback url to view the stream.
  // The stream will auto play after a load. This operation may
  // or may not be successfull and that will be signified by
  // emitting one of the PlayerEvents on the Player object.
  load(playbackUrl: string): void;

  // Plays the video stream. This operation may or may not be
  // successfull and that will be signified by emitting one of
  // the PlayerEvents on the Player object.
  play(): void;

  // Pauses the video stream. This operation may or may not be
  // successfull and that will be signified by emitting one of
  // the PlayerEvents on the Player object.
  pause(): void;
}

export {
  PlayerEvents,
  PlayerState, StreamHealth, StreamState
};  export type { Player, Stream, StreamSummary };

