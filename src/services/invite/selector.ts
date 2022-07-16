import {createSelector} from 'reselect';

import {IGlobalState} from "~Root/types";

import {IInvite} from "./types";

const massInviteCodeStateSelector = (state: IGlobalState): IInvite | undefined => {
  if (state.inviteState) {
    return state.inviteState.massInviteCode;
  }

  return;
}

export const massInviteCodeSelector = createSelector(massInviteCodeStateSelector, inviteCode => inviteCode);

export const isRequestingSelector = (state: IGlobalState): boolean => {
  if (state.inviteState) {
    return state.inviteState.isRequesting;
  }

  return false;
}
