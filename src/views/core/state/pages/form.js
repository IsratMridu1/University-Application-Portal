import React, { useEffect } from "react";
import State from "../utils/state";
import useForm from "../utils/useForm";
import * as actions from "../../../../redux/actions/core/state/state";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
const initialFieldValues = new State();

function StateCreate({ ...props }) {
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
   
        props.createState(values, onSuccess);
      } else {
        
        props.updateState(props.currentId, values, onSuccess);
      }
    }
  };
  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.stateList.find((x) => x.id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);
  return (
    <React.Fragment>
      <h2>Create State</h2>
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
  stateList: state.state.list,
});

const mapActionToProps = {
  createState: actions.create,
  updateState: actions.update,
};

export default connect(mapStateToProps, mapActionToProps)(StateCreate);
