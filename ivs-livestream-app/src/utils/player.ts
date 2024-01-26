import get from "lodash/get";
import { Player } from "../types";

function getIVSPlayer() {
  return get(window, "IVSPlayer");
}

function createPlayer(): Player | undefined {
  const IVSPlayer = getIVSPlayer();
  if (!IVSPlayer) {
    console.error('IVSPlayer is not available on the window object.');
    return undefined;
  }
  
  const player = IVSPlayer.create();

  player.setAutoplay(true);
  player.setVolume(0);

  return player;
}

export { createPlayer };
