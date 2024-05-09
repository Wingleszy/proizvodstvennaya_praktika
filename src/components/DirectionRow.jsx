import React from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export const DirectionRow = (props) => {
  const { direction } = props;
  return (
    <div className="directions_row">
      <div>{direction.name}</div>
      <div>{direction.shortName}</div>
      <div>
        <RemoveRedEyeIcon fontSize="small" sx={{
            cursor: 'pointer'
        }}/>
      </div>
    </div>
  );
};
