import React, { useEffect, useState } from "react";
import { AddData } from "../../Apis/Setters/AddData";
import useSession, { deleteSession } from "../../hooks/session";
import { Select } from "antd";
import { GetData } from "../../Apis/Getters/GetData";
import FileUpload from "../../Apis/Setters/FileUpload";

const AddFilter = () => {
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
        field: "",
        type: "",
        multiSelect: false
    });

    const [fieldData, setFieldData] = useState([])

    useEffect(() => {
        let token = getSession("authorization");
        GetData({ url: "filter/get-fields", token: token })
            .then((res) => {
                setFieldData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [alert]);

    const fieldList = fieldData.map((elem) => ({
        label: elem,
        value: elem,
    }));

    // SETTING VALUE TO STATE VARIABLE
    const handleField = (value) => {
        // const { name, value } = e.target;
        setDetails({
            ...details,
            field: value,
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

    // ADD CATEGORY API CALL
    const category = (e) => {
        e.preventDefault();
        let token = getSession("authorization");

        const credentials = { ...details };

        AddData({ url: "filter/category/add", cred: credentials, token: token })
            .then((res) => {
                window.scrollTo(0, 0);
                if (res.data.status) {
                    setDetails({
                        ...details,
                        name: "",
                        field: "",
                        type: "",
                    });
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
                                <div className="mb-5">
                                    <h5 className="mb-0 fs-exact-18">Add Filter</h5>
                                </div>
                                <div className="row">
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-category/name" className="form-label">
                                            Filter Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            id="form-filter/name"
                                            value={details.name}
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-category/user" className="form-label">
                                            Select Field</label>
                                        <Select
                                            style={{ width: "100%" }}
                                            name="field"
                                            placeholder="Select Field"
                                            onChange={handleField}
                                            options={fieldList}
                                            className="p-0 mt-2"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="form-coupon/type" className="form-label">
                                            Type
                                        </label>
                                        <label className="form-check">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="type"
                                                onChange={handleDetails}
                                                value="match"
                                                required
                                            />
                                            <span className="form-check-label">Match</span>
                                        </label>
                                        <label className="form-check mb-0">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="type"
                                                onChange={handleDetails}
                                                value="range"
                                                required
                                            />
                                            <span className="form-check-label">Range</span>
                                        </label>
                                    </div>
                                    <div className="mb-4 col-md-6 mb-6">
                                        <label htmlFor="form-filter/multiselect" className="form-label">
                                            Multi Select Option
                                        </label>
                                        <label className="form-check mb-0">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                name="multiSelect"
                                                onChange={handleDetails}
                                                value="true"
                                            />
                                            <span className="form-check-label">Multiselect</span>
                                        </label>
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

export default AddFilter;
