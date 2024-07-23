
import Default from "../Components/SettingComponents/Default";
import EditProduct from "../Components/ProductComponents/EditProduct";
import General from "../Components/SettingComponents/General";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import SignIn from "../pages/SignIn";
import ProductsList from "../Components/ProductComponents/ProductsList";
import OrdersList from "../Components/OrderComponents/OrdersList";
import EditOrder from "../Components/OrderComponents/EditOrder";
import CustomersList from "../Components/CustomerComponents/CustomersList";
import Customer from "../Components/CustomerComponents/Customer";
import AddProducts from "../Components/ProductComponents/AddProducts";
import PrivacyPolicy from "../Components/PagesComponent/PrivacyPolicy";
import TermsConditions from "../Components/PagesComponent/TermsConditions";
import FAQ from "../Components/PagesComponent/FAQ";
import Testimonials from "../Components/PagesComponent/Testimonials";
import ShippingPolicy from "../Components/PagesComponent/ShippingPolicy";
import RefundPolicy from "../Components/PagesComponent/RefundPolicy";
import CaseStudy from "../Components/PagesComponent/CaseStudy";
import ExploreList from "../Components/ExploreComponent/ExploreList";
import EditExplore from "../Components/ExploreComponent/EditExplore";
import AddExplore from "../Components/ExploreComponent/AddExplore";
import SkinocareJourney from "../Components/PagesComponent/SkinocareJourney";
import SkinAndHair from "../Components/PagesComponent/SkinAndHair";
import FeedbackList from "../Components/FeedbackComponents/FeedbackList";
import EditFeedback from "../Components/FeedbackComponents/EditFeedback";
import ClearDoubts from "../Components/ClearDoubtsComponents/ClearDoubts";

// ----------------------------------DOCTORS PANEL COMPONENTS--------------------------------------
import Designations from "../DoctorComponents/Designation";
import Add from "../DoctorComponents/Doctors/Add";
import Edit from "../DoctorComponents/Doctors/Edit";
import List from "../DoctorComponents/Doctors/List";
import Symptoms from "../DoctorComponents/Regimen/Symptoms";
import Kits from "../DoctorComponents/Regimen/Kits";
import Plan from "../DoctorComponents/Regimen/Plan";
import Notification from "../Components/PagesComponent/Notification";

