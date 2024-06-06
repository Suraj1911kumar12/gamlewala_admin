import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { DeleteData } from "../../Apis/Setters/DeleteData";
import { DeleteItem } from "../../Apis/Setters/DeleteItem";
import { AddData } from "../../Apis/Setters/AddData";
import { Select } from "antd";

const SegmentList = () => {
  const [deleteData, setDeleteData] = useState(false);

  //CATEGORIES LIST STATE
  const [segmentList, setSegmentList] = useState([]);
  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  useEffect(() => {
    let token = getSession("authorization");
    GetData({ url: "segment", token: token })
      .then((res) => {
        console.log(res);
        setSegmentList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteData]);

  //API CALL METHOD TO DELETE AN ITEM
  const deleteSegment = (id) => {
    let token = getSession("authorization");
    DeleteData({ url: `segment/delete/${id}`, token: token })
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
          setDeleteData((prev) => !prev);
        }
      })
      .catch((err) => {
        if (err?.response?.status == "401") {
          // deleteSession("authorization");
          // window.location.href = `${process.env.REACT_APP_BASE_URL}`
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

  // MAPPING THE LIST OF FETCHED ITEMS
  let list = segmentList.map((elem, index) => {
    return (
      <tr key={index + 1}>
        <td>
          <div className="d-flex px-2 py-1">
            <div className="d-flex flex-column justify-content-center">
              <h6 className="mb-0 text-sm">
                <Link to="#" className="">
                  <img height={50} style={{ objectFit: 'cover', borderRadius: "25px" }} width={50} src={elem?.image} alt="not  found" />
                </Link>
              </h6>
            </div>
          </div>
        </td>
        <td>
          <div className="d-flex px-2 py-1">
            <div className="d-flex flex-column justify-content-center">
              <h6 className="mb-0 text-sm">
                <Link to="#">{elem?.name}</Link>
              </h6>
            </div>
          </div>
        </td>
        <td className="align-middle">
          <div className=" text-center px-2 py-1">
            <Link
              className="cursor-pointer"
              id="dropdownTable"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                className="fa fa-ellipsis-v text-secondary"
                aria-hidden="true"
              ></i>
            </Link>
            <ul
              className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5 border border-dark"
              aria-labelledby="dropdownTable"
              data-popper-placement="bottom-start"
            >
              <li>
                <Link
                  className="dropdown-item border-radius-md"
                  to={"/segments/segment/" + elem._id}
                >
                  Update
                </Link>
              </li>
              <li
                onClick={() => {
                  deleteSegment(elem._id);
                }}
              >
                <Link className="dropdown-item border-radius-md" to="#">
                  Delete
                </Link>
              </li>
            </ul>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <React.Fragment>
      <div className="container-fluid py-4">
        <div className="row my-4">
          <div className="col-md-12 mb-md-0 mb-4">
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


            <div className="card">
              <div className="card-header pb-0">
                <div className="row">
                  <div className="col-lg-6 col-7">
                    <h6>List</h6>
                  </div>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder">
                          Image
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder">
                          Name
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* DISPLAYING THE LIST OF MAPPED ITEMS */}
                      {list}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SegmentList;
