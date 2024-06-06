/* eslint-disable react/prop-types */
import { useState, createContext } from "react";

export const ToggleContext = createContext();

const ToggleContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);

  }

  const handleToggle = () => {
    setIsToggle(!isToggle);
    setIsSearch(false);
  }

  const handleOpenSearch = () => {
    setIsSearch(!isSearch); 
    setIsToggle(false);
  }

  return (
    <ToggleContext.Provider value={{ isOpen, isToggle, setIsToggle, handleOpen, handleToggle, isSearch, handleOpenSearch }}>
      {children}
    </ToggleContext.Provider>
  );
}

export default ToggleContextProvider;