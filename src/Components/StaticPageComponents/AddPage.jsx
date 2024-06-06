import React, { useState } from 'react'
import EditorComponent from '../EditorComponent';
import { AddData } from '../../Apis/Setters/AddData';
import useSession from '../../hooks/session';

const AddPage = () => {

    const [setSession, getSession] = useSession()


    // ALERT STATUS & MESSAGE STATE
    const [alert, setAlert] = useState({
        errStatus: false,
        successStatus: false,
        errMessage: "",
        successMessage: "",
    });

    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // FINAL SUBMIT
    const page = (e) => {
        e.preventDefault();
        let token = getSession("authorization");
        const credentials = {
            //   pageId: id,
            title: title,
            slug: title.toLowerCase().trim().replace(/\s/g, ""),
            content: value,
            description: description,
        };

        AddData({ url: "static-page/create", cred: credentials, token: token })
            .then((res) => {
                window.scrollTo(0, 0);
                if (res.data.status) {
                    window.scrollTo(0, 0);
                    setValue("");
                    setTitle("");
                    setDescription("");
                    setAlert({
                        successStatus: true,
                        errStatus: false,
                        successMessage: res?.data?.msg,
                        errMessage: "",
                    });
                    setTimeout(() => {
                        setAlert({
                            errStatus: false,
                            successStatus: false,
                            errMessage: "",
                            successMessage: "",
                        });
                    }, 1000);
                }
            })

            .catch((err) => {
                window.scrollTo(0, 0);
                if (err?.response?.data?.msg) {
                    console.log(err?.response?.data?.msg);
                    setAlert({
                        errStatus: true,
                        successStatus: false,
                        errMessage: err?.response?.data?.msg,
                        successMessage: "",
                    });
                    setTimeout(() => {
                        setAlert({
                            errStatus: false,
                            successStatus: false,
                            errMessage: "",
                            successMessage: "",
                        });
                    }, 2000);
                } else {
                    console.log(err);
                    setAlert({
                        errStatus: true,
                        successStatus: false,
                        errMessage: err?.response?.data?.errors,
                        successMessage: "",
                    });
                    setTimeout(() => {
                        setAlert({
                            errStatus: false,
                            successStatus: false,
                            errMessage: "",
                            successMessage: "",
                        });
                    }, 2000);
                }
            });
    };

    return (
        <React.Fragment>
            <EditorComponent
                data={[value, setValue]}
                title={[title, setTitle]}
                description={[description, setDescription]}
                message={[alert, setAlert]}
                submit={page}
            />
        </React.Fragment>
    )
}

export default AddPage