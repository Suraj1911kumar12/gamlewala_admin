import axios from "axios";

export const AddData = async (props) => {

    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL + props.url}`,
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