import React, { useEffect, useState } from "react";
//import checkbox from './checkbox';
import JobCircular from "../utils/jobCircular";
import useForm from "../utils/useForm";
import * as actions from "../../../../redux/actions/recruitments/jobCircular/jobCircular";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
const initialFieldValues = new JobCircular();

function JobCircularCreate({ ...props }) {
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
      
        props.createJobCircular(values, onSuccess);
      } else {
       
        props.updateJobCircular(props.currentId, values, onSuccess);
      }
    }
  };

  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.jobCircularList.find((x) => x.id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);
  return (
    <React.Fragment>
      <h2>Create Job Circular</h2>
      <form onSubmit={handleSubmit}>
        <input
          id="helperText"
          placeholder="Title"
          name="title"
          type="text"
          value={values.title}
          onChange={handleInputChange}
          className="form-control"
        />
        <br />

        <input
          id="helperText"
          placeholder="Short Description"
          name="shortDescription"
          type="text"
          value={values.shortDescription}
          onChange={handleInputChange}
          className="form-control"
        />

        <br />

        <input
          id="helperText"
          placeholder="Educational Requirements"
          name="educationalRequirements"
          type="text"
          value={values.educationalRequirements}
          onChange={handleInputChange}
          className="form-control"
        />
        <br />

        <input
          id="helperText"
          placeholder="Technical Requirements"
          name="technicalRequirements"
          type="text"
          value={values.technicalRequirements}
          onChange={handleInputChange}
          className="form-control"
        />
        <br />

        <input
          id="helperText"
          placeholder="Job Responsibilities"
          name="jobResponsibilities"
          type="text"
          value={values.jobResponsibilities}
          onChange={handleInputChange}
          className="form-control"
        />

        <br />

        <input
          id="helperText"
          placeholder="Experience Requirements"
          name="experienceRequirements"
          type="text"
          value={values.experienceRequirements}
          onChange={handleInputChange}
          className="form-control"
        />
        <br />

        <input
          id="helperText"
          placeholder="Vacancy"
          name="vacancy"
          type="number"
          value={values.vacancy}
          onChange={handleInputChange}
          className="form-control"
        />

        <br />

        <input
          id="helperText"
          placeholder="IsVacancyNotSpecified"
          name="isVacancyNotSpecified"
          type="checkbox"
          onChange={() => setTnc(true)}
          //onClick={handleClick}
          //checked={checked}
          className="form-control"

          //isChecked={isChecked}

          //onChange={}
          //onChange={(e) => {setChecked(e.target.checked)}}
          //onChange={handleInputChange}
        />

        <br />

        <input
          id="helperText"
          placeholder="Salary And Compensation"
          name="salaryAndCompensation"
          type="text"
          value={values.salaryAndCompensation}
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
  jobCircularList: state.jobCircular.list,
});

const mapActionToProps = {
  createJobCircular: actions.create,
  updateJobCircular: actions.update,
};

export default connect(mapStateToProps, mapActionToProps)(JobCircularCreate);