import Admin from "../Components/SettingComponents/Admin";
import NotVerifiedUsers from "../Components/NotVerifiedUserComponents/UserList"
import AddUsers from "../Components/UsersComponents/AddUsers";
import EditUsers from "../Components/UsersComponents/EditUsers";
import SegmentList from "../Components/SegmentComponents/SegmentList";
import AddSegment from "../Components/SegmentComponents/AddSegment";
import EditSegment from "../Components/SegmentComponents/EditSegment";
import ProductList from "../Components/VendorProductsComponent/ProductList";
import VerifyUsers from "../Components/NotVerifiedUserComponents/VerifyUsers";
import AddCustomers from "../Components/CustomerComponents/AddCustomer";
import VendorList from "../Components/UsersComponents/VendorList";
import AssistantList from "../Components/UsersComponents/AssistantList";
import SubCategory from "../Components/SubCategoryComponents/SubCategory";
import BannerList from "../Components/BannerComponents/BannerList";
import EditBanner from "../Components/BannerComponents/EditBanner";
import AddBanner from "../Components/BannerComponents/AddBanner";
import CouponList from "../Components/CouponComponents/CouponList";
import EditCoupon from "../Components/CouponComponents/EditCoupon";
import AddCoupon from "../Components/CouponComponents/AddCoupon";
import AddCategory from "../Components/CategoryComponents/AddCategory";
import EditCategory from "../Components/CategoryComponents/EditCategory";
import CategoriesList from "../Components/CategoryComponents/CategoriesList";
import FilterList from "../Components/FilterComponents/FilterList";
import EditFilter from "../Components/FilterComponents/EditFilter";
import AddFilter from "../Components/FilterComponents/AddFilter";
import EditVendorProduct from "../Components/VendorProductsComponent/EditVendorProduct";
import Sorting from "../Components/SortingComponents/Sorting";
import FilterCategoryList from "../Components/FilterCategoryComponents/FilterCategoryList";
import EditEvent from "../Components/EventComponents/EditEvent";
import AddEvent from "../Components/EventComponents/AddEvent";
import EventsList from "../Components/EventComponents/EventsList";
import EditPage from "../Components/StaticPageComponents/EditPage";
import AddPage from "../Components/StaticPageComponents/AddPage";
import PagesList from "../Components/StaticPageComponents/PagesList";
import EditFestival from "../Components/FestivalComponents/EditFestival";
import AddFestival from "../Components/FestivalComponents/AddFestival";
import FestivalsList from "../Components/FestivalComponents/FestivalsList";
import EditPoojaItem from "../Components/PoojaItemsComponents/EditPoojaItem";
import AddPoojaItem from "../Components/PoojaItemsComponents/AddPoojaItem";
import PoojaItemList from "../Components/PoojaItemsComponents/PoojaItemList";
import EditPackage from "../Components/PoojaPackageComponents/EditPackage";
import AddPackage from "../Components/PoojaPackageComponents/AddPackage";
import PackageList from "../Components/PoojaPackageComponents/PackageList";
import AddPoojaItems from "../Components/PoojaPackageComponents/AddPoojaItems";
import EditSorting from "../Components/SortingComponents/EditSorting";
import PremiumEvent from "../Components/PremiumEvents/PremiumEvent";
import AddPremiumEvent from "../Components/PremiumEvents/AddPremiumEvent";
import EditPremiumEvent from "../Components/PremiumEvents/EditPremiumEvent";
import CategoryDiscount from "../Components/categorydiscount/CategoryDiscount";
import AddCategoryDiscount from "../Components/categorydiscount/AddCategoryDiscount";
import EditCategoryDiscount from "../Components/categorydiscount/EditCategoryDiscount";
import RequestCallbacks from "../Components/RequestCallbacks/RequestCallbackList";
import RequestCallbackDetail from "../Components/RequestCallbacks/RequestCallbackDetail";
import GiftList from "../Components/Gifts/GiftList";
import EditGift from "../Components/Gifts/EditGift";
import AddGift from "../Components/Gifts/AddGift";
import Occassions from "../Components/occassion/occasions";
import EditOccassions from "../Components/occassion/EditOccassions";
import AddOccassions from "../Components/occassion/AddOccassions";
import ContactUs from "../Components/contactUsData/ContactUs";

