import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import categoriesReducer from "./Apis/Getters/categories";
import customersReducer from "./Apis/Getters/customers";
import faqsReducer from "./Apis/Getters/faqs";
import ordersReducer from "./Apis/Getters/orders";
import productsReducer from "./Apis/Getters/products";
import settingsReducer from "./Apis/Getters/settings";
import testimonialsReducer from "./Apis/Getters/testimonials";

const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    faqs: faqsReducer,
    testimonials: testimonialsReducer,
    customers: customersReducer,
    orders: ordersReducer,
    settings: settingsReducer,
  },
  middleware: [thunk],
  devTools: process.env.NODE_ENV === "production" ? false : true,
});

export default store;
