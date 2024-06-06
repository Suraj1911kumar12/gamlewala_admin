import { Select } from "antd";
import React, { useEffect, useState } from "react";
import FileUpload from "../../Apis/Setters/FileUpload";
import useSession, { deleteSession } from "../../hooks/session";
import { AddData } from "../../Apis/Setters/AddData";
import { GetData } from "../../Apis/Getters/GetData";

const Add = () => {
  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });
  // DESIGNATIONS STATE
  const [designations, setDesignations] = useState([]);

  const [docotDesignation, setDocotDesignation] = useState(false)

  useEffect(() => {
    GetData({ url: `designations`, token })
      .then((res) => {
        setDesignations(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const token = getSession("authorization");

  // VALUES STATE
  const [details, setDetails] = useState({
    name: "",
    image: "",
    isHod: false,
    specialisation: "",
    designation: "",
    aboutYou: [],
    medicalCouncilRegNumber: "",
    knowAboutMe: "",
    qualifications: "",
    mobile: "",
    alternativeMobile: "",
    email: "",
    pincode: "",
    state: "",
    district: "",
    area: "",
    streetName: "",
    houseNumber: "",
    landmark: "",
    patientHandled: "",
    status: true,
    // username: "",
    // password: "",
  });




  // METHOD INPUT DETAILS
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

      const designation1 = designations.filter((elem) => elem._id === value);
      if (designation1?.[0]?.designation === "Doctor") {
        setDocotDesignation(true)
      } else {
        setDocotDesignation(false)
      }
    }
  };




  // HANDLING TAGS INPUT
  const handleTags = (value) => {
    // const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      aboutYou: value,
    }));
  };

  // FILE UPLOAD METHOD(API CALL)
  const fileUpload = async (e) => {
    FileUpload({
      file: e.target.files[0],
      path: "doctor",
      type: "Doctor",
    })
      .then((res) => {
        setDetails({
          ...details,
          image: res?.data?.data?.uploadImage?._id,
        });
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

  // HANDLING UPDATE API CALL METHOD
  const update = (e) => {
    e.preventDefault();
    let credentials = { ...details };
    AddData({ url: "doctors", cred: credentials, token })
      .then((res) => {
        if (res.data.status) {
          window.scrollTo(0, 0);
          setAlert({
            successStatus: true,
            errStatus: false,
            successMessage: res?.data?.msg,
            errMessage: "",
          })
          setTimeout(() => {
            setAlert({
              errStatus: false,
              successStatus: false,
              errMessage: "",
              successMessage: "",
            })
          }, 2000)
        } else {
          window.scrollTo(0, 0);
          setAlert({
            errStatus: true,
            successStatus: false,
            errMessage: res?.data?.msg,
            successMessage: "",
          })
          setTimeout(() => {
            setAlert({
              errStatus: false,
              successStatus: false,
              errMessage: "",
              successMessage: "",
            })
          }, 3000);
        }
        setDetails({
          name: "",
          image: "",
          isHod: "",
          specialisation: "",
          designation: "",
          aboutYou: [],
          medicalCouncilRegNumber: "",
          knowAboutMe: "",
          qualifications: "",
          mobile: "",
          alternativeMobile: "",
          email: "",
          pincode: "",
          state: "",
          district: "",
          area: "",
          streetName: "",
          houseNumber: "",
          landmark: "",
          patientHandled: "",
          status: true,
          // username: "",
          // password: "",
        });
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
      <form onSubmit={update}>
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

          <div className="col-md-8">
            {/* Basic Information Card */}
            <div className="card">
              <div className="card-body p-md-5">
                <div className="mb-5">
                  <h4 className="mb-0 fs-exact-18">Doctor's Information</h4>
                </div>
                <div className="row">
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-doctor/name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="form-doctor/name"
                      value={details?.name}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label
                      htmlFor="form-productImage/image"
                      className="form-label"
                    >
                      Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      name="image"
                      id="form-productImage/image"
                      onChange={fileUpload}
                      required
                    />
                  </div>
                  <div className="mb-4 col-md-12">
                    <label htmlFor="form-doctor/slug" className="form-label">
                      Specialisation
                    </label>
                    <div className="input-group input-group--sa-slug">
                      <input
                        type="text"
                        name="specialisation"
                        className="form-control"
                        id="form-doctor/slug"
                        aria-describedby="form-doctor/slug-addon form-doctor/slug-help"
                        value={details?.specialisation}
                        onChange={handleDetails}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4 col-md-12">
                    <label htmlFor="form-doctor/title" className="form-label">
                      About
                    </label>
                    <div className="input-group input-group--sa-title">
                      <Select
                        mode="tags"
                        style={{ width: "100%" }}
                        placeholder="Add about"
                        onChange={handleTags}
                        value={details?.aboutYou}
                      />
                    </div>
                  </div>
                  <div className="mb-4 col-md-6">
                    <label
                      htmlFor="form-doctor/patientHandled"
                      className="form-label"
                    >
                      Patients handled
                    </label>
                    <input
                      type="number"
                      name="patientHandled"
                      className="form-control"
                      id="form-doctor/patientHandled"
                      value={details?.patientHandled}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-doctor/regNo" className="form-label">
                      Medical Council Reg Number
                    </label>
                    <input
                      type="text"
                      name="medicalCouncilRegNumber"
                      className="form-control"
                      id="form-doctor/regNo"
                      value={details?.medicalCouncilRegNumber}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="mb-4 col-12">
                    <label
                      htmlFor="form-doctor/knowMore"
                      className="form-label"
                    >
                      Know About me/Doctor
                    </label>
                    <textarea
                      id="form-doctor/knowMore"
                      name="knowAboutMe"
                      className="sa-quill-control form-control sa-quill-control--ready"
                      rows="4"
                      value={details?.knowAboutMe}
                      onChange={handleDetails}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4 col-12">
                    <label
                      htmlFor="form-doctor/qualifications"
                      className="form-label"
                    >
                      Qualifications
                    </label>
                    <textarea
                      id="form-doctor/qualifications"
                      name="qualifications"
                      className="sa-quill-control form-control sa-quill-control--ready"
                      rows="4"
                      value={details?.qualifications}
                      onChange={handleDetails}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-doctor/mobile" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      className="form-control"
                      id="form-doctor/mobile"
                      value={details?.mobile}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label
                      htmlFor="form-doctor/alternativeMobile"
                      className="form-label"
                    >
                      Alternative Phone Number
                    </label>
                    <input
                      type="tel"
                      name="alternativeMobile"
                      className="form-control"
                      id="form-doctor/alternativeMobile"
                      value={details?.alternativeMobile}
                      onChange={handleDetails}
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-doctor/email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="form-doctor/email"
                      value={details?.email}
                      onChange={handleDetails}
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-doctor/pincode" className="form-label">
                      Pincode
                    </label>
                    <input
                      type="number"
                      name="pincode"
                      className="form-control"
                      id="form-doctor/pincode"
                      value={details?.pincode}
                      onChange={handleDetails}
                      minLength={6}
                      required
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-doctor/state" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      id="form-doctor/state"
                      value={details?.state}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label
                      htmlFor="form-doctor/district"
                      className="form-label"
                    >
                      District
                    </label>
                    <input
                      type="text"
                      name="district"
                      className="form-control"
                      id="form-doctor/district"
                      value={details?.district}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-doctor/area" className="form-label">
                      Area
                    </label>
                    <input
                      type="text"
                      name="area"
                      className="form-control"
                      id="form-doctor/area"
                      value={details?.area}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label
                      htmlFor="form-doctor/streetName"
                      className="form-label"
                    >
                      Street number/name
                    </label>
                    <input
                      type="text"
                      name="streetName"
                      className="form-control"
                      id="form-doctor/streetName"
                      value={details?.streetName}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label
                      htmlFor="form-doctor/houseNumber"
                      className="form-label"
                    >
                      Door number
                    </label>
                    <input
                      type="text"
                      name="houseNumber"
                      className="form-control"
                      id="form-doctor/houseNumber"
                      value={details?.houseNumber}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label
                      htmlFor="form-doctor/landmark"
                      className="form-label"
                    >
                      Landmark
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      className="form-control"
                      id="form-doctor/landmark"
                      value={details?.landmark}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Cards */}
          <div className="col-md-4">
            {/* Visibility Card */}
            <div className="card w-100">
              <div className="card-body p-md-5">
                <div className="mb-5">
                  <h4 className="mb-0 fs-exact-18">Status</h4>
                </div>
                <div className="mb-4">
                  <label className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="status"
                      value={true}
                      onChange={handleDetails}
                      required
                    />
                    <span className="form-check-label">Active</span>
                  </label>
                  <label className="form-check mb-0">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="status"
                      value={false}
                      onChange={handleDetails}
                      required
                    />
                    <span className="form-check-label">Inactive</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Brands Card */}
            <div className="card w-100 mt-5">
              <div className="card-body p-md-5">
                <div className="mb-5">
                  <h4 className="mb-0 fs-exact-18">Designations</h4>
                </div>
                <select
                  className="form-select mb-4"
                  name="designation"
                  onChange={handleDetails}
                  required
                >
                  <option defaultValue={null}>Select Designation</option>
                  {designations.map((designation, index) => {
                    return (
                      <option key={index + 1} value={designation._id}>
                        {designation.designation}

                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Additional Settings Card */}
            {docotDesignation && (
              <div className="card w-100 mt-5"  >
                <div className="card-body p-md-5">
                  <div className="mb-5">
                    <h4 className="mb-0 fs-exact-18">Additional Settings</h4>
                  </div>
                  <div className="row">
                    <div className="mb-4">
                      <label className="form-check mb-0">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          name="isHod"
                          onChange={handleDetails}
                          value={details?.isHod === true ? false : true}
                          checked={details?.isHod === true ? true : false}
                        />
                        <span className="form-check-label">Is HOD</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}


            {/* Credentials Card */}
            {/* <div className="card w-100 mt-5">
                            <div className="card-body p-md-5">
                                <div className="mb-5">
                                    <h4 className="mb-0 fs-exact-18">Credentials</h4>
                                </div>
                                <div className="row">
                                    <div className="col-12 p-0">
                                        <label htmlFor="form-doctor/username" className="form-label">
                                            Username
                                        </label>
                                        <input
                                            type="email"
                                            name="username"
                                            className="form-control"
                                            id="form-doctor/username"
                                            value={details?.username}
                                            onChange={handleDetails}
                                        />
                                    </div>
                                    <div className="col-12 p-0 mt-3">
                                        <label htmlFor="form-doctor/password" className="form-label">
                                            Password
                                        </label>
                                        <input
                                            type="email"
                                            name="password"
                                            className="form-control"
                                            id="form-doctor/password"
                                            value={details?.password}
                                            onChange={handleDetails}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div> */}
          </div>
        </div>
        {/* SUBMIT PRODUCT DETAILS */}
        <div className="container-fluid py-5 row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body p-md-4">
                <div className="text-center">
                  <input
                    type="submit"
                    className="btn btn-outline-primary btn-sm mb-0 px-5"
                    value="Save Doctor's Details"
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

export default Add;
