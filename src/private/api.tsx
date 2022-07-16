import { objectToQueryString } from '~Root/utils/functions';

export const ROOT_MOCK_URL = 'https://5dc0bb82-26c4-4071-ba82-fc6052b8c9ca.mock.pstmn.io';
export const MOCK_USER_INFO_URL = `${ROOT_MOCK_URL}/mock/users/current`;
export const MOCK_LIST_ASK_URL = `${ROOT_MOCK_URL}/mock/users/current`;
export const MOCK_CREATE_ASK_URL = `${ROOT_MOCK_URL}/asks/currentuser`;

// export const ROOT_URL = 'https://investor-api.referreach.com/api';
// export const ROOT_URL = 'https://api-0point8.referreach.com';
// export const ROOT_API_URL = 'https://api-0point8.referreach.com/api';
// export const SOCKET_URL = 'https://api-0point8.referreach.com';

export const ROOT_URL = 'https://referreach.np-platform.com';
export const ROOT_API_URL = 'https://referreach.np-platform.com/api';
export const SOCKET_URL = 'https://referreach.np-platform.com';

// For local
//export const ROOT_URL = 'http://10.0.2.2';
//export const ROOT_API_URL = 'http://10.0.2.2/api';
//export const SOCKET_URL = 'http://10.0.2.2';

export const LOGIN_URL = `${ROOT_API_URL}/v1/user/login`;

export const REGISTER_URL = `${ROOT_API_URL}/v1/user/register`;
export const CHECK_INVITE_CODE = (code: string) => `${ROOT_API_URL}/v1/invite/${code}`;
export const ACCOUNT_VERIFY = `${ROOT_API_URL}/v1/user/verify`;
export const RESEND_VERIFY_CODE = `${ROOT_API_URL}/v1/user/verify/resend`;
export const FORGOT_PASSWORD_URL = `${ROOT_API_URL}/v1/user/forgot-password`;
export const VERIFY_FORGOT_PASSWORD_URL = `${ROOT_API_URL}/v1/user/forgot-password/verify`;
export const UPDATE_PROFILE_URL = `${ROOT_API_URL}/v1/me`;
export const UPLOAD_IMAGE_URL = `${ROOT_API_URL}/v1/upload-image`;
export const DOWNLOAD_IMAGE_URL = (file: string) => `${ROOT_API_URL}/v1/download-image?fileKey=${file}`;
export const USER_INFO_URL = `${ROOT_API_URL}/v1/me`;
export const SUGGEST_CONNECTION = `${ROOT_API_URL}/v1/suggest`;
export const INVITE_DATA_URL = `${ROOT_API_URL}/v1/invite`;
export const INVITE_INCREASE_URL = `${ROOT_API_URL}/v1/invite/request`;
export const INVITE_LINK_URL = (code: string) => `${ROOT_API_URL}/v1/invite/link/${code}`;
export const REMOVE_NETWORK_URL = (code: string) => `${ROOT_API_URL}/v1/network/${code}`;
export const REMOVE_INVITE_URL = (code: string) => `${ROOT_API_URL}/v1/invite/${code}`;
export const CANCEL_INVITE_URL = (code: string) => `${ROOT_API_URL}/v1/invite/${code}/cancel`;
export const CLAIM_INVITE_URL = (code: string) => `${ROOT_API_URL}/v1/invite/claim/${code}`;
export const REFRESH_INVITE_URL = (code: string) => `${ROOT_API_URL}/v1/invite/secret/${code}`;
export const NETWORK_DATA_URL = `${ROOT_API_URL}/v1/network`;
export const ASK_DATA_URL = (page: number, limit: number, userCode?: string) =>
  userCode
    ? `${ROOT_API_URL}/v1/ask?userCode=${userCode}&page=${page}&limit=${limit}`
    : `${ROOT_API_URL}/v1/ask?page=${page}&limit=${limit}`;
export const CREATE_SINGLE_ASK_URL = `${ROOT_API_URL}/v1/ask`;
export const GET_ASK_IN_NETWORK = (page: number, limit: number, filter?: string) =>
  filter ?
    `${ROOT_API_URL}/v1/ask/network?page=${page}&limit=${limit}&filter=${filter}` :
    `${ROOT_API_URL}/v1/ask/network?page=${page}&limit=${limit}`;
