import React, { useState } from "react";
import useSession, { deleteSession } from "../../hooks/session";
import { AddData } from "../../Apis/Setters/AddData";

const AddCoupon = () => {
  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();

  // VALUES STATE
  const [details, setDetails] = useState({
    code: "",
    type: "",
    discount: "",
    discountUpTo: "",
    totalLimit: "",
    userLimit: "",
    expiredAt: "",
  });

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

  let token = getSession("authorization");

  // HANDLING API CALL METHOD
  const coupon = async (e) => {
    e.preventDefault();   
    let credentials = { ...details };
    AddData({ url: "coupon/create", cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        setDetails({
          code: "",
          type: "",
          discount: "",
          discountUpTo: "",
          totalLimit: "",
          userLimit: "",
          expiredAt: "",
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
      <form onSubmit={coupon}>
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

          <div className="col-md-8 card-body ">
            {/* Basic Information Card */}
            <div className="card">
              <div className="card-body p-md-5">
                <div className="mb-5">
                  <h4 className="mb-0 fs-exact-18">Coupon Information</h4>
                </div>
                <div className="row g-4 mb-4">
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-coupon/code" className="form-label">
                      Code
                    </label>
                    <input
                      type="text"
                      name="code"
                      className="form-control"
                      id="form-product/code"
                      value={details.code}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="form-coupon/type" className="form-label">
                      Type
                    </label>
                    <label className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="type"
                        onChange={handleDetails}
                        value="flat"
                        required
                      />
                      <span className="form-check-label">Flat</span>
                    </label>
                    <label className="form-check mb-0">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="type"
                        onChange={handleDetails}
                        value="percentage"
                        required
                      />
                      <span className="form-check-label">Percentage</span>
                    </label>
                  </div>
                </div>
                <div className="row g-4 mb-4">
                  <div className="mb-4 col-md-6">
                    <label
                      htmlFor="form-coupon/discount"
                      className="form-label"
                    >
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
                    <label
                      htmlFor="form-coupon/discountUpTo"
                      className="form-label"
                    >
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
                    <label htmlFor="form-coupon/total-limit" className="form-label">
                      Total Limit
                    </label>
                    <input
                      type="number"
                      name="totalLimit"
                      className="form-control"
                      id="form-product/total-limit"
                      value={details.totalLimit}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-coupon/user-limit" className="form-label">
                      User's Limit
                    </label>
                    <input
                      type="number"
                      name="userLimit"
                      className="form-control"
                      id="form-product/user-limit"
                      value={details.userLimit}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="form-doctor/expiredAt"
                      className="form-label"
                    >
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
      </form>
    </React.Fragment>
  );
};

export default AddCoupon;
