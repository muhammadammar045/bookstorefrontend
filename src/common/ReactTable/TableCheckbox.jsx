import React, { useEffect, useRef, forwardRef } from "react";

const TableCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <input
      className="rounded-md"
      type="checkbox"
      ref={resolvedRef}
      {...rest}
    />
  );
});

export default TableCheckbox;
