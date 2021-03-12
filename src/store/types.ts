import {
  ActionContext,
  ActionTree,
  CommitOptions,
  DispatchOptions,
  MutationTree,
  Store as VuexStore
} from "vuex";

//***** This file exports some helper types to ensure type correctness in vuex *****/
// Sources:
//  - https://dev.to/3vilarthas/vuex-typescript-m4j
//  - https://gist.github.com/javisperez/b13d02042620ae663f0a1f81b050ca69

type AnyFunction = (...args: any[]) => any;
type FunctionObject = { [key: string]: AnyFunction };

/**
 * Enforces correct use of mutations in actions.
 */
type AugmentedActionContext<
  Mutations extends FunctionObject,
  State,
  RootState = {}
> = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, RootState>, "commit">;

// Here are some helpers for creating mutations and actions

export type ActionWithPayload<
  Mutations extends FunctionObject,
  State,
  RootState,
  Payload
> = (
  context: AugmentedActionContext<Mutations, State, RootState>,
  payload: Payload
) => void;

export type ActionWithoutPayload<
  Mutations extends FunctionObject,
  State,
  RootState
> = (context: AugmentedActionContext<Mutations, State, RootState>) => void;

export type MutationWithPayload<State, Payload> = (
  state: State,
  payload: Payload
) => void;

export type MutationWithoutPayload<State> = (state: State) => void;

/**
 * Redefines the type of a vuex Store to include information
 * such as valid mutations/actions as payloads and correct use of state.
 */
export type Store<
  State,
  Mutations extends MutationTree<State> & FunctionObject,
  Actions extends ActionTree<State, RootState> & FunctionObject /*, Getters*/,
  RootState = {}
> = Omit<VuexStore<State>, "getters" | "commit" | "dispatch"> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
  // TODO: Add getters
  // & {
  //   getters: {
  //     [K in keyof Getters]: ReturnType<Getters[K]>
  //   }
};
