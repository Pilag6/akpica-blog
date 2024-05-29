import { useState, createContext } from "react";

export const ToggleContext = createContext();

const ToggleContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [isSearch, setIsSearch] = useState(false);;

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleToggle = () => {
    setIsToggle(!isToggle);
  }

  const handleOpenSearch = () => {
    setIsSearch(!isSearch); 
  }

  return (
    <ToggleContext.Provider value={{ isOpen, isToggle, handleClose, handleToggle, isSearch, handleOpenSearch }}>
      {children}
    </ToggleContext.Provider>
  );
}

export default ToggleContextProvider;