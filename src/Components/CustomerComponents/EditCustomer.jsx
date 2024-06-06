import React, { useEffect, useRef, useState } from "react";
import FileUpload from "../../Apis/Setters/FileUpload";
import { useParams } from "react-router-dom";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { EditData } from "../../Apis/Setters/EditData";
import { GetDataToUpdate } from "../../Apis/Getters/GetDataToUpdate";

const EditCustomer = () => {
    const params = useParams();
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
        email: "",
        mobile: "",
    });

    console.log("aaaaaaaaaa");

    useEffect(() => {
        let token = getSession("authorization");
        GetData({ url: `customer/${params.id}`,  token: token })
            .then((res) => {
                if (res?.data?.status) {
                    setDetails({
                        id: params?.id,
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
        EditData({ url: "user/update-customer", cred: credentials, token: token })
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
                                    <h5 className="mb-0 fs-exact-18">Update User Details</h5>
                                </div>
                                {/* <form> */}
                                <div className="row">
                                    {/* <div className="mb-4 col-md-6">
                                        <label
                                            htmlFor="form-category/categoryImage"
                                            className="form-label"
                                        >
                                            Image
                                        </label>
                                        <div className="row">
                                            <div className="col-1 p-0">
                                                <span className="ms-4">
                                                    <img
                                                        src={editableImg}
                                                        width="40"
                                                        height="40"
                                                        alt=""
                                                    />
                                                </span>
                                            </div>
                                            <div className="col-10 ps-5">
                                                <input
                                                    type="file"
                                                    name="imageId"
                                                    className="form-control"
                                                    id="form-category/categoryImage"
                                                    onChange={fileUpload}
                                                />
                                            </div>
                                        </div>
                                    </div> */}
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
                                    {/* <div className="mb-4 col-md-6">
                                        <label htmlFor="form-category/pan" className="form-label">
                                            Pan Number
                                        </label>
                                        <input
                                            type="text"
                                            name="pan"
                                            className="form-control"
                                            id="form-category/pan"
                                            value={details.pan}
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-category/aadhar" className="form-label">
                                            Aadhar Number
                                        </label>
                                        <input
                                            type="number"
                                            name="aadhar"
                                            className="form-control"
                                            id="form-category/aadhar"
                                            value={details.aadhar}
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-category/password" className="form-label">
                                            Wallet Balance (Not editable)
                                        </label>
                                        <input
                                            type="text"
                                            name="password"
                                            className="form-control"
                                            id="form-category/amount"
                                            value={details.amount}
                                            required
                                        />
                                    </div> */}
                                    {/* <div className="mb-4 col-md-4">
                                            <label className="form-check">
                                                <input type="checkbox" className="form-check-input" name="status" onClick={() => setSubCategory(!subCategory)} />
                                                <span className="form-check-label">Has Child</span>
                                            </label>
                                        </div>

                                        {subCategory && <div className="mb-4">
                                            <label htmlFor="form-product/name" className="form-label">
                                                Sub Category Name
                                            </label>
                                            <input type="text" name='subCategory' className="form-control" id="form-product/name" value={details.subCategory} onChange={handleDetails} />
                                        </div>} */}

                                    <div className="mb-4">
                                        <input
                                            type="submit"
                                            className="btn btn-outline-primary btn-sm mb-0"
                                            value="Save"
                                        />
                                    </div>
                                </div>


                                {/* </form> */}
                            </div>
                        </div>
                    </div>


                    {/* Type Card */}
                    {/* <div className="col-md-4">
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
                                            checked={details?.type === "category" ? true : false}
                                        />
                                        <span className="form-check-label">Category</span>
                                    </label>
                                    <label className="form-check mb-0">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name="type"
                                            onChange={handleDetails}
                                            value="concern"
                                            checked={details?.type === "concern" ? true : false}
                                        />
                                        <span className="form-check-label">Concern</span>
                                    </label>
                                    <label className="form-check mb-0">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name="type"
                                            onChange={handleDetails}
                                            value="faq"
                                            checked={details?.type === "faq" ? true : false}
                                        />
                                        <span className="form-check-label">FAQ</span>
                                    </label>
                                    <label className="form-check mb-0">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name="type"
                                            onChange={handleDetails}
                                            value="productType"
                                            checked={details?.type === "productType" ? true : false}
                                        />
                                        <span className="form-check-label">Product Type</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </form>
        </React.Fragment>
    );
};

export default EditCustomer;
