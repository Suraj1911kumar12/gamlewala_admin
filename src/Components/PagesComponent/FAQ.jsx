import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useColumnSearchProps from "../../hooks/useColumnSearchProps";
import Datatable from "../DataTableComponent/Datatable";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { AddData } from "../../Apis/Setters/AddData";
import { EditData } from "../../Apis/Setters/EditData";
import { DeleteData } from "../../Apis/Setters/DeleteData";

const FAQ = () => {
  // Declaring ColumnSearchProps Method
  const columnSearchProps = useColumnSearchProps();
  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });
  // ADD FAQ DETAILS STATE
  const [faq, setFaq] = useState({
    categoryId: "",
    question: "",
    answer: "",
    status: 1,
  });
  // HANDLING ADD FAQ DETAILS TO ABOVE STATE
  const handleDetails = (e) => {
    const { name, value } = e.target;
    setFaq({
      ...faq,
      [name]: value,
    });
  };

  const [faqListData, setFaqListData] = useState([]);
  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();

  const [deleteFaqData, setdeleteFaqData] = useState(true);
  const [addFaqData, setAddFaqData] = useState(true);
  const [updateFaqData, setUpdateFaqData] = useState(true);
  const [categoriesListData, setCategoriesListData] = useState([]);

  useEffect(() => {
    let token = getSession("authorization");
    GetData({ url: "categories", token: token })
      .then((res) => {
        setCategoriesListData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const categories = categoriesListData.filter((elem) => elem.type === "faq");

  useEffect(() => {
    let token = getSession("authorization");

    GetData({ url: "faqs", token: token })
      .then((res) => {
        setFaqListData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteFaqData, addFaqData, updateFaqData]);

  // CHANGE FAQ POPUP STATE
  const [faqStatus, setFaqStatus] = useState(false);
  // FAQ POPUP DETAILS STATE
  const [faqDetails, setFaqDetails] = useState({
    faqId: "",
    categoryId: "",
    question: "",
    answer: "",
    status: 1,
  });

  // DESTRUCTURING DATA FOR DATA TABLE
  const data = [...faqListData];

  // DEFINING DATA TABLE COLUMNS
  const columns = [
    {
      title: "QUESTION",
      key: "question",
      dataIndex: "question",
      ...columnSearchProps("question"),
    },
    {
      title: "ANSWER",
      key: "answer",
      dataIndex: "answer",
      ...columnSearchProps("answer"),
      render: (_, elem) => <span>{elem.answer.slice(0, 25)}...</span>,
    },
    {
      title: "CATEGORY",
      key: "category",
      dataIndex: "category",
      ...columnSearchProps("category"),
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
            <li
              onClick={() => {
                setFaqStatus(!faqStatus);
                setFaqDetails({
                  faqId: elem._id,
                  category: elem.category,
                  question: elem.question,
                  answer: elem.answer,
                  status: 1,
                });
              }}
            >
              <Link className="dropdown-item border-radius-md" to="#">
                Update
              </Link>
            </li>
            <li
              onClick={() => {
                deleteItem(elem._id);
              }}
            >
              <Link className="dropdown-item border-radius-md" to="#">
                Delete
              </Link>
            </li>
          </ul>
        </div>
      ),
    },
  ];

  // ADD FAQ API METHOD
  const addFaq = (e) => {
    e.preventDefault();
    const credentials = { ...faq };
    let token = getSession("authorization");
    AddData({ url: "faqs", cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        if (res.data.status) {
          setFaq({
            categoryId: "",
            question: "",
            answer: "",
            status: 1,
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
          setAddFaqData((prev) => !prev);
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

  // UPDATE FAQ API METHOD
  const updateFaq = (e) => {
    e.preventDefault();
    const credentials = { ...faqDetails };
    let token = getSession("authorization");
    EditData({ url: "faqs", cred: credentials, token: token })
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
          setUpdateFaqData(!updateFaqData);
          setFaqStatus(!faqStatus);
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

  // API CALL METHOD TO DELETE AN ITEM
  const deleteItem = (id) => {
    let token = getSession("authorization");

    DeleteData({ url: `faqs/${id}`, token: token })
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
          setdeleteFaqData(!deleteFaqData);
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
        <div className="row my-4">
          <div className="col-md-12 mb-md-0 mb-4">
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
            {/* ADD FAQ FORM */}
            <div className="g-4">
              <div className="card mb-3">
                <div className="card-body p-md-5">
                  <h4>FAQs</h4>
                  <form onSubmit={addFaq}>
                    <div className="row">
                      <div className="mb-4">
                        <label
                          htmlFor="form-faq/question"
                          className="form-label"
                        >
                          Question
                        </label>
                        <input
                          type="text"
                          name="question"
                          className="form-control"
                          id="form-faq/question"
                          value={faq.question}
                          onChange={handleDetails}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="form-faq/answer" className="form-label">
                          Answer
                        </label>
                        <textarea
                          name="answer"
                          rows="5"
                          className="form-control"
                          id="form-faq/answer"
                          value={faq.answer}
                          onChange={handleDetails}
                        ></textarea>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="form-faq/question"
                          className="form-label"
                        >
                          Category
                        </label>
                        <div className="row p-3">
                          {/* <div className="mb-4">
                                                   <Select options={categories} isMulti />
                                                </div> */}
                          <select
                            className="sa-select2 form-select select2-hidden-accessible mb-4 mt-3"
                            name="categoryId"
                            //multiple=""
                            data-select2-id="1"
                            tabIndex="-1"
                            //aria-hidden="true"
                            onChange={(e) => {
                              //fetchSubcategories(e)
                              handleDetails(e);
                            }}
                            required
                          >
                            <option defaultValue={null}>
                              Select Categories
                            </option>
                            {categories.map((cat, index) => {
                              return (
                                <option value={cat._id}>{cat.name}</option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <input
                        type="submit"
                        className="btn btn-outline-primary btn-sm mb-0"
                        value="Save"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* FAQs LIST */}
            <div className="card">
              <div className="card-header pb-0">
                <div className="row">
                  <div className="col-lg-6 col-7">
                    <h6>FAQs List</h6>
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

      {/* VIEW & UPDATE FAQ */}
      {faqStatus && (
        <div className="password-popup">
          <div className="rts-newsletter-popup popup">
            <div
              className="newsletter-close-btn"
              onClick={() => setFaqStatus(!faqStatus)}
            >
              <i className="fa fa-times"></i>
            </div>
            <div className="newsletter-inner popup-inner">
              <h3 className="newsletter-heading">FAQ</h3>
              <form onSubmit={updateFaq}>
                <div className="input-area">
                  <div className="input-div">
                    <input
                      name="question"
                      type="text"
                      value={faqDetails.question}
                      placeholder="Question"
                      onChange={(e) =>
                        setFaqDetails({
                          ...faqDetails,
                          question: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="input-div">
                    <textarea
                      name="answer"
                      rows={5}
                      value={faqDetails.answer}
                      placeholder="Answer"
                      onChange={(e) =>
                        setFaqDetails({ ...faqDetails, answer: e.target.value })
                      }
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="subscribe-btn">
                    Update{" "}
                    <i
                      class="fa fa-long-arrow-right ml--5"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default FAQ;
