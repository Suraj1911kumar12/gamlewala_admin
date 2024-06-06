import { Select } from "antd";
import React, { useEffect, useState } from "react";
import FileUpload from "../../Apis/Setters/FileUpload";
import useSession, { deleteSession } from "../../hooks/session";
import { AddData } from "../../Apis/Setters/AddData";
import { GetData } from "../../Apis/Getters/GetData";

const AddPackage = () => {
  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  const [setSession, getSession] = useSession();

  let token = getSession("authorization");

  const [segment, setSegment] = useState();

  useEffect(() => {
    GetData({ url: "segment", token: token, cred: {} })
      .then((res) => {
        setSegment(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [alert]);

  //MAPPING SEGMENT OPTION FOR SELECT
  const segmentList = segment?.map((elem) => ({
      label: elem?.name,
      value: elem?._id,
    }));

  const handleSegment = (value) => {
    setDetails((prev) => {
      return {
        ...prev,
        segment: value,
      };
    });
  };

  // VALUES STATE
  const [details, setDetails] = useState({
    name: "",
    file: "",
    description: "",
    mrp: "",
    price: "",
    segment: "",
    isActive: true
  });

  // METHOD TO SET DETAILS IN details STATE VARIABLE
  const handleDetails = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    })
  };



  // FILE UPLOAD METHOD(API CALL)
  const fileUpload = async (e) => {
    FileUpload({ image: e.target.files[0] })
      .then((res) => {
        if (res?.data?.status) {
          setDetails({
            ...details,
            file: res?.data?.data,
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

  // HANDLING API CALL METHOD
  const addItem = async (e) => {
    e.preventDefault();
    let token = getSession("authorization");
    let credentials = { ...details };
    AddData({ url: "pooja-package/create", cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        setDetails({
          name: "",
          file: "",
          group: [],
          description: ""
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
        }, 3000);
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

  return (
    <React.Fragment>
      <form onSubmit={addItem}>
        {/* INPUT PRODUCT DETAILS */}
        <div className="container-fluid row">
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

          <div className="">
            {/* Basic Information Card */}
            <div className="card">
              <div className="card-body p-md-5">
                <div className="mb-5">
                  <h4 className="mb-0 fs-exact-18">Basic information</h4>
                </div>
                <div className="row g-4 mb-4">
                  <div className="col-md-6">
                    <label
                      htmlFor="form-productImage/thumbnail"
                      className="form-label"
                    >
                      Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      name="thumbnail"
                      id="form-productImage/thumbnail"
                      onChange={fileUpload}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="form-product/name" className="form-label">
                      Package Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="form-product/name"
                      value={details.name}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="form-product/mrp" className="form-label">
                      MRP
                    </label>
                    <input
                      type="number"
                      name="mrp"
                      className="form-control"
                      id="form-product/mrp"
                      value={details.mrp}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="form-product/name" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      id="form-product/price"
                      value={details.price}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  {/* <div className="col-md-6">
                    <label
                      htmlFor="form-productImage/thumbnail"
                      className="form-label"
                    >
                      Pooja Items
                    </label>
                    <Select
                      // mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Select Segment"
                      onChange={handleElement}
                      options={poojaItemsList}
                      className="p-0 mb-4"
                    //value={details?.category}
                    />
                  </div> */}
                  <div className="col-md-6">
                    <label
                      htmlFor="form-productImage/thumbnail"
                      className="form-label"
                    >
                      Segment
                    </label>
                    <Select
                      // mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Select Segment"
                      onChange={handleSegment}
                      options={segmentList}
                      className="p-0"
                    //value={details?.category}
                    />
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
                <div className="text-center">
                  <input
                    type="submit"
                    className="btn btn-outline-primary btn-sm mb-0 px-5"
                    value="Add Item"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default AddPackage;
