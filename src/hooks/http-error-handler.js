import { useState, useEffect } from "react";

export default (httpClient) => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use(
    (req) => {
      return req;
    },
    (error) => {
      console.log("error1: ", error);
      setError(error);
    }
  );
  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (error) => {
      console.log("error2: ", error.message);
      setError(error);
    }
  );

  useEffect(() => {
    return () => {
      console.log("run eject: ", reqInterceptor, resInterceptor);
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  };
  console.log("interceptor: ", reqInterceptor, resInterceptor);
  console.log("httpClient", httpClient.interceptors);
  return [error, errorConfirmedHandler];
};
