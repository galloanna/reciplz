import { useState } from "react";

const Ingredient = ({ ingredientName }) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label>
      <input
        type="checkbox"
        value={ingredientName}
        checked={isChecked}
        onChange={checkHandler}
      />
      {ingredientName}
    </label>
  );
};

export default Ingredient;
