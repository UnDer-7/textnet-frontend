export default class Sanitizer {
  public static cellphone(value: string): string {
    return value.replace(/[() -]/g, '')
  }
}
