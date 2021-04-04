interface DrawAction {
  _tag: "drawAction";
}
interface PassAction {
  _tag: "passAction";
}
interface GuessAction {
  _tag: "guessAction";
  // [0, temporaryCards+1]
  hiddenCardPosition: number;
}

export type UserAction = DrawAction | PassAction | GuessAction;
