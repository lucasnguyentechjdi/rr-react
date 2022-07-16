import {IMyAsk} from '~Root/services/user/types';
import {GET_MATCHES_REQUESTED, GET_MATCHES_SUCCESS, GET_MATCHES_FAILURE, SET_DATA_MATCHES} from './constants';

export interface IReplier {
  email: string;
  first_name: string;
  last_name: string;
  message: string;
  avatar_initial_letter: string;
}

export interface IAsker {
  self_intro: string;
}

export interface IMatch {
  id: string;
  data: {
    replier: IReplier;
    asker: IAsker;
    ask: IMyAsk;
  };
}

export interface IMatchesState {
  errors: string[];
  loading: boolean;
  matches: IMatch[];
  matchesSelected: IMatch[];
  callback?: () => void;
}

export interface IActionMatchesRequested {
  type: typeof GET_MATCHES_REQUESTED;
  callback?: any;
}
export interface IActionMatchesSuccess {
  type: typeof GET_MATCHES_SUCCESS;
  payload: {
    data: IMatch[];
    success: boolean;
    message: string;
  };
  callback?: () => void;
}
export interface IActionMatchesFailure {
  type: typeof GET_MATCHES_FAILURE;
  payload: {
    error: string;
  };
  callback?: () => void;
}

export interface IActionSetDataMatch {
  type: typeof SET_DATA_MATCHES;
  payload: IMatch;
}

export type IActionsUser =
  | IActionMatchesRequested
  | IActionMatchesSuccess
  | IActionMatchesFailure
  | IActionSetDataMatch;
