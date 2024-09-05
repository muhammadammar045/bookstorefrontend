import React from "react";
import { useDispatch } from "react-redux";
import { setPriceRange, setSortOrder, setSort } from "@storeVars";
import { SelectBox, Select, SearchBox, Heading } from "@commonPartials";
import Category from "../../user/components/Category/Category";

const price = [
  { id: 1, label: "Price", name: "Rs. 0 - Rs. 100", value: "0-100" },
  { id: 2, name: "Rs. 100 - Rs. 200", value: "100-200" },
  { id: 3, name: "Rs. 200 - Rs. 300", value: "200-300" },
  { id: 4, name: "Rs. 300 - Rs. 400", value: "300-400" },
  { id: 5, name: "Rs. 400 - Rs. 500", value: "400-500" },
  { id: 6, name: "Rs. 500 - Rs. 600", value: "500-600" },
  { id: 7, name: "Rs. 600 - Rs. 700", value: "600-700" },
  { id: 8, name: "Rs. 700 - Rs. 800", value: "700-800" },
];

const sort = [
  { id: 1, name: "Price", value: "price" },
  { id: 2, name: "Date", value: "date" },
  { id: 3, name: "Rating", value: "rating" },
  { id: 4, name: "Name", value: "name" },
];

const order = [
  { id: 1, name: "Ascending", value: "asc" },
  { id: 2, name: "Descending", value: "desc" },
];

const FiltersComponent = () => {
  const dispatch = useDispatch();

  const handlePriceChange = (e) => {
    dispatch(setPriceRange(e.target.value));
  };

  const handleSortOrderChange = (e) => {
    dispatch(setSortOrder(e.target.value));
  };

  const handleSortByChange = (e) => {
    dispatch(setSort(e.target.value));
  };

  return (
    <div>
      <Heading className="mb-4 text-xl font-bold">Filters</Heading>
      <div className="flex flex-col gap-4">
        <Category label="Categories" />
        <SelectBox label="Items per Page" />
        <Select
          label="Price Range"
          options={price}
          onChange={handlePriceChange}
        />
        <Select
          label="Sort Order"
          options={order}
          onChange={handleSortOrderChange}
        />
        <Select
          label="Sort By"
          options={sort}
          onChange={handleSortByChange}
        />
        <SearchBox />
      </div>
    </div>
  );
};

export default FiltersComponent;
