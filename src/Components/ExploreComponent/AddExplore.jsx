import React, { useEffect, useRef, useState } from "react";
import FileUpload from "../../Apis/Setters/FileUpload";
import useSession, { deleteSession } from "../../hooks/session";
import { AddData } from "../../Apis/Setters/AddData";

const AddExplore = () => {
  const [setSession, getSession] = useSession();

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  // VALUES STATE
  const [details, setDetails] = useState({
    title: "",
    uploadType: "image",
    upload: "",
    description: "",
  });

  // EDITABLE IMAGE STATE
  const [editableImg, setEditableImg] = useState("");

  // IMAGE INPUT REFERENCE
  let imgRef = useRef();

  // METHOD TO SET DETAILS IN details STATE VARIABLE
  const handleDetails = (e) => {
    if (e.target.type === "checkbox") {
      const { name, checked } = e.target;
      setDetails({
        ...details,
        [name]: checked,
      });
    } else {
      const { name, value } = e.target;
      setDetails({
        ...details,
        [name]: value,
      });
    }
  };

  // FILE UPLOAD METHOD(API CALL)
  const fileUpload = async (e) => {
    // Getting details field to set image id
    var fieldName = e.target.name;
    FileUpload({ file: e.target.files[0], path: "products", type: "Product" })
      .then((res) => {
        if (res.data.status) {
          setEditableImg(URL.createObjectURL(e.target.files[0]));
          if (fieldName === "upload") {
            setDetails({
              ...details,
              upload: res?.data?.data?.uploadImage?._id,
            });
          }
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

  // HANDLING API CALL METHOD
  const add = async (e) => {
    e.preventDefault();
    let token = getSession("authorization");
    let credentials = { ...details };
    AddData({ url: "explore", cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        setDetails({
          title: "",
          uploadType: "image",
          upload: "",
          description: "",
        });
        setEditableImg("");
        if (details?.uploadType === "image") {
          imgRef.current.value = "";
        }
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
      <form onSubmit={add}>
        {/* INPUT PRODUCT DETAILS */}
        <div className="container-fluid row">
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

          <div className="col-md-8 card-body ">
            {/* Basic Information Card */}
            <div className="card">
              <div className="card-body p-md-5">
                <div className="mb-5">
                  <h4 className="mb-0 fs-exact-18">Explore Information</h4>
                </div>
                <div className="row g-4 mb-4">
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-coupon/title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      id="form-product/title"
                      value={details.title}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="form-doctorImage/upload"
                      className="form-label"
                    >
                      Upload
                    </label>
                    {details?.uploadType === "image" ? (
                      <div className="row">
                        <div className="col-2 p-0">
                          <span className="ms-4">
                            <img
                              src={editableImg}
                              width="40"
                              height="40"
                              alt=""
                            />
                          </span>
                        </div>
                        <div className="col-10 ps-0">
                          <input
                            type="file"
                            className="form-control"
                            name="upload"
                            id="form-doctorImage/upload"
                            onChange={fileUpload}
                            required
                            ref={imgRef}
                          />
                        </div>
                      </div>
                    ) : (
                      <input
                        type="text"
                        name="upload"
                        className="form-control"
                        id="form-product/title"
                        value={details?.upload}
                        onChange={handleDetails}
                        placeholder="Video link here"
                        required
                      />
                    )}
                  </div>

                  {/* <div className="col-md-6">
                                        <label htmlFor="form-coupon/type" className="form-label">
                                            Type
                                        </label>
                                        <div className="input-group input-group--sa-title">
                                            <input
                                                type="text"
                                                name="type"
                                                className="form-control"
                                                id="form-coupon/type"
                                                placeholder="flat or percentage"
                                                aria-describedby="form-coupon/type-addon form-coupon/type-help"
                                                //value={details.type}
                                                onChange={handleDetails}
                                                required
                                            />
                                        </div>
                                    </div> */}
                </div>
                {/* <div className="row g-4 mb-4">
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-coupon/discount" className="form-label">
                                            Discount
                                        </label>
                                        <input
                                            type="number"
                                            name="discount"
                                            className="form-control"
                                            id="form-product/discount"
                                            value={details.discount}
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="form-coupon/discountUpTo" className="form-label">
                                            Discount Upto
                                        </label>
                                        <div className="input-group input-group--sa-title">
                                            <input
                                                type="number"
                                                name="discountUpTo"
                                                className="form-control"
                                                id="form-coupon/discountUpTo"
                                                aria-describedby="form-coupon/discountUpTo-addon form-coupon/discountUpTo-help"
                                                value={details.discountUpTo}
                                                onChange={handleDetails}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-4 mb-4">
                                    <div className="mb-4 col-md-6">
                                        <label htmlFor="form-coupon/limit" className="form-label">
                                            Total Limit
                                        </label>
                                        <input
                                            type="number"
                                            name="limit"
                                            className="form-control"
                                            id="form-product/limit"
                                            value={details.limit}
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="form-doctor/expiredAt" className="form-label">
                                            Expired At
                                        </label>
                                        <input
                                            type="date"
                                            name="expiredAt"
                                            className="form-control"
                                            id="form-coupon/expiredAt"
                                            placeholder="mm/dd/yyyy"
                                            //value={details.expiredAt}
                                            onChange={handleDetails}
                                            required
                                        />
                                    </div>
                                </div> */}
                <div className="col-md-6">
                  <label htmlFor="form-coupon/type" className="form-label">
                    Upload Type
                  </label>
                  <label className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="uploadType"
                      onChange={handleDetails}
                      value="image"
                      checked={details?.uploadType === "image" ? true : false}
                    />
                    <span className="form-check-label">Image</span>
                  </label>
                  <label className="form-check mb-4">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="uploadType"
                      onChange={handleDetails}
                      value="video"
                      checked={details?.uploadType === "video" ? true : false}
                    />
                    <span className="form-check-label">Video</span>
                  </label>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="form-product/description"
                    className="form-label"
                  >
                    Description
                  </label>
                  <textarea
                    id="form-product/description"
                    name="description"
                    className="sa-quill-control form-control sa-quill-control--ready"
                    rows="4"
                    value={details.description}
                    onChange={handleDetails}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="text-center m-5">
                <input
                  type="submit"
                  className="btn btn-outline-primary btn-sm mb-0 px-5"
                  value="Save"
                />
              </div>
            </div>
          </div>
        </div>
        {/* SUBMIT DOCTOR DETAILS */}
        {/* <div className="container-fluid pb-5 row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body p-md-5">
                                <div className="text-center">
                                    <input type="submit" className="btn btn-outline-primary btn-sm mb-0 px-5" value="Save" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
      </form>
    </React.Fragment>
  );
};

export default AddExplore;
