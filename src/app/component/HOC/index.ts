import { WithBlockUIProps as BlockUIPros} from './withBlockUI';
import { WithToastProps as ToastProps } from './withToast';

export { default as withBlockUI } from './withBlockUI';
export type WithBlockUIProps<T = {}> = BlockUIPros & T;

export { default as withToast } from './withToast';
export type WithToastProps<T = {}> = ToastProps & T;
