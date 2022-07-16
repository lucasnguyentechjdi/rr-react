import { createAsyncAction } from 'typesafe-actions';

import {ICreateInvitePayload, IInvite} from './types';
import {INVITE_ACTIONS} from "./constants";
import {IResult} from '../axios/types';

export const createInvite = createAsyncAction(
  `${INVITE_ACTIONS}/CREATE/REQUEST`,
  `${INVITE_ACTIONS}/CREATE/SUCCESS`,
  `${INVITE_ACTIONS}/CREATE/FAILURE`,
)<ICreateInvitePayload, IInvite, IResult>();

export const fetchUserMassInvite = createAsyncAction(
  `${INVITE_ACTIONS}/FETCH_MASS_INVITE/REQUEST`,
  `${INVITE_ACTIONS}/FETCH_MASS_INVITE/SUCCESS`,
  `${INVITE_ACTIONS}/FETCH_MASS_INVITE/FAILURE`,
)<undefined, IInvite[], IResult>();

export const cancelInvite = createAsyncAction(
  `${INVITE_ACTIONS}/CANCEL/REQUEST`,
  `${INVITE_ACTIONS}/CANCEL/SUCCESS`,
  `${INVITE_ACTIONS}/CANCEL/FAILURE`,
)<string, any, IResult>();
