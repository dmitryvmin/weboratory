export enum AllowedMethods {
  "POST",
  "GET",
  "PUT",
  "DELETE"
}

export type Body =
  string
  | Blob
  | ArrayBufferView
  | ArrayBuffer
  | FormData
  | URLSearchParams
  | ReadableStream<Uint8Array>
  | null
  | undefined;

export type Method = keyof typeof AllowedMethods;

export type _Headers =
  Headers
  | string[][]
  | Record<string, string>
  | undefined;

export interface Props<T> {
  url?: string;
  method?: Method;
  headers?: _Headers;
  body?: Body | T[];
}