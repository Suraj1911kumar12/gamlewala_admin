import axios from "axios";

export const UpdateData = async (props) => {

    const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL + props.url}`,
        props.cred,
        {
            headers: {
                'Authorization': `bearer ${props.token}`,
            },
            withCredentials: true,
        },
    )
    return response;
};