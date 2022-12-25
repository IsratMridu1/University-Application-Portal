import React, { useState, useEffect } from "react";

const useForm = (initialFieldValues, validate, setCurrentId) => {
  const [values, setValues] = useState(initialFieldValues)
  const [errors, setErrors] = useState({})

  
   
    // const { shortDescription, value } = e.target
    // const fieldValue = { [shortDescription]: value }
    // const { educationalRequirements, value } = e.target
    // const fieldValue = { [educationalRequirementsle]: value }
    // const { technicalRequirements, value } = e.target
    // const fieldValue = { [rechnicalRequirements]: value }
    // const { JobResponsibilities, value } = e.target
    // const fieldValue = { [JobResponsibilities]: value }
    // const { ExperienceRequirements, value } = e.target
    // const fieldValue = { [ExperienceRequirements]: value }
    // const { Vacancy, value } = e.target
    // const fieldValue = { [Vacancy]: value }
    // const { SalaryAndCompensation, value } = e.target
    // const fieldValue = { [SalaryAndCompensation]: value }
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      const fieldValue = { [name]: value };
      setValues({
        ...values,
        ...fieldValue,
      });
      validate(fieldValue);
    };

  const resetForm = () => {
    setValues({
      ...initialFieldValues
    })
    setErrors({})
    setCurrentId(0)
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  };
}

export default useForm;
