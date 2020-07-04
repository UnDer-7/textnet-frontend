import AbstractResource from './AbstractResource';
import { Observable, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FacebookIdWithEmail, GoogleIdWithEmail, PasswordWithEmail } from '../models/types/Form';

class SessionResource extends AbstractResource {
  public constructor() {
    super('auth');
  }

  public signIn(body: {email: string, secret: string}): Observable<string> {
    return this.post<string>(body, '/sign-in');
  }

  public signInWithEmail(data: PasswordWithEmail): Observable<any> {
    return timer(3000)
      .pipe(
        tap(() => {
          console.log('----SIGN IN GOOGLE----');
          console.log('PAYLOAD: ', data);
          console.log('--------');
        })
      );
  }

  public signInWithFacebook(data: FacebookIdWithEmail): Observable<any> {
    return timer(3000)
      .pipe(
        tap(() => {
          console.log('----SIGN IN FACEBOOK----');
          console.log('PAYLOAD: ', data);
          console.log('--------');
        })
      );
  }

  public signInWithGoogle(data: GoogleIdWithEmail): Observable<any> {
    return timer(3000)
      .pipe(
        tap(() => {
          console.log('----SIGN IN GOOGLE----');
          console.log('PAYLOAD: ', data);
          console.log('--------');
        })
      );
  }
}

export default new SessionResource()
