import { firestore, initializeApp } from "firebase-admin";
import * as functions from "firebase-functions";
import { UserAction } from "./action";
import {
  eventsFromAction,
  executeEvents,
} from "./domain";
import { GameDocument } from "./types";

initializeApp();
const db = firestore();

export const initializeGame = functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid;

  if (uid === undefined) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      `Needs to be authenticated.`
    );
  }

  const initalGame: GameDocument.Game = {
    currentPlayer: 
    
  }

  db.collection('game').add({})
})

/**
 * Called by players.
 * Transforms actions into events which are queued up.
 */
export const runAction = functions.https.onCall(async (data, context) => {
  const action: UserAction | undefined = data.action;
  const gameId: string | undefined = data.gameId;
  const uid = context.auth?.uid;

  if (action === undefined || gameId === undefined || uid === undefined) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      `Needs to be authenticated and have 'action' and 'gameId'.`
    );
  }

  const gameRef = db
    .collection("game")
    .doc(gameId) as firestore.DocumentReference<GameDocument.Game>;

  await db.runTransaction(async (transaction) => {
    const game = await transaction.get(gameRef).then((result) => result.data());
    if (game === undefined) {
      //  Should not happen
      return;
    }

    const events = eventsFromAction({ action, state: game });
    const newGameState = executeEvents({ events: events, game });
    transaction.set(gameRef, newGameState);
  });

  return Promise.resolve();
});
