import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/gamla/logo-gw-wbg.png";

const Sidebar = () => {
  // NAVBAR TOGGLING STATE
  const [navToggler, setNavToggler] = useState();
  // SIDEBAR MENUS STATE

  useEffect(() => {
    setNavToggler({
      ...navToggler,
      iconSidenav: document.getElementById("iconSidenav"),
      body: document.querySelector(".g-sidenav-show"),
      className: "g-sidenav-pinned",
    });
    // fetchSidebar();
  }, []);

  // SIDEBAR TOGGLING METHOD
  function toggleSidenav() {
    if (navToggler?.body?.classList?.contains(navToggler?.className)) {
      navToggler?.body?.classList?.remove(navToggler?.className);
    } else {
      navToggler?.body?.classList?.add(navToggler?.className);
      navToggler?.iconSidenav?.classList?.remove("d-none");
    }
  }

  return (
    <React.Fragment>
      <aside
        className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 "
        id="sidenav-main"
      >
        <div className="sidenav-header">
          <i
            className="fas fa-times p-3  cursor-pointer text-white position-absolute end-0 top-0 d-xl-none"
            aria-hidden="true"
            id="iconSidenav"
            onClick={toggleSidenav}
          ></i>
          <Link className="navbar-brand m-0 text-center" to="/dashboard">
            <div className="w-100">
              <img src={logo} className="w-50 object-fit-cover" alt="logo" />
            </div>
            <br></br>
            <h5 className="font-weight-bold text-white text-center">
              Admin Panel
            </h5>
          </Link>
        </div>
        <hr className="horizontal dark mt-0" />
        <div
          className="collapse navbar-collapse  w-auto "
          id="sidenav-collapse-main"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link  " to="/dashboard">
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="fa fa-home"></i>
                </div>
                <span className="nav-link-text ms-1">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#application"
                className="nav-link collapsed"
                aria-controls="application"
                role="button"
                aria-expanded="false"
              >
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                  <i className="fa fa-desktop"></i>
                </div>
                <span className="nav-link-text ms-1">Application</span>
              </a>
              <div className="collapse" id="application">
                <ul className="nav ms-4 ps-3">
                  <li className="nav-item">
                    <a
                      data-bs-toggle="collapse"
                      href="#notverifieduser"
                      className="nav-link collapsed"
                      aria-controls="notverifieduser"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-text">
                        Vendors (Not Verified)
                      </span>
                    </a>
                    <div className="collapse" id="notverifieduser">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/notverifieduser">
                            <span className="sidenav-mini-icon"> UL </span>
                            <span className="sidenav-normal"> List </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-toggle="collapse"
                      href="#orders"
                      className="nav-link collapsed"
                      aria-controls="orders"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-text">Orders</span>
                    </a>
                    <div className="collapse" id="orders">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/orders">
                            <span className="sidenav-mini-icon"> UL </span>
                            <span className="sidenav-normal">Orders List</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-toggle="collapse"
                      href="#user"
                      className="nav-link collapsed"
                      aria-controls="user"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-text">Users</span>
                    </a>
                    <div className="collapse" id="user">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/vendors">
                            <span className="sidenav-mini-icon"> VL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Vendors List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/assistants">
                            <span className="sidenav-mini-icon"> AL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Veritical Head List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/users/user">
                            <span className="sidenav-mini-icon"> AU </span>
                            <span className="sidenav-normal">
                              {" "}
                              Add Verical Head <br />
                              /Vendor{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-toggle="collapse"
                      href="#customer"
                      className="nav-link collapsed"
                      aria-controls="customer"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-text">Customers</span>
                    </a>
                    <div className="collapse" id="customer">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/customers">
                            <span className="sidenav-mini-icon"> CL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Customers List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/customers/customer">
                            <span className="sidenav-mini-icon"> AC </span>
                            <span className="sidenav-normal">
                              {" "}
                              Add Customers{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-toggle="collapse"
                      href="#segment"
                      className="nav-link collapsed"
                      aria-controls="segment"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-text">Segment</span>
                    </a>
                    <div className="collapse" id="segment">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/segments">
                            <span className="sidenav-mini-icon"> SL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Segments List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/segments/segment">
                            <span className="sidenav-mini-icon"> AU </span>
                            <span className="sidenav-normal">
                              {" "}
                              Add Segment{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-toggle="collapse"
                      href="#category"
                      className="nav-link collapsed"
                      aria-controls="category"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-text">Category</span>
                    </a>
                    <div className="collapse" id="category">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/categories">
                            <span className="sidenav-mini-icon"> CL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Category List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link className="nav-link" to="/categories/category">
                            <span className="sidenav-mini-icon"> AC </span>
                            <span className="sidenav-normal">
                              {" "}
                              Add Category{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-toggle="collapse"
                      href="#subcategory"
                      className="nav-link collapsed"
                      aria-controls="subcategory"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-text">Sub-Category</span>
                    </a>
                    <div className="collapse" id="subcategory">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/subcategories">
                            <span className="sidenav-mini-icon"> CL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Sub-Category List{" "}
                            </span>
                          </Link>
                        </li>
                        {/* <li className="nav-item ">
                          <Link
                            className="nav-link"
                            to="/categories/category"
                          >
                            <span className="sidenav-mini-icon"> AC </span>
                            <span className="sidenav-normal">
                              {" "}
                              Add Category{" "}
                            </span>
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                  </li>

                  <li className="nav-item">
                    <a
                      data-bs-toggle="collapse"
                      href="#filter"
                      className="nav-link collapsed"
                      aria-controls="filter"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-text">Filter</span>
                    </a>
                    <div className="collapse" id="filter">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/filters">
                            <span className="sidenav-mini-icon"> CL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Filter List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link className="nav-link" to="/filters/filter">
                            <span className="sidenav-mini-icon"> AF </span>
                            <span className="sidenav-normal"> Add Filter </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="nav-item ">
                    <Link className="nav-link" to="/sorting">
                      <span className="sidenav-mini-icon"> ST </span>
                      <span className="sidenav-normal"> Sorting </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link" to="/contactus">
                      <span className="sidenav-mini-icon"> ST </span>
                      <span className="sidenav-normal"> Contact List </span>
                    </Link>
                  </li>

                  {/*                   
                  <li className="nav-item ">
                    <Link className="nav-link" to="/bet-history">
                      <span className="sidenav-mini-icon"> BH </span>
                      <span className="sidenav-normal"> Bet History </span>
                    </Link>
                  </li> */}
                  {/* <li className="nav-item ">
                    <Link className="nav-link" to="/customers">
                      <span className="sidenav-mini-icon"> Cu </span>
                      <span className="sidenav-normal"> Customers </span>
                    </Link>
                  </li> */}
                  {/* <li className="nav-item ">
                    <Link className="nav-link" to="/orders">
                      <span className="sidenav-mini-icon"> O </span>
                      <span className="sidenav-normal"> Orders </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link" to="/clear-doubts">
                      <span className="sidenav-mini-icon"> CD </span>
                      <span className="sidenav-normal"> Clear Doubts </span>
                    </Link>
                  </li> */}
                </ul>
              </div>
            </li>
            <li className="nav-item">
              {/* <a
                data-bs-toggle="collapse"
                href="#pages"
                className="nav-link collapsed"
                aria-controls="pages"
                role="button"
                aria-expanded="false"
              >
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                  <i className="fa fa-file"></i>
                </div>
                <span className="nav-link-text ms-1">Pages</span>
              </a> */}
              <div className="collapse" id="pages">
                <ul className="nav ms-4 ps-3">
                  {/* <li className="nav-item ">
                    <Link className="nav-link  " to="/notification">
                      <span className="sidenav-mini-icon"> N </span>
                      <span className="sidenav-normal"> Notifications </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link  " to="/faq">
                      <span className="sidenav-mini-icon"> FAQ </span>
                      <span className="sidenav-normal"> FAQs </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link  " to="/testimonials">
                      <span className="sidenav-mini-icon"> T </span>
                      <span className="sidenav-normal"> Testimonials </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link  " to="/casestudy">
                      <span className="sidenav-mini-icon"> C </span>
                      <span className="sidenav-normal"> Case Study </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link  " to="/skinocare-journey">
                      <span className="sidenav-mini-icon"> SJ </span>
                      <span className="sidenav-normal">
                        {" "}
                        Skin O Care Journey{" "}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className="nav-link  " to="/skin&hair">
                      <span className="sidenav-mini-icon"> SH </span>
                      <span className="sidenav-normal"> Skin & Hair </span>
                    </Link>
                  </li> */}
                  {/* <li className="nav-item ">
                    <Link className="nav-link  " to="/privacy-policy">
                      <span className="sidenav-mini-icon"> T </span>
                      <span className="sidenav-normal"> Privacy Policy </span>
                    </Link>
                  </li> */}
                  {/* <li className="nav-item ">
                    <Link className="nav-link  " to="/refund-policy">
                      <span className="sidenav-mini-icon"> T </span>
                      <span className="sidenav-normal"> Refund Policy </span>
                    </Link>
                  </li> */}
                  {/* <li className="nav-item ">
                    <Link className="nav-link  " to="/shipping-policy">
                      <span className="sidenav-mini-icon"> T </span>
                      <span className="sidenav-normal"> Shipping Policy </span>
                    </Link>
                  </li> */}
                  {/* <li className="nav-item ">
                    <Link className="nav-link  " to="/terms-&-conditions">
                      <span className="sidenav-mini-icon"> T </span>
                      <span className="sidenav-normal">
                        {" "}
                        Terms & Conditions{" "}
                      </span>
                    </Link>
                  </li> */}
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#ecommerce"
                className="nav-link collapsed"
                aria-controls="ecommerce"
                role="button"
                aria-expanded="false"
              >
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                  <i className="fa fa-store"></i>
                </div>
                <span className="nav-link-text ms-1">E-commerce</span>
              </a>
              <div className="collapse" id="ecommerce">
                <ul className="nav ms-4 ps-3">
                  {/* <li className="nav-item">
                    <a
                      data-bs-toggle="collapse"
                      href="#category"
                      className="nav-link collapsed"
                      aria-controls="category"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-text ms-1">Category</span>
                    </a>
                    <div className="collapse" id="category">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/categories">
                            <span className="sidenav-mini-icon"> CL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Category List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link
                            className="nav-link  "
                            to="/categories/category"
                          >
                            <span className="sidenav-mini-icon"> AC </span>
                            <span className="sidenav-normal">
                              {" "}
                              Add Category{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li> */}
                  <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#products"
                    >
                      <span className="sidenav-mini-icon"> P </span>
                      <span className="nav-link-text ms-1">Products</span>
                    </a>
                    <div className="collapse" id="products">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/products">
                            <span className="sidenav-mini-icon"> PL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Products List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link " to="/products/product">
                            <span className="sidenav-mini-icon text-xs">
                              {" "}
                              N{" "}
                            </span>
                            <span className="sidenav-normal">
                              {" "}
                              Add Product{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#premiumevent"
                    >
                      <span className="sidenav-mini-icon"> P </span>
                      <span className="nav-link-text ms-1">Premium Event</span>
                    </a>
                    <div className="collapse" id="premiumevent">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/premiumevent">
                            <span className="sidenav-mini-icon"> PL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Premium Event List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link " to="/premiumevent/create">
                            <span className="sidenav-mini-icon text-xs">
                              {" "}
                              N{" "}
                            </span>
                            <span className="sidenav-normal">
                              {" "}
                              Add Premium Event{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#gift"
                    >
                      <span className="sidenav-mini-icon"> P </span>
                      <span className="nav-link-text ms-1">Gift's</span>
                    </a>
                    <div className="collapse" id="gift">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/gifts">
                            <span className="sidenav-mini-icon"> PL </span>
                            <span className="sidenav-normal"> Gift List </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link " to="/gift/create">
                            <span className="sidenav-mini-icon text-xs">
                              {" "}
                              N{" "}
                            </span>
                            <span className="sidenav-normal"> Add gift </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#occassions"
                    >
                      <span className="sidenav-mini-icon"> P </span>
                      <span className="nav-link-text ms-1">occassions's</span>
                    </a>
                    <div className="collapse" id="occassions">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/occassions">
                            <span className="sidenav-mini-icon"> PL </span>
                            <span className="sidenav-normal">
                              {" "}
                              occassions List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link " to="/occassions/create">
                            <span className="sidenav-mini-icon text-xs">
                              {" "}
                              N{" "}
                            </span>
                            <span className="sidenav-normal">
                              {" "}
                              Add occassions{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#poojaitems"
                    >
                      <span className="sidenav-mini-icon"> P </span>
                      <span className="nav-link-text ms-1">Pooja Items</span>
                    </a>
                    <div className="collapse" id="poojaitems">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/pooja-items">
                            <span className="sidenav-mini-icon"> PI </span>
                            <span className="sidenav-normal">
                              {" "}
                              Pooja Items List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link "
                            to="/pooja-items/pooja-item"
                          >
                            <span className="sidenav-mini-icon text-xs">
                              {" "}
                              AP{" "}
                            </span>
                            <span className="sidenav-normal">
                              {" "}
                              Add Pooja Item{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#packages"
                    >
                      <span className="sidenav-mini-icon"> P </span>
                      <span className="nav-link-text ms-1">Packages</span>
                    </a>
                    <div className="collapse" id="packages">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/packages">
                            <span className="sidenav-mini-icon"> PL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Package List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link " to="/packages/package">
                            <span className="sidenav-mini-icon text-xs">
                              {" "}
                              AP{" "}
                            </span>
                            <span className="sidenav-normal">
                              {" "}
                              Add Package{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#vendors"
                    >
                      <span className="nav-link-text ms-1">
                        Vendor's Product
                      </span>
                    </a>
                    <div className="collapse" id="vendors">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/vendor-products">
                            <span className="sidenav-mini-icon"> VL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Product List{" "}
                            </span>
                          </Link>
                        </li>
                        {/* <li className="nav-item">
                          <Link className="nav-link " to="/doctors/doctor">
                            <span className="sidenav-mini-icon text-xs">
                              {" "}
                              AD{" "}
                            </span>
                            <span className="sidenav-normal"> Add Doctor </span>
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#banners"
                    >
                      <span className="nav-link-text ms-1">Banner</span>
                    </a>
                    <div className="collapse" id="banners">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/banners">
                            <span className="sidenav-mini-icon"> BL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Banners List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link " to="/banners/banner">
                            <span className="sidenav-mini-icon text-xs">
                              {" "}
                              AB{" "}
                            </span>
                            <span className="sidenav-normal"> Add Banner </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#common_discount"
                    >
                      <span className="nav-link-text ms-1">
                        Common Discount
                      </span>
                    </a>
                    <div className="collapse" id="common_discount">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/commondiscount">
                            <span className="sidenav-mini-icon"> BL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Common Discount List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link "
                            to="/commondiscount/create"
                          >
                            <span className="sidenav-mini-icon text-xs">
                              {" "}
                              AB{" "}
                            </span>
                            <span className="sidenav-normal">
                              {" "}
                              Add Common Discount{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#coupons"
                    >
                      <span className="nav-link-text ms-1">Coupons</span>
                    </a>
                    <div className="collapse" id="coupons">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/coupons">
                            <span className="sidenav-mini-icon"> CL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Coupons List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link " to="/coupons/coupon">
                            <span className="sidenav-mini-icon text-xs">
                              {" "}
                              AC{" "}
                            </span>
                            <span className="sidenav-normal"> Add Coupon </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#events"
                    >
                      <span className="nav-link-text ms-1">Events</span>
                    </a>
                    <div className="collapse" id="events">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/events">
                            <span className="sidenav-mini-icon"> EL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Events List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link " to="/events/event">
                            <span className="sidenav-mini-icon text-xs">
                              {" "}
                              AE{" "}
                            </span>
                            <span className="sidenav-normal"> Add Event </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#festivals"
                    >
                      <span className="nav-link-text ms-1">Festivals</span>
                    </a>
                    <div className="collapse" id="festivals">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/festivals">
                            <span className="sidenav-mini-icon"> FL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Festivals List{" "}
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link " to="/festivals/festival">
                            <span className="sidenav-mini-icon text-xs">
                              {" "}
                              AF{" "}
                            </span>
                            <span className="sidenav-normal">
                              {" "}
                              Add Festival{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#requestcallbacks"
                    >
                      <span className="nav-link-text ms-1">
                        Request Callbacks
                      </span>
                    </a>
                    <div className="collapse" id="requestcallbacks">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/requestcallbacks">
                            <span className="sidenav-mini-icon"> FL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Request Callbacks List{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#pages"
                    >
                      <span className="nav-link-text ms-1">Static Pages</span>
                    </a>
                    <div className="collapse" id="pages">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/pages">
                            <span className="sidenav-mini-icon"> PL </span>
                            <span className="sidenav-normal"> Pages List </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link " to="/pages/page">
                            <span className="sidenav-mini-icon text-xs">
                              {" "}
                              AP{" "}
                            </span>
                            <span className="sidenav-normal"> Add Page </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  {/* <li className="nav-item ">
                    <a
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      aria-expanded="false"
                      href="#feedbacks"
                    >
                      <span className="nav-link-text ms-1">Feedback</span>
                    </a>
                    <div className="collapse" id="feedbacks">
                      <ul className="nav ms-4 ps-3">
                        <li className="nav-item ">
                          <Link className="nav-link  " to="/feedbacks">
                            <span className="sidenav-mini-icon"> FL </span>
                            <span className="sidenav-normal">
                              {" "}
                              Feedback List{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li> */}
                </ul>
              </div>
            </li>

            {/* -------------------------------------- DOCTORS PANEL -------------------------------------- */}

            {/* <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#doctors-panel"
                className="nav-link collapsed"
                aria-controls="doctors-panel"
                role="button"
                aria-expanded="false"
              >
                <div className="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                  <i className="fa fa-desktop"></i>
                </div>
                <span className="nav-link-text ms-1">Doctors Panel</span>
              </a>
              <div className="collapse" id="doctors-panel">
                <ul className="nav ms-4 ps-3">
                  <li className="nav-item ">
                    <Link
                      className="nav-link  "
                      to="/doctors-panel/docs-designation"
                    >
                      <span className="sidenav-normal">
                        {" "}
                        Designation/Position{" "}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-toggle="collapse"
                      href="#doctors-crud"
                      className="nav-link collapsed"
                      aria-controls="doctors-crud"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-text ms-1">Doctors</span>
                    </a>
                    <div className="collapse" id="doctors-crud">
                      <ul className="nav ps-3">
                        <li className="nav-item ">
                          <Link
                            className="nav-link  "
                            to="/doctors-panel/doctors"
                          >
                            <span className="sidenav-normal"> Doctors </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link
                            className="nav-link  "
                            to="/doctors-panel/add-doctor"
                          >
                            <span className="sidenav-normal">
                              {" "}
                              Add Doctors{" "}
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a
                      data-bs-toggle="collapse"
                      href="#regimen"
                      className="nav-link collapsed"
                      aria-controls="regimen"
                      role="button"
                      aria-expanded="false"
                    >
                      <span className="nav-link-text ms-1">Regimen</span>
                    </a>
                    <div className="collapse" id="regimen">
                      <ul className="nav ps-3">
                        <li className="nav-item ">
                          <Link
                            className="nav-link  "
                            to="/doctors-panel/regimen/symptoms"
                          >
                            <span className="sidenav-normal"> Symptoms </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link
                            className="nav-link  "
                            to="/doctors-panel/regimen/kits"
                          >
                            <span className="sidenav-normal"> Kits </span>
                          </Link>
                        </li>
                        <li className="nav-item ">
                          <Link
                            className="nav-link  "
                            to="/doctors-panel/regimen/plan"
                          >
                            <span className="sidenav-normal"> Plan </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </li> */}

            {/* {menusList} */}
          </ul>
        </div>
      </aside>
    </React.Fragment>
  );
};

export default Sidebar;
