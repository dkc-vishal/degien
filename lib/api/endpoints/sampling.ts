import { get } from "lodash";
import { apiClient } from "../client/axios-client";
import {
  User,
    SamplingStyle,
  CreateSamplingStyleRequest,
  GetSamplingStyleResponse
} from "../types/index";

export const SamplingStyleEndPoints = {
  createSamplingStyle: (data: CreateSamplingStyleRequest): Promise<SamplingStyle> =>
    apiClient.post("/sampling/master-styles/", data),

  getSamplingStyle: (styleId: string): Promise<SamplingStyle> =>
    apiClient.get(`/sampling/master-styles/${styleId}/`).then((response) => {
      const data = get(response, "data", {});
      return data as SamplingStyle;
    }),
  getAllSamplingStyles: (): Promise<GetSamplingStyleResponse> =>
    apiClient.get("/sampling/master-styles/").then((response) => {
      return response as GetSamplingStyleResponse;
    }),

};
