import React, { useEffect, useState } from "react";
import FileUpload from "../../Apis/Setters/FileUpload";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { AddData } from "../../Apis/Setters/AddData";

const Admin = () => {
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  const [adminDetails, setAdminDetails] = useState({
    name: "",
    mobile: "",
    email: "",
    oldPassword: "",
    // newPassword: "",
    // confirmPassword: "",
  });

  const [settingsData, setSettingsData] = useState([]);
  const [setSession, getSession] = useSession();
  const token = getSession("authorization");

  // MODAL IMAGE STATE
  const [modalImg, setModalImg] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    // GetData({ url: "profile", token: token })
    //   .then((res) => {
    //     setSettingsData(res.data.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  // GETTING STORE IDENTITY
  useEffect(() => {
    if (settingsData) {
      setAdminDetails({
        name: settingsData?.name,
        mobile: settingsData?.mobile,
        email: settingsData?.email,
        oldPassword: settingsData?.oldPassword,
        // newPassword: settingsData?.newPassword,
        // confirmPassword: settingsData?.confirmPassword,
      });
    }
  }, [settingsData]);

  // METHOD TO SET STORE IDENTITY SETTINGS CREDENTIALS IN storeIdentity STATE VARIABLE
  const handleDetails = (e) => {
    const { name, value } = e.target;
    setAdminDetails({
      ...adminDetails,
      [name]: value,
    });
  };

  // FILE UPLOAD METHOD(API CALL)
  const fileUpload = async (e) => {
    // FileUpload({
    //   file: e.target.files[0],
    //   path: "logo",
    //   type: "Logo",
    // })
    //   .then((res) => {
    //     if (res.data.status) {
    //       setModalImg(URL.createObjectURL(e.target.files[0]));
    //       setAdminDetails({
    //         ...adminDetails,
    //         image: res?.data?.data?.uploadImage?._id,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     if (err?.response?.status == "401") {
    //       deleteSession("authorization");
    //       window.location.href = `${process.env.REACT_APP_BASE_URL}`
    //     } else {
    //       window.scrollTo(0, 0);
    //       if (err?.response?.data?.msg) {
    //         console.log(err?.response?.data?.msg);
    //         setAlert({
    //           errStatus: true,
    //           successStatus: false,
    //           errMessage: err?.response?.data?.msg,
    //           successMessage: "",
    //         });
    //         setTimeout(() => {
    //           setAlert({
    //             errStatus: false,
    //             successStatus: false,
    //             errMessage: "",
    //             successMessage: "",
    //           });
    //         }, 2000);
    //       } else {
    //         console.log(err?.message);
    //         setAlert({
    //           errStatus: true,
    //           successStatus: false,
    //           errMessage: err?.message,
    //           successMessage: "",
    //         });
    //         setTimeout(() => {
    //           setAlert({
    //             errStatus: false,
    //             successStatus: false,
    //             errMessage: "",
    //             successMessage: "",
    //           });
    //         }, 2000);
    //       }
    //     }
    //   });
  };

  // UPDATE testimonials API METHOD
  const update = (e) => {
    // e.preventDefault();
    // let token = getSession("authorization");

    // const credentials = { ...adminDetails };
    // AddData({ url: "profile", cred: credentials, token: token })
    //   .then((res) => {
    //     window.scrollTo(0, 0);
    //     if (res.data.status) {
    //       setAlert({
    //         successStatus: true,
    //         errStatus: false,
    //         successMessage: res?.data?.msg,
    //         errMessage: "",
    //       });
    //       setTimeout(() => {
    //         setAlert({
    //           errStatus: false,
    //           successStatus: false,
    //           errMessage: "",
    //           successMessage: "",
    //         });
    //       }, 1000);
    //     }
    //   })
    //   .catch((err) => {
    //     if (err?.response?.status == "401") {
    //       deleteSession("authorization");
    //       window.location.href = `${process.env.REACT_APP_BASE_URL}`
    //     } else {
    //       window.scrollTo(0, 0);
    //       if (err?.response?.data?.msg) {
    //         console.log(err?.response?.data?.msg);
    //         setAlert({
    //           errStatus: true,
    //           successStatus: false,
    //           errMessage: err?.response?.data?.msg,
    //           successMessage: "",
    //         });
    //         setTimeout(() => {
    //           setAlert({
    //             errStatus: false,
    //             successStatus: false,
    //             errMessage: "",
    //             successMessage: "",
    //           });
    //         }, 2000);
    //       } else {
    //         console.log(err?.message);
    //         setAlert({
    //           errStatus: true,
    //           successStatus: false,
    //           errMessage: err?.message,
    //           successMessage: "",
    //         });
    //         setTimeout(() => {
    //           setAlert({
    //             errStatus: false,
    //             successStatus: false,
    //             errMessage: "",
    //             successMessage: "",
    //           });
    //         }, 2000);
    //       }
    //     }
    //   });
  };
  return (
    <React.Fragment>
      <form onSubmit={update}>
        <div className="container-fluid py-4">
          <div className="row g-4">
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

            <div className="card mb-3">
              <div className="card-body p-5">
                <h5>Admin Identity Settings</h5>
                <div className="row">
                  <div className="mb-4 col-md-6">
                    <label
                      htmlFor="form-settings/profile"
                      className="form-label"
                    >
                      Profile picture
                    </label>
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      id="form-settings/profile"
                      onChange={fileUpload}
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-settings/name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="form-settings/name"
                      onChange={handleDetails}
                      value={adminDetails.name}
                      required
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-settings/phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="mobile"
                      className="form-control"
                      id="form-settings/phone"
                      onChange={handleDetails}
                      value={adminDetails.mobile}
                      required
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-settings/email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="form-settings/email"
                      onChange={handleDetails}
                      value={adminDetails.email}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-3">
              <div className="card-body p-5">
                <h5>Update Password</h5>
                <div className="row">
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-settings/opass" className="form-label">
                      Old Password
                    </label>
                    <input
                      type="password"
                      name="oldPassword"
                      className="form-control"
                      id="form-settings/opass"
                      onChange={handleDetails}
                      value={adminDetails.oldPassword}
                      required
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-settings/npass" className="form-label">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      className="form-control"
                      id="form-settings/npass"
                      onChange={handleDetails}
                      value={adminDetails.newPassword}
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-settings/cpass" className="form-label">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      id="form-settings/cpass"
                      onChange={handleDetails}
                      value={adminDetails.confirmPassword}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid pb-5 row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body p-md-5">
                <div className="text-center">
                  <input
                    type="submit"
                    className="btn btn-outline-primary btn-sm mb-0 px-5"
                    value="Save"
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

export default Admin;
