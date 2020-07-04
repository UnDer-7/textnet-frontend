import { AxiosResponse } from 'axios';
import { Consumer, Runnable } from './Functions';


export default interface CommonServiceProps<DATA, SUCCESS = any> {
  data: DATA,
  onComplete?: Runnable,
  onSuccess?: Consumer<SUCCESS>
  onError?: Consumer<AxiosResponse<string>>,
}
