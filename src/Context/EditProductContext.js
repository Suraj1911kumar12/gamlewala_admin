import { createContext, useState } from "react";

// creating context api
export const EditProductContext = createContext(null);

// creting context api wrapper to wrap child components
const EditProductContextWrapper = (props) => {

    // declaring state for login status
    const [id, setId] = useState(false);

    return (
        // passing login state getter and setter as context value
        <EditProductContext.Provider value={[id, setId]}>
            {/* wrapping up child components */}
            {props.children}
        </EditProductContext.Provider>
    );
};

export default EditProductContextWrapper;