function setTextContent(id: string, value: string) {
  (document.getElementById(id) as HTMLSpanElement).textContent = value;
}

function setPlayerState(state: string) {
  setTextContent("player-state", state);
}

function setStreamHealth(health: string) {
  setTextContent("stream-health", health);
}

function setStreamState(state: string) {
  setTextContent("stream-state", state);
}

function setViewerCount(count: number) {
  setTextContent("viewer-count", String(count));
}

export { setPlayerState, setStreamHealth, setStreamState, setViewerCount };
