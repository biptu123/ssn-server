import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const Loader = () => {
  return (
    <>
      <div
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        class="wheel-and-hamster"
      >
        <div class="wheel"></div>
        <div class="hamster">
          <div class="hamster__body">
            <div class="hamster__head">
              <div class="hamster__ear"></div>
              <div class="hamster__eye"></div>
              <div class="hamster__nose"></div>
            </div>
            <div class="hamster__limb hamster__limb--fr"></div>
            <div class="hamster__limb hamster__limb--fl"></div>
            <div class="hamster__limb hamster__limb--br"></div>
            <div class="hamster__limb hamster__limb--bl"></div>
            <div class="hamster__tail"></div>
          </div>
        </div>
        <div class="spoke"></div>
      </div>
    </>
  );
};
const NotFound = () => {
  return (
    <>
      <section className="not-found">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="error-template">
                <h1>Oops!</h1>
                <h2>404 Not Found</h2>
                <div class="error-details">
                  Sorry, an error has occured, Requested page not found!
                </div>
                <div class="error-actions">
                  <Link to="/" class="btn btn-secondary btn-lg">
                    <span class="glyphicon glyphicon-home"></span>
                    Take Me Home
                  </Link>
                  <Link to="/contact" class="btn btn-outline-secondary btn-lg">
                    <span class="glyphicon glyphicon-envelope"></span> Contact
                    Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Loader />
        </div>
      </section>
    </>
  );
};

export default NotFound;
