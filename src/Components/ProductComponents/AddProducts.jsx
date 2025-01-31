import { Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import FileUpload from "../../Apis/Setters/FileUpload";
import useSession, { deleteSession } from "../../hooks/session";
import { GetData } from "../../Apis/Getters/GetData";
import { AddData } from "../../Apis/Setters/AddData";
import SunEditor from "suneditor-react";

const AddProducts = () => {
  // const [description, setDescription] = useState('')
  const [value, setValue] = useState();
  const [videoLink, setVideoLink] = useState("");
  // const [selectedImages, setSelectedImages] = useState([]);
  const [singleImage, setSingleImage] = useState([]);
  const [multiImage, setMultiImage] = useState([]);
  // const [allImage, setAllImage] = useState([])

  const imageRef = useRef();
  const cateRef = useRef();

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
    "Kurti Dev 010",
    "Noto Sans Devanagari",
    ...defaultFonts,
  ].sort();

  const handleInsertDocument = () => {
    return `<div style="border: 1px solid #000; padding: 10px;">
        <h2>Document Title</h2>
        <p>Document content goes here...</p>
    </div>`;
  };

  const customPlugins = {
    name: "insertDocument",
    display: "Insert Document",
    buttonClass: "",
    iconHTML: "📄",
    add: function (core, targetElement) {
      targetElement.addEventListener("click", () => {
        core.execCommand("insertHTML", false, handleInsertDocument());
      });
    },
  };

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
      ["insertDocument"],

      // ['save', 'template'],
      // '/', Line break
    ], // Or Array of button list, eg. [['font', 'align'], ['image']]
    defaultTag: "div",
    minHeight: "300px",
    defaultStyle: 'font-family: "Noto Sans Devanagari", sans-serif;',
    showPathLabel: false,
    font: sortedFontOptions,
    plugins: [customPlugins],
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
    price: "",
    category: [],
    segment: "",
    mrp: "",
    subCategory: "",
    deliveryType: "",
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
        subCategories,
      };
    });
  };

  const deliveryTypes = [
    {
      label: "Local",
      value: "local",
    },
    {
      label: "Partner",
      value: "partner",
    },
    {
      label: "Both",
      value: "both",
    },
  ];

  // HANDLING  SUB CATEGORIES
  const handleSubCategories = (value) => {
    setDetails((prev) => {
      return {
        ...prev,
        subCategory: value,
      };
    });
  };

  // HANDLING  DELIVERY TYPE
  const handleDelivaryType = (value) => {
    setDetails((prev) => {
      return {
        ...prev,
        deliveryType: value,
      };
    });
  };

  // HANDLING CATEGORIES
  const handleSegment = (value) => {
    setDetails((prev) => {
      return {
        ...prev,
        segment: value,
        // subCategory: ''
      };
    });
    // setSubCategories([])
  };

  //add description

  // FILE UPLOAD METHOD(API CALL)
  // const fileUpload = async (e) => {
  //   // Getting details field to set image id
  //   FileUpload({ image: e.target.files[0] })
  //     .then((res) => {
  //       console.log("res", res);
  //       if (res?.data?.status) {
  //         setDetails({
  //           ...details,
  //           file: res?.data?.data,
  //         });
  //         setSingleImage([res?.data?.data])
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err, "err");
  //       if (err?.response?.status == "401") {
  //         deleteSession("authorization");
  //         window.location.href = `${process.env.REACT_APP_BASE_URL}`
  //       } else {
  //         window.scrollTo(0, 0);
  //         if (err?.response?.data?.msg) {
  //           console.log(err?.response?.data?.msg);
  //           setAlert({
  //             errStatus: true,
  //             successStatus: false,
  //             errMessage: err?.response?.data?.msg,
  //             successMessage: "",
  //           });
  //           setTimeout(() => {
  //             setAlert({
  //               errStatus: false,
  //               successStatus: false,
  //               errMessage: "",
  //               successMessage: "",
  //             });
  //           }, 2000);
  //         } else {
  //           console.log(err?.message);
  //           setAlert({
  //             errStatus: true,
  //             successStatus: false,
  //             errMessage: err?.message,
  //             successMessage: "",
  //           });
  //           setTimeout(() => {
  //             setAlert({
  //               errStatus: false,
  //               successStatus: false,
  //               errMessage: "",
  //               successMessage: "",
  //             });
  //           }, 2000);
  //         }
  //       }
  //     });
  // };
  // console.log("det", singleImage);

  const multiFileUpload = async (e) => {
    // Storing multiple images into array
    let allInputImages = [...e.target.files];
    // Fetching access token
    let token = getSession("authorization");
    // Declaring empty array variable
    let img = [];

    // Looping through all input images
    allInputImages.forEach((e) => {
      // Defining image, image path & module id
      // console.log(e, "eeeeeeeeeeeeeeeeeee");
      let file = {
        images: e,
        type: "Product",
        module_id: 1,
      };
      // console.log(file?.images, "ddddddddddddddddddddddeeeeeeeeee");

      // Requesting to upload a image
      FileUpload({ image: file?.images })
        .then((res) => {
          console.log(res, "res herer");
          if (res.data.status) {
            // Pushing image id to declared array variable
            img = [...img, res?.data?.data];
            // Updating details state with images array
            setDetails({
              ...details,
              file: img,
            });
            setSingleImage([img]);
          }
        })
        .catch((err) => {
          console.log(err, "errrorerpeoe");
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
    });
  };
  // console.log("details", details);
  // console.log("details", singleImage);

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

    let credentials = {
      ...details,
      file: singleImage[0],
      description: value,
      videoUrl: videoLink,
    };
    console.log("credentials", credentials);
    AddData({ url: "product/create", cred: credentials, token: token })
      .then((res) => {
        // console.log(res);
        window.scrollTo(0, 0);
        setDetails({
          name: "",
          file: [],
          price: "",
          mrp: "",
          vendorPrice: "",
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
  // console.log(cateRef.current, 'cateref');
  // console.log(imageRef.current, 'imgageref');

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
                      Product Name
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
                      onChange={multiFileUpload}
                      ref={imageRef}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="form-product/mrp" className="form-label">
                      MRP
                    </label>
                    <div className="input-group input-group--sa-slug">
                      <input
                        type="number"
                        name="mrp"
                        className="form-control"
                        id="form-product/mrp"
                        aria-describedby="form-product/mrp-addon form-product/mrp-help"
                        value={details.mrp}
                        onChange={handleDetails}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="form-product/slug" className="form-label">
                      Price
                    </label>
                    <div className="input-group input-group--sa-slug">
                      <input
                        type="number"
                        name="price"
                        className="form-control"
                        id="form-product/price"
                        aria-describedby="form-product/price-addon form-product/price-help"
                        value={details.price}
                        onChange={handleDetails}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="form-product/vendorprice"
                      className="form-label"
                    >
                      Vendor Price
                    </label>
                    <div className="input-group input-group--sa-slug">
                      <input
                        type="number"
                        name="vendorPrice"
                        className="form-control"
                        id="form-product/vendorprice"
                        aria-describedby="form-product/vendorprice-addon form-product/vendorprice-help"
                        value={details.vendorPrice}
                        onChange={handleDetails}
                        required
                      />
                    </div>
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
                      // onClick={() => cateRef('')}
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
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Select Categories"
                      onChange={handleCategories}
                      options={categoriesList}
                      className="p-0 mb-4"
                      ref={cateRef}
                      value={details?.category}
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
                      // mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Select Categories"
                      onChange={handleSubCategories}
                      options={subCategoriesList}
                      className="p-0 mb-4"
                      value={details?.subCategory}
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="form-productImage/thumbnail"
                      className="form-label"
                    >
                      Thumbnail Images
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="form-control"
                      name="multiimages"
                      id="form-productImage/thumbnail"
                      onChange={multiFileUpload}
                      ref={imageRef}
                    />
                  </div>
                  <div className="col-md-6">
                    <label
                      htmlFor="form-productImage/thumbnail"
                      className="form-label"
                    >
                      Instriction Video
                    </label>
                    <input
                      placeholder="Video Link here"
                      type="text"
                      value={videoLink}
                      className="form-control"
                      name="videoUrl"
                      onChange={(e) => setVideoLink(e.target.value)}
                    />
                  </div>
                  {/* <div className="col-md-6">
                    <label htmlFor="form-product/vendorprice" className="form-label">
                      Add Rating
                    </label>
                    <div className="input-group input-group--sa-slug">
                      <input
                        type="number"
                        name="add_review"
                        className="form-control"
                        id="form-product/add_review"
                        aria-describedby="form-product/add_review-addon form-product/add_review-help"
                        min={0}
                        max={5}
                        // maxLength={5}
                        // value={details.vendorPrice}
                        // onChange={handleDetails}
                        required
                      />
                    </div>
                  </div> */}
                  <div className="col-md-6">
                    <label
                      htmlFor="form-productImage/type"
                      className="form-label"
                    >
                      Delivery Type
                    </label>
                    <Select
                      // mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Select Delivery Type"
                      onChange={handleDelivaryType}
                      options={deliveryTypes}
                      className="p-0 mb-4"
                      required
                      value={details?.deliveryType}
                    />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="decription" className="form-label">
                      Description
                    </label>
                    <SunEditor
                      setOptions={options}
                      setContents={value}
                      onChange={(content) => setDescription(content)}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <input
                    type="submit"
                    className="btn btn-outline-primary btn-sm mb-0 px-5"
                    value="Add Product"
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

export default AddProducts;
