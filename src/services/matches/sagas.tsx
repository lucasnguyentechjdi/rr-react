import {GET_MATCHES_FAILURE, GET_MATCHES_REQUESTED, GET_MATCHES_SUCCESS} from './constants';
import {all, put, takeEvery} from 'redux-saga/effects';

import {IActionMatchesRequested} from './types';

const mockData = [
  {
    id: 6,
    data: {
      replier: {
        email: 'Catseller@gmail.com',
        first_name: 'Cat',
        last_name: 'Seller',
        message:
          'Yes, I sell cats. Many many of them. They are soooo cute! 😻😻😻😻\n\nYes, I sell cats. Many many of them. They are soooo cute! 😻😻😻😻\nYes, I sell cats. Many many of them. They are soooo cute! 😻😻😻😻\nYes, I sell cats. Many many of them. They are soooo cute! 😻😻😻😻\nYes, I sell cats. Many many of them. They are soooo cute! 😻😻😻😻\nYes, I sell cats. Many many of them. They are soooo cute! 😻😻😻😻\n\n',
        avatar_initial_letter: 'CS',
      },
      asker: {
        self_intro: 'Some Yusry H selfintro goes here. Some Yusry H selfintro goes here 22.',
      },
      ask: {
        id: 7,
        purpose_of_ask: 'Custom',
        a_provider_of: null,
        from_company: null,
        looking_for: 'a cat adoption provider',
        to_talk_about: 'adopting a Siamese cat',
        based_in: 'Singapore',
        within_next: '9999-12-31',
        other_info: 'Kittens and adult cats are fine.',
      },
    },
  },
  {
    id: 5,
    data: {
      replier: {
        email: 'kellychoo@gmail.com',
        first_name: 'Kelly',
        last_name: 'Choo Hon Min',
        message: 'I know a bitcoin miner\n',
        avatar_initial_letter: 'KC',
      },
      asker: {
        self_intro: 'Some Yusry H selfintro goes here. Some Yusry H selfintro goes here 22.',
      },
      ask: {
        id: 14,
        purpose_of_ask: 'Looking for customer',
        a_provider_of: null,
        from_company: null,
        looking_for: 'bitcoin miners',
        to_talk_about: 'collaboration',
        based_in: 'Malaysia',
        within_next: '9999-12-31',
        other_info: 'My website',
      },
    },
  },
  {
    id: 4,
    data: {
      replier: {
        email: 'testing111@gmail.com',
        first_name: 'Testing',
        last_name: '111',
        message: 'testing111@gmail.com',
        avatar_initial_letter: 'T1',
      },
      asker: {
        self_intro: 'Some Yusry H selfintro goes here. Some Yusry H selfintro goes here 22.',
      },
      ask: {
        id: 11,
        purpose_of_ask: 'Find a partner',
        a_provider_of: null,
        from_company: null,
        looking_for: 'Angel Investors',
        to_talk_about: 'AI-Powered Matching Solution',
        based_in: 'Singapore',
        within_next: '2021-11-22',
        other_info: 'https://referreach.com',
      },
    },
  },
  {
    id: 3,
    data: {
      replier: {
        email: 'yusry.harfuddin@gmail.com',
        first_name: 'Cat',
        last_name: 'Adoption House',
        message: 'I have a few Siamese cats available for adoption.',
        avatar_initial_letter: 'CA',
      },
      asker: {
        self_intro: 'Some Yusry H selfintro goes here. Some Yusry H selfintro goes here 22.',
      },
      ask: {
        id: 7,
        purpose_of_ask: 'Custom',
        a_provider_of: null,
        from_company: null,
        looking_for: 'a cat adoption provider',
        to_talk_about: 'adopting a Siamese cat',
        based_in: 'Singapore',
        within_next: '9999-12-31',
        other_info: 'Kittens and adult cats are fine.',
      },
    },
  },
];

function* sagaGetMatches(payload: IActionMatchesRequested) {
  try {
    yield put({type: GET_MATCHES_SUCCESS, payload: {data: mockData}});
    payload?.callback({
      error: '',
      ...mockData,
    });
    // const response: IActionMatchesSuccess['payload'] = yield call(MatchesAPI.getMatches);
    // if (response) {
    //   yield put({type: GET_MATCHES_SUCCESS, payload: response});
    //   payload?.callback({
    //     error: '',
    //     ...response,
    //   });
    // } else {
    //   yield put({type: GET_MATCHES_FAILURE, payload: {error: response}});
    //   payload?.callback({
    //     error: response,
    //   });
    // }
  } catch (error) {
    yield put({type: GET_MATCHES_FAILURE, payload: {error: error.message}});
  }
}

export default function* userWatchers() {
  yield all([takeEvery(GET_MATCHES_REQUESTED, sagaGetMatches)]);
}
