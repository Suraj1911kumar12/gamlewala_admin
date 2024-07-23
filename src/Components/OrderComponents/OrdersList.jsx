import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useColumnSearchProps from "../../hooks/useColumnSearchProps";
import Datatable from "../DataTableComponent/Datatable";
import useSession from "../../hooks/session";
import { AddData } from "../../Apis/Setters/AddData";
import { Button, Select } from "antd";
import { UpdateData } from "../../Apis/update/UpdateAPI";

const { Option } = Select

const OrdersList = () => {
  const [errMsg, setErrMsg] = useState({
    status: false,
    message: "",
  });
  // SUCCESS MESSAGE STATE
  const [successMsg, setSuccessMsg] = useState({
    status: false,
    message: "",
  });

  const getOrderApi = () => {
    let token = getSession("authorization");
    AddData({ url: "order", token: token })
      .then((res) => {
        console.log("res of orders", res);
        setOrderListData(res.data.data);
      })
      .catch((error) => {
        console.log('res error', error);
        setErrMsg({
          status: true,
          message: error.message || 'error'
        })
      });
  }

  const handleChangeType = (id, value) => {
    console.log(id);
    console.log(value);

    const credentials = {
      id: id,
      status: value
    }
    let token = getSession("authorization");

    try {
      UpdateData({ url: '/order-status/edit-status', token: token, cred: credentials }).then((res) => {
        console.log("res of orders", res);
        // setOrderListData(res.data.data);
        getOrderApi()
      })
        .catch((error) => {
          setErrMsg({
            status: true,
            message: error.response.data.msg || 'error'
          })
          console.log('res error', error);
        });
    } catch (error) {
      setErrMsg({
        status: true,
        message: error.response.data.msg || 'error'
      })
      console.log('res error', error);
    }
  }


  // const [deliveryStatus, setDeliveryStatus] = useState('Pending')


  // Declaring ColumnSearchProps Method
  const columnSearchProps = useColumnSearchProps();


  //ORDER LIST STATE
  const [orderListData, setOrderListData] = useState([]);
  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();

  useEffect(() => {
    getOrderApi()
  }, []);

  // ERROR MESSAGE STATE


  // DESTRUCTURING DATA FOR DATA TABLE
  const data = [...orderListData];

  const deliveryOption = [
    {
      value: 'confirmed',
      label: 'Order Confirm',
    },
    {
      value: 'processed',
      label: 'Order Processed',
      disable: true
    },
    {
      value: 'dispatched',
      label: 'Order Dispatched',
    },
    {
      value: 'delivered',
      label: 'Order Delivered',
    }
  ]


  // DEFINING DATA TABLE COLUMNS
  const columns = [
    {
      title: "ORDER No",
      key: "orderId",
      dataIndex: "orderId",
      ...columnSearchProps("orderId"),
      render: (_, elem) => (
        <span>{elem?.orderId}</span>
      ),
    },
    {
      title: "DATE",
      dataIndex: "createdAt",
      key: "createdAt",
      ...columnSearchProps("createdAt"),
      render: (_, elem) => (
        <span>{new Date(elem?.createdAt)?.toDateString()}</span>
      ),
    },
    {
      title: "CUSTOMER NAME",
      key: "customer",
      dataIndex: "customer",
      ...columnSearchProps("customer"),
      render: (_, elem) => (
        <span>{elem?.userId?.name}</span>
      ),
    },
    // {
    //   title: "CUSTOMER ID",
    //   key: "customerId",
    //   dataIndex: "customerId",
    //   render: (_, elem) => (
    //     <span>{elem?.userId?._id}</span>
    //   ),
    // },
    {
      title: "PAYMENT STATUS",
      key: "paymentStatus",
      dataIndex: "paymentStatus",
      ...columnSearchProps("paymentStatus"),
      render: (_, elem) => (
        <div className=" text-left px-2 py-1">
          <div className=" text-left">{elem.paymentStatus == "unpaid" ?
            <div className="badge bg-danger">{elem.paymentStatus}</div>
            :
            <div className="badge bg-success">{elem.paymentStatus}</div>}
          </div>
        </div>
      ),
    },
    // {
    //   title: "PAYMENT METHOD",
    //   key: "paymentStatus",
    //   dataIndex: "paymentStatus",
    //   ...columnSearchProps("paymentStatus"),
    //   render: (_, elem) => (
    //     <div className=" text-left px-2 py-1">
    //       <div className=" text-left">{elem.paymentMethod === "COD" ?
    //         <div className="badge bg-danger">{elem?.paymentMethod || "COD"}</div>
    //         :
    //         <div className="badge bg-success">{elem?.paymentMethod || "COD"}</div>}
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   title: "ORDER STATUS",
    //   key: "orderStatus",
    //   dataIndex: "orderStatus",
    //   ...columnSearchProps("orderStatus"),
    //   render: (_, elem) => (
    //     <div className=" text-left px-2 py-1">
    //       <div className=" text-left">
    //         {elem.status == "delivered" ?
    //           <div className="badge bg-success">{elem.status}</div>
    //           : elem.status === 'cancelled' ?
    //             <div className="badge bg-danger">{elem.status}</div>
    //             :
    //             <div className="badge bg-warning">{elem.status}</div>
    //         }
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   title: "DELIVERY STATUS",
    //   key: "orderStatus",
    //   dataIndex: "orderStatus",
    //   render: (_, elem) => (
    //     <div className="  text-left px-2 py-1">
    //       {
    //         elem.status == "delivered" ? 'Delivered' :
    //           elem.status == 'cancelled' ? 'Cancelled' :
    //             <Select className=""
    //               placeholder="Select"
    //               // mode="multiple"
    //               style={{ width: 150 }} onChange={(value) => handleChangeType(elem?._id, value)}
    //             //  options={deliveryOption}
    //             >
    //               <Option value="confirmed" disabled={elem.status === 'pending' ? false : true} >
    //                 Order Confirm
    //               </Option>
    //               <Option value="processed" disabled={elem.status === 'confirmed' ? false : true}>
    //                 Order Processed
    //               </Option>
    //               <Option value="dispatched" disabled={elem.status === 'processed' ? false : true}>
    //                 Order Dispatched
    //               </Option>
    //               <Option value="delivered" disabled={elem.status === 'dispatched' ? false : true}>
    //                 Order Delivered
    //               </Option>
    //             </Select>
    //       }
    //     </div>
    //   ),
    // },
    {
      title: "ITEMS",
      key: "orderDetails",
      dataIndex: "orderDetails",
      render: (_, elem) => <span>{elem?.productDetails.length}</span>,
    },
    {
      title: "TOTAL",
      key: "grandTotal",
      dataIndex: "grandTotal",
      render: (_, elem) => (
        <span>
          {elem.totalMrp?.toLocaleString("en-US", {
            style: "currency",
            currency: "INR",
          })}
        </span>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (elem) => (
        <div className=" text-center px-2 py-1">
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
              <Link
                className="dropdown-item border-radius-md"
                to={"/orders/order/" + elem._id}
              >
                View
              </Link>
            </li>

          </ul>
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div className="container-fluid py-4">
        <div className="row my-4">
          <div className="col-md-12 mb-md-0 mb-4">
            {/* DISPLAY ERROR MESSAGE */}
            {errMsg.status && (
              <div
                className="alert alert-danger alert-dismissible fade show text-white"
                role="alert"
              >
                {errMsg.message}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={() => {
                    setErrMsg({
                      status: false,
                      message: "",
                    });
                  }}
                ></button>
              </div>
            )}

            {/* DISPLAY SUCCESS MESSAGE */}
            {successMsg.status && (
              <div
                className="alert alert-success alert-dismissible fade show text-white"
                role="alert"
              >
                {successMsg.message}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={() => {
                    setSuccessMsg({
                      status: false,
                      message: "",
                    });
                  }}
                ></button>
              </div>
            )}
            <div className="card">
              <div className="card-header pb-0">
                <div className="row">
                  <div className="col-lg-6 col-7">
                    <h6>Orders List  </h6>
                  </div>
                  <div style={{ display: 'flex', justifyContent: "flex-end" }} className="col-lg-6  col-7">
                    <h6>Total Order: {data?.length} </h6>
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

export default OrdersList;