export const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Orders",
    key: "orders",
    route: "/orders",
    component: <OrdersList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ClearDoubts",
    key: "cleardoubts",
    route: "/clear-doubts",
    component: <ClearDoubts />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Banners",
    key: "banners",
    route: "/banners",
    component: <BannerList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "banner",
    key: "banner",
    route: "/banners/banner/:id",
    component: <EditBanner />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AddBanners",
    key: "addbanners",
    route: "/banners/banner",
    component: <AddBanner />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Coupons",
    key: "coupons",
    route: "/coupons",
    component: <CouponList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "coupon",
    key: "coupon",
    route: "/coupons/coupon/:id",
    component: <EditCoupon />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AddCoupons",
    key: "addcoupons",
    route: "/coupons/coupon",
    component: <AddCoupon />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Feedbacks",
    key: "feedbacks",
    route: "/feedbacks",
    component: <FeedbackList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Feedback",
    key: "feedback",
    route: "/feedbacks/feedback/:id",
    component: <EditFeedback />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Explores",
    key: "explores",
    route: "/explores",
    component: <ExploreList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "explore",
    key: "explore",
    route: "/explores/explore/:id",
    component: <EditExplore />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AddExplores",
    key: "addexplores",
    route: "/explores/explore",
    component: <AddExplore />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Order",
    key: "order",
    route: "/orders/order/:id",
    component: <EditOrder />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Customers",
    key: "customers",
    route: "/customers",
    component: <CustomersList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Customer",
    key: "customer",
    route: "/customers/customer/:id",
    component: <Customer />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Testimonials",
    key: "testimonials",
    route: "/testimonials",
    component: <Testimonials />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "FAQ",
    key: "faq",
    route: "/faq",
    component: <FAQ />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Skin O Care Journey",
    key: "skinocare-journey",
    route: "/skinocare-journey",
    component: <SkinocareJourney />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Skin & Hair",
    key: "skin&hair",
    route: "/skin&hair",
    component: <SkinAndHair />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CaseStudy",
    key: "casestudy",
    route: "/casestudy",
    component: <CaseStudy />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Notification",
    key: "notification",
    route: "/notification",
    component: <Notification />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Privacy",
    key: "privacy",
    route: "/privacy-policy",
    component: <PrivacyPolicy />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "TermsConditions",
    key: "TermsConditions",
    route: "/terms-&-conditions",
    component: <TermsConditions />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "ShippingPolicy",
    key: "ShippingPolicy",
    route: "/shipping-policy",
    component: <ShippingPolicy />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "RefundPolicy",
    key: "RefundPolicy",
    route: "/refund-policy",
    component: <RefundPolicy />,
    noCollapse: true,
  },

  // ------------------------------------------DOCTORS PANEL ROUTES-----------------------------

  {
    type: "collapse",
    name: "Designations",
    key: "designations",
    route: "/doctors-panel/docs-designation",
    component: <Designations />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Doctor's List",
    key: "doctors-panel",
    route: "/doctors-panel/doctors",
    component: <List />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Add Doctor",
    key: "add-doctor",
    route: "/doctors-panel/add-doctor",
    component: <Add />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Update Doctor",
    key: "update-doctor",
    route: "/doctors-panel/update-doctor/:id",
    component: <Edit />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Symptoms",
    key: "symptoms",
    route: "/doctors-panel/regimen/symptoms",
    component: <Symptoms />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Kits",
    key: "kits",
    route: "/doctors-panel/regimen/kits",
    component: <Kits />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Plan",
    key: "plan",
    route: "/doctors-panel/regimen/plan",
    component: <Plan />,
    noCollapse: true,
  },

  // ------------------------------------------GAMLEWALA PANEL ROUTES-----------------------------
  {
    type: "collapse",
    name: "Settings",
    key: "settings",
    route: "/settings",
    component: <Settings />,
    noCollapse: true,
    collapse: [
      {
        type: "collapse",
        name: "Admin Setings",
        key: "admin",
        route: "/settings/admin",
        component: <Admin />,
        noCollapse: true,
      },
      {
        type: "collapse",
        name: "Default Settings",
        key: "defaultSettings",
        route: "/settings/*",
        component: <Default />,
        noCollapse: true,
      },
    ],
  },
  {
    type: "collapse",
    name: "NotvwerifiedUsers",
    key: "notverifiedusers",
    route: "/notverifieduser",
    component: <NotVerifiedUsers />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "NotvwerifiedUsers",
    key: "notverifiedusers",
    route: "/notverifiedusers/user/:id",
    component: <VerifyUsers />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Vendors",
    key: "vendor",
    route: "/vendors",
    component: <VendorList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Vertical Head",
    key: "assistant",
    route: "/assistants",
    component: <AssistantList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AddUsers",
    key: "adduser",
    route: "/users/user",
    component: <AddUsers />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "EditUser",
    key: "edituser",
    route: "/users/user/:id",
    component: <EditUsers />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Segments",
    key: "segments",
    route: "/segments",
    component: <SegmentList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AddSegment",
    key: "addsegment",
    route: "/segments/segment",
    component: <AddSegment />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "EditSegment",
    key: "editsegment",
    route: "/segments/segment/:id",
    component: <EditSegment />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "SubCategories",
    key: "subcategories",
    route: "/subcategories",
    component: <SubCategory />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Categories",
    key: "categories",
    route: "/categories",
    component: <CategoriesList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "AddCategory",
    key: "addcategory",
    route: "/categories/category",
    component: <AddCategory />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "EditCategory",
    key: "editcategory",
    route: "/categories/category/:id",
    component: <EditCategory />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Products",
    key: "products",
    route: "/products",
    component: <ProductsList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Product",
    key: "product",
    route: "/products/product",
    component: <AddProducts />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Product",
    key: "product",
    route: "/products/product/:id",
    component: <EditProduct />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Vendors",
    key: "vendors",
    route: "/vendor-products",
    component: <ProductList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Vendor",
    key: "vendor",
    route: "/vendor-products/vendor-product/:id",
    component: <EditVendorProduct />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Customers",
    key: "customers",
    route: "/customers",
    component: <CustomersList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Customers",
    key: "customers",
    route: "/customers/customer/:id",
    component: <Customer />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Customer",
    key: "customer",
    route: "/customers/customer",
    component: <AddCustomers />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Filters",
    key: "filters",
    route: "/filters",
    component: <FilterList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Filters",
    key: "filters",
    route: "/filters/filter/:id",
    component: <EditFilter />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Filter",
    key: "filter",
    route: "/filters/filter",
    component: <AddFilter />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Filtervalues",
    key: "filtervalues",
    route: "/filters/list/:id",
    component: <FilterCategoryList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Events",
    key: "events",
    route: "/events/event/:id",
    component: <EditEvent />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Event",
    key: "event",
    route: "/events/event",
    component: <AddEvent />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Events",
    key: "events",
    route: "/events",
    component: <EventsList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Festivals",
    key: "festivals",
    route: "/festivals/festival/:id",
    component: <EditFestival />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Festival",
    key: "festival",
    route: "/festivals/festival",
    component: <AddFestival />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Festivals",
    key: "festivals",
    route: "/festivals",
    component: <FestivalsList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Poojaitems",
    key: "poojaitems",
    route: "/pooja-items/pooja-item/:id",
    component: <EditPoojaItem />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Poojaitem",
    key: "poojaitem",
    route: "/pooja-items/pooja-item",
    component: <AddPoojaItem />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Poojaitems",
    key: "ppjaitems",
    route: "/pooja-items",
    component: <PoojaItemList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Packages",
    key: "packages",
    route: "/packages/package/:id",
    component: <EditPackage />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Package",
    key: "package",
    route: "/packages/package",
    component: <AddPackage />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Packages",
    key: "packages",
    route: "/packages",
    component: <PackageList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Packages",
    key: "packages",
    route: "/packages/elements/:id",
    component: <AddPoojaItems />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Pages",
    key: "pages",
    route: "/pages/page/:id",
    component: <EditPage />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Page",
    key: "page",
    route: "/pages/page",
    component: <AddPage />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Pages",
    key: "pagess",
    route: "/pages",
    component: <PagesList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sorting",
    key: "sorting",
    route: "/sorting",
    component: <Sorting />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sorting",
    key: "sorting",
    route: "/filter/sorting/:id",
    component: <EditSorting />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "premium event",
    key: "premium_event",
    route: "/premiumevent",
    component: <PremiumEvent />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "premium event",
    key: "premium_event",
    route: "/premiumevent/:id",
    component: <EditPremiumEvent />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "add premium event",
    key: "add_premium_event",
    route: "/premiumevent/create",
    component: <AddPremiumEvent />,
    noCollapse: true,
  },



  {
    type: "collapse",
    name: "Gifts",
    key: "gifts",
    route: "/gifts",
    component: <GiftList />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "edit gift",
    key: "edit_gift",
    route: "/gift/:id",
    component: <EditGift />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "add gift",
    key: "add_gift",
    route: "/gift/create",
    component: <AddGift />,
    noCollapse: true,
  },



  {
    type: "collapse",
    name: "Occassions",
    key: "occassions",
    route: "/occassions",
    component: <Occassions />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "edit occassions",
    key: "edit_occassions",
    route: "/occassions/:id",
    component: <EditOccassions />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "add occassions",
    key: "add_occassions",
    route: "/occassions/create",
    component: <AddOccassions />,
    noCollapse: true,
  },



  {
    type: "collapse",
    name: "contactUs",
    key: "contactUs",
    route: "/contactUs",
    component: <ContactUs />,
    noCollapse: true,
  },


  {
    type: "collapse",
    name: "Add common Descount",
    key: "add_common_discount",
    route: "/commondiscount",
    component: <CategoryDiscount />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "common event",
    key: "common_event",
    route: "/commondiscount/create",
    component: <AddCategoryDiscount />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "add common event",
    key: "add_common_event",
    route: "/commondiscount/:id",
    component: <EditCategoryDiscount />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "request callbacks",
    key: "requst_callbacks",
    route: "/requestcallbacks",
    component: <RequestCallbacks />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "request callbacks detail",
    key: "requst_callbacks detail",
    route: "/requestcallbacks/:id",
    component: <RequestCallbackDetail />,
    noCollapse: true,
  },

];

export const defaultRoute = [
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/sign-in",
    component: <SignIn />,
    noCollapse: true,
  },
];
