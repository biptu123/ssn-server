import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import logo from "../assets/images/logo.jpg";
import {
  CartContainer,
  ProgressBar,
  ProgressStation,
} from "./styles/Cart.styled";
import { useCart } from "../context/cart";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { toast } from "react-toastify";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const { cart, emptyCart } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.address) {
      navigate("/checkout");
    } else {
      getToken();
    }
  }, [auth?.address]);

  const handlePayment = async ({
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    order,
  }) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/payment/verification", {
        user: auth?.user?._id,
        products: cart,
        orderCreationId: order.id,
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      });
      if (response?.data?.success) {
        toast.success(response?.data?.message);
        emptyCart();
        setAuth({
          ...auth,
          address: null,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal Server Error");
    }

    setLoading(false);
  };
  const getToken = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/v1/payment/get-token`, {
        products: cart,
        amount: totalAmount,
        address: auth.address,
        user: auth.user,
      });
      if (response?.data?.success) {
        setAccessToken(response?.data?.accessToken);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }

    setLoading(false);
  };

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/v1/payment/create-payment`, {
        products: cart,
        amount: totalAmount,
        address: auth.address,
        user: auth.user,
        accessToken,
      });
      console.log(response);
      if (response?.data?.success) {
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }

    setLoading(false);
  };

  // Calculate total price of the order
  const getTotalAmount = () => {
    let totalAmount = 0;
    cart.map((product) => {
      totalAmount += Number(product.price) * Number(product.noOfItems);
    });
    return totalAmount;
  };

  useEffect(() => {
    setTotalAmount(getTotalAmount());
  }, [cart]);

  return (
    <Layout title="Payment | SSN">
      <Loader loading={loading} />
      <CartContainer>
        <ProgressBar>
          <ProgressStation name="Cart">1</ProgressStation>
          <ProgressStation name="Add address">2</ProgressStation>
          <ProgressStation name="Payment" active>
            3
          </ProgressStation>
        </ProgressBar>
        <div className="container">
          <div className="row">
            {/* Shipping Details */}
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-header">
                  <b>Shipping Details</b>
                </div>
                <div className="card-body">
                  <p>
                    <b>Name:</b> {auth.address?.name}
                  </p>
                  <p>
                    <b>Address:</b> {auth.address?.street},{" "}
                    {auth.address?.locality}, {auth.address?.district},{" "}
                    {auth.address?.state}, {auth.address?.pincode}
                  </p>
                  <p>
                    <b>State:</b> {auth.address?.state}
                  </p>
                  <p>
                    <b>District:</b> {auth.address?.district}
                  </p>
                  <p>
                    <b>Email:</b> {auth.address?.email}
                  </p>
                  <p>
                    <b>Contact Number:</b> {auth.address?.phone}
                  </p>
                </div>
              </div>
            </div>
            {/* Order Summary */}
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-header">
                  <b>Order Summary</b>
                </div>
                <div className="card-body">
                  <ul className="list-group mb-3">
                    {cart.map((item, index) => (
                      <li
                        key={item._id}
                        className="list-group-item d-flex justify-content-between align-items-center border border-light"
                      >
                        {item.name}
                        <span className="p-2"> &#8377; {item.price}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mb-3">
                    <strong>Total Price:</strong>
                    <span className="fs-5 ms-3 ">&#8377; {totalAmount}</span>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-dark"
                    onClick={handleCheckout}
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Pay and Place Order"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CartContainer>
    </Layout>
  );
};

export default Payment;
