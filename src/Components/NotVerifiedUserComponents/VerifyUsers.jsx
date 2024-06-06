import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { AddData } from "../../Apis/Setters/AddData";

const VerifyUsers = () => {
    const params = useParams();
    const [setSession, getSession] = useSession();

    // ALERT STATUS & MESSAGE STATE
    const [alert, setAlert] = useState({
        errStatus: false,
        successStatus: false,
        errMessage: "",
        successMessage: "",
    });

    const [verifyDetails, setVerifyDetails] = useState({
        id: params.id,
        verify: "true"
    })

    // DETAILS STATE
    const [details, setDetails] = useState({
        name: "",
        email: "",
        mobile: "",
    });

    useEffect(() => {
        let token = getSession("authorization");
        GetData({ url: `user/${params.id}`,  token: token })
            .then((res) => {
                if (res?.data?.status) {
                    setDetails({
                        name: res?.data?.data?.name,
                        email: res?.data?.data?.email,
                        mobile: res?.data?.data?.mobile,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // SETTING DETAILS TO STATE VARIABLE
    // const handleDetails = (e) => {
    //     const { name, value } = e.target;

    //     setDetails({
    //         ...details,
    //         [name]: value,
    //     });
    // };

    // ADD API CALL
    const verify = (e) => {
        e.preventDefault();
        let token = getSession("authorization");
        let credentials = { ...verifyDetails };
        AddData({ url: "user/verify-vendor", cred: credentials, token: token })
            .then((res) => {
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
                }
            });
    };

    return (
        <React.Fragment>
            <form onSubmit={verify}>
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
                                    <h5 className="mb-0 fs-exact-18">User Details</h5>
                                </div>
                                <div className="row">
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-category/name" className="form-label">
                                            User Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            id="form-category/name"
                                            value={details.name}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-category/email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            id="form-category/email"
                                            value={details.email}
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-category/mobile" className="form-label">
                                            Mobile
                                        </label>
                                        <input
                                            type="number"
                                            name="mobile"
                                            className="form-control"
                                            id="form-category/mobile"
                                            value={details.mobile}
                                            readOnly
                                        />
                                    </div>
                                    <div className="text-center mb-4">
                                        <input
                                            type="submit"
                                            className="btn btn-outline-primary btn-sm mb-0"
                                            value="Verify"
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

export default VerifyUsers;
