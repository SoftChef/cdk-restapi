export class HttpMethod {
  /**
   * HTTP GET Method
  */
  public static readonly GET = new HttpMethod('GET');
  /**
   * HTTP POST Method
  */
  public static readonly POST = new HttpMethod('POST');
  /**
   * HTTP PUT Method
  */
  public static readonly PUT = new HttpMethod('PUT');
  /**
   * HTTP DELETE Method
  */
  public static readonly DELETE = new HttpMethod('DELETE');
  /**
   * HTTP HEAD Method
  */
  public static readonly HEAD = new HttpMethod('HEAD');
  /**
   * HTTP PATH Method
  */
  public static readonly PATCH = new HttpMethod('PATCH');
  /**
   * HTTP OPTIONS Method
  */
  public static readonly OPTIONS = new HttpMethod('OPTIONS');
  /**
   * HTTP Method
  */
  public readonly method: string;

  constructor(method: string) {
    this.method = method;
  }

  public toString(): string {
    return this.method;
  }
}