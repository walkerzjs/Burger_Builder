export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const checkValidity = (value, isRuleRequired) => {
  //what a pattern!
  let isValid = true;
  let errorMessage = "";
  if (isRuleRequired.required) {
    isValid = value.trim() !== "" && isValid;
    if (!isValid) {
      errorMessage = "Please add something!";
    }
  }
  if (isRuleRequired.minLength) {
    isValid = value.length >= isRuleRequired.minLength && isValid;
    if (!isValid) {
      errorMessage = `The length of this field should be more than ${
        isRuleRequired.minLength - 1
      }`;
    }
  }
  if (isRuleRequired.maxLength) {
    isValid = value.length <= isRuleRequired.maxLength && isValid;
    if (!isValid) {
      errorMessage = `The length of this field should be more than ${
        isRuleRequired.minLength - 1
      } and less than ${isRuleRequired.maxLength + 1}`;
    }
  }
  if (isRuleRequired.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
    if (!isValid) {
      errorMessage = "Please enter a valid Email address";
    }
  }
  if (isRuleRequired.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return { isValid, errorMessage };
};
