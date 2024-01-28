// globals.d.ts
interface Window {
    cameraStream?: MediaStream;
    microphoneStream?:MediaStream;
  }
  
// globals.d.ts
interface HTMLCanvasElement {
    captureStream(frameRate?: number): MediaStream;
  }
  