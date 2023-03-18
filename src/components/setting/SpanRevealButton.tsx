import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

/**
 * Use is like this
 * <DataRevealButton data="johndoe@example.com" type="email" />
 */
interface Props {
  data: string;
  type: "email" | "phone";
}

const SpanRevealButton: React.FC<Props> = ({ data, type }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const maskedData = () => {
    switch (type) {
      case "email":
        // how some first and domain with fixed asterisk
        return data.replace(
          /^(.{1,4})(.*)(@.*)$/,
          (match, first, middle, last) => {
            return `${first}${"****"}${last}`;
          }
        );
      case "phone":
        // show only last 4 digit
        return data.replace(
          /^(\d{6})(\d{4})$/,
          (match, first, last) => {
            return `******${last}`;
          }
        );
      default:
        return data;
    }
  };

  const displayedData = isVisible ? data : maskedData();
  const visibilityIcon = isHovered ? <VisibilityOffIcon /> : <VisibilityIcon />;

  return (
    <div className="user-data-inner-row">
      <span>{displayedData}</span>
      <a className="reveal-button" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
        {visibilityIcon}
      </a>
    </div>
  );
};

export default SpanRevealButton;
