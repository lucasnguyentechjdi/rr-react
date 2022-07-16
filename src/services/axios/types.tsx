export interface IResponse {
  data: {
    errCode: null | string;
    errDetail: string | null;
    result: any;
  };
}

export interface IResult {
  data: null | any;
  message: any;
  success: boolean;
}

export interface IResultWithPagination {
  metadata: {
    recordTotal: number;
    pageCurrent: number;
    recordPerPage: number;
  };
  data: any;
}

export interface IStatus {
  success: boolean;
  message: string;
}
