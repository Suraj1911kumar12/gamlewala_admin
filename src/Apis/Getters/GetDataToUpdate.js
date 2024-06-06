import axios from "axios";

export const GetDataToUpdate = async (props) => {

    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL + props.url}`,
        props.cred,
        {
            headers: {
                'Authorization': `${props.token}`,
            },
            withCredentials: true,
        },
    )
    return response;
};