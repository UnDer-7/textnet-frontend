import { BehaviorSubject } from 'rxjs';
import User from '../models/User';

const observable = new BehaviorSubject<User | null>(null);

const UserStore = {
  send: (data: User) => observable.next(data),
  listen: () => observable.asObservable(),
  currentUser: () => observable.getValue(),
  unsubscribe: () => observable.unsubscribe()
}

export default UserStore;
