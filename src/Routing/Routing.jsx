import React, { useEffect, useState } from "react";
// react-router components
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Header from "../Components/Header";
// Side Nav Component
import Sidebar from "../Components/Sidebar";
// all routes object
import { defaultRoute, routes } from "./routes";
import useSession from "../hooks/session";

const Routing = () => {

  // SESSION CUSTOM HOOK
  const [setSession, getSession] = useSession();

  // LOGIN STATUS STATE
  const [loginStatus, setLoginStatus] = useState(true);

  // updating component on login status update
  useEffect(() => {
    setLoginStatus(getSession("authorization"));
  }, [loginStatus]);

  // FETCHING AND MAPPING ALL ROUTES
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      };
      if (route.route) {
        return (
          <Route exact path={route.route} element={route.component} key={route.key} />
        );
      };

      return null;
    });

  return (
    <React.Fragment>

      {/* CONDITIONAL ROUTES */}

      {loginStatus ?
        (
          <React.Fragment>
            <div className="g-sidenav-show">
              <Router basename="/admin">
                <Sidebar />
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
                  <Header />
                  <Routes>
                    {getRoutes(routes)}
                    <Route path="/*" element={<Navigate to="/dashboard" />} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                  </Routes>
                </main>
              </Router>
            </div>
          </React.Fragment>
        )
        :
        (
          <Router basename="/admin">
            <Routes>
              {getRoutes(defaultRoute)}
              <Route path="/*" element={<Navigate to="/sign-in" />} />
              <Route path="*" element={<Navigate to="/sign-in" />} />
            </Routes>
          </Router>
        )
      }
    </React.Fragment>
  );
};

export default Routing;
