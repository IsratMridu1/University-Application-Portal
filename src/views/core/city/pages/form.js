import React, { useEffect } from "react";
import City from "../utils/city";
import useForm from "../utils/useForm";
import * as actions from "../../../../redux/actions/core/city/city";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
const initialFieldValues = new City();

function CityCreate({ ...props }) {
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
     
        props.createCity(values, onSuccess);
      } else {
        
        props.updateCity(props.currentId, values, onSuccess);
      }
    }
  };
  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.cityList.find((x) => x.id === props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId, props.cityList, setErrors,  setValues]);
  return (
    <React.Fragment>
      <h2>Create City</h2>
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
  cityList: state.city.list,
});

const mapActionToProps = {
  createCity: actions.create,
  updateCity: actions.update,
};

export default connect(mapStateToProps, mapActionToProps)(CityCreate);
