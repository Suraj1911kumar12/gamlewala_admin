import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Datatable from "../DataTableComponent/Datatable";
import useSession, { deleteSession } from "../../hooks/session";
import FileUpload from "../../Apis/Setters/FileUpload";
import { GetData } from "../../Apis/Getters/GetData";
import { AddData } from "../../Apis/Setters/AddData";
import { DeleteData } from "../../Apis/Setters/DeleteData";
import { EditData } from "../../Apis/Setters/EditData";

const SkinAndHair = () => {
  const [setSession, getSession] = useSession();

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  // ADD FAQ DETAILS STATE
  const [skinAndHair, setSkinAndHair] = useState({
    name: "",
    topic: "",
    type: "skin",
    uploadType: "image",
    upload: "",
  });

  // EDITABLE IMAGE STATE
  const [editableImg, setEditableImg] = useState("");

  // IMAGE INPUT REFERENCE
  let imgRef = useRef();
  // HANDLING ADD FAQ DETAILS TO ABOVE STATE
  const handleDetails = (e) => {
    const { name, value } = e.target;
    setSkinAndHair({
      ...skinAndHair,
      [name]: value,
    });
  };

  const [skinAndHairData, setSkinAndHairData] = useState([]);

  const [deleteData, setdeleteData] = useState(true);
  const [addSkinAndHairData, setAddSkinAndHairData] = useState(true);
  const [updateData, setUpdateData] = useState(true);

  useEffect(() => {
    let token = getSession("authorization");
    GetData({ url: "skin-and-hair", token: token })
      .then((res) => {
        setSkinAndHairData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteData, addSkinAndHairData, updateData]);

  // CHANGE FAQ POPUP STATE
  const [skinAndHairStatus, setSkinAndHairStatus] = useState(false);
  // FAQ POPUP DETAILS STATE
  const [skinAndHairDetails, setSkinAndHairDetails] = useState({
    skinAndHairId: "",
    name: "",
    topic: "",
    uploadType: "",
    type: "",
    upload: "",
  });

  // DESTRUCTURING DATA FOR DATA TABLE
  const data = [...skinAndHairData];

  // DEFINING DATA TABLE COLUMNS
  const columns = [
    {
      title: "NAME",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "TOPIC",
      key: "topic",
      dataIndex: "topic",
    },
    {
      title: "UPLOAD TYPE",
      key: "uploadType",
      dataIndex: "uploadType",
    },
    {
      title: "Link",
      key: "upload",
      dataIndex: "upload",
      render: (_, elem) => (
        <div>
          {/* <iframe
            width="560"
            height="315"
            src={elem.videoLink}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe> */}
          <a
            href={elem.upload}
            target="iframe_a"
            //onClick={() => video(elem.videoLink)}
          >
            {elem.upload}
          </a>
        </div>
      ),
    },
    {
      title: "TYPE",
      key: "type",
      dataIndex: "type",
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
            <li
              onClick={() => {
                setSkinAndHairStatus(!skinAndHairStatus);
                setSkinAndHairDetails({
                  skinAndHairId: elem._id,
                  name: elem.name,
                  topic: elem.topic,
                  upload: elem.upload,
                  uploadType: elem.uploadType,
                  type: elem.type,
                });
              }}
            >
              <Link className="dropdown-item border-radius-md" to="#">
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

  // ADD FAQ API METHOD
  const addSkinAndHair = (e) => {
    e.preventDefault();
    const credentials = { ...skinAndHair };
    let token = getSession("authorization");
    AddData({ url: "skin-and-hair", cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        setSkinAndHair({
          name: "",
          topic: "",
          type: "skin",
          uploadType: "image",
          upload: "",
        });
        setAddSkinAndHairData((prev) => !prev);
        setEditableImg("");
        if (skinAndHair?.uploadType === "image") {
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
        }, 2000);
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

  // UPDATE FAQ API METHOD
  const update = (e) => {
    e.preventDefault();
    const credentials = { ...skinAndHairDetails };
    let token = getSession("authorization");

    EditData({ url: "skin-and-hair", cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        setUpdateData(!updateData);
        setSkinAndHairStatus(!skinAndHairStatus);
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

  // FILE UPLOAD METHOD(API CALL)
  const fileUpload = async (e) => {
    // Getting details field to set image id
    var fieldName = e.target.name;
    FileUpload({
      file: e.target.files[0],
      path: "skinandhair",
      type: "SkinAndHair",
    })
      .then((res) => {
        if (res.data.status) {
          setEditableImg(URL.createObjectURL(e.target.files[0]));
          if (fieldName === "upload") {
            setSkinAndHair((prev) => ({
              ...prev,
              upload: res?.data?.data?.uploadImage?._id,
            }));
            setSkinAndHairDetails((prev) => ({
              ...prev,
              upload: res?.data?.data?.uploadImage?._id,
            }));
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

  // API CALL METHOD TO DELETE AN ITEM
  const deleteItem = (id) => {
    let token = getSession("authorization");

    DeleteData({ url: `skin-and-hair/${id}`, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        setdeleteData((prev) => !prev);
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
                  <h4>Skin & Hair</h4>
                  <form onSubmit={addSkinAndHair}>
                    <div className="row">
                      <div className="row g-4 mb-4">
                        <div className="mb-4 col-md-6">
                          <label
                            htmlFor="form-coupon/title"
                            className="form-label"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="form-product/name"
                            value={skinAndHair.name}
                            onChange={handleDetails}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label
                            htmlFor="form-faq/topic"
                            className="form-label"
                          >
                            Topic
                          </label>
                          <input
                            type="text"
                            name="topic"
                            className="form-control"
                            value={skinAndHair.topic}
                            id="form-faq/topic"
                            onChange={handleDetails}
                          />
                        </div>
                      </div>
                      <div className="row g-4 mb-4">
                        <div className="mb-4 col-md-6">
                          <label
                            htmlFor="form-coupon/type"
                            className="form-label"
                          >
                            Type
                          </label>
                          <label className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="type"
                              onChange={handleDetails}
                              value="skin"
                              checked={
                                skinAndHair?.type === "skin" ? true : false
                              }
                              required
                            />
                            <span className="form-check-label">Skin</span>
                          </label>
                          <label className="form-check mb-4">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="type"
                              onChange={handleDetails}
                              value="hair"
                              checked={
                                skinAndHair?.type === "hair" ? true : false
                              }
                              required
                            />
                            <span className="form-check-label">Hair</span>
                          </label>
                        </div>
                        <div className="col-md-6 mb-4">
                          <label
                            htmlFor="form-coupon/type"
                            className="form-label"
                          >
                            Upload Type
                          </label>
                          <label className="form-check">
                            <input
                              type="radio"
                              className="form-check-input"
                              name="uploadType"
                              onChange={handleDetails}
                              value="image"
                              checked={
                                skinAndHair?.uploadType === "image"
                                  ? true
                                  : false
                              }
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
                              checked={
                                skinAndHair?.uploadType === "video"
                                  ? true
                                  : false
                              }
                            />
                            <span className="form-check-label">Video</span>
                          </label>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="form-doctorImage/upload"
                          className="form-label"
                        >
                          Upload
                        </label>
                        {skinAndHair?.uploadType === "image" ? (
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
                            value={skinAndHair?.upload}
                            onChange={handleDetails}
                            placeholder="Video link here"
                            required
                          />
                        )}
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
                    <h6>List</h6>
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

      {/* VIEW & UPDATE FAQ */}
      {skinAndHairStatus && (
        <div className="password-popup">
          <div className="rts-newsletter-popup popup">
            <div
              className="newsletter-close-btn"
              onClick={() => setSkinAndHairStatus(!skinAndHairStatus)}
            >
              <i className="fa fa-times"></i>
            </div>
            <div className="newsletter-inner popup-inner">
              <h3 className="newsletter-heading">Details</h3>
              <form onSubmit={update}>
                <div className="input-area">
                  <div className="input-div">
                    <input
                      name="name"
                      type="text"
                      value={skinAndHairDetails.name}
                      placeholder="Name"
                      onChange={(e) =>
                        setSkinAndHairDetails({
                          ...skinAndHairDetails,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="input-div">
                    <input
                      name="topic"
                      type="text"
                      value={skinAndHairDetails.topic}
                      placeholder="Topic"
                      onChange={(e) =>
                        setSkinAndHairDetails({
                          ...skinAndHairDetails,
                          topic: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="input-div">
                    <label className="d-flex ms-4">
                      <input
                        type="radio"
                        className="w-auto me-2"
                        name="uploadType"
                        onChange={(e) =>
                          setSkinAndHairDetails((prev) => ({
                            ...prev,
                            uploadType: e.target.value,
                          }))
                        }
                        value="image"
                        checked={
                          skinAndHairDetails?.uploadType === "image"
                            ? true
                            : false
                        }
                      />
                      <span className="form-check-label">Image</span>
                    </label>
                    <label className="d-flex ms-4">
                      <input
                        type="radio"
                        className="w-auto me-2"
                        name="uploadType"
                        onChange={(e) =>
                          setSkinAndHairDetails((prev) => ({
                            ...prev,
                            uploadType: e.target.value,
                          }))
                        }
                        value="video"
                        checked={
                          skinAndHairDetails?.uploadType === "video"
                            ? true
                            : false
                        }
                      />
                      <span className="form-check-label">Video</span>
                    </label>
                  </div>
                  {skinAndHairDetails?.uploadType === "image" ? (
                    <div className="input-div d-flex align-items-center justify-content-center">
                      <Link href="app-product.html" className="ms-4">
                        <img src={editableImg} width="40" height="40" alt="" />
                      </Link>
                      <input
                        name="update_image"
                        type="file"
                        accept="image/*"
                        placeholder="Image"
                        onChange={fileUpload}
                      />
                    </div>
                  ) : (
                    <div className="input-div">
                      <input
                        name="upload"
                        type="text"
                        value={skinAndHairDetails.upload}
                        placeholder="Link"
                        onChange={(e) =>
                          setSkinAndHairDetails({
                            ...skinAndHairDetails,
                            upload: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  )}
                  <div className="input-div">
                    <label className="d-flex ms-4">
                      <input
                        type="radio"
                        className="w-auto me-2"
                        name="type"
                        onChange={(e) =>
                          setSkinAndHairDetails((prev) => ({
                            ...prev,
                            type: e.target.value,
                          }))
                        }
                        value="skin"
                        checked={
                          skinAndHairDetails?.type === "skin" ? true : false
                        }
                      />
                      <span className="form-check-label">Skin</span>
                    </label>
                    <label className="d-flex ms-4">
                      <input
                        type="radio"
                        className="w-auto me-2"
                        name="type"
                        onChange={(e) =>
                          setSkinAndHairDetails((prev) => ({
                            ...prev,
                            type: e.target.value,
                          }))
                        }
                        value="hair"
                        checked={
                          skinAndHairDetails?.type === "hair" ? true : false
                        }
                      />
                      <span className="form-check-label">Hair</span>
                    </label>
                  </div>
                  {/* <div className="input-div">
                    <input
                      name="type"
                      type="text"
                      value={skinAndHairDetails.type}
                      placeholder="Type"
                      onChange={(e) =>
                        setSkinAndHairDetails({
                          ...skinAndHairDetails,
                          type: e.target.value,
                        })
                      }
                      required
                    />
                  </div> */}
                  <button type="submit" className="subscribe-btn">
                    Update &nbsp;
                    <i
                      class="fa fa-long-arrow-right ml--5"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default SkinAndHair;
