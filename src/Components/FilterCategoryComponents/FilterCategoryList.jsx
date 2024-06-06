import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useColumnSearchProps from "../../hooks/useColumnSearchProps";
import Datatable from "../DataTableComponent/Datatable";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { DeleteData } from "../../Apis/Setters/DeleteData";
import { useParams } from 'react-router-dom'
import { AddData } from "../../Apis/Setters/AddData";
import { EditData } from "../../Apis/Setters/EditData";
import { Select } from "antd";

const FilterCategoryList = () => {

    const params = useParams();

    // Declaring ColumnSearchProps Method
    const columnSearchProps = useColumnSearchProps();
    const [setSession, getSession] = useSession();

    // ALERT STATUS & MESSAGE STATE
    const [alert, setAlert] = useState({
        errStatus: false,
        successStatus: false,
        errMessage: "",
        successMessage: "",
    });

    const [categoryDetails, setCategoryDetails] = useState({
        category: params.id,
    })

    const [filterDetails, setFilterDetails] = useState({})

    const [filterListData, setFilterListData] = useState([]);

    const [deleteFilter, setDeleteFilter] = useState(false);

    // const [categoriesListData, setCategoriesListData] = useState([]);

    // const [segment, setSegment] = useState([])

    useEffect(() => {
        let token = getSession("authorization");
        GetData({ url: `filter/category/value/${params.id}`, token: token })
            .then((res) => {
                setFilterListData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
        GetData({ url: `filter/category/details/${params.id}`, token: token })
            .then((res) => {
                setFilterDetails(res.data.data)
            })
            .catch((error) => {
                console.log(error);
            });
        // const credentials = { segment: "" }
        // AddData({ url: "category/list", cred: credentials, token: token })
        //     .then((res) => {
        //         setCategoriesListData(res.data.data);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

        // GetData({ url: "segment", token: token })
        //     .then((res) => {
        //         setSegment(res.data.data);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });

    }, [deleteFilter]);

    // DESTRUCTURING DATA FOR DATA TABLE
    const data = [...filterListData];

    // const segmentList = segment?.map((elem) => ({
    //     label: elem?.name,
    //     value: elem?._id,
    // }));

    // const categoryList = categoriesListData?.map((elem) => ({
    //     label: elem?.name,
    //     value: elem?._id,
    // }));

    const handleTitle = (e) => {
        const { name, value } = e.target;
        setCategoryDetails({
            ...categoryDetails,
            [name]: value
        })
    }
    const handleDetails = (e) => {
        const { name, value } = e.target;
        setCategoryDetails({
            ...categoryDetails,
            [name]: Number(value)
        })
    }

    // HANDLING SEGMENT
    // const handleSegment = (value) => {
    //     setCategoryDetails((prev) => {
    //         return {
    //             ...prev,
    //             match: value,
    //         };
    //     });
    // };

    // HANDLING CATEGORY
    // const handleCategory = (value) => {
    //     setCategoryDetails((prev) => {
    //         return {
    //             ...prev,
    //             match: value,
    //         };
    //     });
    // };

    const addCategory = (e) => {
        e.preventDefault();
        let token = getSession("authorization");
        const credential = { ...categoryDetails }
        AddData({ url: `filter/category/value/add`, cred: credential, token: token })
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
                    setCategoryDetails({
                        category: params.id,
                        title: "",
                        max: "",
                        min: "",
                    })
                    setDeleteFilter(!deleteFilter);
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
    }

    // DEFINING DATA TABLE COLUMNS
    const columns = [
        {
            title: "TITLE",
            key: "title",
            dataIndex: "title",
            ...columnSearchProps("title"),
        },
        ...(filterDetails?.type !== "match"
        ? [
              {
                  title: "MIN VALUE",
                  key: "min",
                  dataIndex: "min",
                  ...columnSearchProps("min"),
              },
              {
                  title: "MAX VALUE",
                  key: "max",
                  dataIndex: "max",
                  ...columnSearchProps("max"),
              },
          ]
        : []),
        {
            title: "ACTION",
            key: "action",
            render: (elem) => (
                <div className=" text-left px-2 py-1">
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
                        {/* <li>
                            <Link className="dropdown-item border-radius-md" to={"/filters/list/" + elem._id}>
                                See values
                            </Link>
                        </li>
                        <li>
                            <Link className="dropdown-item border-radius-md" to={"/filters/filter/" + elem._id}>
                                Update
                            </Link>
                        </li> */}
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

    // API CALL METHOD TO DELETE AN ITEM
    const deleteItem = (id) => {
        let token = getSession("authorization");
        const credential = { id: id, valueId: params.id }
        EditData({ url: `filter/category/value/delete`, cred: credential, token: token })
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
                    setDeleteFilter(!deleteFilter);
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

                        {/* ADD VALUE FORM */}
                        {filterDetails?.type === "range"  && (
                            <div className="g-4">
                                <div className="card mb-3">
                                    <div className="card-body p-md-5">
                                        <h4>Add New Value</h4>
                                        <form onSubmit={addCategory}
                                        >
                                            <div className="row">
                                                <div className="mb-4 col-md-6">
                                                    <label
                                                        htmlFor="form-subcategory/title"
                                                        className="form-label"
                                                    >
                                                        Title
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        className="form-control"
                                                        id="form-subcategory/title"
                                                        value={categoryDetails.title}
                                                        onChange={handleTitle}
                                                    />
                                                </div>
                                                <div className="mb-4 col-md-6">
                                                    <label
                                                        htmlFor="form-subcategory/max"
                                                        className="form-label"
                                                    >
                                                        Minimum Value
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="min"
                                                        className="form-control"
                                                        id="form-subcategory/min"
                                                        value={categoryDetails.min}
                                                        onChange={handleDetails}
                                                    />
                                                </div>
                                                <div className="mb-4 col-md-6">
                                                    <label
                                                        htmlFor="form-subcategory/max"
                                                        className="form-label"
                                                    >
                                                        Maximum Value
                                                    </label>
                                                    <input
                                                        type="number"
                                                        name="max"
                                                        className="form-control"
                                                        id="form-subcategory/max"
                                                        value={categoryDetails.max}
                                                        onChange={handleDetails}
                                                    />
                                                </div>
                                                {/* <div className="mb-4 col-md-6">
                                                    <label htmlFor="form-category/user" className="form-label">
                                                        Select Segment</label>
                                                    <Select
                                                        style={{ width: "100%" }}
                                                        name="match"
                                                        placeholder="Select Match"
                                                        onChange={handleSegment}
                                                        options={segmentList}
                                                        className="p-0 mt-2"
                                                    />
                                                </div>
                                                <div className="mb-4 col-md-6">
                                                    <label htmlFor="form-category/user" className="form-label">
                                                        Select Category</label>
                                                    <Select
                                                        style={{ width: "100%" }}
                                                        name="match"
                                                        placeholder="Select Match"
                                                        onChange={handleCategory}
                                                        options={categoryList}
                                                        className="p-0 mt-2"
                                                    />
                                                </div> */}
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
                            )}

                        {/* FILTER TYPE LIST */}
                        <div className="card">
                            <div className="card-header pb-0">
                                <div className="row">
                                    <div className="col-lg-6 col-7">
                                        <h6>Filter Values</h6>
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
        </React.Fragment>
    );
};

export default FilterCategoryList;
