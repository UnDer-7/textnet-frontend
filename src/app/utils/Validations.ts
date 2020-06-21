import { ValidationOptions } from 'react-hook-form';

export default abstract class Validations {
  public static readonly PASSWORD: ValidationOptions = {
    required: true,
    minLength: {
      message: 'tamanho minimo é 3',
      value: 3,
    },
  };

  private static readonly EMAIL_PATTERN: RegExp = new RegExp(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  );

  public static readonly EMAIL: ValidationOptions = {
    required: true,
    pattern: {
      value: Validations.EMAIL_PATTERN,
      message: 'e-mail inválido',
    },
  };
}
