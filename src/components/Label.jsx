import React from "react";

export const Label = (props) => {
  const { label } = props;

  return (
    <div className="label">
      <span className="label_value">{label}</span>
    </div>
  );
};
