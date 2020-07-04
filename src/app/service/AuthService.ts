import { GoogleLoginResponse } from 'react-google-login';
import SessionResource from '../resource/SessionResource';
import CommonServiceProps from '../models/types/CommonServiceProps';
import { ConsumerImpl, RunnableImpl } from '../models/types/Functions';
import { finalize } from 'rxjs/operators';
import { FacebookIdWithEmail, GoogleIdWithEmail } from '../models/types/Form';
import { ReactFacebookLoginInfo } from 'react-facebook-login';

class AuthService {
  public signIn({
    data,
    onComplete = RunnableImpl,
    onError = ConsumerImpl,
    onSuccess = ConsumerImpl,
                }: CommonServiceProps<{email: string, secret: string}>): void {
    SessionResource.signIn(data)
      .pipe(finalize(onComplete))
      .subscribe(
        onSuccess,
        onError,
      )
  }

  public signInWthFacebook({
                             data,
                             onComplete = RunnableImpl,
                             onError = ConsumerImpl,
                           }: CommonServiceProps<ReactFacebookLoginInfo, string>): void {
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
                         }: CommonServiceProps<GoogleLoginResponse, string>): void {
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
