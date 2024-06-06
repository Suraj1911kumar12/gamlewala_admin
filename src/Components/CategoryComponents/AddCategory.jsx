import React, { useEffect, useRef, useState } from "react";
import { AddData } from "../../Apis/Setters/AddData";
import useSession, { deleteSession } from "../../hooks/session";
import { Select } from "antd";
import { GetData } from "../../Apis/Getters/GetData";
import FileUpload from "../../Apis/Setters/FileUpload";



const AddCategory = () => {
  const selectRef = useRef()
  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();

  const catRef = useRef()
  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  // CATEGORY VALUE STATE
  const [details, setDetails] = useState({
    name: "",
    segment: "",
    file: "",
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


  // SETTING VALUE TO STATE VARIABLE
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



  // ADD CATEGORY API CALL
  const category = (e) => {
    e.preventDefault();
    // let token = getCookie("authorization");
    let token = getSession("authorization");

    const credentials = { ...details };

    AddData({ url: "category/create", cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        if (res.data.status) {
          console.log(selectRef.current);
          selectRef.current.autoClearSearchValue = ''
          setDetails({
            name: "",
            file: "",
            segment: ""
          });
          catRef.current.value = ''
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
      <form onSubmit={category}>
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

          <div className=" mb-5">
            {/* Basic Information Card */}
            <div className="card">
              <div className="card-body p-md-5">
                <div className="mb-5">
                  <h5 className="mb-0 fs-exact-18">Add Category</h5>
                </div>
                <div className="row">
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
                      ref={catRef}
                      required
                    />
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
                      value={details.segment}
                      className="p-0 mt-2"
                      required
                      ref={selectRef}
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

export default AddCategory;
