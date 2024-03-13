import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import {
  CartContainer,
  ProgressBar,
  ProgressStation,
} from "./styles/Cart.styled";
import { Modal } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/auth";
import styled from "styled-components";
import { MdEdit } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const AddAddress = styled.button`
  width: 200px;
`;
const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setvisible] = useState(true);
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState({
    name: null,
    email: null,
    phone: null,
    pincode: null,
    state: null,
    street: null,
    district: null,
    locality: null,
  });

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const getAddresses = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/user/get-addresses`,
        {
          headers: {
            Authorization: `${auth?.token}`,
          },
        }
      );
      if (response.data.success) {
        setAddresses(response.data.addresses);
        if (response.data.addresses.length > 0) setvisible(false);
      } else {
        // toast.error(response.data.message);
      }
    } catch (error) {
      // toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const addAddress = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/user/add-address`,
        { address },
        {
          headers: {
            Authorization: `${auth?.token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getAddresses();
        setAuth({
          ...auth,
          address: response.data.user.address,
        });
        navigate("/payment");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.id]: e.target.value });
  };

  const handlePinChange = async (e) => {
    const pincode = e.target.value;
    setAddress((prevAddress) => ({ ...prevAddress, [e.target.id]: pincode }));

    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      if (response?.data && Array.isArray(response.data)) {
        const firstResult = response.data[0];
        if (
          firstResult.Status === "Success" &&
          Array.isArray(firstResult.PostOffice)
        ) {
          const state = firstResult.PostOffice[0].State;
          const district = firstResult.PostOffice[0].District;
          setAddress((prevAddress) => ({ ...prevAddress, state, district }));
        }
      }
    } catch (error) {
      // Handle request errors
      console.error("Error fetching pincode data:", error);
    }
  };

  const selectAddress = (address) => {
    setAuth({
      ...auth,
      address,
    });
    navigate("/payment");
  };
  const editAddress = (address) => {
    setAddress(address);
    setvisible(true);
  };
  const deleteAddress = async (a) => {
    setAuth({
      ...auth,
      address: null,
    });
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/user/remove-address`,
        { address: a },
        {
          headers: {
            Authorization: `${auth?.token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getAddresses();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
    setTimeout(() => {
      setLoading(false);
    }, 200);
  };

  useEffect(() => {
    getAddresses();
  }, []);

  return (
    <Layout title="Checkout | SSN">
      <Loader loading={loading} />
      <CartContainer>
        <ProgressBar>
          <ProgressStation name="Cart">1</ProgressStation>
          <ProgressStation name="Add address" active>
            2
          </ProgressStation>
          <ProgressStation name="Payment">3</ProgressStation>
        </ProgressBar>

        <AddressWrapper>
          <AddAddress
            className="btn btn-outline-secondary"
            onClick={() => {
              setAddress({
                name: "",
                email: "",
                phone: "",
                pincode: "",
                state: "",
                street: "",
                district: "",
                locality: "",
              });
              setvisible(true);
            }}
          >
            + Add new address
          </AddAddress>
          <div className="my-4 container-fluid">
            <h2 className="">Select Address</h2>
            <table className="table table-hover">
              <tbody>
                {addresses.length > 0
                  ? addresses.map((address) => (
                      <tr className="mt-2" key={address._id}>
                        <td colSpan={3} onClick={() => selectAddress(address)}>
                          <div className="d-flex flex-column">
                            <h6 className="mb-1">{address.name}</h6>
                            <small className="text-muted">
                              {address?.email}
                            </small>
                            <small className="text-muted">
                              {address?.phone}
                            </small>
                            <small className="text-muted">
                              State: {address.state}
                            </small>
                            <small className="text-muted">
                              District: {address.district}
                            </small>
                            <small className="text-muted">
                              Locality: {address.locality || "N/A"}
                            </small>
                            <small className="text-muted">
                              {address.street}
                            </small>
                          </div>
                        </td>
                        <td className="text-end">
                          <button
                            className="btn btn-sm btn-outline-dark m-1"
                            onClick={() => editAddress(address)}
                          >
                            <MdEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-dark m-1"
                            onClick={() => deleteAddress(address)}
                          >
                            <FaRegTrashCan />
                          </button>
                        </td>
                      </tr>
                    ))
                  : "You have no  saved addresses"}
              </tbody>
            </table>
          </div>
        </AddressWrapper>
      </CartContainer>
      <Modal onCancel={() => setvisible(false)} open={visible} footer={null}>
        <form className="container-fluid" onSubmit={addAddress}>
          <h6 className="mb-5">Add new address</h6>
          <div className="form-outline mb-4 form-floating">
            <input
              type="text"
              id="name"
              className="form-control form-control-sm"
              placeholder="Enter full name"
              value={address.name}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="form3Example3">
              Enter full name *
            </label>
          </div>
          <div className="form-outline mb-4 form-floating">
            <input
              type="email"
              id="email"
              className="form-control form-control-sm"
              placeholder="Enter email*"
              value={address.email}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="form3Example3">
              Enter email *
            </label>
          </div>
          <div className="form-outline mb-4 form-floating">
            <input
              type="text"
              id="phone"
              className="form-control form-control-sm"
              placeholder="Enter phone number*"
              value={address.phone}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="phone">
              Enter phone number *
            </label>
          </div>
          <div className="form-outline mb-4 form-floating">
            <input
              type="text"
              id="street"
              className="form-control form-control-sm"
              placeholder="Enter address*"
              value={address.street}
              onChange={handleChange}
            />
            <label className="form-label" htmlFor="form3Example3">
              Address (House No. Building, Street Area) **
            </label>
          </div>
          <div className="d-flex justify-content-between">
            <div className="form-outline mb-4 form-floating">
              <input
                type="text"
                id="locality"
                className="form-control form-control-sm"
                placeholder="locality"
                value={address.locality}
                onChange={handleChange}
              />
              <label className="form-label" htmlFor="form3Example3">
                Locality / Town
              </label>
            </div>
            <div className="form-outline mb-4 form-floating">
              <input
                type="text"
                id="pincode"
                className="form-control form-control-sm"
                placeholder="pincode*"
                value={address.pincode}
                onChange={handlePinChange}
              />
              <label className="form-label" htmlFor="form3Example3">
                Pincode **
              </label>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <div className="form-outline mb-4 form-floating">
              <input
                type="text"
                id="district"
                className="form-control form-control-sm"
                placeholder="city"
                value={address.district}
                onChange={handleChange}
              />
              <label className="form-label" htmlFor="form3Example3">
                City / District *
              </label>
            </div>
            <div className="form-outline mb-4 form-floating">
              <input
                type="text"
                id="state"
                className="form-control form-control-sm"
                placeholder="state*"
                value={address.state}
                onChange={handleChange}
              />
              <label className="form-label" htmlFor="form3Example3">
                State **
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-warning">
            Save and payment
          </button>
        </form>
      </Modal>
    </Layout>
  );
};

export default Checkout;
