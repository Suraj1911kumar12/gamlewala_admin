import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DeleteItem } from '../../Apis/Setters/DeleteItem';
import Datatable from '../../Components/DataTableComponent/Datatable';
import useSession, { deleteSession } from '../../hooks/session';
import { Select, Tag } from 'antd';
import FileUpload from '../../Apis/Setters/FileUpload';
import { AddData } from '../../Apis/Setters/AddData';
import { EditData } from '../../Apis/Setters/EditData';
import { GetData } from '../../Apis/Getters/GetData';
import { DeleteData } from '../../Apis/Setters/DeleteData';

const Plan = () => {

    // USING CUSTOM SESSION HOOK
    const [setSession, getSession] = useSession();
    // GETTING AUTH TOKEN FROM SESSION
    const token = getSession("authorization");

    // ALERT STATUS & MESSAGE STATE
    const [alert, setAlert] = useState({
        errStatus: false,
        successStatus: false,
        errMessage: '',
        successMessage: '',
    });

    // LISTING DATA STATE
    const [list, setList] = useState([]);

    // LISTING DATA STATE
    const [planList, setPlanList] = useState([]);

    // SYMPTOMS LISTING DATA STATE
    const [symptomsList, setSymptomsList] = useState([
        {
            label: 'abc',
            value: 'abc',
        },
        {
            label: 'xyz',
            value: 'xyz',
        }
    ]);
    // ADD DATA STATE
    const [addData, setAddData] = useState({
        type: null,
        imageId: '',
        title: '',
        kitId: '',
        description: '',
    });
    // CHANGE CUSTOMER POPUP STATE
    const [contentStatus, setContentStatus] = useState(false);
    // CUSTOMER POPUP DETAILS STATE
    const [contentDetails, setContentDetails] = useState({
        planId: '',
        kitId: '',
        type: null,
        imageId: '',
        title: '',
        description: '',
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
        GetData({ url: "plans", token: token })
            .then((res) => {
                setPlanList(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [alert]);

    // HANDLING ADD DATA INPUT
    const handleAddData = (e) => {
        const { name, value } = e.target;
        setAddData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // HANDLING ADD DATA INPUT
    const handleKitAddData = (value) => {
        setAddData(prev => ({
            ...prev,
            kitId: value,
        }));
    };

    // HANDLING ADD DATA INPUT
    const handleKitUpdateData = (value) => {
        setContentDetails(prev => ({
            ...prev,
            kitId: value,
        }));
    };


    // HANDLING KIT TYPE DATA INPUT
    const handleKitAddType = (value) => {
        setAddData(prev => ({
            ...prev,
            type: value,
        }));
    };

    // HANDLING KIT TYPE DATA INPUT
    const handleKitUpdateType = (value) => {
        setContentDetails(prev => ({
            ...prev,
            type: value,
        }));
    };

    // HANDLING ADD DATA INPUT
    const handleUpdateData = (e) => {
        const { name, value } = e.target;
        setContentDetails(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // DESTRUCTURING DATA FOR DATA TABLE
    const data = [...planList];

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
            key: 'kitId',
            dataIndex: 'kitId',
            render: (_, { kitId }) => (
                <>
                  {kitId.map((kitId) => {
                    return <div key={kitId}>{kitId?.name}</div>;
                  })}
                </>
              ),
        },
        {
            title: "TYPE",
            key: 'type',
            dataIndex: 'type',
        },
        {
            title: "TITLE",
            key: 'title',
            dataIndex: 'title',
        },
        {
            title: "DESCRIPTION",
            key: 'description',
            dataIndex: 'description',
        },
        {
            title: "ACTION",
            key: "action",
            render: elem => <div className=" text-center px-2 py-1">
                <Link className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="fa fa-ellipsis-v text-secondary" aria-hidden="true"></i>
                </Link>
                <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5 border border-dark" aria-labelledby="dropdownTable" data-popper-placement="bottom-start">
                    <li onClick={() => {
                        setContentStatus(!contentStatus);
                        setModalImg(elem?.image);
                        setContentDetails({
                            planId: elem?._id,
                            kitId: elem?.kitId.map((kitId) => {
                                return kitId?._id
                              }),
                            type: elem?.type,
                            title: elem?.title,
                            description: elem?.description,
                        })
                    }}>
                        <Link className="dropdown-item border-radius-md" to='#'>Update</Link>
                    </li>
                    <li onClick={() => {
                        deleteItem(elem?._id);
                    }}>
                        <Link className="dropdown-item border-radius-md" to='#'>Delete</Link>
                    </li>
                </ul>
            </div>
        }
    ];

    // FILE UPLOAD METHOD(API CALL)
    const fileUpload = async (e) => {
        FileUpload({ file: e.target.files[0], path: "plan", type: "Plan" })
            .then((res) => {
                if (res.data.status) {
                    setModalImg(URL.createObjectURL(e.target.files[0]));
                    setAddData({
                        ...addData,
                        imageId: res?.data?.data?.uploadImage?._id,
                    });
                    setContentDetails({
                        ...contentDetails,
                        imageId: res?.data?.data?.uploadImage?._id,
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

    // API CALL TO ADD AN ITEM
    const addItem = (e) => {
        e.preventDefault();
        const credentials = { ...addData };

        AddData({ url: 'plans', cred: credentials, token: token }).then(res => {
            if(res.data.status){
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
                type: null,
                imageId: '',
                title: '',
                kitId: '',
                description: '',
            })
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

    // API CALL TO UPDATE AN ITEM
    const updateItem = (e) => {
        e.preventDefault();
        const credentials = { ...contentDetails };

        EditData({ url: 'plans', cred: credentials, token: token }).then(res => {
            if(res.data.status){
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

    // API CALL TO DELETE AN ITEM
    const deleteItem = (id) => {
        DeleteData({ url: `plans/${id}`, token: token }).then(res => {
            if(res.data.status){
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
                        {alert?.errStatus &&
                            <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">{alert?.errMessage}<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {
                                setAlert({
                                    errStatus: false,
                                    successStatus: false,
                                    errMessage: '',
                                    successMessage: '',
                                });
                            }}></button>
                            </div>
                        }

                        {/* DISPLAY SUCCESS MESSAGE */}
                        {alert?.successStatus &&
                            <div className="alert alert-success alert-dismissible fade show text-white" role="alert">{alert?.successMessage}<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {
                                setAlert({
                                    errStatus: false,
                                    successStatus: false,
                                    errMessage: '',
                                    successMessage: '',
                                });
                            }}></button>
                            </div>
                        }

                        {/* ADD DATA FORM */}
                        <div className="g-4">
                            <div className="card mb-3">
                                <div className="card-body p-md-5">
                                    <h4>Add Plan</h4>
                                    <form onSubmit={addItem}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-4">
                                                    <label htmlFor="form-plan/symptom" className="form-label">Kits </label>
                                                    <Select
                                                        allowClear
                                                        size={'large'}
                                                        name='kitId'
                                                        placeholder="Select Kit"
                                                        style={{ width: '100%' }}
                                                        onChange={handleKitAddData}
                                                        className="p-0 mb-4"
                                                        value={addData?.kitId}
                                                        required
                                                    >
                                                        {list.map((kit, index) => {
                                                            return (
                                                                <options value={kit._id}>{kit.name}</options>
                                                            );
                                                        })}
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-4">
                                                    <label htmlFor="form-plan/type" className="form-label">Kit Type</label>
                                                    <Select
                                                        allowClear
                                                        size={'large'}
                                                        name='type'
                                                        style={{ width: '100%' }}
                                                        placeholder="Select Type"
                                                        onChange={handleKitAddType}
                                                        options={[
                                                            {
                                                                label: "Advance",
                                                                value: "Advance",
                                                            },
                                                            {
                                                                label: "Pro",
                                                                value: "Pro",
                                                            },
                                                            {
                                                                label: "Assist",
                                                                value: "Assist",
                                                            },
                                                        ]}
                                                        className="p-0 mb-4"
                                                        value={addData?.type}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="mb-4">
                                                    <label htmlFor="form-plan/image" className="form-label">Image</label>
                                                    <input type="file" accept="image/*" name="image" className="form-control" id="form-testimonials/image" onChange={fileUpload} required/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-4">
                                                    <label htmlFor="form-plan/title" className="form-label">Title</label>
                                                    <input type="text" name='title' className="form-control" id="form-plan/title" value={addData?.title} onChange={handleAddData} required/>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="mb-4">
                                                    <label htmlFor="form-plan/description" className="form-label" > Description </label>
                                                    <textarea name="description" rows="5" className="form-control" id="form-plan/description" value={addData?.description} onChange={handleAddData} required></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value='Save' />
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
                                        <h6>Plans List</h6>
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
                        {contentStatus && <div className="password-popup">
                            <div className="rts-newsletter-popup popup">
                                <div className="newsletter-close-btn" onClick={() => setContentStatus(!contentStatus)}>
                                    <i className="fa fa-times"></i>
                                </div>
                                <div className="newsletter-inner popup-inner">
                                    <h3 className="newsletter-heading">Plan</h3>
                                    <form onSubmit={updateItem}>
                                        <div className="input-area">
                                            <Select
                                                allowClear
                                                size={'large'}
                                                name="kitId"
                                                style={{ width: '100%' }}
                                                placeholder="Select Kit"
                                                onChange={handleKitUpdateData}
                                                className="p-0 mb-4"
                                                value={contentDetails?.kitId}
                                                required
                                            >
                                                <option defaultValue={null}>
                                                    Select Kit
                                                </option>
                                                {list.map((kit, index) => {
                                                    return (
                                                        <options value={kit._id}>{kit.name}</options>
                                                    );
                                                })}
                                            </Select>
                                            <Select
                                                allowClear
                                                size={'large'}
                                                name="type"
                                                style={{ width: '100%' }}
                                                placeholder="Select Type"
                                                onChange={handleKitUpdateType}
                                                options={[
                                                    {
                                                        label: "Advance",
                                                        value: "Advance",
                                                    },
                                                    {
                                                        label: "Pro",
                                                        value: "Pro",
                                                    },
                                                    {
                                                        label: "Assist",
                                                        value: "Assist",
                                                    },
                                                ]}
                                                className="p-0 mb-4"
                                                value={contentDetails?.type}
                                                required
                                            />
                                            <div className="input-div d-flex align-items-center justify-content-center">
                                                <Link href="app-product.html" className="ms-4">
                                                    <img src={modalImg} width="40" height="40" alt="" />
                                                </Link>
                                                <input name="update_image" type="file" accept="image/*" placeholder="Image" onChange={fileUpload} />
                                            </div>
                                            <div className="input-div">
                                                <input name='title' type="text" value={contentDetails?.title} placeholder='Title' onChange={handleUpdateData} required/>
                                            </div>
                                            <div className="input-div">
                                                <textarea name="description" rows="5" placeholder='Description' value={contentDetails?.description} onChange={handleUpdateData} required ></textarea>
                                            </div>
                                            <button type="submit" className="subscribe-btn">Update <i className="fa fa-long-arrow-right ml--5" aria-hidden="true"></i></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Plan;