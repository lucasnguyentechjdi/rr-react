import {getType, ActionType} from "typesafe-actions";

import * as inviteActions from './actions';
import {createReducer} from "~Root/utils/redux";
import {TInviteState} from "./types";

const initialInviteState: TInviteState = {
  isRequesting: false,
}

const requesting = (state: TInviteState) => ({
  ...state,
  isRequesting: true,
})

const createInviteSuccess = (state: TInviteState, action: ActionType<typeof inviteActions.createInvite.success>) => ({
  ...state,
  isRequesting: false,
  massInviteCode: action.payload
})

const fetchUserMassInviteSuccess = (state: TInviteState, action: ActionType<typeof inviteActions.fetchUserMassInvite.success>) => {
  const massInviteCodes = action.payload.filter(item => item.status === 'new' && item.usesLeft);
  const massInviteCode = massInviteCodes.length ? massInviteCodes[0] : undefined;

  return {
    ...state,
    isRequesting: false,
    massInviteCode,
  }
}

const finishRequesting = (state: TInviteState) => ({
  ...state,
  isRequesting: false,
})

const cancelInviteSuccess = (state: TInviteState) => ({
  ...state,
  isRequesting: false,
  massInviteCode: undefined,
})

export default createReducer(initialInviteState, {
  [getType(inviteActions.createInvite.request)]: requesting,
  [getType(inviteActions.createInvite.success)]: createInviteSuccess,
  [getType(inviteActions.createInvite.failure)]: finishRequesting,
  [getType(inviteActions.fetchUserMassInvite.request)]: requesting,
  [getType(inviteActions.fetchUserMassInvite.success)]: fetchUserMassInviteSuccess,
  [getType(inviteActions.fetchUserMassInvite.failure)]: finishRequesting,
  [getType(inviteActions.cancelInvite.success)]: cancelInviteSuccess,
})
