import React, { useEffect, useState } from "react";
import FileUpload from "../../Apis/Setters/FileUpload";
import useSession, { deleteSession } from "../../hooks/session";
import { fetchSettings } from "../../Apis/Getters/settings";
import { AddData } from "../../Apis/Setters/AddData";

const General = () => {
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  const [generalSettingsDetails, setGeneralSettingDetails] = useState({
    logo: "",
    name: "",
    storeDescription: "",
    storeCopyright: "",
    phoneNo: "",
    email: "",
    address: "",
    mapAddress: "",
    facebookLink: "",
    linkedInLink: "",
    instagramLink: "",
    youtubeLink: "",
    androidAppLink: "",
    iosAppLink: "",
  });

  const [settingsData, setSettingsData] = useState([]);
  const [setSession, getSession] = useSession();
  const token = getSession("authorization");

  // MODAL IMAGE STATE
  const [modalImg, setModalImg] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSettings({ token: token })
      .then((res) => {
        setSettingsData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // GETTING STORE IDENTITY
  // useEffect(() => {
  //   const generalSettings = settingsData.filter(
  //     (elem) => elem.type === "general_settings"
  //   );

  //   if (generalSettings) {
  //     setGeneralSettingDetails({
  //       logo: generalSettings?.[0]?.value?.[0]?.logo,
  //       name: generalSettings?.[0]?.value?.[0]?.name,
  //       storeDescription: generalSettings?.[0]?.value?.[0]?.storeDescription,
  //       storeCopyright: generalSettings?.[0]?.value?.[0]?.storeCopyright,
  //       phoneNo: generalSettings?.[0]?.value?.[0]?.phoneNo,
  //       email: generalSettings?.[0]?.value?.[0]?.email,
  //       address: generalSettings?.[0]?.value?.[0]?.address,
  //       mapAddress: generalSettings?.[0]?.value?.[0]?.mapAddress,
  //       facebookLink: generalSettings?.[0]?.value?.[0]?.facebookLink,
  //       instagramLink: generalSettings?.[0]?.value?.[0]?.instagramLink,
  //       linkedInLink: generalSettings?.[0]?.value?.[0]?.linkedInLink,
  //       youtubeLink: generalSettings?.[0]?.value?.[0]?.youtubeLink,
  //       androidAppLink: generalSettings?.[0]?.value?.[0]?.androidAppLink,
  //       iosAppLink: generalSettings?.[0]?.value?.[0]?.iosAppLink,
  //     });
  //   }
  // }, [settingsData]);

  // METHOD TO SET STORE IDENTITY SETTINGS CREDENTIALS IN storeIdentity STATE VARIABLE
  const handleDetails = (e) => {
    const { name, value } = e.target;
    setGeneralSettingDetails({
      ...generalSettingsDetails,
      [name]: value,
    });
  };

  // FILE UPLOAD METHOD(API CALL)
  const fileUpload = async (e) => {
    FileUpload({
      file: e.target.files[0],
      path: "logo",
      type: "Logo",
    })
      .then((res) => {
        if (res.data.status) {
          setModalImg(URL.createObjectURL(e.target.files[0]));
          setGeneralSettingDetails({
            ...generalSettingsDetails,
            logo: res?.data?.data?.uploadImage?._id,
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

  // UPDATE testimonials API METHOD
  const update = (e) => {
    e.preventDefault();
    let token = getSession("authorization");

    const credentials = {
      type: "general_settings",
      value: { ...generalSettingsDetails },
    };

    AddData({ url: "settings/value", cred: credentials, token: token })
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
    <form onSubmit={update}>
      <div className="container-fluid py-4">
        <div className="row g-4">
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

          <div className="card mb-3">
            <div className="card-body p-5">
              <h5>Store Identity Settings</h5>
              <div className="row">
                <div className="mb-4 col-md-6">
                  <label
                    htmlFor="form-settings/headerLogo"
                    className="form-label"
                  >
                    Logo
                  </label>
                  {/* <div className="col-md-6 input-div d-flex align-items-center justify-content-center">
                    <Link href="app-logo.html" className="mr-4">
                      <img src={modalImg} width="40" height="40" alt="" />
                    </Link> */}
                  <input
                    type="file"
                    name="logo"
                    className="form-control"
                    id="form-settings/logo"
                    // value={storeIdentity.headerLogo.name}
                    onChange={fileUpload}
                  />
                  {/* </div> */}
                </div>
                {/* <div className="mb-4 col-md-6">
                  <label
                    htmlFor="form-settings/footerLogo"
                    className="form-label"
                  >
                    Footer Logo
                  </label>
                  <input
                    type="file"
                    name="footerLogo"
                    className="form-control"
                    id="form-settings/footerLogo"
                    onChange={fileUpload}
                  />
                </div> */}
                <div className="mb-4">
                  <label htmlFor="form-settings/name" className="form-label">
                    Store Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="form-settings/name"
                    value={generalSettingsDetails.name}
                    onChange={handleDetails}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="form-settings/description"
                    className="form-label"
                  >
                    Store Description
                  </label>
                  <input
                    type="text"
                    name="storeDescription"
                    className="form-control"
                    id="form-settings/description"
                    value={generalSettingsDetails.storeDescription}
                    onChange={handleDetails}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="form-settings/copyright"
                    className="form-label"
                  >
                    Store Copyright
                  </label>
                  <input
                    type="text"
                    name="storeCopyright"
                    className="form-control"
                    id="form-settings/copyright"
                    value={generalSettingsDetails.storeCopyright}
                    onChange={handleDetails}
                  />
                </div>
              </div>
              {/* <div className="mb-4">
                  <input
                    type="submit"
                    className="btn btn-outline-primary btn-sm mb-0"
                    value="Save"
                  />
                </div> */}
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body p-5">
              <h5>Contact Details Settings</h5>
              <div className="mb-4">
                <label htmlFor="form-settings/phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNo"
                  className="form-control"
                  id="form-settings/email"
                  aria-describedby="form-settings/email/help"
                  value={generalSettingsDetails.phoneNo}
                  onChange={handleDetails}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="form-settings/email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="form-settings/email"
                  aria-describedby="form-settings/email/help"
                  value={generalSettingsDetails.email}
                  onChange={handleDetails}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="form-settings/address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  id="form-settings/adress"
                  aria-describedby="form-settings/address/help"
                  value={generalSettingsDetails.address}
                  onChange={handleDetails}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="form-settings/mapAddress"
                  className="form-label"
                >
                  Map Address
                </label>
                <textarea
                  type="text"
                  name="mapAddress"
                  rows={4}
                  className="form-control"
                  id="form-settings/mapAddress"
                  aria-describedby="form-settings/mapAdress/help"
                  value={generalSettingsDetails.mapAddress}
                  onChange={handleDetails}
                />
              </div>
              {/* <div className="mb-4">
                  <input
                    type="submit"
                    className="btn btn-outline-primary btn-sm mb-0"
                    value="Save"
                  />
                </div> */}
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body p-5">
              <h5>Social Links Settings</h5>
              <div className="row">
                <div className="mb-4 col-md-6">
                  <label
                    htmlFor="form-settings/facebook"
                    className="form-label"
                  >
                    Facebook
                  </label>
                  <input
                    type="text"
                    name="facebookLink"
                    className="form-control"
                    id="form-settings/facebookLink"
                    value={generalSettingsDetails.facebookLink}
                    onChange={handleDetails}
                  />
                </div>
                <div className="mb-4 col-md-6">
                  <label
                    htmlFor="form-settings/instagram"
                    className="form-label"
                  >
                    Instagram
                  </label>
                  <input
                    type="text"
                    name="instagramLink"
                    className="form-control"
                    id="form-settings/instagramLink"
                    value={generalSettingsDetails.instagramLink}
                    onChange={handleDetails}
                  />
                </div>
                <div className="mb-4 col-md-6">
                  <label
                    htmlFor="form-settings/linkedin"
                    className="form-label"
                  >
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    name="linkedInLink"
                    className="form-control"
                    id="form-settings/linkedin"
                    value={generalSettingsDetails.linkedInLink}
                    onChange={handleDetails}
                  />
                </div>
                <div className="mb-4 col-md-6">
                  <label htmlFor="form-settings/youtube" className="form-label">
                    Youtube
                  </label>
                  <input
                    type="text"
                    name="youtubeLink"
                    className="form-control"
                    id="form-settings/youtubeLink"
                    value={generalSettingsDetails.youtubeLink}
                    onChange={handleDetails}
                  />
                </div>
                <div className="mb-4 col-md-6">
                  <label
                    htmlFor="form-settings/androidAppLink"
                    className="form-label"
                  >
                    Android App
                  </label>
                  <input
                    type="text"
                    name="androidAppLink"
                    className="form-control"
                    id="form-settings/androidAppLink"
                    value={generalSettingsDetails.androidAppLink}
                    onChange={handleDetails}
                  />
                </div>
                <div className="mb-4 col-md-6">
                  <label
                    htmlFor="form-settings/iosAppLink"
                    className="form-label"
                  >
                    IOS App
                  </label>
                  <input
                    type="text"
                    name="iosAppLink"
                    className="form-control"
                    id="form-settings/iosAppLink"
                    value={generalSettingsDetails.iosAppLink}
                    onChange={handleDetails}
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
  );
};

export default General;
