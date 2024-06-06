import axios from "axios";

export const GetData = async (props) => {

    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL + props.url}`,
        {
            headers: {
                'Authorization': `bearer ${props.token}`,
            },
            withCredentials: true,
        },
    )
    return response;
};