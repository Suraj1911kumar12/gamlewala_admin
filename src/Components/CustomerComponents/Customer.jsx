import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useSession from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import Datatable from "../DataTableComponent/Datatable";

const Customer = () => {
  const params = useParams();

  // Using Edit Context Api of this Component
  const [customerDetails, setCustomerDetails] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  const [setSession, getSession] = useSession();

  let token = getSession("authorization");

  useEffect(() => {

    GetData({ url: `user-details/${params.id}`, token: token })
      .then((res) => {
        setCustomerDetails(res.data.data);
        setOrderDetails(res?.data?.data?.orderDetails)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // DESTRUCTURING DATA FOR DATA TABLE
  const data = [...orderDetails];

  // DEFINING DATA TABLE COLUMNS
  const columns = [
    {
      title: "ORDER ID",
      key: "orderNo",
      dataIndex: "orderNo",
      render: (_, elem) => (
        <div onClick={() => { }}>
          <Link to={"/orders/order/" + elem?._id}>{elem?.orderNo}</Link>
        </div>
      ),
    },
    {
      title: "DATE",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, elem) => (
        <span>{new Date(elem?.createdAt)?.toDateString()}</span>
      ),
    },
    {
      title: "PAYMENT STATUS",
      key: "paymentStatus",
      dataIndex: "paymentStatus",
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
    {
      title: "TOTAL",
      key: "grandTotal",
      dataIndex: "grandTotal",
      render: (_, elem) => (
        <span>
          {elem.grandTotal?.toLocaleString("en-US", {
            style: "currency",
            currency: "INR",
          })}
        </span>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div className="container-fluid py-4">
        <div className="row">
          {/* Customer Details */}
          <div className="col-md-4 mb-5">
            <div className="card">
              <div className="card-body pt-4">
                <div className="row">
                  <div className="col-auto my-auto">
                    <div className="h-100">
                      <h5 className="mb-1">{customerDetails?.userDetails?.name.toUpperCase()}</h5>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="mb-4">
                    <div className="pt-4">
                      <h6 className="fs-exact-16 mb-0">Contact Details</h6>
                      <div className="pt-1">
                        <p className="text-sm mb-1">{customerDetails?.userDetails?.email}</p>
                        <p className="text-sm mb-1">
                          {customerDetails?.userDetails?.mobile}
                        </p>
                      </div>
                    </div>
                    {customerDetails?.address?.length ? (

                      <div className="pt-4">
                        <h6 className="fs-exact-16 mb-0">Addresses</h6>
                        <div className="pt-1">
                          <p className="text-sm mb-1">
                            {customerDetails?.address?.[0]?.houseNo}
                            <br />
                            {customerDetails?.address?.[0]?.area}, <br />
                            {customerDetails?.address?.[0]?.state},
                            {customerDetails?.address?.[0]?.pincode}
                          </p>
                        </div>
                      </div>) : " "}
                    {customerDetails?.shippingAddress?.length ? (
                      <div className="pt-4">
                        <h6 className="fs-exact-16 mb-0">Shipping Address</h6>
                        <div className="pt-1">
                          <p className="text-sm mb-1">
                            {customerDetails?.shippingAddress?.[0]?.houseNo}
                            <br />
                            {customerDetails?.shippingAddress?.[0]?.area}, <br />
                            {customerDetails?.shippingAddress?.[0]?.state},
                            {customerDetails?.shippingAddress?.[0]?.pincode}
                          </p>
                        </div>
                      </div>) : " "}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="col-md-8">
            <div className=" mb-4">
              <div className="table-responsive">
                {<Datatable data={data} columns={columns} />}
              </div>
            </div>
            <div className="card mb-4">
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <tbody>
                    <tr>
                      <td colSpan={3}>
                        <div className="d-flex px-2 py-1">
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0">Total Orders</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="font-weight-bold mb-0 text-end pe-4">
                          {customerDetails?.orderCount}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3}>
                        <div className="d-flex px-2 py-1">
                          <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0">Total Spend</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="font-weight-bold mb-0 text-end pe-4">
                          {Number(customerDetails?.totalOrderValue?.[0]?.totalValue?.toFixed(2))?.toLocaleString(
                            "en-US",
                            { style: "currency", currency: "INR" }
                          )}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Customer;
