import React, { useEffect, useRef, useState } from "react";
import FileUpload from "../../Apis/Setters/FileUpload";
import { useParams } from "react-router-dom";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { EditData } from "../../Apis/Setters/EditData";
import { Select } from "antd";

const EditCategory = () => {
  const params = useParams();
  const [setSession, getSession] = useSession();

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  // DETAILS STATE
  const [details, setDetails] = useState({
    id: params.id,
    name: "",
    segment: "",
    isActive: "true",
    img: ""
  });

  // HANDLING SEGMENT
  const handleSegment = (value) => {
    setDetails((prev) => {
      return {
        ...prev,
        segment: value,
      };
    });
  };

  const [segment, setSegment] = useState([])

  useEffect(() => {
    let token = getSession("authorization");
    GetData({ url: "segment", token: token })
      .then((res) => {
        console.log(res);
        setSegment(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [alert]);

  const segmentList = segment
    .map((elem) => ({
      label: elem?.name,
      value: elem?._id,
    }));

  useEffect(() => {
    let token = getSession("authorization");
    GetData({ url: `category/${params.id}`, token: token })
      .then((res) => {
        console.log(res);
        if (res?.data?.status) {
          setDetails({
            id: params?.id,
            name: res?.data?.data?.name,
            segment: res?.data?.data?.segment?._id,
            img: res?.data?.data?.image?.url[0],
            isActive: "true"
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // SETTING DETAILS TO STATE VARIABLE
  const handleDetails = (e) => {
    const { name, value } = e.target;

    setDetails({
      ...details,
      [name]: value,
    });
  };

  // FILE UPLOAD METHOD(API CALL)
  const fileUpload = async (e) => {
    // Getting details field to set image id
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


  // ADD API CALL
  const edit = (e) => {
    e.preventDefault();
    let token = getSession("authorization");
    let credentials = { ...details };
    EditData({ url: "category/update", cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        setDetails({
          // segment: "",
          name: ""
        })
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
      <form onSubmit={edit}>
        <div className="container-fluid py-5 row">
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
          <div className="mb-5">
            {/* Basic Information Card */}
            <div className="card">
              <div className="card-body p-md-5">
                <div className="mb-5">
                  <h5 className="mb-0 fs-exact-18">Update Category Details</h5>
                </div>
                <div className="row">

                  <div className="col-md-6">
                    <label
                      htmlFor="form-productImage/thumbnail"
                      className="form-label"
                    >
                      Image
                    </label>
                    <div style={{ display: 'flex', gap: "5px" }}>
                      <img src={details.img} height={50} width={50} alt="" />
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        name="thumbnail"
                        id="form-productImage/thumbnail"
                        onChange={fileUpload}
                      />
                    </div>
                  </div>
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-category/name" className="form-label">
                      Category Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="form-category/name"
                      value={details.name}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-category/user" className="form-label">
                      Select Segment</label>
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Select Segment"
                      onChange={handleSegment}
                      options={segmentList}
                      className="p-0 mt-2"
                      value={details.segment}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="submit"
                      className="btn btn-outline-primary btn-sm mb-0"
                      value="Save"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default EditCategory;
