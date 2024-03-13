import React from "react";

const Account = () => {
  return (
    <>
      <div className="card card-primary card-outline">
        <div className="card-body box-profile">
          <div className="text-center">
            <img
              className="profile-user-img img-fluid img-circle"
              src="../../dist/img/user4-128x128.jpg"
              alt="User profile picture"
            />
          </div>
          <h3 className="profile-username text-center">Biptu Das</h3>
          <p className="text-muted text-center">Software Engineer</p>
          <ul className="list-group list-group-unbordered mb-3">
            <li className="list-group-item">
              <b>Email:</b> <span className="float-right">Biptu Das</span>
            </li>
            <li className="list-group-item">
              <b>Number:</b> <span className="float-right">Biptu Das</span>
            </li>
            <li className="list-group-item">
              <b>Name:</b> <span className="float-right">Biptu Das</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Account;