export const GET_SINGLE_ASK_URL = (code: string) => `${ROOT_API_URL}/v1/ask/${code}`;
export const GET_INFO_ASK_BY_SECRET_URL = (code: string) => `${ROOT_API_URL}/v1/ask/secret/${code}`;
export const ASK_TEMPLATE_URL = `${ROOT_API_URL}/v1/ask-type`;
export const UPDATE_ASK_INFO = (code: string) => `${ROOT_API_URL}/v1/ask/${code}`;
export const REPORT_ASK_URL = (code: string) => `${ROOT_API_URL}/v1/report/${code}`;
export const UPDATE_ASK_END_INFO = (code: string) => `${ROOT_API_URL}/v1/ask/${code}/end-info`;
export const SHARE_ASK = (code: string) => `${ROOT_API_URL}/v1/ask-share/${code}`;
export const GET_MEMBER_ASK = (code: string) => `${ROOT_API_URL}/v1/ask/${code}/members`;
export const GET_ASK_FEEDBACK = (code: string) => `${ROOT_API_URL}/v1/ask/${code}/feedback`;
export const END_ASK = (code: string) => `${ROOT_API_URL}/v1/ask/${code}/end`;
export const CHAT_DATA_URL = (search: string, page: number, limit: number) =>
  `${ROOT_API_URL}/v1/chat?search=${search}&page=${page}&limit=${limit}`;
export const CHAT_GROUP_DATA_URL = (search: string, page: number, limit: number) =>
  `${ROOT_API_URL}/v1/chat/group?search=${search}&page=${page}&limit=${limit}`;
export const CHAT_INFO_URL = (code: string) => `${ROOT_API_URL}/v1/chat/${code}`;
export const CHAT_MESSAGE_DATA_URL = (chatCode: string, page: number, limit: number) =>
  `${ROOT_API_URL}/v1/message/${chatCode}?page=${page}&limit=${limit}`;
export const SEND_CHAT_MESSAGE_URL = (chatCode: string) => `${ROOT_API_URL}/v1/message/${chatCode}`;
export const GET_NOTIFICATION_URL = (chatCode: string) => `${ROOT_API_URL}/v1/notification/${chatCode}`;
export const SEND_APPROVE_NOTIFICATION_URL = (chatCode: string) =>
  `${ROOT_API_URL}/v1/notification/${chatCode}/approve`;
export const SEND_REJECT_NOTIFICATION_URL = (chatCode: string) => `${ROOT_API_URL}/v1/notification/${chatCode}/reject`;
export const CREATE_ASK_TEMPLATE_URL = (id: string) => `${ROOT_API_URL}/ask-template/${id}/submissions`;
export const CREATE_ASK_URL = `${ROOT_API_URL}/asks/currentuser`;
export const GET_ASK_LINK_URL = (id: string) => `${ROOT_API_URL}/asks/public_links/${id}`;
export const MATCHES_URL = `${ROOT_API_URL}/matches/currentuser`;
export const ASK_TEMPLATE_SUBMISSIONS_URL = `${ROOT_API_URL}/ask-template-submission`;
export const ASK_TEMPLATE_BY_REF_ID_URL = (id: string) => `${ROOT_API_URL}/ask-template-submission/reference_id/${id}`;
export const GET_ALL_INDUSTRIES_URL = `${ROOT_API_URL}/industries`;

// chat
export const CREATE_CHAT_IN_NETWORK = `${ROOT_API_URL}/v1/chat/network`;
export const CREATE_CHAT_BY_SHARE = `${ROOT_API_URL}/v1/chat/share`;
export const CREATE_CHAT_FOR_INTRODUCE = `${ROOT_API_URL}/v1/chat/exist-user`;
export const CREATE_CHAT_GENERAL = `${ROOT_API_URL}/v1/chat/general`;
export const CHAT_URL = (params: any) => {
  return `${ROOT_API_URL}/v1/chat?${objectToQueryString(params)}`;
};
export const CHAT_WITH_USER_URL = (code: string) => `${ROOT_API_URL}/v1/chat/with-user/${code}`;
export const SWITCH_CHAT_WITH_USER_URL = (code: string, params: any) => {
  return `${ROOT_API_URL}/v1/chat/switch/${code}?${objectToQueryString(params)}`;
};
export const SWITCH_CHAT_BY_ASK_CODE_URL = (code: string, params: any) => {
  return `${ROOT_API_URL}/v1/chat/ask/${code}?${objectToQueryString(params)}`;
};
export const GET_TOTAL_NEW_MESSAGE_WITH_USER_URL = (code: string) => {
  return `${ROOT_API_URL}/v1/chat/switch/${code}/message-total`;
};
export const UPDATE_NOTIFICATION_READ_COUNT = (code: string, count: number) => {
  return `${ROOT_API_URL}/v1/notification/${code}/read?count=${count}`;
};
export const CREATE_USER_ACTIVITY = `${ROOT_API_URL}/v1/user-activity`;
