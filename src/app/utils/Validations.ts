import { ValidationOptions } from 'react-hook-form';
import { Message, ValidationOption } from 'react-hook-form/dist/types';
import { isValid } from "date-fns";
import isEmail from 'validator/lib/isEmail';

export default abstract class Validations {
  private static readonly EMAIL_PATTERN: RegExp = new RegExp(
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
  );

  private static readonly CELLPHONE_PATTERN: RegExp = new RegExp(
    /^\([1-9]{2}\) [9][0-9]{4}-[0-9]{4}$/
  );

  private static readonly REQUIRED: Message | ValidationOption<boolean> = {
    message: 'campo obrigatório',
    value: true,
  };

  public static readonly THREE_LENGTH_MIN: ValidationOptions = {
    required: Validations.REQUIRED,
    minLength: {
      message: 'tamanho minimo é 3',
      value: 3,
    },
  };

  public static readonly EMAIL: ValidationOptions = {
    required: Validations.REQUIRED,
    validate: {
      invalidEmail: isEmail
    },
  };

  public static readonly CELLPHONE: ValidationOptions = {
    required: Validations.REQUIRED,
    pattern: {
      value: Validations.CELLPHONE_PATTERN,
      message: 'telefone inválido'
    },
  };

  public static readonly DATE: ValidationOptions = {
    required: Validations.REQUIRED,
    validate: isValid,
  }
}
