import get from "lodash/get";
import { Player } from "./types";

// Define an interface for the IVSPlayer object
interface IVSPlayer {
  create: () => Player;
}

function getIVSPlayer(): IVSPlayer | undefined {
  // Use type assertion here
  return get(window, "IVSPlayer") as IVSPlayer | undefined;
}

function createPlayer(): Player | undefined {
  const IVSPlayer = getIVSPlayer();
  if (!IVSPlayer) {
    console.error("IVSPlayer is not available.");
    return undefined;
  }

  const player = IVSPlayer.create() as Player;

  (player as any).setAutoplay(true);
  player.setVolume(0);

  return player;
}

export { createPlayer };
