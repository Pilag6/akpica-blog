/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

// icons
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";

import { ToggleContext } from "@contexts/ToggleContext.jsx";

const SearchBar = ({ placeholder, data }) => {
  const { isSearch, handleOpenSearch } = useContext(ToggleContext);

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (e) => {
    const searchWord = e.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
    // handleOpenSearch()
  };

  const handleLinkClick = () => {
    clearInput();
    handleOpenSearch();
  };


  return (
    <>
      <div className="flex gap-6 text-lg pl-5 cursor-pointer active:text-akpica-pastel text-akpica-white">
        <FaMagnifyingGlass onClick={handleOpenSearch} />
      </div>

      {isSearch && (
        <div className="absolute flex gap-4 text-lg z-10 top-[62px] right-0 md:right-auto w-full md:w-2/5">
          <div className="flex justify-between bg-akpica-black text-akpica-white w-full">
            <input
              type="text"
              placeholder={placeholder}
              value={wordEntered}
              onChange={handleFilter}
              className="h-10 w-full p-4 bg-akpica-black outline-none"
            />
            <button className="flex items-center pr-3" onClick={clearInput}>
              <IoIosCloseCircleOutline />
            </button>
          </div>

          {filteredData.length != 0 && (
            <div className="absolute flex flex-col top-10 bg-akpica-black text-akpica-white p-4 leading-9 w-full h-52 overflow-hidden overflow-y-auto">
              {filteredData.slice(0, 15).map((value, key) => {
                return (
                  <Link key={key} to={`/${value._id}`} onClick={handleLinkClick}>
                    <p>{value.title} </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchBar;
