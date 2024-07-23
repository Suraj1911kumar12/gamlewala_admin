import React, { useEffect, useRef, useState } from "react";
import FileUpload from "../../Apis/Setters/FileUpload";
import { AddData } from "../../Apis/Setters/AddData";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { Select } from "antd";

const AddUsers = () => {
    const changeRef = useRef()
    const changeSegmentRef = useRef()

    // SESSION CUSTOM HOOK
    const [setSession, getSession] = useSession();

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
        email: "",
        mobile: "",
        password: "",
        segment: "",
        role: ""
    });

    // const roles = [
    //     {
    //         _id: '65f2b424f5ba0975e745f570',
    //         name: 'Admin',
    //     },
    //     {
    //         _id: '65f2b424f5ba0975e745f571',
    //         name: 'Vendor',
    //     },
    //     {
    //         _id: '65f2b424f5ba0975e745f572',
    //         name: 'Assistant',
    //     },
    //     {
    //         _id: '65f2b424f5ba0975e745f573',
    //         name: 'Customer',
    //     }
    // ]

    const [roles, setRoles] = useState([])

    useEffect(() => {
        let token = getSession("authorization");
        GetData({ url: "roles", token: token })
            .then((res) => {
                setRoles(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [alert]);

    const rolesList = roles
        .map((elem) => ({
            label: elem?.name,
            value: elem?._id,
        }));

    // HANDLING CATEGORIES
    const handleRole = (value) => {
        setDetails((prev) => {
            return {
                ...prev,
                role: value,
            };
        });
    };

    const [segments, setSegments] = useState([])

    useEffect(() => {
        let token = getSession("authorization");
        GetData({ url: "segment", token: token })
            .then((res) => {
                setSegments(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [alert]);

    const segmentList = segments
        .map((elem) => ({
            label: elem?.name,
            value: elem?._id,
        }));

    // HANDLING CATEGORIES
    const handleSegment = (value) => {
        setDetails((prev) => {
            return {
                ...prev,
                segment: value,
            };
        });
    };



    // SETTING VALUE TO STATE VARIABLE
    const handleDetails = (e) => {
        const { name, value } = e.target;
        setDetails({
            ...details,
            [name]: value,
        });
    };


    // ADD USER  API CALL
    const category = (e) => {
        e.preventDefault();
        let token = getSession("authorization");

        const credentials = { ...details };

        AddData({ url: "user/create", cred: credentials, token: token })
            .then((res) => {
                window.scrollTo(0, 0);
                if (res.data.status) {

                    setDetails({
                        name: "",
                        email: "",
                        mobile: "",
                        password: "",
                    });
                    changeRef.current.value = ''
                    changeSegmentRef.current.value = ''


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
                }
            });
    };

    return (
        <React.Fragment>
            <form onSubmit={category}>
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
                                <div className="row">
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-role/user" className="form-label">
                                            Select Role
                                        </label>
                                        <Select
                                            style={{ width: "100%" }}
                                            placeholder="Select Role"
                                            onChange={handleRole}
                                            options={rolesList}
                                            value={details.role}
                                            ref={changeRef}
                                            className="p-0 mt-2"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-category/user" className="form-label">
                                            Select Segment</label>
                                        <Select
                                            style={{ width: "100%" }}
                                            placeholder="Select Segment"
                                            onChange={handleSegment}
                                            options={segmentList}
                                            ref={changeSegmentRef}
                                            value={details.segment}
                                            className="p-0 mt-2"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className=" mb-5">
                        {/* Basic Information Card */}
                        <div className="card">
                            <div className="card-body p-md-5">
                                <div className="mb-5">
                                    <h5 className="mb-0 fs-exact-18">Add User</h5>
                                </div>
                                <div className="row">
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
                                            onChange={handleDetails}
                                            required
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
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-category/password" className="form-label">
                                            Password
                                        </label>
                                        <input
                                            type="text"
                                            name="password"
                                            className="form-control"
                                            id="form-category/password"
                                            value={details.password}
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


                    {/* Type Card */}
                    {/* <div className="col-md-4">
                        <div className="row">

                            <div className="card w-100">
                                <div className="card-body p-md-5">
                                    <div className="mb-5">
                                        <h5 className="mb-0 fs-exact-18">Type</h5>
                                    </div>
                                    <div className="mb-5">
                                        <label className="form-check">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="type"
                                                onChange={handleDetails}
                                                value="category"
                                                required
                                            />
                                            <span className="form-check-label">category</span>
                                        </label>
                                        <label className="form-check mb-0">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="type"
                                                onChange={handleDetails}
                                                value="concern"
                                                required
                                            />
                                            <span className="form-check-label">concern</span>
                                        </label>
                                        <label className="form-check mb-0">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="type"
                                                onChange={handleDetails}
                                                value="faq"
                                                required
                                            />
                                            <span className="form-check-label">faq</span>
                                        </label>
                                        <label className="form-check mb-0">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="type"
                                                onChange={handleDetails}
                                                value="productType"
                                                required
                                            />
                                            <span className="form-check-label">productType</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div> */}
                </div>
            </form>
        </React.Fragment>
    );
};

export default AddUsers;
