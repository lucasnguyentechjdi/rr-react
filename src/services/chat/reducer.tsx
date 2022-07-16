import {IMAGES} from '~Root/config';
import {mergeUnique} from '~Root/utils/common';
import {
  LIST_MATCHES_REQUESTED,
  LIST_MATCHES_SUCCESS,
  LIST_MATCHES_FAILURE,
  GET_CHAT_DATA_SUCCESS,
  GET_CHAT_DATA_FAILURE,
  GET_MESSAGE_DATA_SUCCESS,
  SEND_MESSAGE_SUCCESS,
  VIEW_CHAT_DETAIL,
  GET_PAGE_CHAT_DATA_SUCCESS,
  UPDATE_CHAT_LAST_MESSAGE,
  GET_ASK_DETAIL,
} from './constants';
import {IChatState, STATUS_ENUM} from './types';

export const initialState: IChatState = {
  errors: [],
  loading: false,
  success: false,
  listMatches: [
    {id: '1', name: 'Kate Brady', image: IMAGES.avatar3},
    {id: '2', name: 'Jack Carlyle', image: IMAGES.avatar4},
    {id: '3', name: 'Sanjeev Kapur', image: IMAGES.avatar5},
    {id: '4', name: 'Alex Do', image: IMAGES.avatar6},
  ],
  peopleToAsks: [],
  chatData: [],
  chatPagination: {
    recordTotal: 1,
    pageCurrent: 1,
    recordPerPage: 10,
  },
  askInfo: null,
  messages: [],
  messagePagination: {
    recordTotal: 1,
    pageCurrent: 1,
    recordPerPage: 20,
  },
  chatInfo: null,
  callback: () => {},
};

const userReducer = (state: IChatState = initialState, action: any): IChatState => {
  switch (action.type) {
    case LIST_MATCHES_REQUESTED:
      return {...state, callback: action?.callback, loading: true};
    case LIST_MATCHES_SUCCESS:
      return {...state, loading: false, ...action.payload};
    case LIST_MATCHES_FAILURE:
      return {...state, loading: false, errors: [...action.payload.error]};
    case GET_CHAT_DATA_SUCCESS:
      return {...state, loading: false, chatData: [...action.payload.data], chatPagination: action.payload.metadata};
    case GET_PAGE_CHAT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        chatData: mergeUnique(state.chatData, action.payload.data),
        chatPagination: action.payload.metadata,
      };
    case UPDATE_CHAT_LAST_MESSAGE:
      // eslint-disable-next-line no-case-declarations
      const chatIndex = state.chatData.findIndex((item: any) => item.code === action.payload.code);
      if (chatIndex !== -1) {
        state.chatData[chatIndex].lastMessage = action.payload.lastMessage;
      }
      return {
        ...state,
        loading: false,
        chatData: [...state.chatData],
      };
    case GET_CHAT_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        chatData: [],
        chatPagination: {
          recordTotal: 1,
          pageCurrent: 1,
          recordPerPage: 10,
        },
      };
    case VIEW_CHAT_DETAIL:
      return {
        ...state,
        chatInfo: action.payload,
        messages: [],
        messagePagination: {
          recordTotal: 1,
          pageCurrent: 1,
          recordPerPage: 10,
        },
      };
    case GET_ASK_DETAIL:
      return {
        ...state,
        askInfo: action.payload,
      };
    case GET_MESSAGE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: mergeUnique(state.messages, action.payload.data),
        messagePagination: action.payload.metadata,
      };
    case SEND_MESSAGE_SUCCESS:
      return {...state, loading: false, messages: mergeUnique([action.payload], state.messages)};
    default:
      return state;
  }
};

export default userReducer;
