import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FileUpload from "../../Apis/Setters/FileUpload";
import { useParams } from "react-router";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { EditData } from "../../Apis/Setters/EditData";
import { AddData } from "../../Apis/Setters/AddData";

const EditFestival = () => {
    const params = useParams();
    // SESSION CUSTOM HOOK
    const [setSession, getSession] = useSession();

    // ALERT STATUS & MESSAGE STATE
    const [alert, setAlert] = useState({
        errStatus: false,
        successStatus: false,
        errMessage: "",
        successMessage: "",
    });

    // RAW CATEGORY LIST DATA
    const [categoriesListData, setCategoriesListData] = useState([]);

    // // RAW CATEGORY LIST DATA
    // const [subCategories, setSubCategories] = useState([]);
    // // RAW SEGMENT LIST DATA
    // const [segmentListData, setSegmentListData] = useState([]);

    let [details, setDetails] = useState({
        id: params?.id,
        name: "",
        date: "",
        description: "",
    });

    let token = getSession("authorization");

    // METHOD FOR DATE FORMATTING
    const formatDate = (date = new Date()) => {
        const year = date.toLocaleString("default", { year: "numeric" });
        const month = date.toLocaleString("default", {
            month: "2-digit",
        });
        const day = date.toLocaleString("default", { day: "2-digit" });

        return [year, month, day].join("-");
    };


    useEffect(() => {
        GetData({ url: `calendar/get-list/${params.id}`, token: token })
            .then((res) => {
                if (res?.data?.status) {
                    setDetails({
                        id: params?.id,
                        name: res?.data?.data?.name,
                        description: res?.data?.data?.description,
                        date: formatDate(new Date(res?.data?.data?.date)),
                        isActive: "true",
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    console.log(details);


    // METHOD TO SET DETAILS IN details STATE VARIABLE
    const handleDetails = (e) => {
        const { name, value } = e.target;
        setDetails({
            ...details,
            [name]: value,
        })
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


    // HANDLING API CALL METHOD
    const update = async (e) => {
        e.preventDefault();
        let token = getSession("authorization");
        let credentials = { ...details };
        EditData({ url: "calendar/edit-fest", cred: credentials, token: token })
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
                                <div className="row g-4 mb-4">
                                    <div className="mb-1 col-md-6">
                                        <label
                                            htmlFor="form-productImage/thumbnail"
                                            className="form-label"
                                        >
                                            Image
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="form-control"
                                            name="image"
                                            id="form-productImage/thumbnail"
                                            onChange={fileUpload}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="form-product/name" className="form-label">
                                            Festival Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            id="form-product/name"
                                            value={details.name}
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label
                                            htmlFor="form-doctor/date"
                                            className="form-label"
                                        >
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            className="form-control"
                                            id="form-coupon/date"
                                            // placeholder="yyyy/mm/dd"
                                            value={details?.date}
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="form-product/description"
                                            className="form-label"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            id="form-product/description"
                                            name="description"
                                            className="sa-quill-control form-control sa-quill-control--ready"
                                            rows="4"
                                            value={details.description}
                                            onChange={handleDetails}
                                            required
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="text-center mt-5">
                                    <input
                                        type="submit"
                                        className="btn btn-outline-primary btn-sm mb-0 px-5"
                                        value="Update Product"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* SUBMIT PRODUCT DETAILS */}
                {/* <div className="container-fluid pb-5 row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body p-md-5">
                <div className="text-center">
                  <input
                    type="submit"
                    className="btn btn-outline-primary btn-sm mb-0 px-5"
                    value="Update Product"
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}
            </form>
        </React.Fragment>
    );
};

export default EditFestival;
