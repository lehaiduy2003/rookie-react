import api from "@/configs/axios";

export default abstract class BaseService {
  protected http = api;

  protected buildParams(params: Record<string, string>) {
    return new URLSearchParams(params).toString();
  }
}
