import axios from "axios";
import { deleteSession } from "../../hooks/session";

const UpdateProfile = async (props) => {

    const token = window.sessionStorage.getItem("access-vs");
    const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}user/${props.url}`,
        props.cred,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        },
    )
    return response;
}

export default UpdateProfile