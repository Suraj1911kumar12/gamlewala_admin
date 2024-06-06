import React, { useEffect, useState } from 'react'
import EditorComponent from '../EditorComponent';
import { AddData } from '../../Apis/Setters/AddData';
import useSession from '../../hooks/session';
import { useParams } from 'react-router-dom';
import { GetData } from '../../Apis/Getters/GetData';
import { EditData } from '../../Apis/Setters/EditData';

const EditPage = () => {

    const [setSession, getSession] = useSession();
    const params = useParams();

    // ALERT STATUS & MESSAGE STATE
    const [alert, setAlert] = useState({
        errStatus: false,
        successStatus: false,
        errMessage: "",
        successMessage: "",
    });

    const [pageData , setPageData] = useState();
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
      window.scrollTo(0, 0);
      let token = getSession("authorization");
      GetData({ url: `static-page/${params.id}`, token: token })
        .then((res) => {
          setPageData(res.data.data);
          setValue(res.data.data.content)
          setTitle(res.data.data.title)
          setDescription(res.data.data.description)
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    // FINAL SUBMIT
    const page = (e) => {
        e.preventDefault();
        let token = getSession("authorization");
        const credentials = {
            id: params.id,
            title: title,
            content: value,
            description: description,
        };

        EditData({ url: "static-page/update", cred: credentials, token: token })
            .then((res) => {
                window.scrollTo(0, 0);
                if (res.data.status) {
                    window.scrollTo(0, 0);
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

export default EditPage