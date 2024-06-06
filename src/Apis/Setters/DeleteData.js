import axios from "axios";

export const DeleteData = async (props) => {

    const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL + props.url}`,

        {
            headers: {
                'Authorization': `bearer ${props.token}`,
            },
            withCredentials: true,
        }
    )
    return response;
};