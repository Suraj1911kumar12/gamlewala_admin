import axios from "axios";
import useSession, { deleteSession } from "../../hooks/session";

export const UpdateData = async (props) => {
  const [setSession, getSession] = useSession();
  const token = getSession("authorization");

  const response = await axios.post(
    `${process.env.REACT_APP_API_BASE_URL}/${props.url}`,
    props.cred,
    {
      headers: {
        Authorization: `${token}`,
      },
      withCredentials: true,
    }
  )
  return response;
};
