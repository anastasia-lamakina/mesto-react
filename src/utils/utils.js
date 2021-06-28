export const getInputValuesFromEvent = (event) => {
  const values = {};

  event.target.querySelectorAll(".popup__input").forEach((input) => {
    values[input.name] = input.value;
  });

  return values;
};
