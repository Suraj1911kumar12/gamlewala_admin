import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useColumnSearchProps from "../../hooks/useColumnSearchProps";
import Datatable from "../DataTableComponent/Datatable";
import { GetData } from "../../Apis/Getters/GetData";
import useSession from "../../hooks/session";

const FeedbackList = () => {
  // Declaring ColumnSearchProps Method
  const columnSearchProps = useColumnSearchProps();

  const [setSession, getSession] = useSession();

  //ORDER LIST STATE
  const [feedbackListData, setFeedbackListData] = useState([]);

  useEffect(() => {
    let token = getSession("authorization");
    GetData({ url: "feedbacks", token: token })
      .then((res) => {
        setFeedbackListData(res.data.data);
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

  // DESTRUCTURING DATA FOR DATA TABLE
  const data = [...feedbackListData];

  // DEFINING DATA TABLE COLUMNS
  const columns = [
    {
      title: "NAME",
      key: "name",
      dataIndex: "name",
      ...columnSearchProps("name"),
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      ...columnSearchProps("email"),
    },
    {
      title: "ACTION",
      key: "action",
      render: (elem) => (
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
                to={"/feedbacks/feedback/" + elem._id}
              >
                View Feedback
              </Link>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div className="container-fluid py-4">
        <div className="row my-4">
          <div className="col-md-12 mb-md-0 mb-4">
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
            <div className="card">
              <div className="card-header pb-0">
                <div className="row">
                  <div className="col-lg-6 col-7">
                    <h6>Users List</h6>
                  </div>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive">
                  {<Datatable data={data} columns={columns} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FeedbackList;
