import UserResource from '../resource/UserResource';
import { ConsumerImpl, RunnableImpl } from '../models/types/Functions';
import CommonServiceProps from '../models/types/CommonServiceProps';
import { finalize } from 'rxjs/operators';
import User from '../models/User';
import UserType from '../models/UserType';

class UserService {
  public createUser({
                      data,
                      onComplete = RunnableImpl,
                      onError = ConsumerImpl,
                      onSuccess = ConsumerImpl,
                    }: CommonServiceProps<User>): void {
    UserResource.createUser(data)
      .pipe(finalize(onComplete))
      .subscribe(
        onSuccess,
        onError,
      );
  }

  public createUserWithGoogle({
                                data,
                                onComplete = RunnableImpl,
                                onError = ConsumerImpl,
                                onSuccess = ConsumerImpl,
                              }: CommonServiceProps<User>): void {
    UserResource.createUser({
      ...data,
      type: UserType.GOOGLE_USER
    }).pipe(finalize(onComplete))
      .subscribe(
        onSuccess,
        onError,
      );
  }

  public canCreateUser({
                         data,
                         onComplete = RunnableImpl,
                         onError = ConsumerImpl,
                         onSuccess = ConsumerImpl,
                       }: CommonServiceProps<string, boolean>): void {
    UserResource.canCreateUser(data)
      .pipe(finalize(onComplete))
      .subscribe(
        onSuccess,
        onError,
      )
  }
}

export default new UserService();
