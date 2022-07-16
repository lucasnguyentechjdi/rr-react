import {IField} from '../ask/types';

export interface IAskType {
  code: string;
  name: string;
  isCustom: boolean;
  template: IField[];
}
