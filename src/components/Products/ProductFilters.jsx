import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { IoIosArrowDown, IoIosClose } from "react-icons/io";

const DropdownContainer = styled.div`
  text-align: left;
  border: 1px solid #ccc;
  position: relative;
  border-radius: 5px;
  width: 100%;
`;

const DropdownInput = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  width: 100%;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  /* transform: translateY(60%); */
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: auto;
  max-height: 150px;
  background-color: #fff;
  z-index: 100;
`;

const DropdownSelectedValue = styled.div``;

const Dropdowntags = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 5px;
`;
const Dropdowntagitems = styled.div`
  background-color: #ddd;
  padding: 2px 4px;
  border-radius: 2px;
  display: flex;
  align-items: center;
`;
const Dropdowntagclose = styled.span`
  display: flex;
  align-items: center;
`;

const Dropdownitem = styled.div`
  padding: 5px;
  cursor: pointer;
  width: 100%;
  :hover {
    background-color: #9fc3f870;
  }
  ${(props) =>
    props.selected &&
    css`
      background-color: #0d6efd;
      color: #fff;
    `}
`;

const DropdownFilter = ({ placeholder, options, isMulti, onChange }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null);

  useEffect(() => {
    const handler = () => setShowMenu(false);
    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const handleInputClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };
  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeholder;
    }
    if (isMulti) {
      return (
        <Dropdowntags>
          {selectedValue.map((option) => (
            <Dropdowntagitems key={option.value}>
              {option.label}
              <Dropdowntagclose onClick={(e) => onTagRemove(e, option)}>
                <IoIosClose />
              </Dropdowntagclose>
            </Dropdowntagitems>
          ))}
        </Dropdowntags>
      );
    }
    return selectedValue.label;
  };

  const removeOption = (option) => {
    return selectedValue.filter((o) => o.value !== option.value);
  };

  const onTagRemove = (e, option) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
  };
  const onItemClick = (option) => {
    let newValue;
    if (isMulti) {
      if (selectedValue.findIndex((o) => o.value === option.value) >= 0) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option) => {
    if (isMulti) {
      return selectedValue.filter((o) => o.value === option.value).length > 0;
    }
    if (!selectedValue) {
      return false;
    }
    return selectedValue.value === option.value;
  };
  return (
    <DropdownContainer>
      <DropdownInput onClick={handleInputClick}>
        <DropdownSelectedValue> {getDisplay()}</DropdownSelectedValue>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
            <IoIosArrowDown />
          </div>
        </div>
        {showMenu && (
          <DropdownMenu>
            {options.map((option) => (
              <Dropdownitem
                selected={isSelected(option)}
                onClick={() => onItemClick(option)}
                key={option.value}
              >
                {option.label}
              </Dropdownitem>
            ))}
          </DropdownMenu>
        )}
      </DropdownInput>
    </DropdownContainer>
  );
};

export default DropdownFilter;
