import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useSession, { deleteSession } from "../../hooks/session";
import { EditData } from "../../Apis/Setters/EditData";
import { GetData } from "../../Apis/Getters/GetData";

const EditCoupon = () => {
  const params = useParams();
  const [setSession, getSession] = useSession();

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  const [details, setDetails] = useState({
    id: params.id,
    code: "",
    type: "percentage",
    discount: "",
    discountUpTo: "",
    totalLimit: "",
    userLimit: "",
    balanceLimit: "",
    expiredAt: "",
  });

  useEffect(() => {
    let token = getSession("authorization");
    GetData({ url: `coupon/${params.id}`, token: token })
      .then((res) => {
        setDetails((prevDetails) => ({
          ...prevDetails,
          code: res?.data?.data?.code,
          type: res?.data?.data?.type,
          discount: res?.data?.data?.discount,
          discountUpTo: res?.data?.data?.discountUpTo,
          totalLimit: res?.data?.data?.totalLimit,
          userLimit: res?.data?.data?.userLimit,
          balanceLimit: res?.data?.data?.balanceLimit,
          expiredAt: formatDate(new Date(res?.data?.data?.expiredAt)),
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // METHOD FOR DATE FORMATTING
  const formatDate = (date = new Date()) => {
    const year = date.toLocaleString("default", { year: "numeric" });
    const month = date.toLocaleString("default", {
      month: "2-digit",
    });
    const day = date.toLocaleString("default", { day: "2-digit" });

    return [year, month, day].join("-");
  };

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

  // HANDLING API CALL METHOD
  const update = async (e) => {
    e.preventDefault();
    let token = getSession("authorization");
    let credentials = { ...details };
    EditData({ url: "coupon/update", cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
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
      <form onSubmit={update}>
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
                        checked={details?.type === "flat" ? true : false}
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
                        checked={details?.type === "percentage" ? true : false}
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
                      value={details?.expiredAt}
                      onChange={handleDetails}
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
        {/* SUBMIT DOCTOR DETAILS */}
        {/* <div className="container-fluid pb-5 row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body p-md-5">
                                <div className="text-center">
                                    <input type="submit" className="btn btn-outline-primary btn-sm mb-0 px-5" value="Save" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
      </form>
    </React.Fragment>
  );
};

export default EditCoupon;
