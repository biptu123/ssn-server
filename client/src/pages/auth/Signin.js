import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Loader from "../../components/Loader";
import styled from "styled-components";

const OtpInput = styled.input`
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Signin = () => {
  const [phone, setPhone] = useState("");
  const rememberRef = useRef(false);
  const [verifyForm, setVerifyForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [count, setCount] = useState(60);
  const [resend, setResend] = useState(false);

  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);

    if (count === 0) {
      setResend(true);
      return () => clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [count, navigate, location]);

  const handleChange = (index, value) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value;
    setVerificationCode(newVerificationCode);

    if (value !== "" && index === 3) {
      handleSubmit(verificationCode.join("") + value);
    }

    if (value !== "" && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = "";

    // Handle Backspace key press
    if (event.key === "Backspace" && index > 0) {
      event.preventDefault();
      inputRefs[index - 1].current.focus();
      newVerificationCode[index - 1] = "";
    }

    setVerificationCode(newVerificationCode);
  };

  const handleSubmit = async (otp) => {
    setLoading(true);
    try {
      const user = {
        phone,
        otp,
      };
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        user
      );

      setTimeout(() => {
        setLoading(false);
      }, 200);

      if (response.data.success) {
        toast.success(response.data.message);
        // After Login success
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        localStorage.removeItem("auth");
        localStorage.setItem("auth", JSON.stringify(response.data));

        setTimeout(() => {
          setVerifyForm(false);
          navigate(location.state || "/");
        }, 1000);
      } else {
        toast.error(response.data.message);
        setTimeout(() => {
          setVerifyForm(false);
          setLoading(false);
        }, 200);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      setTimeout(() => {
        setVerifyForm(false);
        setLoading(false);
      }, 200);
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();

    setLoading(true);
    const user = {
      phone,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/sendotp`,
        user
      );

      setTimeout(() => {
        setLoading(false);
      }, 200);

      if (response.data.success) {
        console.log(response.data);
        toast.success(response.data.message[0]);
        setVerifyForm(true);
        setCount(60);
        setResend(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, [verifyForm]);

  return (
    <>
      <Loader loading={loading} />

      <Layout title="Signin | SSN">
        <section className="login-form">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="img-fluid"
                  alt="Sample"
                />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                {verifyForm ? (
                  <div className="d-flex flex-column justify-content-center align-items-center container">
                    <div className="card py-5 px-3">
                      <h5 className="m-0">Mobile phone verification</h5>
                      <span className="mobile-text">
                        Enter the code we just send on your mobile phone{" "}
                        <b className="text-danger">+91 {phone}</b>
                      </span>
                      <div className="d-flex flex-row mt-5">
                        {inputRefs.map((ref, index) => (
                          <OtpInput
                            key={index}
                            type="number"
                            className="form-control"
                            value={verificationCode[index]}
                            onChange={(e) =>
                              handleChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            ref={ref}
                          />
                        ))}
                      </div>
                      {/* Checkbox */}
                    </div>
                    <div className="form-check mb-0 mt-0">
                      <button
                        type="button"
                        className="btn btn-link"
                        htmlFor="form2Example3"
                        onClick={sendOtp}
                        disabled={!resend}
                      >
                        resend otp
                      </button>
                      {count > 0 && `in ${count}`}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={sendOtp}>
                    {/* Email input */}
                    <div className="form-outline mb-4 form-floating">
                      <input
                        type="text"
                        id="phone"
                        className="form-control form-control-lg"
                        placeholder="Enter a valid phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example3">
                        Phone number
                      </label>
                    </div>

                    <div className="d-flex justify-content-between align-items-center"></div>
                    <div className="text-center text-lg-start mt-4 pt-2">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        style={{
                          paddingLeft: "2.5rem",
                          paddingRight: "2.5rem",
                        }}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Signin;
