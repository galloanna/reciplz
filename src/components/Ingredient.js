import { useState } from "react";

const Ingredient = ({ ingredientName }) => {
  const [isChecked, setIsChecked] = useState(false);

  const checkHandler = () => {
    setIsChecked(!isChecked);
  };

  const handleKeyEvent = (e) => {
    if (e.key === 'Enter' || e.key === ' '){
        e.target.click();
    }
  }

  return (
    <label className={`${isChecked ? "border-purple-700" : ""} rounded-full border-2 border-sky px-5 py-2 text-lg text-zinc-700 cursor-pointer bg-white`} tabIndex="0" onKeyDown={handleKeyEvent}>
      <input
        type="checkbox"
        value={ingredientName}
        checked={isChecked}
        onChange={checkHandler}
        className="visually-hidden"
        tabIndex="-1"       
      />
      {ingredientName}
    </label>
  );
};

export default Ingredient;
