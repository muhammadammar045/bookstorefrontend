import React, { useEffect, useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCategories, fetchAllCategoriesThunk } from "@storeVars";
import { useNavigate } from "react-router-dom";

function Category({
  label = "Categories",
  labelColor = "text-sm font-semibold text-gray-900 dark:text-neutral-400",
  bgColor = "bg-gray-100 dark:bg-neutral-900",
  textColor = "text-sm text-gray-900 dark:text-neutral-400 dark:placeholder-neutral-500",
  padding = "px-4 py-3",
  width = "w-full",
  rounded = "rounded-lg",
  shadow = "",
  outline = "focus:outline-none focus:ring-0",
  border = "border-gray-200 dark:border-neutral-700",
  className = "ease-in duration-700",
  options = [],
  ...props
}) {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const id = useId();
  const navigate = useNavigate();

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchAllCategoriesThunk());
    }
  }, [dispatch, categories]);

  const selectProps = {
    id: id,
    className: `${className} ${padding} ${width} ${border} ${rounded} ${textColor} ${bgColor} ${shadow} ${outline}`,
    ...props,
  };

  const handleChange = (e) => {
    const selectedCategoryId = e.target.value;
    if (selectedCategoryId) {
      navigate(`/category-products/${selectedCategoryId}`);
    }
  };

  return (
    <div className="w-full text-left">
      {label && (
        <label
          className={`mb-2 inline-block pl-1 ${labelColor}`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <select
        {...selectProps}
        onChange={handleChange}
      >
        <option value="">Select a Category</option>
        {categories.map((category) => (
          <option
            key={category?._id}
            value={category?._id}
          >
            {/* {console.log("Category ID:", category?._id)} */}
            {category.categoryName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Category;
