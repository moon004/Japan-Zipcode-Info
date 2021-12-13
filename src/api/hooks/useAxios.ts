import { SetStateAction, Dispatch } from "react";
import axios, { AxiosResponse } from "axios";

export interface Results {
  zipcode: string;
  address1: string;
  address2: string;
  address3: string;
  kana1: string;
  kana2: string;
  kana3: string;
  prefcode: string;
}

export interface ZipCodeRes {
  status: number;
  message: string | null;
  results: Results[] | null;
}

interface UseAxios {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setResponse: Dispatch<SetStateAction<any>>;
  setError: Dispatch<SetStateAction<string>>;
}

axios.defaults.baseURL = "https://zipcloud.ibsnet.co.jp/api";

export const useAxios = (p: UseAxios) => {
  const fetchData = async (param: string) => {
    p.setError("");
    p.setLoading(true);
    try {
      const result: AxiosResponse<ZipCodeRes> = await axios.request({
        method: "GET",
        url: "/search",
        params: {
          zipcode: param,
        },
      });

      if (result.data.status > 300 && result.data.message) {
        p.setError(result.data.message);
      } else if (result.data.status <= 200 && !result.data.results) {
        p.setError("情報が見つかりません, また別の番号入れてください");
      }
      p.setResponse(result.data);
    } catch (error: any) {
      console.log("setError", error);
      p.setError(error);
    } finally {
      p.setLoading(false);
    }
  };

  return { fetchData };
};
