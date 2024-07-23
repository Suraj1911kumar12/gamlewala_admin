import { Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { AddData } from "../../Apis/Setters/AddData";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateData } from "../../Apis/update/UpdateAPI";
// import axios from "axios";

const EditCategoryDiscount = () => {
    const navigate = useNavigate()
    const param = useParams()


    const [discountValue, setDiscountValue] = useState("")
    const [categoryId, setCategoryId] = useState([])
    const [segmentId, setSegmentId] = useState([])



    // ALERT STATUS & MESSAGE STATE
    const [alert, setAlert] = useState({
        errStatus: false,
        successStatus: false,
        errMessage: "",
        successMessage: "",
    });

    // CATEGORY LIST DATA

    // SUB CATEGORY LIST DATA

    // SEGMENT LIST DATA
    const [segmentListData, setSegmentListData] = useState([]);

    // SESSION CUSTOM HOOK
    const [setSession, getSession] = useSession();

    // VALUES STATE
    const [details, setDetails] = useState({
        segment: "",
        category: "",
    });

    let token = getSession("authorization");

    useEffect(() => {
        GetData({ url: `segment-discount/${param.id}`, token: token })
            .then((res) => {
                setSegmentId(res?.data?.data?.segmentId?._id);
                setDiscountValue(res?.data?.data?.discountValue)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [alert]);

    useEffect(() => {
        const credentials = { segment: details.segment, category: details.category }
        GetData({ url: "segment", token: token })
            .then((res) => {
                setSegmentListData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [details.segment])

    // useEffect(() => {
    //     const credentials = { segment: details.segment, category: details.category }
    //     AddData({ url: "sub-category/list", cred: credentials, token: token })
    //         .then((res) => {
    //             setSubCategories(res.data.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, [details.segment, details.category])

    //MAPPING CATEGORIES OPTION FOR SELECT


    //MAPPING CATEGORIES OPTION FOR SELECT


    // MAPPING SEGMENT OPTION FOR SELECT
    const segmentList = segmentListData.map((elem) => ({
        label: elem?.name,
        value: elem?._id,
    }));
    // const categoryList = categoriesListData.map((elem) => ({
    //     label: elem?.name,
    //     value: elem?._id,
    // }));













    // HANDLING API CALL METHOD
    const product = async (e) => {
        e.preventDefault();

        let token = getSession("authorization");

        let credentials = {
            "id": param.id,
            "segmentId": segmentId,
            "discountValue": discountValue
        };
        console.log("credentials", credentials);
        UpdateData({ url: "segment-discount/update", cred: credentials, token: token })
            .then((res) => {
                console.log(res)
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
                navigate('/commondiscount')
            })
            .catch((err) => {
                console.log(err);
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
            <form onSubmit={product}>
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


                                    {/* <div className="col-md-6">
                                        <label
                                            htmlFor="form-productImage/thumbnail"
                                            className="form-label"
                                        >
                                            Segment
                                        </label>
                                        <Select
                                            // mode="multiple"
                                            allowClear
                                            style={{ width: "100%" }}
                                            placeholder="Select Segment"
                                            onChange={(e) => setCategoryId(e)}
                                            options={segmentList}
                                            className="p-0 mb-4"
                                            value={categoryId}
                                        // mode="tags"
                                        />
                                    </div> */}
                                    <div className="col-md-6">
                                        <label
                                            htmlFor="form-productImage/thumbnail"
                                            className="form-label"
                                        >
                                            Segment
                                        </label>
                                        <Select
                                            // mode="multiple"
                                            allowClear
                                            style={{ width: "100%" }}
                                            placeholder="Select Segment"
                                            onChange={(e) => setSegmentId(e)}
                                            options={segmentList}
                                            className="p-0 mb-4"
                                            value={segmentId}
                                        // mode="tags"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label
                                            htmlFor="form-productImage/thumbnail"
                                            className="form-label"
                                        >
                                            Discount Value
                                        </label>
                                        <input
                                            type="number"
                                            name="discountValue"
                                            className="form-control"
                                            id="form-product/discountValue"
                                            value={discountValue}
                                            onChange={(e) => setDiscountValue(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <input
                                        type="submit"
                                        className="btn btn-outline-primary btn-sm mb-0 px-5"
                                        value="Add Category Discount"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
};

export default EditCategoryDiscount;
