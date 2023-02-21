const IngredientDeleteButton = ({ deleteIngredients }) => {
  return (
    <button
      className="mx-auto my-5 rounded-full px-8 py-4 text-lg font-semibold text-white cursor-pointer bg-purple-700 hover:bg-purple-800"
      onClick={deleteIngredients}
    >
      Delete Selected
    </button>
  );
};

export default IngredientDeleteButton;
