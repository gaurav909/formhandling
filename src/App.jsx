import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import Table from "react-bootstrap/Table";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [formData, setFormData] = useState({
    uname: "",
    umail: "",
    uphone: "",
    umessage: "",
    index: "",
  });
  const [userData, setUserData] = useState([]);
  const getValue = (event) => {
    const oldData = { ...formData };
    const inputName = event.target.name;
    const inputValue = event.target.value;
    oldData[inputName] = inputValue;
    setFormData(oldData);
    console.log(oldData);
  };
  const formHandle = (event) => {
    const currentData = {
      uname: formData.uname,
      uphone: formData.uphone,
      umail: formData.umail,
      umessage: formData.umessage,
    };
    if (formData.index=== "") {
      const checkfilterData = userData.filter(
        (v) => v.umail == formData.umail || v.uphone == formData.uphone
      );

      if (checkfilterData.length == 1) {
        toast.error("Email or Phone number already Exit");
      } else {
        const oldUserData = [...userData, currentData];
        setUserData(oldUserData);
        console.log(oldUserData);
        setFormData({
          uname: "",
          umail: "",
          uphone: "",
          umessage: "",
          index: "",
        });
      }
    } else {
      const editindex = formData.i;
      const oldData = userData;

      const checkfilterUser = userData.filter(
        (v, i) =>(v.umail == formData.umail || v.uphone == formData.uphone) &&
          i!= editindex
      );

      if (checkfilterUser.length==0) {
        oldData[editindex]["uname"] = formData.uname;
        oldData[editindex]["umail"] = formData.umail;
        oldData[editindex]["uphone"] = formData.uphone;
        oldData[editindex]["umessage"] = formData.umessage;

        setUserData(oldData);
        setFormData({
          uname: "",
          umail: "",
          uphone: "",
          umessage: "",
          index: "",
        });
      } else {
        toast.error("Email or Phone number already Exit");
      }
    }
    event.preventDefault();
  };

  const deleteRow = (indexNumber) => {
    const filterDataDelete = userData.filter((v, i) => i != indexNumber);

    setUserData(filterDataDelete);
    toast.success("Data Delete");
  };

  const editRow = (indexNumber) => {
    const editData = userData.filter((v, i) => i == indexNumber)[0];
    console.log(editData);

    editData["i"] = indexNumber;
    console.log(editData);
    setFormData(editData);
  };
  return (
    <>
      <div className="container">
        <ToastContainer />
        <h1>Enquiry Form</h1>
        <form onSubmit={formHandle}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              onChange={getValue}
              value={formData.uname}
              className="form-control"
              id="uname"
              name="uname"
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              onChange={getValue}
              value={formData.umail}
              className="form-control"
              id="umail"
              name="umail"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label>phonePhone No</label>
            <input
              type="text"
              onChange={getValue}
              value={formData.uphone}
              className="form-control"
              name="uphone"
              id="uphone"
              placeholder="phonenumber"
            />
          </div>

          <div className="form-group">
            <label htmlFor=" ">Message</label>
            <textarea
              name="umessage"
              id="umessage"
              onChange={getValue}
              value={formData.umessage}
              className="form-control"
              rows="3"
            />
          </div>
          <button className="btn btn-primary">
            {formData.index !== "" ? "update" : "save"}
          </button>
        </form>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.length >= 1 ? (
              userData.map((obj, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{obj.uname}</td>
                    <td>{obj.umail}</td>
                    <td>{obj.uphone}</td>
                    <td>{obj.umessage}</td>
                    <td>
                      <button onClick={() => deleteRow(i)}>Delete</button>
                      <button onClick={() => editRow(i)}>Edit</button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6}>No data Found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default App;
