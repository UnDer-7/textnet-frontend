import { Consumer } from '../models/types/Functions';
import { ToastProps } from '../component/HOC/withToast';
import Assert from '../utils/Assert';

export default abstract class InterceptorConfigure {
  protected static setToast: Consumer<ToastProps>;

  public static configure(setToast: Consumer<ToastProps>): void {
    Assert.notNull(setToast);

    this.setToast = setToast;
  }
}
