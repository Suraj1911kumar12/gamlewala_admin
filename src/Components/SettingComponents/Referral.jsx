import React, { useEffect, useState } from "react";
import useSession, { deleteSession } from "../../hooks/session";
import { fetchSettings } from "../../Apis/Getters/settings";
import { AddData } from "../../Apis/Setters/AddData";

const Referral = () => {
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  // SOCIAL LINKS SETTINGS INPUT VALUES STATE
  const [referralAmount, setReferralAmount] = useState({
    value: "",
  });

  const [settingsData, setSettingsData] = useState([]);
  const [setSession, getSession] = useSession();
  const token = getSession("authorization");

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

  useEffect(() => {
    const referralAmountDetails = settingsData.filter(
      (elem) => elem.type === "referral_amount"
    );

    if (referralAmountDetails) {
      setReferralAmount({
        value: referralAmountDetails?.[0]?.value?.[0]?.value,
      });
    }
  }, [settingsData]);

  //METHOD TO SET CREDENTIALS IN REFERRAL AMOUNT STATE VARIABLE
  const handleReferralAmount = (e) => {
    const { name, value } = e.target;
    setReferralAmount({
      [name]: value,
    });
  };

  // UPDATE testimonials API METHOD
  const update = (e) => {
    e.preventDefault();
    let token = getSession("authorization");

    const credentials = {
      type: "referral_amount",
      value: { ...referralAmount },
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
    <React.Fragment>
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

          <form onSubmit={update} name="storeReferralAmount">
            <div className="card mb-3">
              <div className="card-body p-5">
                <h5 className="mb-5">Referral Amount Settings</h5>
                <div className="row">
                  <div className="mb-4 col-12 col-md-6">
                    <label
                      htmlFor="form-payments/razorpay_keyId"
                      className="form-label"
                    >
                      Referral Amount
                    </label>
                    <input
                      type="text"
                      name="value"
                      className="form-control"
                      id="form-referral/amount"
                      value={referralAmount.value}
                      onChange={handleReferralAmount}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="container-fluid pb-5 row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body p-md-4">
                    <div className="text-center">
                      <input
                        type="submit"
                        className="btn btn-outline-primary btn-sm mb-0 px-5"
                        value="Save Details"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Referral;
