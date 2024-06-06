import React, { useEffect, useState } from "react";
import useSession, { deleteSession } from "../../hooks/session";
import { fetchSettings } from "../../Apis/Getters/settings";
import { EditData } from "../../Apis/Setters/EditData";

const ClearDoubts = () => {
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  // SOCIAL LINKS SETTINGS INPUT VALUES STATE
  const [clearDoubts, setClearDoubts] = useState({
    doubts: [],
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
    const clearDoubtsSettings = settingsData.filter(
      (elem) => elem.type === "clear_doubts"
    );

    if (clearDoubtsSettings) {
      setClearDoubts({
        ...clearDoubts,
        doubts: clearDoubtsSettings?.[0]?.value || [],
      });
    }
  }, [settingsData]);

  const handleClearDoubts = (e) => {
    const { name, value } = e.target;
    setClearDoubts({
      ...clearDoubts,
      [name]: value,
    });
  };

  // UPDATE DOUBT API METHOD
  const update = (e) => {
    e.preventDefault();
    let token = getSession("authorization");

    const credentials = {
      type: "clear_doubts",
      value: { ...clearDoubts },
    };

    EditData({ url: "settings/value", cred: credentials, token: token })
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

          <div className="card mb-3">
            <div className="card-body p-5 ">
              <h5 className="mb-5">Clear Doubts Settings</h5>
              <form onSubmit={update}>
                <div className="row">
                  {clearDoubts.doubts &&
                    clearDoubts.doubts.map((value, index) => (
                      <div className="mb-4 col-12">
                        <label
                          htmlFor="form-settings/question"
                          className="form-label"
                        >
                          Q. {value.question}
                        </label>
                        <textarea
                          type="text"
                          name="answer"
                          className="form-control"
                          id="form-settings/answer"
                          value={value.answer}
                          onChange={handleClearDoubts}
                          required
                        />
                      </div>
                    ))}
                  {/* <div className="mb-4">
                    <input
                      type="submit"
                      className="btn btn-outline-primary btn-sm mb-0"
                      value="Save"
                    />
                  </div> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ClearDoubts;
