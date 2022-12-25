import React, { useEffect } from "react";
//import checkbox from './checkbox';
import Client from "../utils/client";
import useForm from "../utils/useForm";
import * as actions from "../../../../redux/actions/clients/client/client";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
const initialFieldValues = new Client();

function ClientCreate({ ...props }) {

  const { addToast } = useToasts();
  const validate = () => {
    return true;
  };
  const { values, setValues,  setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, validate, props.setCurrentId);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Submitted successfully", { appearance: "success" });
      };
      if (props.currentId === 0) {
    
        props.createClient(values, onSuccess);
      } else {
      
        props.updateClient(props.currentId, values, onSuccess);
      }
    }
  };

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.clientList.find((x) => x.id === props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId,props.clientList,setErrors, setValues]);
  return (
    <React.Fragment>
      <h2>Create Clientr</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="helperText"
          placeholder="Full Name"
          name="fullName"
          type="text"
          value={values.fullName}
          onChange={handleInputChange}
          className="form-control"
        />
        <br />

        <input
          id="helperText"
          placeholder="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleInputChange}
          className="form-control"
        />

        <br />

        {/* <input
          id="helperText"
          placeholder="Client Logo"
          name="clientLogo"
          type="image"
          value={values.clientLogo}
          onChange={handleInputChange}
          className="form-control"
        /> */}
        <br />

        <input
          id="helperText"
          placeholder="Phone Number"
          name="phoneNumber"
          type="tell"
          value={values.phoneNumber}
          onChange={handleInputChange}
          className="form-control"
        />
        <br />

        <input
          id="helperText"
          placeholder="Country"
          name="country"
          type="text"
          value={values.country}
          onChange={handleInputChange}
          className="form-control"
        />

        <br />

        <input
          id="helperText"
          placeholder="State"
          name="state"
          type="text"
          value={values.state}
          onChange={handleInputChange}
          className="form-control"
        />
        <br />

        <input
          id="helperText"
          placeholder="City"
          name="city"
          type="text"
          value={values.city}
          onChange={handleInputChange}
          className="form-control"
        />

        <br />

        <input
          id="helperText"
          placeholder="AddressLine"
          name="addressLine"
          type="text"
          className="form-control"
        />

        <br />

        <input
          id="helperText"
          placeholder="Client Type"
          name="clientType"
          type="text"
          value={values.clientType}
          onChange={handleInputChange}
          className="form-control"
        />
        <button
          style={{ marginTop: "3px" }}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => ({
  clientList: state.client.list,
});

const mapActionToProps = {
  createClient: actions.create,
  updateClient: actions.update,
};

export default connect(mapStateToProps, mapActionToProps)(ClientCreate);
