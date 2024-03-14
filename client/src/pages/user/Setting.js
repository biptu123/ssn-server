import React from "react";

const Setting = () => {
  return (
    <>
      <div className="tab-pane active" id="settings">
        <form className="form-horizontal">
          <div className="form-group row my-2">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="inputName"
                placeholder="Name"
              />
            </div>
          </div>
          <div className="form-group row my-2">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="form-group row my-2">
            <label htmlFor="inputName2" className="col-sm-2 col-form-label">
              Photo
            </label>
            <div className="col-sm-10">
              <input
                type="file"
                className="form-control"
                id="inputName2"
                placeholder="Name"
              />
            </div>
          </div>
          <div className="form-group row my-2">
            <div className="offset-sm-2 col-sm-10">
              <button type="submit" className="btn btn-danger">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Setting;
