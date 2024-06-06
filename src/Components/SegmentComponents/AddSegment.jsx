import React, { useEffect, useRef, useState } from "react";
import FileUpload from "../../Apis/Setters/FileUpload";
import { AddData } from "../../Apis/Setters/AddData";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { Select } from "antd";

const AddUsers = () => {
    // SESSION CUSTOM HOOK
    const [setSession, getSession] = useSession();

    const docref = useRef();

    // ALERT STATUS & MESSAGE STATE
    const [alert, setAlert] = useState({
        errStatus: false,
        successStatus: false,
        errMessage: "",
        successMessage: "",
    });

    // CATEGORY VALUE STATE
    const [details, setDetails] = useState({
        name: "",
        file: ""
    });

    // SETTING VALUE TO STATE VARIABLE
    const handleDetails = (e) => {
        const { name, value } = e.target;
        setDetails({
            ...details,
            [name]: value,
        });
    };


    // ADD USER  API CALL
    const AddSegment = (e) => {
        e.preventDefault();

        // let token = getCookie("authorization");
        let token = getSession("authorization");
        const credentials = { ...details };
        AddData({ url: "segment/create", cred: credentials, token: token })
            .then((res) => {
                window.scrollTo(0, 0);
                if (res.data.status) {
                    console.log(res);
                    setDetails({
                        file: "",
                        name: "",
                    });
                    docref.current.value = ""
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
                    }, 2000);
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
            <form onSubmit={AddSegment}>
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
                                    <h5 className="mb-0 fs-exact-18">Add Segment</h5>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label
                                            htmlFor="form-productImage/thumbnail"
                                            className="form-label"
                                        >
                                            Image
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="form-control "
                                            name="thumbnail"
                                            id="form-productImage/thumbnail"
                                            onChange={fileUpload}
                                            ref={docref}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-category/name" className="form-label">
                                            Name
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

export default AddUsers;
