import api from "@/configs/AxiosInstance";

export default abstract class BaseService {
  protected http = api;
}
