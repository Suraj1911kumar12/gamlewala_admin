import { Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import FileUpload from "../../Apis/Setters/FileUpload";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { AddData } from "../../Apis/Setters/AddData";
import SunEditor from "suneditor-react";
// import axios from "axios";

const AddGift = () => {
  // const [description, setDescription] = useState('')
  const [value, setValue] = useState();
  const [videoLink, setVideoLink] = useState("");
  // const [selectedImages, setSelectedImages] = useState([]);
  const [singleImage, setSingleImage] = useState([]);
  // const [multiImage, setMultiImage] = useState([]);
  // const [allImage, setAllImage] = useState([])

  const imageRef = useRef();

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });
  const defaultFonts = [
    "Arial",
    "Comic Sans MS",
    "Courier New",
    "Impact",
    "Georgia",
    "Tahoma",
    "Trebuchet MS",
    "Verdana",
  ];
  const sortedFontOptions = [
    "Logical",
    "Salesforce Sans",
    "Garamond",
    "Sans-Serif",
    "Serif",
    "Times New Roman",
    "Helvetica",
    ...defaultFonts,
  ].sort();

  const options = {
    buttonList: [
      ["undo", "redo"],
      ["font", "fontSize"],
      ["paragraphStyle", "blockquote"],
      ["bold", "underline", "italic", "strike", "subscript", "superscript"],
      ["fontColor", "hiliteColor"],
      ["align", "list", "lineHeight"],
      ["outdent", "indent"],

      ["table", "horizontalRule", "link", "image", "video"],
      // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
      // ['imageGallery'], // You must add the "imageGalleryUrl".
      ["fullScreen", "showBlocks", "codeView"],
      ["preview", "print"],
      ["removeFormat"],

      // ['save', 'template'],
      // '/', Line break
    ], // Or Array of button list, eg. [['font', 'align'], ['image']]
    defaultTag: "div",
    minHeight: "300px",
    showPathLabel: false,
    font: sortedFontOptions,
  };

  // CATEGORY LIST DATA
  const [categoriesListData, setCategoriesListData] = useState([]);

  // SUB CATEGORY LIST DATA
  const [subCategories, setSubCategories] = useState([]);

  // SEGMENT LIST DATA
  const [segmentListData, setSegmentListData] = useState([]);

  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();

  // VALUES STATE
  const [details, setDetails] = useState({
    name: "",
    file: "",
    category: [],
    segment: [],
    subCategory: [],
    description: "",
  });

  let token = getSession("authorization");

  useEffect(() => {
    GetData({ url: "segment", token: token })
      .then((res) => {
        setSegmentListData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [alert]);

  useEffect(() => {
    const credentials = { segment: details.segment };
    AddData({ url: "category/list", cred: credentials, token: token })
      .then((res) => {
        setCategoriesListData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [details.segment]);

  useEffect(() => {
    const credentials = {
      segment: details.segment,
      category: details.category,
    };
    AddData({ url: "sub-category/list", cred: credentials, token: token })
      .then((res) => {
        setSubCategories(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [details.segment, details.category]);

  //MAPPING CATEGORIES OPTION FOR SELECT
  const categoriesList = categoriesListData.map((elem) => ({
    label: elem?.name,
    value: elem?._id,
  }));

  //MAPPING CATEGORIES OPTION FOR SELECT
  const subCategoriesList = subCategories.map((elem) => ({
    label: elem?.name,
    value: elem?._id,
  }));

  //MAPPING SEGMENT OPTION FOR SELECT
  const segmentList = segmentListData.map((elem) => ({
    label: elem?.name,
    value: elem?._id,
  }));

  const handleNameDetails = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const setDescription = (content) => {
    setValue(content);
  };

  // METHOD TO SET DETAILS IN details STATE VARIABLE
  const handleDetails = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  // HANDLING CATEGORIES
  const handleCategories = (value) => {
    setDetails((prev) => {
      return {
        ...prev,
        category: value,
      };
    });
  };

  // HANDLING  SUB CATEGORIES
  const handleSubCategories = (value) => {
    setDetails((prev) => {
      return {
        ...prev,
        subCategory: value,
      };
    });
  };

  // HANDLING CATEGORIES
  const handleSegment = (value) => {
    console.log(value);
    setDetails((prev) => {
      return {
        ...prev,
        segment: value,
      };
    });
  };

  //add description

  // FILE UPLOAD METHOD(API CALL)
  const fileUpload = async (e) => {
    // Getting details field to set image id
    FileUpload({ image: e.target.files[0] })
      .then((res) => {
        console.log("res", res);
        if (res?.data?.status) {
          setDetails({
            ...details,
            file: res?.data?.data,
          });
          setSingleImage([res?.data?.data]);
        }
      })
      .catch((err) => {
        console.log(err, "err");
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
  // console.log("det", singleImage);

  // const multiFileUpload = async (e) => {
  //   // Storing multiple images into array
  //   let allInputImages = [...e.target.files];
  //   // Fetching access token
  //   let token = getSession("authorization");
  //   // Declaring empty array variable
  //   let img = [];

  //   // Looping through all input images
  //   allInputImages.forEach((e) => {
  //     // Defining image, image path & module id
  //     let file = {
  //       images: e,
  //       type: "Product",
  //       module_id: 1,
  //     };
  //     // Requesting to upload a image
  //     FileUpload({ image: file.images[0] })
  //       .then((res) => {
  //         if (res.data.status) {
  //           // Pushing image id to declared array variable
  //           img = [...img, res?.data?.data];
  //           // Updating details state with images array
  //           setDetails({
  //             ...details,
  //             file: img,
  //           })
  //         }
  //       })
  //       .catch((err) => {
  //         if (err?.response?.status == "401") {
  //           deleteSession("authorization");
  //           window.location.href = `${process.env.REACT_APP_BASE_URL}`
  //         } else {
  //           window.scrollTo(0, 0);
  //           if (err?.response?.data?.msg) {
  //             console.log(err?.response?.data?.msg);
  //             setAlert({
  //               errStatus: true,
  //               successStatus: false,
  //               errMessage: err?.response?.data?.msg,
  //               successMessage: "",
  //             });
  //             setTimeout(() => {
  //               setAlert({
  //                 errStatus: false,
  //                 successStatus: false,
  //                 errMessage: "",
  //                 successMessage: "",
  //               });
  //             }, 2000);
  //           } else {
  //             console.log(err?.message);
  //             setAlert({
  //               errStatus: true,
  //               successStatus: false,
  //               errMessage: err?.message,
  //               successMessage: "",
  //             });
  //             setTimeout(() => {
  //               setAlert({
  //                 errStatus: false,
  //                 successStatus: false,
  //                 errMessage: "",
  //                 successMessage: "",
  //               });
  //             }, 2000);
  //           }
  //         }
  //       });
  //   });
  // };
  // console.log("details", details);
  // console.log("details", multiImage);

  // HANDLING API CALL METHOD
  const product = async (e) => {
    e.preventDefault();
    // const combined = [...singleImage, ...multiImage]
    // console.log("combined array", combined);
    // if (combined.length > 0) {
    //   setDetails({
    //     ...details,
    //     file: combined,
    //   })
    // }
    let token = getSession("authorization");
    console.log("details A", details);

    let credentials = { ...details, file: singleImage, description: value };
    console.log("credentials", credentials);
    AddData({ url: "gift-type/create", cred: credentials, token: token })
      .then((res) => {
        // console.log(res);
        window.scrollTo(0, 0);
        setDetails({
          name: "",
          file: "",
          segment: null,
          category: null,
          subCategory: null,
          description: "",
        });
        setVideoLink("");
        setValue("");
        imageRef.current.value = "";
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
        console.log(err);
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
      <form onSubmit={product}>
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
                      onChange={handleNameDetails}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="form-productImage/thumbnail"
                      className="form-label"
                    >
                      Image
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      name="thumbnail"
                      id="form-productImage/thumbnail"
                      onChange={fileUpload}
                      ref={imageRef}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label
                      htmlFor="form-productImage/thumbnail"
                      className="form-label"
                    >
                      Segment
                    </label>
                    <Select
                      // mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Select Segment"
                      onChange={handleSegment}
                      options={segmentList}
                      className="p-0 mb-4"
                      value={details?.segment}
                      mode="tags"
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="form-productImage/thumbnail"
                      className="form-label"
                    >
                      Category
                    </label>
                    <Select
                      // mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Select Categories"
                      onChange={handleCategories}
                      options={categoriesList}
                      className="p-0 mb-4"
                      value={details?.category}
                      mode="tags"
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="form-productImage/thumbnail"
                      className="form-label"
                    >
                      Sub Category
                    </label>
                    <Select
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Select Categories"
                      onChange={handleSubCategories}
                      options={subCategoriesList}
                      className="p-0 mb-4"
                      value={details?.subCategory}
                      mode="tags"
                    />
                  </div>

                  {/* <div className="col-md-12">
                    <label htmlFor="decription" className="form-label">
                      Description
                    </label>
                    <SunEditor
                      setOptions={options}
                      setContents={value}
                      onChange={(content) => setDescription(content)}
                    />
                  </div> */}
                </div>
                <div className="text-center">
                  <input
                    type="submit"
                    className="btn btn-outline-primary btn-sm mb-0 px-5"
                    value="Add Event"
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

export default AddGift;
