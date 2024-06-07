import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ApiCall = async (endPoint, method, body, isAuth=false) => {
  try {
  const BaseUrl = process.env.REACT_APP_API_SERVER_PORT;
    const fetchOptions = isAuth
      ? {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
        }
      : {
          method: method,
          headers: {
            "Content-Type": "application/json",
          },
        };

    if (body) {
      fetchOptions.data = body;
    }
const API_URL = BaseUrl+endPoint;
    const hitFetch = await axios(API_URL, fetchOptions);

    const data = hitFetch.data;
    return data;
  } catch (error) {
    const errorMessage = error?.response
      ? error?.response?.data.detail
      : "Please try again";
    console.log(errorMessage);

  }
};
