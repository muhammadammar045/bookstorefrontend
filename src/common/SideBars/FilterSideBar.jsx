import React from "react";
import { useDispatch } from "react-redux";
import { setPriceRange, setSortOrder, setSort } from "@storeVars";
import { SelectBox, Select, SearchBox, Heading } from "@commonPartials";
import Category from "../../user/components/Category/Category";

const price = [
  { id: 1, name: "All", value: "all" },
  { id: 2, name: "Greater Than Rs. 100", value: "100" },
  { id: 3, name: "Greater Than Rs. 200 ", value: "200" },
  { id: 4, name: "Greater Than Rs. 300", value: "300" },
  { id: 5, name: "Greater Than Rs. 500", value: "500" }, // Fixed value here
  { id: 6, name: "Greater Than Rs. 600", value: "600" },
];

const sort = [
  { id: 1, name: "Price", value: "productPrice" },
  { id: 2, name: "Date", value: "createdAt" },
  { id: 3, name: "Rating", value: "rating" },
  { id: 4, name: "Alphabetical Order", value: "alphabetical" },
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
        <SearchBox />
        <Select
          label="Sort Order"
          options={order}
          onChange={handleSortOrderChange}
        />
        <Category label="Categories" />
        <SelectBox label="Items per Page" />
        <Select
          label="Price Range"
          options={price}
          onChange={handlePriceChange}
        />
        <Select
          label="Sort By"
          options={sort}
          onChange={handleSortByChange}
        />
      </div>
    </div>
  );
};

export default FiltersComponent;
