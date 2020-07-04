import HttpClient from '../config/HttpClient';
import EnvVariables from '../utils/EnvVariables';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AxiosObservable } from 'axios-observable/dist/axios-observable.interface';
import * as QueryString from 'querystring';
import Verify from '../utils/Verify';
import InterceptorRejectResponse from '../Interceptor/InterceptorRejectResponse';

export default abstract class AbstractResource {
  private readonly HTTP: HttpClient;

  private readonly BASE_URL: string;

  protected constructor(resource: string) {
    const interceptorReject = InterceptorRejectResponse.getInstance();

    this.HTTP = HttpClient.getInstance({
      response: {
        onRejected: [
          interceptorReject.badRequest,
        ]
      }
    });
    this.BASE_URL = `${ EnvVariables.API_URL }/api/v1/${ resource }`;
  }

  protected get<T>(url = ''): Observable<T> {
    const formattedUrl = `${ this.BASE_URL }${url}`;

    return this.getResponseBody<T>(
      this.HTTP.get(formattedUrl)
    )
  }

  protected post<T>(body: {}, url: string = ''): Observable<T> {
    const formattedUrl = `${ this.BASE_URL }${url}`;

    return this.getResponseBody<T>(
      this.HTTP.post<T>(formattedUrl, body)
    );
  }

  protected createUrlWithQueryParams(url: string, params: {[key: string]: string | null | undefined}) {
    const newParams = { ...params};
    Object.keys(newParams)
      .filter((key) => Verify.isUndefinedOrNull(params[key]))
      .forEach((key) => delete newParams[key]);

    const query = QueryString.stringify(newParams);
    return `${url}?${query}`;
  }

  private getResponseBody<T>(observable: AxiosObservable<T>): Observable<T> {
    return observable.pipe(
      map((value) => value.data)
    );
  }
}
