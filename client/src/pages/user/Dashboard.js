import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

import Account from "./Account";
import Orders from "./Orders";
import Wishlist from "./Wishlist";
import Setting from "./Setting";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [active, setActive] = useState("orders");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/user`,
        {
          headers: {
            Authorization: `${auth?.token}`,
          },
        }
      );
      if (response?.data?.success) {
        console.log(response?.data?.user);
        setUser(response?.data?.user);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Layout title="Dashboard | SSN">
        <section className="dashboard-section">
          <section className="container">
            <div className="content-wrapper" style={{ minHeight: "2646.8px" }}>
              <section className="content-header">
                <div className="container-fluid">
                  <div className="row mb-2">
                    <div className="col-sm-6">
                      <h1>Profile</h1>
                    </div>
                  </div>
                </div>
              </section>
              <section className="content">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-3">
                      <Account user={user} />
                    </div>
                    <div className="col-md-9">
                      <div className="card">
                        <div className="card-header p-2">
                          <ul className="nav nav-pills">
                            <li className="nav-item m-1">
                              <button
                                className={
                                  active === "orders"
                                    ? "btn btn-outline-dark bg-dark text-white"
                                    : "btn btn-light"
                                }
                                onClick={() => setActive("orders")}
                              >
                                My Orders
                              </button>
                            </li>
                            <li className="nav-item m-1">
                              <button
                                className={
                                  active === "wishlist"
                                    ? "btn btn-outline-dark bg-dark text-white"
                                    : "btn btn-light"
                                }
                                onClick={() => setActive("wishlist")}
                              >
                                Wishlist
                              </button>
                            </li>
                            <li className="nav-item m-1">
                              <button
                                className={
                                  active === "setting"
                                    ? "btn btn-outline-dark bg-dark text-white"
                                    : "btn btn-light"
                                }
                                onClick={() => setActive("setting")}
                              >
                                Settings
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div className="card-body">
                          <div className="tab-content">
                            <div className="tab-pane active">
                              {active === "orders" && <Orders />}
                              {active === "wishlist" && <Wishlist />}
                              {active === "setting" && <Setting />}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </section>
      </Layout>
    </>
  );
};

export default Dashboard;
