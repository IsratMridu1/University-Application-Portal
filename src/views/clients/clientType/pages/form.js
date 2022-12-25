import React, { useEffect, useState } from "react";
//import checkbox from './checkbox';
import ClientType from "../utils/clientType";
import useForm from "../utils/useForm";
import * as actions from "../../../../redux/actions/clients/clientType/clientType";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
const initialFieldValues = new ClientType();

function ClientTypeCreate({ ...props }) {
  const [TnC, setTnc] = useState(false);
  const { addToast } = useToasts();
  const validate = () => {
    return true;
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, validate, props.setCurrentId);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (validate()) {
      const onSuccess = () => {
        resetForm();
        addToast("Submitted successfully", { appearance: "success" });
      };
      if (props.currentId == 0) {
      
        props.createClientType(values, onSuccess);
      } else {
       
        props.updateClientType(props.currentId, values, onSuccess);
      }
    }
  };

  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.clientTypeList.find((x) => x.id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);
  return (
    <React.Fragment>
      <h2>Create Client Type</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="helperText"
          placeholder="Name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleInputChange}
          className="form-control"
        />
        <br />

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
  clientTypeList: state.clientType.list,
});

const mapActionToProps = {
  createClientType: actions.create,
  updateClientType: actions.update,
};

export default connect(mapStateToProps, mapActionToProps)(ClientTypeCreate);
