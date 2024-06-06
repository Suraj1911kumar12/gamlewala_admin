import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useColumnSearchProps from "../../hooks/useColumnSearchProps";
import Datatable from "../DataTableComponent/Datatable";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { AddData } from "../../Apis/Setters/AddData";
import FileUpload from "../../Apis/Setters/FileUpload";

const Notification = () => {
  // Declaring ColumnSearchProps Method
  const columnSearchProps = useColumnSearchProps();
  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });
  // ADD FAQ DETAILS STATE
  const [notificationData, setNotificationData] = useState({
    title: "",
    imageId: "",
    description: "",
  });
  // HANDLING ADD FAQ DETAILS TO ABOVE STATE
  const handleDetails = (e) => {
    const { name, value } = e.target;
    setNotificationData({
      ...notificationData,
      [name]: value,
    });
  };

  const [listData, setListData] = useState([]);
  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();

  const [addData, setAddData] = useState(true);

  useEffect(() => {
    let token = getSession("authorization");

    GetData({ url: "notification-list", token: token })
      .then((res) => {
        setListData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [addData]);

   // EDITABLE IMAGE STATE
   const [editableImg, setEditableImg] = useState("");

  // DESTRUCTURING DATA FOR DATA TABLE
  const data = [...listData];

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
      title: "TITLE",
      key: "title",
      dataIndex: "title",
      ...columnSearchProps("title"),
    },
    {
      title: "DESCRIPTION",
      key: "description",
      dataIndex: "description",
      ...columnSearchProps("description"),
    },
  ];

  // ADD FAQ API METHOD
  const addNotification = (e) => {
    e.preventDefault();
    const credentials = { ...notificationData };
    let token = getSession("authorization");
    AddData({ url: "send-push-notification", cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        if (res.data.status) {
          setEditableImg("")
          setNotificationData({
            imageId: "",
            title: "",
            description: "",
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

// FILE UPLOAD METHOD(API CALL)
const fileUpload = async (e) => {
  FileUpload({ file: e.target.files[0], path: "notification", type: "Notification" })
      .then((res) => {
          if (res.data.status) {
            setEditableImg(URL.createObjectURL(e.target.files[0]));
              setNotificationData({
                  ...notificationData,
                  imageId: res?.data?.data?.uploadImage?._id,
              });
          }
      }).catch((err) => {
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
                className="alert alert-danger alert-dismissible fade show text-white"
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
                className="alert alert-success alert-dismissible fade show text-white"
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
            {/* ADD FAQ FORM */}
            <div className="g-4">
              <div className="card mb-3">
                <div className="card-body p-md-5">
                  <h4>Add Notification</h4>
                  <form onSubmit={addNotification}>
                    <div className="row">
                    <div className="row g-4 mb-4">
                  <div className="mb-4 col-md-6">
                    <label
                      htmlFor="form-doctorImage/thumbnail"
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
                          accept="image/*"
                          className="form-control"
                          name="imageId"
                          id="form-doctorImage/thumbnail"
                          onChange={fileUpload}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="form-product/title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      id="form-product/name"
                      value={notificationData.title}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                </div>
                      <div className="mb-4">
                        <label htmlFor="form-faq/answer" className="form-label">
                          Description
                        </label>
                        <textarea
                          name="description"
                          rows="5"
                          className="form-control"
                          id="form/description"
                          value={notificationData.description}
                          onChange={handleDetails}
                        ></textarea>
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

            {/* FAQs LIST */}
            <div className="card">
              <div className="card-header pb-0">
                <div className="row">
                  <div className="col-lg-6 col-7">
                    <h6>Notifications List</h6>
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

export default Notification;
