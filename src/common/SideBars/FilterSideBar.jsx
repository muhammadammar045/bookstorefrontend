const filters = [
  {
    name: "Category",
    options: ["Men", "Women", "Kids"],
  },
  {
    name: "Price",
    options: ["1000-10000", "10000-20000", "20000-30000"],
  },
  {
    name: "Brand",
    options: ["Gul-Ahmed", "Ideas", "Levi's", "Nike", "Puma"],
  },
  {
    name: "Rating",
    options: ["4.5 and above", "4.0 and above", "3.5 and above"],
  },
];

const FiltersComponent = () => (
  <div>
    <h1 className="mb-4 text-xl font-bold">Filters</h1>

    {/* Category Filter */}
    <div className="mb-4 flex flex-col gap-4 ps-4">
      <h1 className="text-lg font-bold">Category</h1>
      {filters
        .find((filter) => filter.name === "Category")
        .options.map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-2"
          >
            <input
              type="radio"
              name="Category"
              className="h-4 w-4"
            />
            <label className="text-sm">{option}</label>
          </div>
        ))}
    </div>

    {/* Price Filter */}
    <div className="mb-4 flex flex-col gap-4 ps-4">
      <h1 className="text-lg font-bold">Price</h1>
      {filters
        .find((filter) => filter.name === "Price")
        .options.map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-2"
          >
            <input
              type="radio"
              name="Price"
              className="h-4 w-4"
            />
            <label className="text-sm">{option}</label>
          </div>
        ))}
    </div>

    {/* Brand Filter */}
    <div className="mb-4 flex flex-col gap-4 ps-4">
      <h1 className="text-lg font-bold">Brand</h1>
      {filters
        .find((filter) => filter.name === "Brand")
        .options.map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-2"
          >
            <input
              type="radio"
              name="Brand"
              className="h-4 w-4"
            />
            <label className="text-sm">{option}</label>
          </div>
        ))}
    </div>

    {/* Rating Filter */}
    <div className="mb-4 flex flex-col gap-4 ps-4">
      <h1 className="text-lg font-bold">Rating</h1>
      {filters
        .find((filter) => filter.name === "Rating")
        .options.map((option, index) => (
          <div
            key={index}
            className="flex items-center gap-2"
          >
            <input
              type="radio"
              name="Rating"
              className="h-4 w-4"
            />
            <label className="text-sm">{option}</label>
          </div>
        ))}
    </div>
  </div>
);

export default FiltersComponent;
