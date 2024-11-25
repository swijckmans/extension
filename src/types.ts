type Message<T extends string, Req, Res> = {
  type: T;
  payload: Req;
  response: Res;
};

export type RequestDataMessage = Message<
  "request-data",
  {
    url: string;
  },
  {
    siteData: string[];
    pageData: string[];
  }
>;

export type Messages = RequestDataMessage;
