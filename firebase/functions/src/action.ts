import { Guess } from "./types";

interface DrawAction {
  _tag: "drawAction";
}
interface PassAction {
  _tag: "passAction";
}
interface GuessAction {
  _tag: "guessAction";
  guess: Guess;
}

export type UserAction = DrawAction | PassAction | GuessAction;
