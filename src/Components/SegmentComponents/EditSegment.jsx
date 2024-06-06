import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { EditData } from "../../Apis/Setters/EditData";
import FileUpload from "../../Apis/Setters/FileUpload";

const EditSegment = () => {
    const params = useParams();
    const navigate = useNavigate()
    const [setSession, getSession] = useSession();

    // ALERT STATUS & MESSAGE STATE
    const [alert, setAlert] = useState({
        errStatus: false,
        successStatus: false,
        errMessage: "",
        successMessage: "",
    });

    // DETAILS STATE
    const [details, setDetails] = useState({
        id: params.id,
        name: "",
    });

    useEffect(() => {
        let token = getSession("authorization");
        console.log(token);
        // const credentials = { id: params?.id }
        GetData({ url: `segment/${params.id}`, token: token })
            .then((res) => {
                console.log(res);
                if (res?.data?.status) {
                    setDetails({
                        id: params?.id,
                        name: res?.data?.data?.name,
                        isActive: "true",
                        img: res?.data?.data?.image?.url[0]
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // SETTING DETAILS TO STATE VARIABLE
    const handleDetails = (e) => {
        const { name, value } = e.target;
        setDetails({
            ...details,
            [name]: value,
        });
    };

    // ADD API CALL
    const edit = (e) => {
        e.preventDefault();
        let token = getSession("authorization");
        let credentials = { ...details };
        EditData({ url: "segment/update", cred: credentials, token: token })
            .then((res) => {
                window.scrollTo(0, 0);
                setAlert({
                    successStatus: true,
                    errStatus: false,
                    successMessage: res?.data?.msg,
                    errMessage: "",
                });
                navigate('/segments')
                setTimeout(() => {
                    setAlert({
                        errStatus: false,
                        successStatus: false,
                        errMessage: "",
                        successMessage: "",
                    });
                }, 1000);
            })
            .catch((err) => {
                if (err?.response?.status == "401") {
                    deleteSession("authorization");
                    window.location.href = `${process.env.REACT_APP_BASE_URL}`
                } else {
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
                        console.log(err?.message);
                        setAlert({
                            errStatus: true,
                            successStatus: false,
                            errMessage: err?.message,
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
                }
            });
    };

    // FILE UPLOAD METHOD(API CALL)
    const fileUpload = async (e) => {
        // Getting details field to set image id
        FileUpload({ image: e.target.files[0] })
            .then((res) => {
                if (res?.data?.status) {
                    setDetails({
                        ...details,
                        file: res?.data?.data,
                    });
                }
            })
            .catch((err) => {
                if (err?.response?.status == "401") {
                    deleteSession("authorization");
                    window.location.href = `${process.env.REACT_APP_BASE_URL}`
                } else {
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
                        console.log(err?.message);
                        setAlert({
                            errStatus: true,
                            successStatus: false,
                            errMessage: err?.message,
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
                }
            });
    };

    return (
        <React.Fragment>
            <form onSubmit={edit}>
                <div className="container-fluid py-5 row">
                    {/* DISPLAY ERROR MESSAGE */}
                    {alert?.errStatus && (
                        <div
                            className="alert alert-danger alert-dismissible fade show text-black"
                            role="alert"
                        >
                            {alert?.errMessage}
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                                onClick={() => {
                                    setAlert({
                                        errStatus: false,
                                        successStatus: false,
                                        errMessage: "",
                                        successMessage: "",
                                    });
                                }}
                            ></button>
                        </div>
                    )}

                    {/* DISPLAY SUCCESS MESSAGE */}
                    {alert?.successStatus && (
                        <div
                            className="alert alert-success alert-dismissible fade show text-black"
                            role="alert"
                        >
                            {alert?.successMessage}
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                                onClick={() => {
                                    setAlert({
                                        errStatus: false,
                                        successStatus: false,
                                        errMessage: "",
                                        successMessage: "",
                                    });
                                }}
                            ></button>
                        </div>
                    )}
                    <div className=" mb-5">
                        {/* Basic Information Card */}
                        <div className="card">
                            <div className="card-body p-md-5">
                                <div className="mb-5">
                                    <h5 className="mb-0 fs-exact-18">Update Segment</h5>
                                </div>
                                {/* <form> */}
                                <div className="row">
                                    <div className="col-md-2 mb-4" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <label
                                            htmlFor="form-productImage/thumbnail"
                                            className="form-label"
                                        >
                                            Image
                                        </label>
                                        <img height={80} width={100} src={details.img} alt="not found" />
                                    </div>
                                    <div className="col-md-4">
                                        <label
                                            htmlFor="form-productImage/thumbnail"
                                            className="form-label"
                                        >
                                            Edit Image
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="form-control"
                                            name="thumbnail"
                                            id="form-productImage/thumbnail"
                                            onChange={fileUpload}
                                        />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-category/name" className="form-label">
                                            Segment Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            id="form-category/name"
                                            value={details.name}
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="submit"
                                            className="btn btn-outline-primary btn-sm mb-0"
                                            value="Save"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
};

export default EditSegment;
