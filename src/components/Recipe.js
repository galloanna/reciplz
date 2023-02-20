const Recipe = ({ item }) => {
  return (
    <li>
      <a
        href={item.recipe.url}
        target="_blank"
        rel="noreferrer"
        key={item.recipe.uri}
        className="flex items-center border-2 border-sky p-5 rounded-lg text-purple-800 text-lg"
        tabIndex=""
      >
        <img
          src={item.recipe.images.THUMBNAIL.url}
          alt=""
          className="mr-5"
        ></img>
        {item.recipe.label}
      </a>
    </li>
  );
};

export default Recipe;
