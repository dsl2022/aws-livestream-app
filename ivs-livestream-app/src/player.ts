import get from "lodash/get";
import { Player } from "./types";

function getIVSPlayer() {
  return get(window, "IVSPlayer");
}

function createPlayer(): Player {
  const player = getIVSPlayer().create();

  player.setAutoplay(true);
  player.setVolume(0);

  return player;
}

export { createPlayer };
