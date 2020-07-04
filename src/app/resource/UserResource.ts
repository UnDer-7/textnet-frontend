import AbstractResource from './AbstractResource';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import User from '../models/User';

class UserResource extends AbstractResource {
  public constructor() {
    super('users');
  }

  public createUser(body: User): Observable<any> {
    return this.post<any>(body, )
  }

  public canCreateUser(email: string): Observable<boolean> {
    return this.get<{canCreate: boolean}>(`/can-create/email/${email}`)
      .pipe(
        map((response) => response.canCreate),
        delay(700), //fixme: talvez remover em prod
      );
  }
}

export default new UserResource();
