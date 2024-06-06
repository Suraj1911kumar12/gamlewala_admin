import React, { useEffect, useState } from "react";
import { UpdateData } from "../../Apis/Setters/UpdateData";
import useSession from "../../hooks/session";
import { fetchSettings } from "../../Apis/Getters/settings";

const Payment = () => {
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  // SOCIAL LINKS SETTINGS INPUT VALUES STATE
  const [paymentGateway, setPaymentGateway] = useState({
    standard: "",
    free_shipping: "",
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

  // GETTING STORE IDENTITY
  useEffect(() => {
    const paymentMethod = settingsData.filter(
      (elem) => elem.type === "payment_method"
    );

    if (paymentMethod) {
      setPaymentGateway({
        standard: paymentMethod?.[0]?.value?.[0]?.standard,
        free_shipping: paymentMethod?.[0]?.value?.[0]?.free_shipping,
      });
    }
  }, [settingsData]);

  // METHOD TO SET CREDENTIALS IN paymentGateway STATE VARIABLE
  // const handlePaymentGateway = (e) => {
  //     const { name, value } = e.target;
  //     setPaymentGateway({
  //         ...paymentGateway,
  //         [name]: value,
  //     });
  // };

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

          <form name="storeSocialpaymentGateway">
            {/* RAZORPAY SETTINGS */}
            <div className="card mb-3">
              <div className="card-body p-5">
                <h5>Payment Method</h5>
                <div className="row">
                  <div className="mb-4 col-12 col-md-6">
                    <label
                      htmlFor="form-payments/razorpay_keyId"
                      className="form-label"
                    >
                      Standard Payment Method
                    </label>
                    <input
                      type="text"
                      name="razorpay_keyId"
                      className="form-control"
                      id="form-payments/razorpay_keyId"
                      value={paymentGateway.standard}
                    />
                  </div>
                  <div className="mb-4 col-12 col-md-6">
                    <label
                      htmlFor="form-payments/razorpay_secretKey"
                      className="form-label"
                    >
                      Free Shipping
                    </label>
                    <input
                      type="text"
                      name="razorpay_secretKey"
                      className="form-control"
                      id="form-payments/razorpay_secretKey"
                      value={paymentGateway.free_shipping}
                    />
                  </div>
                  {/* <div className="mb-4 col-12">
                                        <label htmlFor="form-payments/status" className="form-label">
                                            Status: <span className="form-check-label">{paymentGateway.razorpay_status === '1' ? 'Active' : 'Inactive'}</span>
                                        </label>
                                        <div className='d-flex'>
                                            <span className="form-check-label">Change:</span>
                                            <label className="form-check">
                                                <input type="radio" className="form-check-input" name="razorpay_status" onChange={handlePaymentGateway} value={1} />
                                                <span className="form-check-label">Active</span>
                                            </label>
                                            <label className="form-check mb-0">
                                                <input type="radio" className="form-check-input" name="razorpay_status" onChange={handlePaymentGateway} value={0} />
                                                <span className="form-check-label">Inactive</span>
                                            </label>
                                        </div>
                                    </div> */}
                </div>
              </div>
            </div>

            {/* PAYPAL SETTINGS */}
            {/* <div className="card mb-3">
                            <div className="card-body p-5">
                                <h5>Paypal Settings</h5>
                                <div className="row">
                                    <div className="mb-4 col-12 col-md-6">
                                        <label htmlFor="form-payments/paypal_keyId" className="form-label">Key Id</label>
                                        <input type="text" name='paypal_keyId' className="form-control" id="form-payments/paypal_keyId" value={paymentGateway.paypal_keyId} onChange={handlePaymentGateway} />
                                    </div>
                                    <div className="mb-4 col-12 col-md-6">
                                        <label htmlFor="form-payments/razorpay_secretKey" className="form-label">Secret Key</label>
                                        <input type="text" name='paypal_secretKey' className="form-control" id="form-payments/paypal_secretKey" value={paymentGateway.paypal_secretKey} onChange={handlePaymentGateway} />
                                    </div>
                                    <div className="mb-4 col-12">
                                        <label htmlFor="form-payments/status" className="form-label">
                                            Status: <span className="form-check-label">{paymentGateway.paypal_status === '1' ? 'Active' : 'Inactive'}</span>
                                        </label>
                                        <div className='d-flex'>
                                            <span className="form-check-label">Change:</span>
                                            <label className="form-check">
                                                <input type="radio" className="form-check-input" name="paypal_status" onChange={handlePaymentGateway} value={1} />
                                                <span className="form-check-label">Active</span>
                                            </label>
                                            <label className="form-check mb-0">
                                                <input type="radio" className="form-check-input" name="paypal_status" onChange={handlePaymentGateway} value={0} />
                                                <span className="form-check-label">Inactive</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

            {/* SUBMIT BUTTON */}
            {/* <div className="container-fluid pb-5 row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-body p-md-4">
                                        <div className="text-center">
                                            <input type="submit" className="btn btn-outline-primary btn-sm mb-0 px-5" value="Save Details" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Payment;
