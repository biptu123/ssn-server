import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import axios from "axios";
import { Table } from "react-bootstrap";

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [auth] = useAuth();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/user/orders`,
        {
          headers: {
            Authorization: `${auth?.token}`,
          },
        }
      );
      if (response?.data?.success) {
        console.log(response?.data?.orders);
        setOrders(response?.data?.orders);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <h2>My Orders</h2>
      <div className="table-responsive">
        {orders ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Shipping Details</th>
                <th>Status</th>
                <th>Order ID</th>
                <th>Payment ID</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <div className="d-flex flex-column">
                      <p>{order.address?.name}</p>
                      <p>
                        {order.address?.street}, {order.address?.locality},{" "}
                        {order.address?.district}, {order.address?.state},{" "}
                        {order.address?.pincode}
                      </p>

                      <p>{order.address?.phone}</p>
                    </div>
                  </td>
                  <td>{order.status}</td>

                  <td>{order._id}</td>
                  <td>{order.razorpay_payment_id || "Payment Unsuccessful"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>Loading orders...</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
