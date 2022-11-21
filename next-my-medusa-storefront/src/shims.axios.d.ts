import { AxiosRequestConfig } from "axios"

declare module axios {
  export interface AxiosRequestConfig {
    raxConfig: any
  }
}
