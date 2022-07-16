import {IActionInitializeAuthRequested} from './types';
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class AuthAPI {
  static async fetchAll(
    payload: IActionInitializeAuthRequested['payload'],
  ): Promise<IActionInitializeAuthRequested['payload']> {
    return payload;
  }
}
