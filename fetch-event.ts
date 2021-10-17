export type FetchEvent = {
  request: Request;
  respondWith: (response: Response | Promise<Response>) => void;
};
