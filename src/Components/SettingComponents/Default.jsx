import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Default = () => {

  // FETCHING SETTINGS
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <div className="container-fluid py-4">
        <div className="row g-4">
          {/* <div className="col-md-6 col-lg-4">
            <div className="card text-center">
              <Link
                to="/settings/general"
                className="text-reset p-5 text-decoration-none sa-hover-area"
              >
                <div className="fs-4 mb-4 text-muted opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-box"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h2 className="fs-6 fw-medium mb-3">General</h2>
                <div className="text-muted fs-exact-14">
                  General Store Settings
                </div>
              </Link>
            </div>
          </div> */}
          <div className="col-md-6 col-lg-4">
            <div className="card text-center">
              <Link
                to="/settings/admin"
                className="text-reset p-5 text-decoration-none sa-hover-area"
              >
                <div className="fs-4 mb-4 text-muted opacity-50">
                  <i className="far fa-user"></i>
                </div>
                <h2 className="fs-6 fw-medium mb-3">Admin</h2>
                <div className="text-muted fs-exact-14">
                  Administrator Settings
                </div>
              </Link>
            </div>
          </div>
          {/* <div className="col-6 col-md-4 col-lg-4">
            <div className="card text-center">
              <Link
                to="/settings/referral_amount"
                className="text-reset p-5 text-decoration-none sa-hover-area"
              >
                <div className="fs-4 mb-4 text-muted opacity-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-truck"
                  >
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                </div>
                <h2 className="fs-6 fw-medium mb-3">Referral Amount</h2>
                <div className="text-muted fs-exact-14">
                  Referral Amount Settings
                </div>
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Default;
