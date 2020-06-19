import Assert from './Assert';

export default class EnvVariables {
  private constructor() {}

  public static readonly APP_NAME: string = 'Tex Net';

  public static readonly GOOGLE_CLIENT_ID: string = EnvVariables.getVariable('GOOGLE_CLIENT_ID');

  public static readonly FACEBOOK_APP_ID: string = EnvVariables.getVariable('FACEBOOK_APP_ID');

  public static readonly BASE_URL: string = EnvVariables.getVariable('BASE_URL');

  public static readonly PRIMARY_COLOR: string = '#7044ff';

  private static getVariable(name: string): string {
    const envName = `REACT_APP_${name}`;
    const env = process.env[envName];
    Assert.notBlank(env, { errorMessage: `Environment Variable [${ envName }] Not Fount` });

    // @ts-ignore
    return env;
  }
}
