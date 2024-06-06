import axios from "axios";
import { deleteSession } from "../../hooks/session";

// API CALL METHOD TO DELETE AN ITEM
export const DeleteItem = (props) => {
  const response = axios.post(
    `${process.env.REACT_APP_API_BASE_URL + props.url}`,
    props.cred,
    {
      headers: {
        Authorization: `${props.token}`,
      },
      withCredentials: true,
    }
  )
  return response;
};
