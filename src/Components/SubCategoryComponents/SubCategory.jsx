import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useColumnSearchProps from "../../hooks/useColumnSearchProps";
import Datatable from "../DataTableComponent/Datatable";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { AddData } from "../../Apis/Setters/AddData";
import { EditData } from "../../Apis/Setters/EditData";
import { DeleteData } from "../../Apis/Setters/DeleteData";
import FileUpload from "../../Apis/Setters/FileUpload";
import { Select } from "antd";

const SubCategory = () => {
    // Declaring ColumnSearchProps Method
    const columnSearchProps = useColumnSearchProps();
    // ALERT STATUS & MESSAGE STATE
    const [alert, setAlert] = useState({
        errStatus: false,
        successStatus: false,
        errMessage: "",
        successMessage: "",
    });

    // ADD SUBCATEGORY DETAILS STATE
    const [subCategory, setSubCategory] = useState({
        segment: "",
        category: "",
        file: "",
        name: "",
    });


    // CHANGE SUBCATEGORY POPUP STATE
    const [subCategoryStatus, setSubCategoryStatus] = useState(false);
    // SUBCATEGORY POPUP DETAILS STATE
    const [subCategoryDetails, setSubCategoryDetails] = useState({
        id: "",
        segment: "",
        category: "",
        name: "",
        isActive: true
    })

    // HANDLING ADD SUBCATEGORY DETAILS TO ABOVE STATE
    const handleDetails = (e) => {
        const { name, value } = e.target;
        setSubCategory({
            ...subCategory,
            [name]: value,
        });
    };

    // SESSION CUSTOM HOOK
    const [setSession, getSession] = useSession();

    const [deleteData, setdeleteData] = useState(true);
    const [addData, setAddData] = useState(true);
    const [updateData, setUpdateData] = useState(true);
    const [categoriesListData, setCategoriesListData] = useState([]);
    const [segmentListData, setSegmentListData] = useState([]);

    let token = getSession("authorization");

    useEffect(() => {
        GetData({ url: "segment", token: token })
            .then((res) => {
                setSegmentListData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    //MAPPING SEGMENT OPTION FOR SELECT
    const segmentList = segmentListData
        .map((elem) => ({
            label: elem?.name,
            value: elem?._id,
        }));

    //MAPPING CATEGORIES OPTION FOR SELECT
    const categoriesList = categoriesListData
        .map((elem) => ({
            label: elem?.name,
            value: elem?._id,
        }));
    const setData = (elem) => {
        // setSubCategoryStatus(!subCategoryStatus);
        setSubCategoryDetails({
            id: elem._id,
            category: elem?.category._id,
            segment: elem?.segment._id,
            name: elem?.name,
        });
        console.log(subCategoryDetails);
    }


    useEffect(() => {
        const credentials = { segment: subCategory.segment }
        AddData({ url: "category/list", cred: credentials, token: token })
            .then((res) => {
                setCategoriesListData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [alert, subCategory.segment, subCategoryDetails.segment]);

    // HANDLING CATEGORIES
    const handleCategories = (value) => {
        setSubCategory((prev) => {
            return {
                ...prev,
                category: value,
            };
        });
    };
    // HANDLING SEGMENT
    const handleSegment = (value) => {
        setSubCategory((prev) => {
            return {
                ...prev,
                segment: value,
            };
        });
    };

    const [subCategoryData, setSubCategoryData] = useState([]);

    useEffect(() => {
        const credentials = { segment: "" }
        AddData({ url: "sub-category/list", cred: credentials, token: token })
            .then((res) => {
                setSubCategoryData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [deleteData, addData, updateData]);

    // HANDLING CATEGORIES
    const handleCategoryUpdate = (value) => {
        setSubCategoryDetails((prev) => {
            return {
                ...prev,
                category: value,
            };
        });
    };
    // HANDLING SEGMENT
    const handleSegmentUpdate = (value) => {
        setSubCategoryDetails((prev) => {
            return {
                ...prev,
                segment: value,
            };
        });
    };

    // HANDLING UPDATE SUBCATEGORY DETAILS TO ABOVE STATE
    const handleUpdateDetails = (e) => {
        const { name, value } = e.target;
        setSubCategoryDetails({
            ...subCategoryDetails,
            [name]: value,
        });
    };

    // DESTRUCTURING DATA FOR DATA TABLE
    const data = [...subCategoryData];

    // DEFINING DATA TABLE COLUMNS
    const columns = [
        {
            title: "IMAGE",
            key: "image",
            dataIndex: "image",
            render: (_, elem) => (
                <Link href="app-product.html" className="me-4">
                    <div className="sa-symbol sa-symbol--shape--rounded sa-symbol--size--lg">
                        <img src={elem.image} width="40" height="40" alt="" />
                    </div>
                </Link>
            ),
        },
        {
            title: "NAME",
            key: "name",
            dataIndex: "name",
            ...columnSearchProps("name"),
        },
        {
            title: "CATEGORY",
            key: "category",
            dataIndex: ["category", "name", "_id"],
            ...columnSearchProps("category"),
            render: (_, { category }) => (
                <>
                    <div className="">
                        <span className="text-sm">{category.name}</span>
                    </div>
                </>
            ),
        },
        {
            title: "ACTION",
            key: "action",
            render: (elem) =>
            (
                <div className=" text-left px-2 py-1">
                    {/* {console.log("elem here", elem)} */}
                    <Link
                        className="cursor-pointer"
                        id="dropdownTable"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <i
                            className="fa fa-ellipsis-v text-secondary"
                            aria-hidden="true"
                        ></i>
                    </Link>
                    <ul
                        className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5 border border-dark"
                        aria-labelledby="dropdownTable"
                        data-popper-placement="bottom-start"
                    >
                        <li
                            onClick={() => setData(elem)}
                        // onClick={() => {
                        //     
                        >
                            <Link className="dropdown-item border-radius-md" to="#">
                                Update
                            </Link>
                        </li>
                        <li
                            onClick={() => {
                                deleteItem(elem._id);
                            }}
                        >
                            <Link className="dropdown-item border-radius-md" to="#">
                                Delete
                            </Link>
                        </li>
                    </ul>
                </div>
            ),
        },
    ];

    // FILE UPLOAD METHOD(API CALL)
    const fileUpload = async (e) => {
        // Getting details field to set image id
        FileUpload({ image: e.target.files[0] })
            .then((res) => {
                if (res?.data?.status) {
                    setSubCategory({
                        ...subCategory,
                        file: res?.data?.data,
                    });
                    setSubCategoryDetails({
                        ...subCategoryDetails,
                        file: res?.data?.data
                    })
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

    // ADD SUBCATEGORY API METHOD
    const addSubCategory = (e) => {
        e.preventDefault();
        const credentials = { ...subCategory };
        let token = getSession("authorization");
        AddData({ url: "sub-category/create", cred: credentials, token: token })
            .then((res) => {
                window.scrollTo(0, 0);
                if (res.data.status) {
                    setSubCategory({
                        category: "",
                        file: "",
                        name: "",
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
                    }, 1000);
                    setAddData((prev) => !prev);
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

    // UPDATE SUBCATEGORY API METHOD
    const updateSubCategory = (e) => {
        e.preventDefault();
        const credentials = { ...subCategoryDetails };
        let token = getSession("authorization");
        EditData({ url: "sub-category/update", cred: credentials, token: token })
            .then((res) => {
                window.scrollTo(0, 0);
                if (res.data.status) {
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
                    setUpdateData(!updateData);
                    setSubCategoryStatus(!subCategoryStatus);
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

    // API CALL METHOD TO DELETE AN ITEM
    const deleteItem = (id) => {
        let token = getSession("authorization");

        DeleteData({ url: `sub-category/delete/${id}`, token: token })
            .then((res) => {
                window.scrollTo(0, 0);
                if (res.data.status) {
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
                    setdeleteData(!deleteData);
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
            <div className="container-fluid py-4">
                <div className="row my-4">
                    <div className="col-md-12 mb-md-0 mb-4">
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
                        {/* ADD SUBCATEGORY FORM */}
                        <div className="g-4">
                            <div className="card mb-3">
                                <div className="card-body p-md-5">
                                    <h4>Add Subcategory</h4>
                                    <form onSubmit={addSubCategory}>
                                        <div className="row">
                                            <div className="mb-4 col-md-6">
                                                <label
                                                    htmlFor="form-productImage/thumbnail"
                                                    className="form-label"
                                                >
                                                    Image (Optional)
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
                                                    value={subCategory.name}
                                                    onChange={handleDetails}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label
                                                    htmlFor="form-productImage/thumbnail"
                                                    className="form-label"
                                                >
                                                    Segment
                                                </label>
                                                <Select
                                                    allowClear
                                                    style={{ width: "100%" }}
                                                    placeholder="Select Segment"
                                                    onChange={handleSegment}
                                                    options={segmentList}
                                                    className="p-0 mb-4"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label
                                                    htmlFor="form-productImage/thumbnail"
                                                    className="form-label"
                                                >
                                                    Category
                                                </label>
                                                <Select
                                                    // mode="multiple"
                                                    allowClear
                                                    style={{ width: "100%" }}
                                                    placeholder="Select Categories"
                                                    onChange={handleCategories}
                                                    options={categoriesList}
                                                    className="p-0 mb-4"
                                                //value={details?.category}
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
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* SUBCATEGORY LIST */}
                        <div className="card">
                            <div className="card-header pb-0">
                                <div className="row">
                                    <div className="col-lg-6 col-7">
                                        <h6>Subcategory List</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pb-2">
                                <div className="table-responsive">
                                    {<Datatable data={data} columns={columns} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* VIEW & UPDATE SUBCATEGORY */}
            {subCategoryStatus && (
                <div className="password-popup">
                    <div className="rts-newsletter-popup popup">
                        <div
                            className="newsletter-close-btn"
                            onClick={() => setSubCategoryStatus(!subCategoryStatus)}
                        >
                            <i className="fa fa-times"></i>
                        </div>
                        <div className="newsletter-inner popup-inner">
                            <h3 className="newsletter-heading">SUB CATEGORY</h3>
                            <form onSubmit={updateSubCategory}>
                                <div className="input-area">
                                    <label
                                        htmlFor="form-productImage/thumbnail"
                                        className="form-label"
                                    >
                                        Image (Optional)
                                    </label>
                                    <div className="input-div">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="form-control"
                                            name="thumbnail"
                                            id="form-productImage/thumbnail"
                                            onChange={fileUpload}
                                        />
                                    </div>
                                    <label
                                        htmlFor="form-subcategory/name"
                                        className="form-label"
                                    >
                                        Name
                                    </label>
                                    <div className="mb-4">
                                        {console.log("sub category", subCategoryDetails)}
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            id="form-subcategory/name"
                                            value={subCategoryDetails?.name}
                                            onChange={handleUpdateDetails}
                                            required
                                        />
                                    </div>
                                    <label
                                        htmlFor="form-subcategory/category"
                                        className="form-label"
                                    >
                                        Segment
                                    </label>
                                    <div className="mb-3">
                                        <Select
                                            allowClear
                                            style={{ width: "100%" }}
                                            placeholder="Select Segment"
                                            onChange={handleSegmentUpdate}
                                            options={segmentList}
                                            className="p-0 mb-4"
                                            value={subCategoryDetails.segment}
                                        />
                                    </div>
                                    <label
                                        htmlFor="form-subcategory/category"
                                        className="form-label"
                                    >
                                        Category
                                    </label>
                                    <div className="mb-3">
                                        <Select
                                            allowClear
                                            style={{ width: "100%" }}
                                            placeholder="Select Segment"
                                            onChange={handleCategoryUpdate}
                                            options={categoriesList}
                                            className="p-0 mb-4"
                                            value={subCategoryDetails.category}
                                        />
                                    </div>
                                    <button type="submit" className="subscribe-btn">
                                        Update{" "}
                                        <i
                                            class="fa fa-long-arrow-right ml--5"
                                            aria-hidden="true"
                                        ></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};

export default SubCategory;
