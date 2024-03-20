import React from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <footer
        className="footer text-center text-lg-start text-dark"
        style={{ backgroundColor: "#ECEFF1" }}
      >
        {/* Section: Social media */}
        <section
          className="d-flex justify-content-between p-4 text-white"
          style={{ backgroundColor: "#31363F" }}
        >
          {/* Left */}
          <div className="me-5">
            <span>Get connected with us on social networks</span>
          </div>
          {/* Left */}
          {/* Right */}
          <div>
            <Link to="/" className="text-white me-4">
              <i className="fab fa-facebook-f" />
            </Link>
            <Link to="/" className="text-white me-4">
              <i className="fab fa-twitter" />
            </Link>
            <Link to="/" className="text-white me-4">
              <i className="fab fa-google" />
            </Link>
            <Link to="/" className="text-white me-4">
              <i className="fab fa-instagram" />
            </Link>
            <Link to="/" className="text-white me-4">
              <i className="fab fa-linkedin" />
            </Link>
            <Link to="/" className="text-white me-4">
              <i className="fab fa-github" />
            </Link>
          </div>
          {/* Right */}
        </section>
        {/* Section: Social media */}
        {/* Section: Links  */}
        <section>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-6 col-lg-6 col-xl-6 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">
                  Stormscience Nutration
                </h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{
                    width: 60,
                    backgroundColor: "#7c4dff",
                    height: 2,
                  }}
                />
                <p
                  style={{
                    textAlign: "justify",
                    textJustify: "inter-word",
                  }}
                >
                  Our company is passionate about providing top-notch
                  supplements tailored for gym enthusiasts and fitness
                  enthusiasts. We understand the importance of quality nutrition
                  in achieving fitness goals, which is why we offer a range of
                  supplements specifically designed to support muscle growth,
                  recovery, and performance. From high-quality protein powders
                  to advanced creatine formulas, our products are formulated
                  using the latest scientific research and the finest
                  ingredients. Whether you're looking to build lean muscle,
                  improve strength, or enhance endurance, our supplements are
                  here to help you reach your fitness potential. Elevate your
                  workouts and achieve your fitness goals with our premium
                  gym-focused supplements.
                </p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                />
                <p>
                  <a
                    href="#"
                    onClick={() => navigate("/user")}
                    className="text-dark"
                  >
                    Your Account
                  </a>
                </p>
                <p>
                  <a
                    href="#"
                    onClick={() => navigate("/refundpolicy")}
                    className="text-dark"
                  >
                    Refund Policy
                  </a>
                </p>
                <p>
                  <a
                    href="#"
                    onClick={() => navigate("/returnpolicy")}
                    className="text-dark"
                  >
                    Return Ploicy
                  </a>
                </p>
                <p>
                  <a
                    href="#"
                    onClick={() => navigate("/shippingpolicy")}
                    className="text-dark"
                  >
                    Shipping Policy
                  </a>
                </p>
                <p>
                  <a
                    href="#"
                    onClick={() => navigate("/terms-and-conditions")}
                    className="text-dark"
                  >
                    Terms And Conditions
                  </a>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                />
                <p>
                  <i className="fas fa-home mr-3" /> Karimganj, Assam, India,
                  788710
                </p>
                <p>
                  <i className="fas fa-envelope mr-3" />{" "}
                  admin@stormsciencenutrition.in
                </p>
                <p>
                  <i className="fas fa-phone mr-3" /> +91 8136 048 529
                </p>
              </div>
            </div>
          </div>
        </section>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          Copyright © 2024 All rights reserved&nbsp;
          <a className="text-dark" href="https://stormsciencenutrition.in/">
            Stormsciencenutrition
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
