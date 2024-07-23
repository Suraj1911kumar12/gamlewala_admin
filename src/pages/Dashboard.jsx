import React, { useEffect, useState } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import useSession, { deleteSession } from "../hooks/session";
import { GetData } from "../Apis/Getters/GetData";
import Datatable from "../Components/DataTableComponent/Datatable";

const Dashboard = () => {
  //ORDER LIST STATE
  const [orderListData, setOrderListData] = useState([]);
  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();
  const [dashData, setDashData] = useState({
    users: '',
    orders: "",
    sales: ''
  })
  const [users, setUsers] = useState('')

  const [recentProducts, getRecentProducts] = useState([]);
  const [sellersList, setTopSellersList] = useState([]);

  const [topSelling, setTopSelling] = useState([]);


  useEffect(() => {
    let token = getSession("authorization");
    GetData({ url: "dashboard/dashboard-details-list", token: token })
      .then((res) => {
        // setRoles(res.data.data.roleList);
        setDashData({
          users: res?.data?.data?.totalUsers,
          orders: res?.data?.data?.totalOrders,
          sales: res?.data?.data?.totalAmount,
        })
        getRecentProducts(res?.data?.data?.TopSellerVendorLists)
        setTopSellersList(res?.data?.data?.TopSellingProductLists)
        setTopSelling(res?.data?.data?.TopSellingProductLists)
      })
      .catch((err) => {
        if (err?.response?.status == "401") {
          deleteSession("authorization");
          window.location.href = `${process.env.REACT_APP_BASE_URL}`
        }
      })

  }, [alert]);






  // const data = recentProducts;
  // // console.log('top rec', data);

  // const sellerData = sellersList;
  // console.log('top sed', sellerData);
  // const topProductData = [...topSelling];
  // console.log("top pr", topProductData);

  const columns = [
    {
      title: "PRODUCT NAME",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "PRICE",
      key: "price",
      dataIndex: "price",
    },
    // {
    //   title: "ORDER ID",
    //   key: "orderNo",
    //   dataIndex: "orderNo",
    //   render: (_, elem) => (
    //     <div onClick={() => { }}>
    //       <Link to={"/orders/order/" + elem?._id}>{elem?.orderNo}</Link>
    //     </div>
    //   ),
    // },
    // {
    //   title: "DATE",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   render: (_, elem) => (
    //     <span>{new Date(elem?.createdAt)?.toDateString()}</span>
    //   ),
    // },
    // {
    //   title: "PAYMENT STATUS",
    //   key: "paymentStatus",
    //   dataIndex: "paymentStatus",
    //   render: (_, elem) => (
    //     <div className=" text-left px-2 py-1">
    //       <div className=" text-left">{elem.paymentStatus == "unpaid" ?
    //         <div className="badge bg-danger">{elem.paymentStatus}</div>
    //         :
    //         <div className="badge bg-success">{elem.paymentStatus}</div>}
    //       </div>
    //     </div>
    //   ),
    // },
    // {
    //   title: "TOTAL",
    //   key: "grandTotal",
    //   dataIndex: "grandTotal",
    //   render: (_, elem) => (
    //     <span>
    //       {elem.grandTotal?.toLocaleString("en-US", {
    //         style: "currency",
    //         currency: "INR",
    //       })}
    //     </span>
    //   ),
    // },
  ];

  const sellerColumns = [
    {
      title: "NAME",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Sales",
      key: "sales",
      dataIndex: "sales",
    },
    {
      title: "REVENUE",
      key: "totalRevenue",
      dataIndex: "totalRevenue",
    },
  ];

  const topProductColumns = [
    {
      title: "PRODUCT NAME",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "PRICE",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "REVENUE",
      key: "totalRevenue",
      dataIndex: "totalRevenue",
    },
    {
      title: "Rating",
      key: "rating",
      dataIndex: "rating",
      render: (_, elem) => (
        <div className=" text-left px-2 py-1">
          {elem?.rating}
        </div>
      ),
    },
    {
      title: "STATUS",
      key: "status",
      dataIndex: "status",
      render: (_, elem) => (
        <div className=" text-left px-2 py-1">
          {/* {console.log(elem)} */}
          <div className=" text-left">{elem.status == "approved" ?
            <div className="badge bg-success">{elem.status}</div>
            :
            <div className="badge bg-danger">{elem.status}</div>}
          </div>
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
            <div className="card">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-8">
                    <div className="numbers">
                      <p className="text-sm mb-0 text-capitalize font-weight-bold">
                        Total Users
                      </p>
                      <h5 className="font-weight-bolder mb-0">
                        {dashData?.users}
                      </h5>
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i
                        className="ni ni-world text-lg opacity-10"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
            <div className="card">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-8">
                    <div className="numbers">
                      <p className="text-sm mb-0 text-capitalize font-weight-bold">
                        Total Orders
                      </p>
                      <h5 className="font-weight-bolder mb-0">
                        {dashData?.orders}
                      </h5>
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i
                        className="ni ni-paper-diploma text-lg opacity-10"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
            <div className="card">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-8">
                    <div className="numbers">
                      <p className="text-sm mb-0 text-capitalize font-weight-bold">
                        Total Sales
                      </p>
                      <h5 className="font-weight-bolder mb-0">
                        {Number(dashData?.sales)?.toFixed(2)?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })}
                      </h5>
                    </div>
                  </div>
                  <div className="col-4 text-end">
                    <div className="icon icon-shape bg-gradient-primary shadow text-center border-radius-md">
                      <i
                        className="ni ni-money-coins text-lg opacity-10"
                        aria-hidden="true"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="card mt-5 col-md-5 ms-3">
            <div className="card-header pb-0">
              <div className="row">
                <div className="col-lg-6 col-7">
                  <h6>Recent Products List</h6>
                </div>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive">
                {<Datatable data={recentProducts} columns={columns} />}
              </div>
            </div>
          </div>
          <div className="card mt-5 col-md-6 ms-5">
            <div className="card-header pb-0">
              <div className="row">
                <div className="col-lg-6 col-7">
                  <h6>Top Sellers List</h6>
                </div>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive">
                {<Datatable data={sellersList} columns={sellerColumns} />}
              </div>
            </div>
          </div>
        </div>

        <div className="card mt-5 col-md-12">
          <div className="card-header pb-0">
            <div className="row">
              <div className="col-lg-6 col-7">
                <h6>Top Selling Products</h6>
              </div>
            </div>
          </div>
          <div className="card-body px-0 pb-2">
            <div className="table-responsive">
              {<Datatable data={topSelling} columns={topProductColumns} />}
            </div>
          </div>
        </div>

        {/* <div className="row my-4">
          <div className="col-md-12 mb-md-0 mb-4">
            <div className="card">
              <div className="card-header pb-0">
                <div className="row">
                  <div className="col-12 d-flex justify-content-between">
                    <h6>Recent bets (last 10 bets)</h6>
                    <Link to="/orders">View All</Link>
                  </div>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder">
                          Bet
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder ps-2">
                          User
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder">
                          Winning Status
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder">
                          Date
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder">
                          Payment Status
                        </th>
                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder">
                          Status
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder">
                          Total
                        </th>
                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>{recentOrders}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
