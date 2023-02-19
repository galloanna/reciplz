const Ingredient = ({ ingredientName }) => {
  return (
    <label>
      <input type="checkbox" />
      {ingredientName}
    </label>
  );
};

export default Ingredient;
