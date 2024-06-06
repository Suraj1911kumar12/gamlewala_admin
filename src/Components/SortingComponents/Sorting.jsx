import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useColumnSearchProps from "../../hooks/useColumnSearchProps";
import Datatable from "../DataTableComponent/Datatable";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { AddData } from "../../Apis/Setters/AddData";
import { DeleteData } from "../../Apis/Setters/DeleteData";
import { Select } from "antd";


const Sorting = () => {

    const typeRef = useRef()
    const fieldRef = useRef()



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
        name: "",
        field: "",
        type: "",
    });

    // HANDLING ADD SUBCATEGORY DETAILS TO ABOVE STATE
    const handleDetails = (e) => {
        const { name, value } = e.target;
        setSorting({
            ...sorting,
            [name]: value,
        });
    };

    const [fieldData, setFieldData] = useState()

    useEffect(() => {
        let token = getSession("authorization");
        GetData({ url: "filter/get-fields", token: token })
            .then((res) => {
                setFieldData(res.data.data);
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
    const [deleteData, setdeleteData] = useState(true);
    const [addData, setAddData] = useState(true);

    const [sortingData, setSortingData] = useState([])

    useEffect(() => {
        let token = getSession("authorization");
        GetData({ url: "filter/sorting/list", token: token })
            .then((res) => {
                setSortingData(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [addData, deleteData]);


    const addItem = async (e) => {
        e.preventDefault();
        let token = getSession("authorization");
        let credentials = { ...sorting };
        AddData({ url: "filter/sorting/value/add", cred: credentials, token: token })
            .then((res) => {
                window.scrollTo(0, 0);
                setSorting({
                    name: "",
                    type: "",
                    field: ""
                });
                fieldRef.current.value = ''
                typeRef.current.value = ''
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
                }, 3000);
                setAddData(!addData)
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

    // DESTRUCTURING DATA FOR DATA TABLE
    const data = [...sortingData];

    // DEFINING DATA TABLE COLUMNS
    const columns = [
        {
            title: "NAME",
            key: "name",
            dataIndex: "name",
            ...columnSearchProps("name"),
        },
        {
            title: "FIELD",
            key: "field",
            dataIndex: "field",
            ...columnSearchProps("field"),
        },
        {
            title: "TYPE",
            key: "type",
            dataIndex: "type",
            ...columnSearchProps("type"),
        },
        {
            title: "Status",
            key: "isActive",
            dataIndex: "isActive",
            render: (_, elem) => (
                <div className=" text-left px-2 py-1">
                    <div className=" text-left">
                        <div className="badge bg-primary">
                            {elem.isActive ? "Active" : "Not Active"}
                        </div>
                    </div>
                </div>
            ),
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
                        {/* <li
                        onClick={() => {
                            activateItem(elem._id);
                        }}
                        >
                            <Link className="dropdown-item border-radius-md" to="#">
                                Activate
                            </Link>
                        </li> */}
                        <li>
                            <Link
                                className="dropdown-item border-radius-md"
                                to={"/filter/sorting/" + elem._id}
                            >
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

        DeleteData({ url: `filter/sorting/delete/${id}`, token: token })
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
                        {/* ADD SORTING FORM */}
                        <div className="g-4">
                            <div className="card mb-3">
                                <div className="card-body p-md-5">
                                    <h4>Add Sorting</h4>
                                    <form onSubmit={addItem}
                                    >
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
                                                    value={sorting.field}
                                                    onChange={handleField}
                                                    options={fieldList}
                                                    className="p-0 mt-2"
                                                    ref={fieldRef}
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
                                                    onChange={handleType}
                                                    value={sorting.type}

                                                    ref={typeRef}
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
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* SORTING LIST */}
                        <div className="card">
                            <div className="card-header pb-0">
                                <div className="row">
                                    <div className="col-lg-6 col-7">
                                        <h6>Sorting Type List</h6>
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

export default Sorting;
