import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FileUpload from "../../Apis/Setters/FileUpload";
import useColumnSearchProps from "../../hooks/useColumnSearchProps";
import Datatable from "../DataTableComponent/Datatable";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { AddData } from "../../Apis/Setters/AddData";
import { EditData } from "../../Apis/Setters/EditData";
import { DeleteData } from "../../Apis/Setters/DeleteData";

const Testimonials = () => {
  // Declaring ColumnSearchProps Method
  const columnSearchProps = useColumnSearchProps();

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });
  // ADD testimonials DETAILS STATE
  const [content, setContent] = useState({
    image: "",
    name: "",
    age: "",
    title: "",
    description: "",
    address: "",
    status: 1,
  });

  // EDITABLE IMAGE STATE
  const [editableImg, setEditableImg] = useState("");

  // IMAGE INPUT REFERENCE
  let imgRef = useRef();

  // HANDLING ADD TESTIMONIAL DETAILS TO ABOVE STATE
  const handleDetails = (e) => {
    const { name, value } = e.target;
    setContent({
      ...content,
      [name]: value,
    });
  };
  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();

  const [testimonialsListData, setTestimonialsListData] = useState([]);
  const [deleteTestimonial, setDeleteTestimonial] = useState(false);
  const [updateTestimonial, setUpdateTestimonial] = useState(false);
  const [addTestimonial, setAddTestimonial] = useState(false);

  // MODAL IMAGE STATE
  const [modalImg, setModalImg] = useState("");

  useEffect(() => {
    let token = getSession("authorization");
    GetData({ url: "testimonial", token: token })
      .then((res) => {
        setTestimonialsListData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteTestimonial, addTestimonial, updateTestimonial]);

  // CHANGE TESTIMONIAL POPUP STATE
  const [contentStatus, setContentStatus] = useState(false);
  // TESTIMONIAL POPUP DETAILS STATE
  const [contentDetails, setContentDetails] = useState({
    testimonialId: "",
    name: "",
    image: "",
    description: "",
    age: "",
    address: "",
    title: "",
  });

  // DESTRUCTURING DATA FOR DATA TABLE
  const data = [...testimonialsListData];

  // DEFINING DATA TABLE COLUMNS
  const columns = [
    {
      title: "IMAGE",
      key: "image",
      dataIndex: "image",
      render: (_, elem) => (
        <Link href="app-product.html" className="me-4">
          <div className="sa-symbol sa-symbol--shape--rounded sa-symbol--size--lg">
            <img src={elem?.image} width="40" height="40" alt="" />
          </div>
        </Link>
      ),
    },
    {
      title: "NAME",
      key: "name",
      dataIndex: "name",
      ...columnSearchProps("name"),
    },
    {
      title: "DESCRIPTION",
      key: "description",
      dataIndex: "description",
      ...columnSearchProps("description"),
    },
    {
      title: "ADDRESS",
      key: "address",
      dataIndex: "address",
      ...columnSearchProps("address"),
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
                setContentStatus(!contentStatus);
                setModalImg(elem?.image);
                setContentDetails({
                  testimonialId: elem?._id,
                  name: elem?.name,
                  age: elem?.age,
                  description: elem?.description,
                  title: elem?.title,
                  address: elem?.address,
                  status: 1,
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

  // FILE UPLOAD METHOD(API CALL)
  const fileUpload = async (e) => {
    FileUpload({
      file: e.target.files[0],
      path: "testimonials",
      type: "Testimonial",
    })
      .then((res) => {
        if (res.data.status) {
          setEditableImg(URL.createObjectURL(e.target.files[0]));
          setModalImg(URL.createObjectURL(e.target.files[0]));
          setContent({
            ...content,
            image: res?.data?.data?.uploadImage?._id,
          });
          setContentDetails({
            ...contentDetails,
            image: res?.data?.data?.uploadImage?._id,
          });
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

  // ADD testimonials API METHOD
  const addContent = (e) => {
    e.preventDefault();
    let token = getSession("authorization");
    const credentials = { ...content };

    AddData({ url: "testimonial", cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        setAddTestimonial(!addTestimonial);
        setContent({
          image: "",
          name: "",
          age: "",
          title: "",
          description: "",
          address: "",
          status: 1,
        });
        setEditableImg("");
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

  // UPDATE testimonials API METHOD
  const updateContent = (e) => {
    e.preventDefault();
    let token = getSession("authorization");

    const credentials = { ...contentDetails };

    EditData({ url: "testimonial", cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        if (res.data.status) {
          setUpdateTestimonial(!updateTestimonial);
          setContentStatus(!contentStatus);
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
    //let credentials = { testimonialId : id }
    let token = getSession("authorization");

    DeleteData({ url: `testimonial/${id}`, token: token })
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
          setDeleteTestimonial(!deleteTestimonial);
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

            {/* ADD TESTIMONIAL FORM */}
            <div className="g-4">
              <div className="card mb-3">
                <div className="card-body p-md-5">
                  <h4>Add Testimonial</h4>
                  <form onSubmit={addContent}>
                    <div className="row">
                      <div className="mb-4">
                        <label
                          htmlFor="form-testimonials/image"
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
                          <div className="col-10 ps-0">
                            <input
                              type="file"
                              accept="image/*"
                              name="image"
                              className="form-control"
                              id="form-testimonials/image"
                              onChange={fileUpload}
                              ref={imgRef}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="form-testimonials/name"
                          className="form-label"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          id="form-testimonials/name"
                          value={content.name}
                          onChange={handleDetails}
                        />
                      </div>
                      <div className="mb-4 col-md-6">
                        <label
                          htmlFor="form-testimonials/age"
                          className="form-label"
                        >
                          Age
                        </label>
                        <input
                          type="number"
                          name="age"
                          className="form-control"
                          id="form-testimonials/age"
                          value={content.age}
                          onChange={handleDetails}
                        />
                      </div>
                      <div className="mb-4 col-md-6">
                        <label
                          htmlFor="form-testimonials/title"
                          className="form-label"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          className="form-control"
                          id="form-testimonials/title"
                          value={content.title}
                          onChange={handleDetails}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="form-testimonials/address"
                          className="form-label"
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          className="form-control"
                          id="form-testimonials/address"
                          value={content.address}
                          onChange={handleDetails}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="form-testimonials/answer"
                          className="form-label"
                        >
                          Description
                        </label>
                        <textarea
                          name="description"
                          rows="5"
                          className="form-control"
                          id="form-testimonials/answer"
                          value={content.description}
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

            {/* TESTIMONIALS LIST */}
            <div className="card">
              <div className="card-header pb-0">
                <div className="row">
                  <div className="col-lg-6 col-7">
                    <h6>Testimonials List</h6>
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

      {/* VIEW & UPDATE TESTIMONIAL */}
      {contentStatus && (
        <div className="password-popup">
          <div className="rts-newsletter-popup popup">
            <div
              className="newsletter-close-btn"
              onClick={() => setContentStatus(!contentStatus)}
            >
              <i className="fa fa-times"></i>
            </div>
            <div className="newsletter-inner popup-inner">
              <h3 className="newsletter-heading">Testimonial</h3>
              <form onSubmit={updateContent}>
                <div className="input-area">
                  <div className="input-div d-flex align-items-center justify-content-center">
                    <Link href="app-product.html" className="ms-4">
                      <img src={modalImg} width="40" height="40" alt="" />
                    </Link>
                    <input
                      name="update_image"
                      type="file"
                      accept="image/*"
                      placeholder="Image"
                      onChange={fileUpload}
                    />
                  </div>
                  <div className="input-div">
                    <input
                      name="name"
                      type="text"
                      value={contentDetails?.name}
                      placeholder="Name"
                      onChange={(e) =>
                        setContentDetails({
                          ...contentDetails,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="input-div">
                    <input
                      name="age"
                      type="text"
                      value={contentDetails?.age}
                      placeholder="Age"
                      onChange={(e) =>
                        setContentDetails({
                          ...contentDetails,
                          age: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="input-div">
                    <input
                      name="title"
                      type="text"
                      value={contentDetails?.title}
                      placeholder="Title"
                      onChange={(e) =>
                        setContentDetails({
                          ...contentDetails,
                          title: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="input-div">
                    <input
                      name="address"
                      type="text"
                      value={contentDetails?.address}
                      placeholder="Address"
                      onChange={(e) =>
                        setContentDetails({
                          ...contentDetails,
                          address: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="input-div">
                    <textarea
                      name="description"
                      rows={5}
                      value={contentDetails?.description}
                      placeholder="Description"
                      onChange={(e) =>
                        setContentDetails({
                          ...contentDetails,
                          description: e.target.value,
                        })
                      }
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="subscribe-btn">
                    Update{" "}
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

export default Testimonials;
