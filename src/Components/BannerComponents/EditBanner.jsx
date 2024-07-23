import { GetData } from "../../Apis/Getters/GetData";
import React, { useEffect, useState } from "react";
import FileUpload from "../../Apis/Setters/FileUpload";
import { useParams, useNavigate } from "react-router";
import useSession, { deleteSession } from "../../hooks/session";
import { EditData } from "../../Apis/Setters/EditData";
import { Select } from "antd"
import { AddData } from "../../Apis/Setters/AddData";

const EditBanner = () => {
  const params = useParams();
  const [setSession, getSession] = useSession();

  const navigate = useNavigate()

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  // TYPE LISTING DATA STATE
  const [type, setType] = useState([
    {
      label: 'Segment',
      value: 'segment',
    },
    {
      label: 'Category',
      value: 'category',
    },
    {
      label: 'Sub Category',
      value: 'sub_category',
    }
  ]);

  const [bannerData, setBannerData] = useState();

  const [details, setDetails] = useState({
    id: params.id,
    title: "",
    type: "",
    typeId: "",
    description: "",
    isActive: true,
    img: ''
  });

  useEffect(() => {
    let token = getSession("authorization");
    GetData({ url: `banner/${params.id}`, token: token })
      .then((res) => {
        setBannerData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (bannerData) {
      // setEditableImg(bannerData.image);
      console.log(bannerData);
      setDetails((prevDetails) => ({

        ...prevDetails,
        title: bannerData.title,
        type: bannerData.type,
        typeId: bannerData.typeId,
        description: bannerData.description,
        img: bannerData.image.url[0]
      }));
    }
  }, [bannerData]);



  const [segmentList, setSegmentList] = useState();
  const [categoryList, setCategoryList] = useState();
  const [sub_categoryList, setSub_CategoryList] = useState();

  useEffect(() => {
    let token = getSession("authorization");
    GetData({ url: "segment", token: token })
      .then((res) => {
        setSegmentList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    const categoryCredentials = { verifyCheck: "1" }
    AddData({ url: "category/list", cred: categoryCredentials, token: token })
      .then((res) => {
        setCategoryList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    const credentials = { segment: "" }
    AddData({ url: "sub-category/list", cred: credentials, token: token })
      .then((res) => {
        setSub_CategoryList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [alert]);

  //MAPPING CATEGORIES OPTION FOR SELECT
  const category = categoryList?.map((elem) => ({
    label: elem?.name,
    value: elem?._id,
  }));

  //MAPPING CATEGORIES OPTION FOR SELECT
  const segment = segmentList?.map((elem) => ({
    label: elem?.name,
    value: elem?._id,
  }));

  //MAPPING CATEGORIES OPTION FOR SELECT
  const sub_category = sub_categoryList?.map((elem) => ({
    label: elem?.name,
    value: elem?._id,
  }));

  const handleType = (value) => {
    setDetails({
      ...details,
      type: value,
    })
  }

  const handleId = (value) => {
    setDetails({
      ...details,
      typeId: value,
    })
  }

  // METHOD TO SET DETAILS IN details STATE VARIABLE
  const handleDetails = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    })
  };


  // FILE UPLOAD METHOD(API CALL)
  const fileUpload = async (e) => {
    // Getting details field to set image id
    FileUpload({ image: e.target.files[0] })
      .then((res) => {
        if (res?.data?.status) {
          setDetails({
            ...details,
            file: res?.data?.data,
          });
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

  // HANDLING API CALL METHOD
  const update = async (e) => {
    e.preventDefault();
    let token = getSession("authorization");
    let credentials = { ...details };
    EditData({ url: "banner/update", cred: credentials, token: token })
      .then((res) => {
        window.scrollTo(0, 0);
        setAlert({
          successStatus: true,
          errStatus: false,
          successMessage: res?.data?.msg,
          errMessage: "",
        });
        navigate('/banners')
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
                  <h4 className="mb-0 fs-exact-18">Banner Information</h4>
                </div>
                <div className="row g-4 mb-4">
                  <div className="mb-4 col-md-6">
                    <label
                      htmlFor="form-bannerImage/thumbnail"
                      className="form-label"
                    >
                      Image
                    </label>
                    <div className="row">
                      {/* <div className="col-1 p-0">
                        <span className="ms-4">
                          <img
                            src={editableImg}
                            width="40"
                            height="40"
                            alt=""
                          />
                        </span>
                      </div> */}
                      <div className="col-md-12">
                        <div style={{ display: 'flex', gap: '5px ' }}>
                          <img src={details?.img} alt="" style={{ height: 50, width: 150 }} />
                          <input
                            type="file"
                            className="form-control"
                            name="image"
                            id="form-doctorImage/thumbnail"
                            onChange={fileUpload}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="form-product/title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="form-control"
                      id="form-product/title"
                      value={details.title}
                      onChange={handleDetails}
                      required
                    />
                  </div>
                  <div className="mb-4 col-md-6">
                    <label htmlFor="form-category/user" className="form-label">
                      Add Type</label>
                    <Select
                      style={{ width: "100%" }}
                      name="type"
                      value={details.type}
                      placeholder="Select Type"
                      onChange={handleType}
                      options={type}
                      className="p-0 mt-2"
                      required
                    />
                  </div>
                  {details?.type === "segment" &&
                    (<div className="mb-4 col-md-6">
                      <label htmlFor="form-category/types" className="form-label">
                        Add Segment</label>
                      <Select
                        style={{ width: "100%" }}
                        multiple
                        value={details.typeId}
                        placeholder={`Select Segment`}
                        onChange={handleId}
                        options={segment}
                        className="p-0 mt-2"
                        required
                      />
                    </div>)
                  }
                  {details?.type === "category" &&
                    (<div className="mb-4 col-md-6">
                      <label htmlFor="form-category/types" className="form-label">
                        Add Category</label>
                      <Select
                        style={{ width: "100%" }}
                        multiple
                        value={details.typeId}
                        placeholder="Select Category"
                        onChange={handleId}
                        options={category}
                        className="p-0 mt-2"
                        required
                      />
                    </div>)
                  }
                  {details?.type === "sub_category" &&
                    (<div className="mb-4 col-md-6">
                      <label htmlFor="form-category/types" className="form-label">
                        Add Sub Category</label>
                      <Select
                        style={{ width: "100%" }}
                        multiple
                        value={details.typeId}
                        placeholder={`Select Sub Category`}
                        onChange={handleId}
                        options={sub_category}
                        className="p-0 mt-2"
                        required
                      />
                    </div>)
                  }
                </div>
                <div className="mb-4 ">
                  <label
                    htmlFor="form-product/description"
                    className="form-label"
                  >
                    Description
                  </label>
                  <textarea
                    id="form-product/description"
                    name="description"
                    className="sa-quill-control form-control sa-quill-control--ready"
                    rows="4"
                    value={details.description}
                    onChange={handleDetails}
                    required
                  ></textarea>
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

export default EditBanner;
