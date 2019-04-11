import React from 'react';

const FormErrors = ({ formErrors }) => {

  let errors = [];
  Object.keys(formErrors).map((fieldName, i) => {
    if (formErrors[fieldName].length > 0) {
      errors[i] = <p key={i}>{fieldName} {formErrors[fieldName]}</p>;
    }
  });

  if (errors.length > 0) {
    return (
      <div className="formErrors">
        { errors }
      </div>
    );
  } else {
    return '';
  }
};

export default FormErrors;
