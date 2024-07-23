import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import PrintOrder from "./PrintOrder";
import { useParams } from "react-router";
import useSession from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { Select } from "antd";
import { UpdateData } from "../../Apis/update/UpdateAPI";

const EditOrder = () => {
  const { Option } = Select;

  const [errMsg, setErrMsg] = useState({
    status: false,
    message: "",
  });
  // SUCCESS MESSAGE STATE
  const [successMsg, setSuccessMsg] = useState({
    status: false,
    message: "",
  });

  const params = useParams();

  // CHANGE PRINT POPUP STATE
  const [printStatus, setPrintStatus] = useState(false);
  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();

  //ORDER LIST STATE
  const [orderListData, setOrderListData] = useState([]);

  const handleChangeType = (id, value) => {
    console.log(id);
    console.log(value);

    const credentials = {
      id: params.id,
      productId: id,
      status: value,
    };
    let token = getSession("authorization");

    try {
      UpdateData({
        url: "/order-status/edit-status",
        token: token,
        cred: credentials,
      })
        .then((res) => {
          console.log("res of orders", res);
          // setOrderListData(res.data.data);
          getApi();

          // getOrderApi()
        })
        .catch((error) => {
          setErrMsg({
            status: true,
            message: error.response.data.msg || "error",
          });
          console.log("res error", error);
        });
    } catch (error) {
      setErrMsg({
        status: true,
        message: error.response.data.msg || "error",
      });
      console.log("res error", error);
    }
  };

  const deliveryOption = [
    {
      value: "confirmed",
      label: "Order Confirm",
    },
    {
      value: "processed",
      label: "Order Processed",
    },
    {
      value: "dispatched",
      label: "Order Dispatched",
    },
    {
      value: "delivered",
      label: "Order Delivered",
    },
  ];
  useEffect(() => {
    getApi();
  }, []);

  const getApi = () => {
    window.scrollTo(0, 0);
    let token = getSession("authorization");
    GetData({ url: `order/${params.id}`, token: token })
      .then((res) => {
        console.log(res);
        setOrderListData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const order = orderListData;

  // Mpping List of Orderd Items
  const itemsList = order?.productDetails?.map((elem, index) => {
    const product_price = Number(elem?.price);

    const total_ammount =
      product_price * Number(elem?.quantity) + (elem?.gstcost || 0);

    return (
      <React.Fragment>
        {
          <tr key={index + 1}>
            <td className="align-middle text-start">
              <p className="text-xs font-weight-bold mb-0">{elem?.name}</p>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold mb-0">
                {elem?.[index]?.price
                  ? Number(elem?.[index]?.price)?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })
                  : Number(elem?.price)?.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
              </p>
            </td>
            <td className="align-middle text-center text-sm">
              <p className="text-xs font-weight-bold mb-0">{elem?.quantity}</p>
            </td>
            <td className="align-middle text-center">
              <p className="text-xs font-weight-bold mb-0">
                {(Number(elem?.price) * Number(elem?.quantity))?.toLocaleString(
                  "en-US",
                  { style: "currency", currency: "INR" }
                )}
              </p>
            </td>
            <td className="align-middle text-center">
              <div className=" text-left px-2 py-1">
                <div className=" text-left">
                  {elem.status == "delivered" ? (
                    <div className="badge bg-success">{elem.status}</div>
                  ) : elem.status === "cancelled" ? (
                    <div className="badge bg-danger">{elem.status}</div>
                  ) : (
                    <div className="badge bg-warning">{elem.status}</div>
                  )}
                </div>
              </div>
            </td>
            <td className="align-middle text-center">
              <div className="  text-left px-2 py-1">
                {elem.status == "delivered" ? (
                  "Delivered"
                ) : elem.status == "cancelled" ? (
                  "Cancelled"
                ) : (
                  <Select
                    className=""
                    placeholder="Select"
                    // mode="multiple"
                    style={{ width: 150 }}
                    onChange={(value) => handleChangeType(elem?._id, value)}
                    // options={deliveryOption}
                  >
                    <Option
                      value="confirmed"
                      disabled={elem?.status == "pending" ? false : true}
                    >
                      Order Confirm
                    </Option>
                    <Option
                      value="processed"
                      disabled={elem?.status == "confirmed" ? false : true}
                    >
                      Order Processed
                    </Option>
                    <Option
                      value="dispatched"
                      disabled={elem?.status == "processed" ? false : true}
                    >
                      Order Dispatched
                    </Option>
                    <Option
                      value="delivered"
                      disabled={elem?.status == "dispatched" ? false : true}
                    >
                      Order Delivered
                    </Option>
                  </Select>
                )}
              </div>
            </td>
            {/* <td className="align-middle text-center">
              <p className="text-xs font-weight-bold mb-0">{elem?.gst}%</p>
            </td> */}
            {/* <td className="text-center">
              <span className="text-secondary text-xs font-weight-bold">
                {total_ammount?.toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </td> */}
          </tr>
        }
      </React.Fragment>
    );
  });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <React.Fragment>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="card mb-4">
              <div className="card-body p-0">
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex px-2 py-1">
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0 text-sm">
                                {new Date(order?.updatedAt)?.toDateString()}
                                {/* {new Date(order?.created_at)?.toLocaleTimeString()} */}
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="text-xs font-weight-bold mb-0">
                            {order?.productDetails?.length} items
                          </p>
                        </td>
                        <td className="align-middle text-center text-sm">
                          <p className="text-xs font-weight-bold mb-0">
                            Total{" "}
                            {order?.totalPrice?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </p>
                        </td>
                        <td className="align-middle text-center">
                          <span className="badge badge-sm bg-gradient-secondary">
                            {order?.paymentMethod}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-header pb-0">
                <h4>Items table</h4>
              </div>
              <div className="card-body px-0 pt-0 pb-2">
                {/* Items List Table */}
                <div className="table-responsive p-0" id="order-items">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xs font-weight-bolder">
                          Products
                        </th>
                        {/* <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Color</th>
                                                <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">Size</th> */}
                        <th className="text-uppercase text-secondary text-xs font-weight-bolder ps-2">
                          Unit Price
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">
                          Quantity
                        </th>
                        <th className="text-uppercase text-secondary text-xs font-weight-bolder ps-2">
                          Price
                        </th>
                        <th className="text-uppercase text-secondary text-xs font-weight-bolder ps-2">
                          Order Status
                        </th>
                        <th className="text-uppercase text-secondary text-xs font-weight-bolder ps-2">
                          Delivery Status
                        </th>
                        {/* <th className="text-uppercase text-secondary text-xs font-weight-bolder ps-2">
                          Tax
                        </th> */}
                        {/* <th className="text-center text-uppercase text-secondary text-xs font-weight-bolder">
                          Total Amount
                        </th> */}
                      </tr>
                    </thead>

                    <tbody>{itemsList}</tbody>
                  </table>
                </div>

                {/* Order Totaling Table */}
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <tbody>
                      <tr className="border-transparent">
                        <td colSpan={3}>
                          <div className="d-flex px-2 py-1">
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0">Subtotal</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="font-weight-bold mb-0 text-end pe-4">
                            {order?.totalPrice?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </p>
                        </td>
                      </tr>
                      {/* <tr>
                        <td colSpan={3}>
                          <div className="d-flex px-2 py-1">
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0">Loyalty Discount</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="font-weight-bold mb-0 text-end pe-4">
                            {Number(order?.discount)?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </p>
                        </td>
                      </tr> */}
                      <tr>
                        <td colSpan={3}>
                          <div className="d-flex px-2 py-1">
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0">Shipping</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="font-weight-bold mb-0 text-end pe-4">
                            {order?.shippingCost?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </p>
                        </td>
                      </tr>
                      {/* <tr>
                        <td colSpan={3}>
                          <div className="d-flex px-2 py-1">
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0">Discount</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="font-weight-bold mb-0 text-end pe-4">
                            {order?.discount}
                          </p>
                        </td>
                      </tr> */}
                      {/* <tr>
                        <td colSpan={3}>
                          <div className="d-flex px-2 py-1">
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0">Total Tax</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="font-weight-bold mb-0 text-end pe-4">
                            {order?.tax || '--'}
                          </p>
                        </td>
                      </tr> */}
                      <tr>
                        <td colSpan={3}>
                          <div className="d-flex px-2 py-1">
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="mb-0">Grand Total</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="font-weight-bold mb-0 text-end pe-4">
                            {order?.totalAmountToPay?.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="col-md-4">
            <div className="card">
              <div className="card-body d-flex align-items-center justify-content-between pb-0 pt-4">
                <h4 className="fs-exact-16 mb-0">Customer Details</h4>
              </div>
              <div className="card-body pt-4">
                {/* <div className="d-flex align-items-center">
                  <div className="ps-2">
                    <Link to="#">
                      <h5 className="mb-0 ">{orderListData?.customer?.name}</h5>
                    </Link>
                  </div>
                </div> */}

                <div className="row">
                  <div className="mb-4">
                    <div className="ps-0">
                      <h6 className="fs-exact-16 mb-0">Name</h6>
                      <div className="pt-1">
                        <p className="text-sm mb-1">
                          {orderListData?.userId?.name.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h6 className="fs-exact-16 mb-0">Contact Details</h6>
                      <div className="pt-1">
                        {/* <p className="text-sm mb-1">{order?.customer_id}</p> */}
                        <p className="text-sm mb-1">
                          {orderListData?.userId?.email}
                          <br />
                          {orderListData?.userId?.mobile}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4">
                      <h6 className="fs-exact-16 mb-0">Shipping Address</h6>
                      <div className="pt-1">
                        <p className="text-sm mb-1">
                          {`${
                            orderListData?.shippingAddressId?.houseNo
                              ? orderListData?.shippingAddressId?.houseNo + ","
                              : ""
                          } ${
                            orderListData?.shippingAddressId?.street || "N/A"
                          }, ${orderListData?.shippingAddressId?.city?.name}, ${
                            orderListData?.shippingAddressId?.state?.name
                          }, ${orderListData?.shippingAddressId?.postalCode}, ${
                            orderListData?.shippingAddressId?.country
                          }`}
                        </p>
                      </div>
                    </div>
                    <div className="pt-4">
                      <h6 className="fs-exact-16 mb-0">Billing Address</h6>
                      <div className="pt-1">
                        <p className="text-sm mb-1">
                          {`${
                            orderListData?.shippingAddressId?.houseNo
                              ? orderListData?.shippingAddressId?.houseNo + ","
                              : ""
                          } ${
                            orderListData?.shippingAddressId?.street || "N/A"
                          },   ${
                            orderListData?.shippingAddressId?.city?.name
                          }, ${
                            orderListData?.shippingAddressId?.state?.name
                          }, ${orderListData?.shippingAddressId?.postalCode}, ${
                            orderListData?.shippingAddressId?.country
                          }`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRINT DATA */}
      {printStatus && (
        <div className="password-popup">
          <div className="rts-newsletter-popup popup popup-large">
            <div
              className="newsletter-close-btn"
              onClick={() => setPrintStatus(!printStatus)}
            >
              <i className="fa fa-times"></i>
            </div>

            <div className="newsletter-inner popup-inner p-4">
              <span className="newsletter-heading">
                <button
                  className="btn btn-primary float-end"
                  onClick={handlePrint}
                >
                  {" "}
                  <i className="fa fa-print"></i> print
                </button>
              </span>
              <PrintOrder order={order} ref={componentRef} />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default EditOrder;
