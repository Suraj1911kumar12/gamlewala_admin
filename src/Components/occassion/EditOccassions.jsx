import { Select } from "antd";
import React, { useEffect, useState } from "react";
import FileUpload from "../../Apis/Setters/FileUpload";
import { useParams } from "react-router";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { EditData } from "../../Apis/Setters/EditData";
import { AddData } from "../../Apis/Setters/AddData";
import SunEditor from "suneditor-react";

const EditOccassions = () => {
  const params = useParams();
  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  // RAW SEGMENT LIST DATA
  const [giftTypeList, setGiftTypeList] = useState([]);

  let [details, setDetails] = useState({
    id: params?.id,
    name: "",
    giftType: [],
  });

  let token = getSession("authorization");

  useEffect(() => {
    GetData({ url: `/occasion/${params.id}`, token: token })
      .then((res) => {
        // console.log(res);
        if (res?.data?.status) {
          setDetails({
            id: params?.id,

            name: res?.data?.data?.name,
            giftType: res?.data?.data?.giftType?.map((item) => item.name),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    GetData({ url: "gift-type", token: token })
      .then((res) => {
        setGiftTypeList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const giftList = giftTypeList.map((elem) => ({
    label: elem?.name,
    value: elem?._id,
  }));

  // METHOD TO SET DETAILS IN details STATE VARIABLE
  const handleDetails = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleGiftType = (value) => {
    setDetails((prev) => {
      return {
        ...prev,
        giftType: value,
      };
    });
  };

  // HANDLING API CALL METHOD
  const update = async (e) => {
    e.preventDefault();
    let token = getSession("authorization");
    let credentials = { ...details };
    EditData({ url: "occasion/update", cred: credentials, token: token })
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
          window.location.href = `${process.env.REACT_APP_BASE_URL}`;
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
            console.log(err);
            setAlert({
              errStatus: true,
              successStatus: false,
              errMessage: err?.response?.data?.errors,
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

          <div className="">
            {/* Basic Information Card */}
            <div className="card">
              <div className="card-body p-md-5">
                <div className="mb-5">
                  <h4 className="mb-0 fs-exact-18">Basic information</h4>
                </div>
                <div className="row g-4 mb-4">
                  {/* <div className="mb-1 col-md-6">
                    <label
                      htmlFor="form-productImage/thumbnail"
                      className="form-label"
                    >
                      Image
                    </label>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <img
                        src={details.img}
                        alt="no img"
                        style={{ height: 50, width: 50 }}
                      />
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        name="image"
                        id="form-productImage/thumbnail"
                        onChange={fileUpload}
                        // value={details?.img}
                      />
                    </div>
                  </div> */}
                  <div className="col-md-6">
                    <label htmlFor="form-product/name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="form-product/name"
                      value={details.name}
                      onChange={handleDetails}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="form-product/segment"
                      className="form-label"
                    >
                      Gift List
                    </label>
                    <Select
                      mode="tags"
                      // mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Select Gift List"
                      onChange={handleGiftType}
                      options={giftList}
                      className="p-0 mb-4"
                      value={details?.giftType}
                    />
                  </div>
                </div>

                <div className="text-center mt-5">
                  <input
                    type="submit"
                    className="btn btn-outline-primary btn-sm mb-0 px-5"
                    value="Update Event"
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

export default EditOccassions;
