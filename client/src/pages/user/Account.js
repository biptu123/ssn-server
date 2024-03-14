import React from "react";
import userImg from "../../assets/images/user.png";

const Account = ({ user }) => {
  return (
    <>
      <div className="card card-primary card-outline">
        <div className="card-body box-profile">
          <div className="text-center">
            <img
              className="profile-user-img img-fluid img-circle"
              src={user?.img || userImg}
              alt="User profile picture"
              width={300}
            />
          </div>
          <h3 className="profile-username text-center">
            {user?.name || "Guest"}
          </h3>
          <p className="text-muted text-center"></p>
          <ul className="list-group list-group-unbordered mb-3">
            <li className="list-group-item">
              <b>Email:</b>{" "}
              <span className="float-right">{user?.email || "Unknown"}</span>
            </li>
            <li className="list-group-item">
              <b>Number:</b>{" "}
              <span className="float-right">{user?.phone || "Unknown"}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Account;
