import React, { useEffect, useState } from 'react'
import Datatable from '../DataTableComponent/Datatable';
import { AddData } from '../../Apis/Setters/AddData';
import useSession, { deleteSession } from '../../hooks/session';
import { Link } from 'react-router-dom';
import { DeleteData } from '../../Apis/Setters/DeleteData';
import { GetData } from '../../Apis/Getters/GetData';

const PremiumEvent = () => {
    const [setSession, getSession] = useSession();
    const [deleteProductData, setDeleteProductData] = useState(false);
    const [totalCallback, setTotalCallback] = useState('')

    const [callbackList, setCallbackList] = useState([])
    const [alert, setAlert] = useState({
        errStatus: false,
        successStatus: false,
        errMessage: "",
        successMessage: "",
    })
    let token = getSession("authorization");

    useEffect(() => {
        AddData({ url: "request-callback/list", token: token })
            .then((res) => {
                console.log(res);
                setCallbackList(res.data.data);
                setTotalCallback(res?.data?.count)
            })
            .catch((error) => {
                console.log(error, "error");
                setAlert({
                    errStatus: true,
                    successStatus: false,
                    errMessage: error.message,
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
            });
    }, [deleteProductData]);


    const handleDelete = (id) => {
        DeleteData({ url: `/request-callback/list/delete/${id}`, token: token })
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
                    setDeleteProductData((prev) => !prev);
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

    const columns = [

        {
            title: "Name",
            key: "name",
            dataIndex: "name",
            // ...columnSearchProps("name"),
        },
        {
            title: "Mobile",
            key: "mobile",
            dataIndex: "mobile",
            // ...columnSearchProps("name"),
        },
        {
            title: "Queries",
            key: "queries",
            dataIndex: "queries",
            // ...columnSearchProps("name"),
        },
        // {
        //     title: "ACTION",
        //     key: "action",
        //     render: (elem) => (
        //         <div className=" text-center px-2 py-1">
        //             <Link
        //                 className="cursor-pointer"
        //                 id="dropdownTable"
        //                 data-bs-toggle="dropdown"
        //                 aria-expanded="false"
        //             >
        //                 <i
        //                     className="fa fa-ellipsis-v text-secondary"
        //                     aria-hidden="true"
        //                 ></i>
        //             </Link>
        //             <ul
        //                 className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5 border border-dark"
        //                 aria-labelledby="dropdownTable"
        //                 data-popper-placement="bottom-start"
        //             >
        //                 <li>
        //                     <Link
        //                         className="dropdown-item border-radius-md"
        //                         to={`/requestcallbacks/` + elem?._id}
        //                     >
        //                         View
        //                     </Link>
        //                 </li>
        //             </ul>
        //         </div>
        //     ),
        // },
    ]
    return (
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

                    <div className="card">
                        <div className="card-header pb-0">
                            <div className="row">
                                <div className="col-md-8">
                                    <h6>Premium Event List</h6>
                                </div>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <div className="table-responsive">
                                {<Datatable data={callbackList} columns={columns} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PremiumEvent