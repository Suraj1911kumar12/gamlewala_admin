import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useColumnSearchProps from "../../hooks/useColumnSearchProps";
import Datatable from "../DataTableComponent/Datatable";
import { GetData } from "../../Apis/Getters/GetData";
import useSession, { deleteSession } from "../../hooks/session";
import { DeleteData } from "../../Apis/Setters/DeleteData";
import { AddData } from "../../Apis/Setters/AddData";

const CouponList = () => {
  // Declaring ColumnSearchProps Method
  const columnSearchProps = useColumnSearchProps();

  const [setSession, getSession] = useSession();

  //ORDER LIST STATE
  const [couponListData, setCouponListData] = useState([]);

  const [deleteCouponData, setDeleteCouponData] = useState(false);

  useEffect(() => {
    let token = getSession("authorization");
    // const credentials = {}
    AddData({ url: "coupon/list", token: token })
      .then((res) => {
        setCouponListData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteCouponData]);

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });
  let token = getSession("authorization");
  console.log(token);


  // API CALL METHOD TO DELETE AN ITEM
  const deleteItem = (id) => {
    DeleteData({ url: `coupon/delete/${id}`, token: token })
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
          setDeleteCouponData((prev) => !prev);
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

  // DESTRUCTURING DATA FOR DATA TABLE
  const data = [...couponListData];

  // DEFINING DATA TABLE COLUMNS
  const columns = [
    {
      title: "CODE",
      key: "code",
      dataIndex: "code",
      ...columnSearchProps("code"),
    },
    {
      title: "TYPE",
      dataIndex: "type",
      key: "type",
      ...columnSearchProps("type"),
    },
    {
      title: "DISCOUNT",
      key: "discount",
      dataIndex: "discount",
      ...columnSearchProps("discount"),
    },
    {
      title: "DISCOUNT UPTO",
      key: "discountUpTo",
      dataIndex: "discountUpTo",
      ...columnSearchProps("discountUpTo"),
    },
    {
      title: "TOTAL LIMIT",
      key: "totalLimit",
      dataIndex: "totalLimit",
      ...columnSearchProps("totalLimit"),
    },
    {
      title: "USER LIMIT",
      key: "userLimit",
      dataIndex: "userLimit",
      ...columnSearchProps("userLimit"),
    },
    {
      title: "STATUS",
      key: "isActive",
      dataIndex: "isActive",
      ...columnSearchProps("isActive"),
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
      title: "CREATE DATE",
      dataIndex: "createdAt",
      key: "createdAt",
      ...columnSearchProps("createdAt"),
      render: (_, elem) => (
        <span>{new Date(elem?.createdAt)?.toDateString()}</span>
      ),
    },
    {
      title: "EXPIRY DATE",
      dataIndex: "expiredAt",
      key: "expiredAt",
      ...columnSearchProps("expiredAt"),
      render: (_, elem) => (
        <span>{new Date(elem?.expiredAt)?.toDateString()}</span>
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
                to={"/coupons/coupon/" + elem._id}
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

            <div className="card">
              <div className="card-header pb-0">
                <div className="row">
                  <div className="col-lg-6 col-7">
                    <h6>Coupons List</h6>
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

export default CouponList;
