import AbstractResource from '../resource/AbstractResource';
import { Observable, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FacebookIdWithEmail, GoogleIdWithEmail, PasswordWithEmail } from '../models/types/Form';

class SessionResource extends AbstractResource {
  public constructor() {
    super('session');
  }

  public signInWithEmail(data: PasswordWithEmail): Observable<any> {
    // const url = `${ this.BASE_URL }/email`;

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
    const url = `${ this.BASE_URL }/facebook`;

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
    const url = `${ this.BASE_URL }/google`;

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
