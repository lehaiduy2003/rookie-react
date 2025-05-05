import api from "@/configs/axios";

export default abstract class BaseService {
  protected http = api;

  /**
   * Builds a URL with query parameters.
   * @param params an object containing the parameters to be converted
   * @returns a string of URL-encoded parameters
   */
  protected buildParams(params: Record<string, string>) {
    return new URLSearchParams(params).toString();
  }
}
