import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DeleteItem } from "../../Apis/Setters/DeleteItem";
import Datatable from "../../Components/DataTableComponent/Datatable";
import useSession, { deleteSession } from "../../hooks/session";
import { Select, Tag } from "antd";
import { AddData } from "../../Apis/Setters/AddData";
import { EditData } from "../../Apis/Setters/EditData";
import { GetData } from "../../Apis/Getters/GetData";
import { DeleteData } from "../../Apis/Setters/DeleteData";
import FileUpload from "../../Apis/Setters/FileUpload";

const Kits = () => {
  // USING CUSTOM SESSION HOOK
  const [setSession, getSession] = useSession();
  // GETTING AUTH TOKEN FROM SESSION
  const token = getSession("authorization");

  const [productName, setProductName] = useState([])

  // ADD DATA STATE
  const [addData, setAddData] = useState({
    name: "",
    price: "",
    mrp: "",
    symtom: [],
    products: [],
    type: "",
    instruction: [],
    isActive: "true",

  });

  // when to use list
  let whenToUse = [
    { value: '7', label: 'Once a day' },
    { value: '7/2', label: 'Twice a day' },
    { value: '1', label: 'Once a week' },
    { value: '2', label: 'Two times a week' },
    { value: '3', label: 'Three times a week' },
  ]

  const [productId, setProductId] = useState([])
  const [addproductsList, setAddProductsList] = useState([]);

  // add 
  const [addDataProduct, setAddDataProduct] = useState({
    productId: "",
    howToUse: "",
    whenToUse: "",
    morning_night: [],
    image: "",
    step: "1"
  })

  const handleChange1 = (value) => {
    const updatedDataProduct = { ...addDataProduct };
    updatedDataProduct.morning_night = value;
    setAddDataProduct(updatedDataProduct);
  };

  // update
  const [upDateDataProduct, setUpDateAddDataProduct] = useState({
    productId: "",
    howToUse: "",
    whenToUse: ""
  })

  // ADD
  const addProductOnchange = (e) => {
    const { name, value } = e.target;
    setAddDataProduct(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAddDataProduct(prevState => ({
        ...prevState,
        image: reader.result
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };


  // UPDATE
  const updateProductOnchange = (e) => {
    const { name, value } = e.target;
    setUpDateAddDataProduct(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const addProduct1 = () => {
    if (addDataProduct.productId !== '') {
      // Add the productId to the products array in addData
      setAddData(prevData => ({
        ...prevData,
        products: [...prevData.products, addDataProduct.productId],
        instruction: [...prevData.instruction, addDataProduct] // Append the new product data
      }));

      setAddProductsList(prevList => [...prevList, addDataProduct]);

      setAddDataProduct({
        productId: "",
        howToUse: "",
        whenToUse: "",
        morning_night: [],
        image: "",
        step: ""
      });

    } else {
      alert('Please select a product');
    }
  };

  const deleteProduct = (index) => {
    const newList = [...addproductsList];
    newList.splice(index, 1);
    setAddProductsList(newList);
  };

  const editProduct = (index) => {
    const productToEdit = addproductsList[index];
    setAddDataProduct(productToEdit);
    deleteProduct(index); // Remove the product from the list before editing
  };

  // ALERT STATUS & MESSAGE STATE
  const [alert, setAlert] = useState({
    errStatus: false,
    successStatus: false,
    errMessage: "",
    successMessage: "",
  });

  // LISTING DATA STATE
  const [list, setList] = useState([]);
  // SYMPTOMS LISTING DATA STATE
  const [symptomsList, setSymptomsList] = useState([]);
  // PRODUCTS LISTING DATA STATE
  const [productsList, setProductsList] = useState([]);

  const [productlist, setProductList] = useState({});

  const [productPrescription, setProductPrescription] = useState({})

  // update
  const [productPrescription1, setProductPrescription1] = useState({})

  const [instruction, setInstruction] = useState({})

  // update
  const [instruction1, setInstruction1] = useState({})
  const [howToUse, setHowToUse] = useState({})


  const temp12 = Object.entries(instruction)?.map(elem => {
    const [whenToUse] = elem;
    return { whenToUse }
  })

  // update
  const temp123 = Object.entries(instruction1)?.map(elem => {
    const [whenToUse] = elem;
    return { whenToUse }
  })

  //CONVERTING 
  const temp = Object.entries(productPrescription)?.map(elem => {
    const [productId, prescription, whenToUse] = elem;
    return { productId, prescription, whenToUse }
  })

  // update
  const tem = Object.entries(productPrescription1)?.map(elem => {
    const [productId, prescription, whenToUse] = elem;
    return { productId, prescription, whenToUse }
  })


  const tempWithInstruction1 = tem.map((item, index) => {
    return {
      ...item,
      whenToUse: temp123[index]?.whenToUse
    };
  });

  // add data
  const tempWithInstruction = temp.map((item, index) => {
    return {
      ...item,
      whenToUse: temp12[index]?.whenToUse
    };
  });

  // CHANGE CUSTOMER POPUP STATE
  const [contentStatus, setContentStatus] = useState(false);
  // CUSTOMER POPUP DETAILS STATE
  const [contentDetails, setContentDetails] = useState({
    name: "",
    price: "",
    mrp: "",
    symtom: [],
    type: "",
    products: [],
    instruction: [],
    // isActive: "true",
  });

  // MODAL IMAGE STATE
  const [modalImg, setModalImg] = useState('');

  useEffect(() => {
    GetData({ url: "kit", token: token })
      .then((res) => {
        setList(res.data.data.kitList);
      })
      .catch((error) => {
        console.log(error);
      });
    GetData({ url: "symtom", token: token })
      .then((res) => {
        setSymptomsList(res.data.data.symtomList);
      })
      .catch((error) => {
        console.log(error);
      });
    GetData({ url: "product-list", token: token })
      .then((res) => {
        setProductsList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [alert]);

  const productList = productsList
    ?.map((elem) => ({
      label: elem?.name,
      value: elem?._id,
    }));


  const symptomList = symptomsList
    ?.map((elem) => ({
      label: elem?.name,
      value: elem?._id,
    }));

  // HANDLING ADD DATA INPUT
  const handleAddData = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const onChangehowToUse = (e) => {
    setHowToUse(prev => ({
      ...prev, [e.target.name]: e.target.value
    }))
  }


  // add 
  const onchangeItem = (name, value) => {
    setInstruction(prev => ({
      ...prev, [name]: value
    }))


    setAddData(prevState => ({
      ...prevState,
      instruction: tempWithInstruction
    }));


  }

  // update
  const onchangeItem1 = (name, value) => {
    setInstruction1(prev => ({
      ...prev, [name]: value
    }))


    setContentDetails(prevState => ({
      ...prevState,
      instruction: tempWithInstruction1
    }));


  }

  // HANDLING SYMPTOM DATA INPUT
  const handleUpdateSymptom = (value) => {
    setContentDetails((prev) => ({
      ...prev,
      symtom: value,
    }));
  };

  const handleAddSymptom = (value) => {
    setAddData((prev) => ({
      ...prev,
      symtom: value,
    }));
  };

  // HANDLING KIT TYPE DATA INPUT
  const handleAddKitType = (value) => {
    setAddData((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleUpdateKitType = (value) => {
    setContentDetails((prev) => ({
      ...prev,
      type: value,
    }));
  };


  // HANDLING PRODUCTS DATA INPUT
  const handleUpdateProduct = (value) => {
    setContentDetails((prev) => ({
      ...prev,
      products: value,
    }));


  };

  const handleSelectPrescription = (name, value, index) => {
    setProductPrescription(prev => ({
      ...prev,
      [name]: value
    }))
  };

  // update
  const handleSelectPrescription1 = (name, value, index) => {
    setContentDetails(prev => ({
      ...prev,
      [name]: value
    }))
  };


  const handleChange = (value) => {
    setProductPrescription(prev => ({
      ...prev, whenToUse: value
    }))
    setProductPrescription(value)
  };

  // const handleUpdateChange = (name ,value,  index) => {
  //   console.log(name , value, index);
  //   setContentDetails(prev => ({
  //     ...prev,
  //     instruction?.[index].[name] = value
  //   }))
  // }


  const handleUpdateChange = (name, value, index) => {
    setContentDetails(prev => {
      const updatedInstruction = [...prev.instruction]; // Create a copy of the instruction array
      updatedInstruction[index] = { ...updatedInstruction[index], [name]: value }; // Update the specific instruction object at the given index
      return { ...prev, instruction: updatedInstruction }; // Return the updated state
    });
  };

  // DESTRUCTURING DATA FOR DATA TABLE
  const data = [...list];

  // DEFINING DATA TABLE COLUMNS
  const columns = [
    {
      title: "IMAGE",
      key: "image",
      dataIndex: "image",
      render: (_, elem) => (
        <Link href="app-product.html" className="me-4">
          <div className="sa-symbol sa-symbol--shape--rounded sa-symbol--size--lg">
            <img src={elem?.image} width="40" height="40" alt="" />
          </div>
        </Link>
      ),
    },
    {
      title: "NAME",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "PRICE",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "SYMPTOM",
      key: "symtom",
      dataIndex: "symtom",
      render: (_, { symtom }) => (
        <>
          {symtom?.map((symtom) => {
            return <Tag key={symtom}>{symtom?.name}</Tag>;
          })}
        </>
      ),
    },
    {
      title: "TYPE",
      key: "type",
      dataIndex: "type",
    },
    {
      title: "PRODUCTS",
      dataIndex: "products",
      key: "products",
      render: (_, { products }) => (
        <>
          {products?.map((products) => {
            return <Tag key={products}>{products?.name}</Tag>;
          })}
        </>
      ),
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
                setContentStatus(!contentStatus);
                setModalImg(elem?.image);
                setContentDetails({
                  kitId: elem?._id,
                  name: elem?.name,
                  mrp: elem?.mrp,
                  price: elem?.price,
                  symtom: elem?.symtom.map((symtom) => {
                    return symtom?._id
                  }),
                  type: elem?.type,
                  products: elem?.products.map((value) => {
                    return value?._id
                  }),
                  instruction: elem?.instruction.map((value) => {
                    return value
                  })
                });
              }}
            >
              <Link className="dropdown-item border-radius-md" to="#">
                Update
              </Link>
            </li>
            <li
              onClick={() => {
                deleteItem(elem?._id);
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

  console.log("update", contentDetails);

  // API CALL TO ADD AN ITEM
  const addItem = (e) => {
    e.preventDefault();
    const credentials = { ...addData };
    AddData({ url: "kit", cred: credentials, token: token })
      .then((res) => {
        if (res.data.status) {
          window.scrollTo(0, 0);
          setAlert({
            successStatus: true,
            errStatus: false,
            successMessage: res?.data?.msg,
            errMessage: "",
          })
          setTimeout(() => {
            setAlert({
              errStatus: false,
              successStatus: false,
              errMessage: "",
              successMessage: "",
            })
          }, 2000)
        } else {
          window.scrollTo(0, 0);
          setAlert({
            errStatus: true,
            successStatus: false,
            errMessage: res?.data?.msg,
            successMessage: "",
          })
          setTimeout(() => {
            setAlert({
              errStatus: false,
              successStatus: false,
              errMessage: "",
              successMessage: "",
            })
          }, 3000);
        }
        setAddData({
          name: "",
          price: "",
          symtom: [],
          type: "",
          products: [],
        })
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

  // API CALL TO UPDATE AN ITEM
  const updateItem = (e) => {
    e.preventDefault();
    const credentials = { ...contentDetails };

    EditData({ url: "kit", cred: credentials, token: token })
      .then((res) => {
        if (res.data.status) {
          window.scrollTo(0, 0);
          setAlert({
            successStatus: true,
            errStatus: false,
            successMessage: res?.data?.msg,
            errMessage: "",
          })
          setTimeout(() => {
            setAlert({
              errStatus: false,
              successStatus: false,
              errMessage: "",
              successMessage: "",
            })
          }, 2000)
        } else {
          window.scrollTo(0, 0);
          setAlert({
            errStatus: true,
            successStatus: false,
            errMessage: res?.data?.msg,
            successMessage: "",
          })
          setTimeout(() => {
            setAlert({
              errStatus: false,
              successStatus: false,
              errMessage: "",
              successMessage: "",
            })
          }, 3000);
        }
        setContentStatus(!contentStatus);
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

  // API CALL TO DELETE AN ITEM
  const deleteItem = (id) => {
    DeleteData({ url: `kit/${id}`, token: token })
      .then((res) => {
        if (res.data.status) {
          window.scrollTo(0, 0);
          setAlert({
            successStatus: true,
            errStatus: false,
            successMessage: res?.data?.msg,
            errMessage: "",
          })
          setTimeout(() => {
            setAlert({
              errStatus: false,
              successStatus: false,
              errMessage: "",
              successMessage: "",
            })
          }, 2000)
        } else {
          window.scrollTo(0, 0);
          setAlert({
            errStatus: true,
            successStatus: false,
            errMessage: res?.data?.msg,
            successMessage: "",
          })
          setTimeout(() => {
            setAlert({
              errStatus: false,
              successStatus: false,
              errMessage: "",
              successMessage: "",
            })
          }, 3000);
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

  // FILE UPLOAD METHOD(API CALL)
  const fileUpload = async (e) => {
    FileUpload({ file: e.target.files[0], path: "products", type: "Product" })
      .then((res) => {
        if (res.data.status) {
          setModalImg(URL.createObjectURL(e.target.files[0]));
          setAddData({
            ...addData,
            image: res?.data?.data?.uploadImage?._id,
          });
          setContentDetails({
            ...contentDetails,
            image: res?.data?.data?.uploadImage?._id,
          });
        }
      }).catch((err) => {
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


  // product img upload
  const fileUpload1 = async (e) => {
    FileUpload({ file: e.target.files[0], path: "products", type: "Product" })
      .then((res) => {
        if (res.data.status) {
          setModalImg(URL.createObjectURL(e.target.files[0]));

          setAddDataProduct(prevState => ({
            ...prevState,
            image: res?.data?.data?.uploadImage?._id
          }));

          // setAddDataProduct({
          //   ...addData,
          //   image: res?.data?.data?.uploadImage?._id,
          // });
          setContentDetails({
            ...contentDetails,
            image: res?.data?.data?.uploadImage?._id,
          });
        }
      }).catch((err) => {
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

            {/* ADD DATA FORM */}
            <div className="g-4">
              <div className="card mb-3">
                <div className="card-body p-md-5">
                  <h4>Add Kit</h4>
                  <form onSubmit={addItem}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label htmlFor="form-kit/name" className="form-label">
                            Kit Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            id="form-kit/name"
                            value={addData?.name}
                            onChange={handleAddData}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label htmlFor="form-plan/image" className="form-label">Image</label>
                          <input type="file" accept="image/*" name="image" className="form-control" id="form-testimonials/image" onChange={fileUpload} required />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label
                            htmlFor="form-kit/price"
                            className="form-label"
                          >
                            Price
                          </label>
                          <input
                            type="number"
                            name="price"
                            className="form-control"
                            id="form-kit/price"
                            value={addData?.price}
                            onChange={handleAddData}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-4">
                          <label
                            htmlFor="form-kit/mrp"
                            className="form-label"
                          >
                            MRP
                          </label>
                          <input
                            type="number"
                            name="mrp"
                            className="form-control"
                            id="form-kit/mrp"
                            value={addData?.mrp}
                            onChange={handleAddData}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <label
                          htmlFor="form-kit/symptom"
                          className="form-label"
                        >
                          Kit Symptom
                        </label>
                        <Select
                          allowClear
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="Select Symptom"
                          onChange={handleAddSymptom}
                          options={symptomList}
                          className="p-0"
                          value={addData?.symtom}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-4">
                        <label htmlFor="form-kit/type" className="form-label">
                          Kit Type
                        </label>
                        <Select
                          allowClear
                          size={"large"}
                          style={{ width: "100%" }}
                          placeholder="Select Type"
                          onChange={handleAddKitType}
                          options={[
                            {
                              label: "Advance",
                              value: "advance",
                            },
                            {
                              label: "Pro",
                              value: "pro",
                            },
                            {
                              label: "Assist",
                              value: "assist",
                            },
                          ]}
                          className="p-0"
                          value={addData?.type}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="form-kit/products"
                          className="form-label"
                        >
                          Kit Products
                        </label>


                        {/* <Select
                          mode="multiple"
                          allowClear
                          style={{ width: "100%" }}
                          placeholder="Select Kit Products"
                          onChange={handleAddProduct}
                          options={productList}
                          className="p-0"
                          value={addData?.products?.product}

                          required
                        /> */}
                      </div>



                      {/* {addData?.products ? (
                        addData?.products?.map((value, index) => (
                          <div className="row" key={index}>
                            {console.log('getting name to show', productName?.[index]?.label)}
                            <div className="col-md-4">
                              <div className="mb-4">
                                <label htmlFor={`form-kit/product`} className="form-label">
                                  Product
                                </label>
                                <input
                                  type="text"
                                  className="form-control d-none"
                                  id={`form-kit/product`}
                                  value={value}
                                  required
                                />
                                <input
                                  type="text"
                                  className="form-control"
                                  id={`form-kit/product`}
                                  value={productName?.[index]?.label}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-4">
                                <label htmlFor={`form-kit/prescription`} className="form-label">
                                  How To Use
                                </label>
                                <input
                                  type="text"
                                  name={value}
                                  className="form-control"
                                  id={`form-kit/prescription`}
                                  //value={value}
                                  onChange={(e) => handleSelectPrescription(e.target.name, e.target.value, index)}
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="mb-4">
                                <label htmlFor={`form-kit/whenToUse`} className="form-label">
                                  when to use
                                </label>
                                <br />
                                <Select
                                  defaultValue="select"
                                  style={{ width: "100%" }}
                                  name="whenToUse"
                                  onChange={onchangeItem}
                                  options={[
                                    { value: '7', label: 'Once a day' },
                                    { value: '7/2', label: 'Twice a day' },
                                    { value: '7/3', label: 'Thrice day' },
                                    { value: '1', label: 'Once a week' },
                                    { value: '2', label: 'Two times a week' },
                                    { value: '3', label: 'Three times a week' },
                                    { value: '4', label: 'Four times a week' },
                                    { value: '5', label: 'Five times a week' },
                                    { value: '6', label: 'Six times a week' },

                                  ]}
                                />

                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <></>
                      )} */}





                      <div>
                        <h6>Products List</h6>
                        <div>
                          {addproductsList.map((product, index) => (
                            <div key={index}>

                              <div className="row">
                                <div className="col-md-4">
                                  <label htmlFor="formGroupExampleInput" className="form-label">Product</label>
                                  <select disabled className="form-select" aria-label="Default select example" name="productId" onChange={addProductOnchange} value={addDataProduct.productId}>
                                    <option>{productsList.find(item => item._id === product.productId)?.name}</option>

                                  </select>
                                </div>
                                <div className="col-md-4 ">
                                  <label htmlFor="exampleFormControlTextarea1" className="form-label">How To Use</label>
                                  <textarea disabled className="form-control" id="exampleFormControlTextarea1" name="howToUse" value={product.howToUse} rows="1" ></textarea>
                                </div>
                                <div className="col-md-4">
                                  <label htmlFor="formGroupExampleInput" className="form-label">When To Use</label>
                                  <select disabled className="form-select" aria-label="Default select example" name="productId" onChange={addProductOnchange} value={addDataProduct.productId}>

                                    <option>{whenToUse.find(item => item.value == product.whenToUse)?.label}</option>

                                  </select>
                                </div>

                                <div className="col-md-4 my-3">
                                  <label htmlFor="formGroupExampleInput" className="form-label">Morning/Night</label>

                                  <Select
                                    mode="multiple"
                                    disabled
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    // defaultValue={product?.}
                                    value={product?.morning_night}


                                  />

                                </div>
                                <div className="col-md-4 my-3">
                                  <label htmlFor="formGroupExampleInput" className="form-label">Image</label>
                                  <input
                                    className="form-control"
                                    type="file"
                                    disabled
                                    id="exampleFormControlTextarea1"
                                    name="image"
                                  // value={product?.image}
                                  // onChange={handleImageChange}
                                  />
                                </div>
                                <div className="col-md-1 my-3">
                                  <label htmlFor="formGroupExampleInput" className="form-label">Step</label>
                                  <select disabled className="form-select" aria-label="Default select example" name="step" onChange={addProductOnchange} >
                                    <option value="1">{product?.step}</option>
                                  </select>
                                </div>




                                <div className="col-md-3 g-2 d-flex justify-content-between align-items-end">
                                  <button className="btn btn-primary" onClick={() => editProduct(index)}>Edit</button>
                                  <button className="btn btn-primary" onClick={() => deleteProduct(index)}>Delete</button>

                                </div>
                              </div>

                            </div>
                          ))}
                        </div>
                      </div>


                      <div className="container">
                        <div className="row">
                          <div className="col-md-4">
                            <label htmlFor="formGroupExampleInput" className="form-label">Product</label>
                            <select className="form-select" aria-label="Default select example" name="productId" onChange={addProductOnchange} value={addDataProduct.productId}>
                              <option value="">Select Product</option>
                              {productsList?.map((ele, index) => (
                                <option key={index} value={ele._id}>{ele.name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-4 ">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">How To Use</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" name="howToUse" value={addDataProduct.howToUse} rows="1" onChange={addProductOnchange}></textarea>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="formGroupExampleInput2" className="form-label">When To Use</label>
                            <select className="form-select" aria-label="Default select example" name="whenToUse" onChange={addProductOnchange} value={addDataProduct.whenToUse}>
                              <option value="">Open this select menu</option>
                              {
                                whenToUse.map((ele, index) => {
                                  return (
                                    <>
                                      <option value={ele.value}>{ele.label}</option>
                                    </>
                                  )
                                })
                              }
                            </select>
                          </div>
                          <div className="col-md-4 my-3">
                            <label htmlFor="formGroupExampleInput" className="form-label">Morning/Night</label>

                            <Select
                              mode="multiple"
                              allowClear
                              style={{ width: '100%' }}
                              placeholder="Please select"
                              // defaultValue={}
                              onChange={handleChange1}
                              options={[
                                {
                                  label: 'Morning',
                                  value: 'morning',
                                },
                                {
                                  label: 'Night',
                                  value: 'night',
                                }
                              ]}
                            />
                          </div>

                          <div className="col-md-4 my-3">
                            <div className="mb-4">
                              <label htmlFor="form-plan/image" className="form-label">Image</label>
                              <input type="file" accept="image/*" name="image" className="form-control" id="form-testimonials/image" onChange={fileUpload1} required />
                            </div>
                          </div>

                          <div className="col-md-2 my-3">
                            <label htmlFor="formGroupExampleInput" className="form-label">Step</label>
                            <select className="form-select" aria-label="Default select example" name="step" onChange={addProductOnchange} >
                              <option value="1">1</option>
                              {
                                addproductsList?.map((ele, index) => {
                                  return (
                                    <>
                                      <option value={index + 2}>{index + 2}</option>
                                    </>
                                  )
                                })
                              }
                            </select>
                          </div>
                          <div className="col-md-2 g-2 d-flex justify-content-between align-items-end">
                            <span className="btn btn-primary" onClick={addProduct1}>Add product</span>
                          </div>
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

            {/* DATA LIST */}
            <div className="card">
              <div className="card-header pb-0">
                <div className="row">
                  <div className="col-lg-6 col-7">
                    <h6>Kits List</h6>
                  </div>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive">
                  {<Datatable data={data} columns={columns} />}
                </div>
              </div>
            </div>



            {/* VIEW & UPDATE DATA */}
            {contentStatus && (
              <div className="password-popup">
                <div className="rts-newsletter-popup popup">
                  <div
                    className="newsletter-close-btn"
                    onClick={() => setContentStatus(!contentStatus)}
                  >
                    <i className="fa fa-times"></i>
                  </div>
                  <div className="newsletter-inner popup-inner">
                    <h3 className="newsletter-heading">Kit</h3>
                    <form onSubmit={updateItem}>
                      <div className="input-area">
                        <label
                          htmlFor="form-product/description"
                          className="form-label"
                        >
                          Name
                        </label>
                        <div className="input-div">
                          <input
                            name="name"
                            type="text"
                            value={contentDetails.name}
                            placeholder="Name"
                            onChange={(e) =>
                              setContentDetails((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                        <label
                          htmlFor="form-product/description"
                          className="form-label"
                        >
                          Image
                        </label>
                        <div className="input-div d-flex align-items-center justify-content-center">
                          <Link href="app-product.html" className="ms-4">
                            <img src={modalImg} width="40" height="40" alt="" />
                          </Link>
                          <input name="update_image" type="file" accept="image/*" placeholder="Image" onChange={fileUpload} />
                        </div>
                        <div className="input-div">
                          <input
                            name="mrp"
                            type="number"
                            value={contentDetails.mrp}
                            placeholder="MRP"
                            onChange={(e) =>
                              setContentDetails((prev) => ({
                                ...prev,
                                mrp: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                        <div className="input-div">
                          <input
                            name="price"
                            type="number"
                            value={contentDetails.price}
                            placeholder="Price"
                            onChange={(e) =>
                              setContentDetails((prev) => ({
                                ...prev,
                                price: e.target.value,
                              }))
                            }
                            required
                          />
                        </div>
                        <Select
                          allowClear
                          mode="multiple"
                          size={"large"}
                          style={{ width: "100%" }}
                          placeholder="Select Symptom"
                          onChange={handleUpdateSymptom}
                          options={symptomList}
                          className="p-0 mb-4"
                          value={contentDetails?.symtom}
                          required
                        />
                        <Select
                          allowClear
                          size={"large"}
                          style={{ width: "100%" }}
                          placeholder="Select Type"
                          onChange={handleUpdateKitType}
                          options={[
                            {
                              label: "Advance",
                              value: "advance",
                            },
                            {
                              label: "Pro",
                              value: "pro",
                            },
                            {
                              label: "Assist",
                              value: "assist",
                            },
                          ]}
                          className="p-0 mb-4"
                          value={contentDetails?.type}
                          required
                        />

                        {/* <div>
                          <h6>Products List</h6>
                          <div>
                            {contentDetails?.instruction.map((product, index) => (
                              <div key={index}>
                                <div className="row">
                                  <div className="col-md-6">
                                    <label htmlFor="formGroupExampleInput" className="form-label">Product</label>

                                    <Select
                                      value={product?.productId}
                                      style={{
                                        width: "100%",
                                      }}
                                      name="product"
                                      onChange={(e) => handleUpdateChange(e.target.name, e.target.value, index)}
                                      options={productList}
                                    />
                                  </div>

                                  <div className="col-md-6 ">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">How To Use</label>
                                    <textarea key={index} className="form-control" id="exampleFormControlTextarea1" name="prescription" value={product?.howToUse} rows="1" onChange={(e) => handleSelectPrescription1(e.target.name, e.target.value, index)}></textarea>
                                  </div>

                                  <div className="col-md-6">
                                    <label htmlFor="formGroupExampleInput" className="form-label">When To Use</label>
                                    <div className="">

                                      <Select

                                        value={product?.whenToUse}
                                        style={{
                                          width: "100%",
                                        }}
                                        onChange={handleChange}
                                        options={[
                                          { value: '7', label: 'Once a day' },
                                          { value: '7/2', label: 'Twice a day' },
                                          { value: '1', label: 'Once a week' },
                                          { value: '2', label: 'Two times a week' },
                                          { value: '3', label: 'Three times a week' },
                                        ]}
                                      />

                                    </div>
                                  </div>

                                  <div className="col-md-6">
                                    <label htmlFor="formGroupExampleInput" className="form-label">morning/night</label>

                                    <Select
                                      mode="multiple"
                                      allowClear
                                      style={{ width: '100%' }}
                                      placeholder="Please select"
                                      value={product?.morning_night}
                                      onChange={handleChange1}
                                      options={[
                                        {
                                          label: 'Morning',
                                          value: 'morning',
                                        },
                                        {
                                          label: 'Night',
                                          value: 'night',
                                        }
                                      ]}
                                    />
                                  </div>
                                  <div className="col-md-6 my-3">
                                    <label htmlFor="formGroupExampleInput" className="form-label">Image</label>
                                    <input
                                      className="form-control"
                                      type="file"
                                      id="exampleFormControlTextarea1"
                                      name="image"
                                      onChange={handleImageChange}
                                    />
                                  </div>
                                  <div className="col-md-6 my-3">
                                    <label htmlFor="formGroupExampleInput" className="form-label">Step</label>
                                    <Select

                                      value={product?.step}
                                      style={{
                                        width: "100%",
                                      }}
                                      onChange={handleChange}
                                      options={[
                                        { value: '1', label: '1' },
                                        { value: '2', label: '2' },
                                        { value: '3', label: '3' },
                                        { value: '4', label: '4' },
                                        { value: '5', label: '5' },
                                        { value: '6', label: '6' },
                                        { value: '7', label: '7' },
                                      ]}
                                    />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div> */}
                      <div>
                        {contentDetails?.instruction.map((product, index) => (
                          <div key={index}>
                            <div className="row">
                              <div className="col-md-6">
                                <label htmlFor="formGroupExampleInput" className="form-label">Product</label>
                                <Select
                                  value={product?.productId}
                                  style={{ width: "100%" }}
                                  name="productId" // Assuming the property name is 'productId'
                                  onChange={(e) => handleUpdateChange('productId', e.target.value, index)}
                                  options={productList}
                                />
                              </div>

                              <div className="col-md-6 ">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">How To Use</label>
                                <textarea
                                  className="form-control"
                                  id="exampleFormControlTextarea1"
                                  name="prescription"
                                  value={product?.prescription}
                                  rows="1"
                                  onChange={(e) => handleUpdateChange('prescription', e.target.value, index)}
                                ></textarea>
                              </div>

                              <div className="col-md-6">
                                <label htmlFor="formGroupExampleInput" className="form-label">When To Use</label>
                                <Select
                                  value={product?.whenToUse}
                                  style={{ width: "100%" }}
                                  name="whenToUse" // Assuming the property name is 'whenToUse'
                                  onChange={(value) => handleUpdateChange('whenToUse', value, index)}
                                  options={[
                                    { value: '7', label: 'Once a day' },
                                    { value: '7/2', label: 'Twice a day' },
                                    { value: '1', label: 'Once a week' },
                                    { value: '2', label: 'Two times a week' },
                                    { value: '3', label: 'Three times a week' },
                                  ]}
                                />
                              </div>

                              <div className="col-md-6">
                                <label htmlFor="formGroupExampleInput" className="form-label">morning/night</label>
                                <Select
                                  mode="multiple"
                                  allowClear
                                  style={{ width: '100%' }}
                                  placeholder="Please select"
                                  value={product?.morning_night}
                                  onChange={(value) => handleUpdateChange('morning_night', value, index)}
                                  options={[
                                    { label: 'Morning', value: 'morning' },
                                    { label: 'Night', value: 'night' }
                                  ]}
                                />
                              </div>

                              <div className="col-md-6 my-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Image</label>
                                <input
                                  className="form-control"
                                  type="file"
                                  id="exampleFormControlTextarea1"
                                  name="image"
                                  onChange={(e) => handleImageChange(e.target.files[0], index)}
                                />
                              </div>

                              <div className="col-md-6 my-3">
                                <label htmlFor="formGroupExampleInput" className="form-label">Step</label>
                                <Select
                                  value={product?.step}
                                  style={{ width: "100%" }}
                                  name="step" // Assuming the property name is 'step'
                                  onChange={(value) => handleUpdateChange('step', value, index)}
                                  options={[
                                    { value: '1', label: '1' },
                                    { value: '2', label: '2' },
                                    { value: '3', label: '3' },
                                    { value: '4', label: '4' },
                                    { value: '5', label: '5' },
                                    { value: '6', label: '6' },
                                    { value: '7', label: '7' },
                                  ]}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                  


                  {/* <div className="container">
                          <div className="row">
                            <div className="col-md-6">
                              <label htmlFor="formGroupExampleInput" className="form-label">Product</label>
                              <select className="form-select" aria-label="Default select example" name="productId" onChange={updateProductOnchange} value={upDateDataProduct.productId}>
                                <option value="">Select Product</option>
                                {productsList?.map((ele, index) => (
                                  <option key={index} value={ele._id}>{ele.name}</option>
                                ))}
                              </select>
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="formGroupExampleInput2" className="form-label">When To Use</label>
                              <select className="form-select" aria-label="Default select example" name="whenToUse" onChange={updateProductOnchange} value={upDateDataProduct.whenToUse}>
                                <option value="">Open this select menu</option>
                                {
                                  whenToUse.map((ele, index) => {
                                    return (
                                      <>
                                        <option value={ele.value}>{ele.label}</option>
                                      </>
                                    )
                                  })
                                }
                              </select>
                            </div>

                            <div className="col my-4">
                              <label htmlFor="exampleFormControlTextarea1" className="form-label">How To Use</label>
                              <textarea className="form-control" id="exampleFormControlTextarea1" name="howToUse" value={upDateDataProduct.howToUse} rows="2" onChange={updateProductOnchange}></textarea>
                            </div>
                            <div className="col-md-3 g-2 d-flex justify-content-between align-items-end">
                              <span className="btn btn-primary" >Add product</span>

                            </div>
                          </div>

                         
                      </div> */}

                  <button type="submit" className="subscribe-btn">
                    Update
                    <i
                      className="fa fa-long-arrow-right ml--5"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
              </form>
                  </div>
        </div>
      </div>
            )}
    </div>
        </div >
      </div >
    </React.Fragment >
  );
};

export default Kits;
