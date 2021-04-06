import {
  DrawAction,
  PassAction,
  GuessAction
} from "../../firebase/functions/src/action";

export function drawAction(): DrawAction {
  return { _tag: "drawAction" };
}

export function passAction(): PassAction {
  return { _tag: "passAction" };
}

export function guessAction(args: { hiddenCardPosition: number }): GuessAction {
  const { hiddenCardPosition } = args;
  return { _tag: "guessAction", hiddenCardPosition };
}
