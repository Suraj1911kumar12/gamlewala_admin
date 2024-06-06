import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useColumnSearchProps from "../../hooks/useColumnSearchProps";
import Datatable from "../DataTableComponent/Datatable";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { DeleteData } from "../../Apis/Setters/DeleteData";
import { Select } from "antd";

const FilterList = () => {
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

    const [filterListData, setFilterListData] = useState([]);
    const [deleteFilter, setDeleteFilter] = useState(false);

    useEffect(() => {
        let token = getSession("authorization");
        GetData({ url: "filter/category", token: token })
            .then((res) => {
                setFilterListData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [deleteFilter]);

    // DESTRUCTURING DATA FOR DATA TABLE
    const data = [...filterListData];

    // DEFINING DATA TABLE COLUMNS
    const columns = [
        {
            title: "NAME",
            key: "name",
            dataIndex: "name",
            sorter: {
                compare: (a, b) => a.name - b.name,
                multiple: 3,
            },
            ...columnSearchProps("name"),
        },
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
                        <li>
                            <Link className="dropdown-item border-radius-md" to={"/filters/list/" + elem._id}>
                                See values
                            </Link>
                        </li>
                        <li>
                            <Link className="dropdown-item border-radius-md" to={"/filters/filter/" + elem._id}>
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

    // API CALL METHOD TO DELETE AN ITEM
    const deleteItem = (id) => {
        let token = getSession("authorization");
        DeleteData({ url: `filter/category/delete/${id}`, token: token })
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

                        {/* FILTER TYPE LIST */}
                        <div className="card">
                            <div className="card-header pb-0">
                                <div className="row">
                                    <div className="col-lg-6 col-7">
                                        <h6>Filter Type List</h6>
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

export default FilterList;
