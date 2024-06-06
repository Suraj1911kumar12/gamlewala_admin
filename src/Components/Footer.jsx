import React from "react";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer py-3">
        <div className="container">
          <div className="row">
            <div className="col-8 mx-auto text-center mt-1">
              <p className="mb-0 text-white">
                Copyright © {new Date().getFullYear()}<script></script> GamleWala.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
