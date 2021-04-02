import { firestore, initializeApp } from "firebase-admin";
import * as functions from "firebase-functions";
import { UserAction } from "./action";
import {
  eventsFromAction,
  executeEvents,
  player,
  stepGameStateMachine,
} from "./domain";
import { Deck, GameDocument } from "./types";

initializeApp();
const db = firestore();

/**
 * Create a new game.
 */
export const initializeGame = functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid;
  const displayName = data?.displayName as string | undefined;
  const deck = data?.deck as Deck | undefined;

  if (uid === undefined || displayName === undefined || deck === undefined) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      `Needs to be authenticated. Needs: 'displayName', 'deck'.`
    );
  }

  const firstPlayer = player({ id: uid, displayName });

  const initialGame: GameDocument.Game = {
    currentPlayer: firstPlayer,
    players: [firstPlayer],
    deck,
    currentHiddenCard: undefined,
    goalNumberOfCards: 7,
    log: [],
    phase: "newTurn",
    status: "initialized",
  };

  const gameRef = await db.collection("game").add(initialGame);
  return gameRef;
});

/**
 * Connect as a player to a game that has not started yet.
 */
export const connectToGame = functions.https.onCall(async (data, context) => {
  const uid = context?.auth?.uid;
  const gameId = data?.gameId as string | undefined;
  const displayName = data?.displayName as string | undefined;

  if (uid === undefined || gameId === undefined || displayName === undefined) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      `Needs to be authenticated. Needs: 'gameId', 'displayName'.`
    );
  }

  const gameRef = db.collection("game").doc(gameId);
  const addPlayer = firestore.FieldValue.arrayUnion(
    player({ id: uid, displayName })
  );
  gameRef.update(addPlayer);
});

/**
 * Start an initialized game.
 */
export const startGame = functions.https.onCall(async (data, context) => {
  // TODO
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

    const newPhase = stepGameStateMachine({
      symbol: action,
      status: game.phase,
    });
    if (newPhase === undefined) {
      // Invalid action
      return;
    }

    const events = eventsFromAction({
      action,
      state: { ...game, phase: newPhase },
    });
    const gamePostEvents = executeEvents({
      events: events,
      game: { ...game, phase: newPhase },
    });
    transaction.set(gameRef, gamePostEvents);
  });

  return Promise.resolve();
});
