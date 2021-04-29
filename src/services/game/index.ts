import { functions } from "@/config/firebaseConfig";
import { UserAction } from "firebase/functions/src/action";
import { Card } from "firebase/functions/src/types";

/**
 * @returns game id
 */
export function initialize(args: {
  displayName: string;
  deck: Array<Card>;
}): Promise<string> {
  return functions
    .httpsCallable("initializeGame")({
      ...args
    })
    .then(({ data }) => data);
}

export function start(args: { gameId: string }) {
  return functions.httpsCallable("startGame")({ ...args });
}

export function join(args: { gameId: string; displayName: string }) {
  return functions.httpsCallable("connectToGame")({
    ...args
  });
}

export function runAction(args: { gameId: string; action: UserAction }) {
  return functions.httpsCallable("runAction")({
    ...args
  });
}
