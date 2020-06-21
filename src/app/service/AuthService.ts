import { GoogleLoginResponse } from 'react-google-login';
import SessionResource from '../resource/SessionResource';
import CommonProps from '../models/types/CommonProps';
import { ConsumerImpl, RunnableImpl } from '../models/types/Functions';
import { finalize } from 'rxjs/operators';
import { FacebookIdWithEmail, GoogleIdWithEmail, PasswordWithEmail } from '../models/types/Form';
import { ReactFacebookLoginInfo } from 'react-facebook-login';

class AuthService {
  public signInWithEmail({
                           data,
                           onComplete = RunnableImpl,
                           onError = ConsumerImpl,
                         }: CommonProps<PasswordWithEmail, string>): void {
    SessionResource.signInWithEmail(data)
      .pipe(finalize(onComplete))
      .subscribe(
        (res) => {
          console.log('----SUCCESS EMAIL----');
          console.log('PAYLOAD: ', res);
          console.log('----');
        },
        (err) => onError(err),
      )
  }

  public signInWthFacebook({
                             data,
                             onComplete = RunnableImpl,
                             onError = ConsumerImpl,
                           }: CommonProps<ReactFacebookLoginInfo, string>): void {
    const payload: FacebookIdWithEmail = {
      // @ts-ignore
      email: data.email,
      // @ts-ignore
      name: data!.name,
      userId: data!.id
    }

    SessionResource.signInWithFacebook(payload)
      .pipe(finalize(onComplete))
      .subscribe(
        (res) => console.log('RES FACE: ', res),
        (err) => onError(err),
      );
  }

  public signInWthGoogle({
                           data,
                           onComplete = RunnableImpl,
                           onError = ConsumerImpl,
                         }: CommonProps<GoogleLoginResponse, string>): void {
    const payload: GoogleIdWithEmail = {
      google_id: data.googleId,
      email: data.getBasicProfile().getEmail(),
      name: data.getBasicProfile().getName(),
    };

    SessionResource.signInWithGoogle(payload)
      .pipe(finalize(onComplete))
      .subscribe(
        (res) => {
          console.log('----SUCCESS SIGN IN GOOGLE----');
          console.log('PAYLOAD: ', res);
          console.log('----');
        },
        (err) => onError(err),
      );
  }
}

export default new AuthService();
