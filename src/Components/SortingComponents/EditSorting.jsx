import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useColumnSearchProps from "../../hooks/useColumnSearchProps";
import Datatable from "../DataTableComponent/Datatable";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { AddData } from "../../Apis/Setters/AddData";
import { DeleteData } from "../../Apis/Setters/DeleteData";
import { Select } from "antd";
import { EditData } from "../../Apis/Setters/EditData";

const EditSorting = () => {

    const params = useParams();

    // Declaring ColumnSearchProps Method
    const columnSearchProps = useColumnSearchProps();
    // ALERT STATUS & MESSAGE STATE
    const [alert, setAlert] = useState({
        errStatus: false,
        successStatus: false,
        errMessage: "",
        successMessage: "",
    });

    // ADD SORTING DETAILS STATE
    const [sorting, setSorting] = useState({
        id: params.id,
        name: "",
        field: "",
        type: "",
        isActive: true
    });

    // HANDLING ADD SUBCATEGORY DETAILS TO ABOVE STATE
    const handleDetails = (e) => {
        const { name, value } = e.target;
        setSorting({
            ...sorting,
            [name]: value,
        });
    };

    const [fieldData, setFieldData] = useState([])

    useEffect(() => {
        let token = getSession("authorization");
        GetData({ url: `filter/get-fields`, token: token })
            .then((res) => {
                setFieldData(res?.data?.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const fieldList = fieldData?.map((elem) => ({
        label: elem,
        value: elem,
    }));


    const typeList = [{
        label: "Ascending",
        value: "ascending",
    },
    {
        label: "Descending",
        value: "descending",
    }
    ];

    // SETTING VALUE TO STATE VARIABLE
    const handleField = (value) => {
        // const { name, value } = e.target;
        setSorting({
            ...sorting,
            field: value,
        });
    };

    const handleType = (value) => {
        // const { name, value } = e.target;
        setSorting({
            ...sorting,
            type: value,
        });
    };

    const [setSession, getSession] = useSession();
    const [addData, setAddData] = useState(true);

    useEffect(() => {
        let token = getSession("authorization");
        GetData({ url: `filter/sorting/value/${params.id}`, token: token })
            .then((res) => {
                setSorting({
                    ...sorting,
                    name: res?.data?.data?.name,
                    type: res?.data?.data?.type,
                    field: res?.data?.data?.field,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [addData]);

    // HANDLING API CALL METHOD
    const update = async (e) => {
        e.preventDefault();
        let token = getSession("authorization");
        let credentials = { ...sorting };
        EditData({ url: "filter/sorting/value/update", cred: credentials, token: token })
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
            <form onSubmit={update}>
                {/* INPUT PRODUCT DETAILS */}
                <div className="container-fluid row">
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

                    <div className="">
                        {/* Basic Information Card */}
                        <div className="card">
                            <div className="card-body p-md-5">
                                <div className="mb-5">
                                    <h4 className="mb-0 fs-exact-18">Basic information</h4>
                                </div>
                                <div className="row">
                                    <div className="mb-4 col-md-6">
                                        <label
                                            htmlFor="form-subcategory/question"
                                            className="form-label"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            id="form-subcategory/name"
                                            value={sorting.name}
                                            onChange={handleDetails}
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
                                            value={sorting.field}
                                            options={fieldList}
                                            className="p-0 mt-2"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-category/user" className="form-label">
                                            Select Type</label>
                                        <Select
                                            style={{ width: "100%" }}
                                            name="field"
                                            placeholder="Select Type"
                                            value={sorting.type}
                                            onChange={handleType}
                                            options={typeList}
                                            className="p-0 mt-2"
                                            required
                                        />
                                    </div>
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
            </form>
        </React.Fragment>
    );
}

export default EditSorting




{/* <div className="card-body p-md-5">
<h4>Update Details</h4>
<div className="row">
    <div className="mb-4 col-md-6">
        <label
            htmlFor="form-subcategory/question"
            className="form-label"
        >
            Name
        </label>
        <input
            type="text"
            name="name"
            className="form-control"
            id="form-subcategory/name"
            value={sorting.name}
            onChange={handleDetails}
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
            value={sorting.field}
            options={fieldList}
            className="p-0 mt-2"
            required
        />
    </div>
    <div className="mb-4 col-md-6">
        <label htmlFor="form-category/user" className="form-label">
            Select Type</label>
        <Select
            style={{ width: "100%" }}
            name="field"
            placeholder="Select Type"
            value={sorting.type}
            onChange={handleType}
            options={typeList}
            className="p-0 mt-2"
            required
        />
    </div>
</div>
<div className="mb-4">
    <input
        type="submit"
        className="btn btn-outline-primary btn-sm mb-0"
        value="Save"
    />
</div>
</div> */}