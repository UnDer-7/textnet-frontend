import InterceptorConfigure from '../config/InterceptorConfigure';
import { AxiosResponse } from 'axios';

export default class InterceptorRejectResponse extends InterceptorConfigure {
  private static instance: InterceptorRejectResponse;

  private constructor() {
    super();
  }

  public static getInstance(): InterceptorRejectResponse {
    if (!this.instance) {
      InterceptorRejectResponse.instance = new InterceptorRejectResponse();
    }

    return this.instance;
  }

  public badRequest({data, status}: AxiosResponse): void {
    if (status === 400) {
      if (data.hasOwnProperty('message')) {
        InterceptorRejectResponse.setToast({
          message: data.message,
          show: true,
          type: 'error'
        })
      } else if (data.hasOwnProperty('errors')) {
        data.errors.forEach((erro: any) => {
          InterceptorRejectResponse.setToast({
            message: erro.msg,
            show: true,
            type: 'error',
          })
        });
      }
    }
  }

  private handleValidationsErros = (data: any): void => {
    debugger
  }

  private handleAssertionErros = (data: any): void => {
  }
}
