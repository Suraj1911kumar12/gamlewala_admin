import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useSession from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";

const EditFeedback = () => {
  const params = useParams();

  const [setSession, getSession] = useSession();
  const [singleUserFeedback, setSingleUserFeedback] = useState();

  const [details, setDetails] = useState({
    rating: "",
    review: [],
  });
  useEffect(() => {
    let token = getSession("authorization");
    GetData({ url: `feedbacks/${params.id}`, token: token })
      .then((res) => {
        setSingleUserFeedback(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // ERROR MESSAGE STATE
  const [errMsg, setErrMsg] = useState({
    status: false,
    message: "",
  });
  // SUCCESS MESSAGE STATE
  const [successMsg, setSuccessMsg] = useState({
    status: false,
    message: "",
  });

  useEffect(() => {
    if (singleUserFeedback) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        rating: singleUserFeedback?.feedback?.[0]?.rating,
        review: singleUserFeedback?.feedback?.[0]?.review,
      }));
    }
  }, [singleUserFeedback]);

  return (
    <React.Fragment>
      <form>
        {/* INPUT PRODUCT DETAILS */}
        <div className="container-fluid row">
          {/* DISPLAY ERROR MESSAGE */}
          {errMsg.status && (
            <div
              className="alert alert-danger alert-dismissible fade show text-white"
              role="alert"
            >
              {errMsg.message}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => {
                  setErrMsg({
                    status: false,
                    message: "",
                  });
                }}
              ></button>
            </div>
          )}

          {/* DISPLAY SUCCESS MESSAGE */}
          {successMsg.status && (
            <div
              className="alert alert-success alert-dismissible fade show text-white"
              role="alert"
            >
              {successMsg.message}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => {
                  setSuccessMsg({
                    status: false,
                    message: "",
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
                  <h4 className="mb-0 fs-exact-18">Feedback</h4>
                </div>
                <div className="mb-4 col-md-1">
                  <label htmlFor="form-doctor/experties" className="form-label">
                    Rating
                  </label>
                  <div className="input-group input-group--sa-title">
                    <input
                      type="text"
                      name="experties"
                      className="form-control"
                      id="form-doctor/experties"
                      aria-describedby="form-doctor/experties-addon form-doctor/experties-help"
                      value={details.rating}
                      //onChange={handleDetails}
                      required
                    ></input>
                  </div>
                </div>
                {details.review.map((value, index) => (
                  <div className="mb-4">
                    <label
                      htmlFor="form-doctor/experties"
                      className="form-label"
                    >
                      Q. {value.question}
                    </label>
                    <div className="input-group input-group--sa-title">
                      <input
                        type="text"
                        name="experties"
                        className="form-control"
                        id="form-doctor/experties"
                        aria-describedby="form-doctor/experties-addon form-doctor/experties-help"
                        value={value.answer}
                        //onChange={handleDetails}
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="text-center m-5">
                <input
                  type="submit"
                  className="btn btn-outline-primary btn-sm mb-0 px-5"
                  value="Save"
                />
              </div> */}
            </div>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default EditFeedback;
