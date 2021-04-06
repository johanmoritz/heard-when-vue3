export interface DrawAction {
  _tag: "drawAction";
}
export interface PassAction {
  _tag: "passAction";
}
export interface GuessAction {
  _tag: "guessAction";
  // [0, temporaryCards+1]
  hiddenCardPosition: number;
}

export type UserAction = DrawAction | PassAction | GuessAction;
