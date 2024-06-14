/* eslint-disable react/prop-types */
import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// icons
import { FaMagnifyingGlass } from "react-icons/fa6";
// import { IoIosCloseCircleOutline } from "react-icons/io";
import { HiOutlineBackspace } from "react-icons/hi2";

import { ToggleContext } from "@contexts/ToggleContext.jsx";

// Backend URL
import BACKEND_URL from "@utils/backendUrl.js";

const SearchBar = ({ placeholder, data }) => {
    const { isSearch, setIsSearch, handleOpenSearch } =
        useContext(ToggleContext);

    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const searchRef = useRef(null);

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        setWordEntered(searchWord);

        const newFilter = data.filter((value) => {
            return (
                value.title.toLowerCase().includes(searchWord.toLowerCase()) ||
                value.content
                    .toLowerCase()
                    .includes(searchWord.toLowerCase()) ||
                value.author.fullname
                    .toLowerCase()
                    .includes(searchWord.toLowerCase())
            );
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
    };

    const handleLinkClick = () => {
        clearInput();
        handleOpenSearch();
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                // Click outside of search bar, close it
                if (isSearch) {
                    setIsSearch(false);
                }
            }
        };

        if (isSearch) {
            document.addEventListener("mousedown", handleOutsideClick);
        } else {
            document.removeEventListener("mousedown", handleOutsideClick);
        }

        // Remove event listener when component unmounts
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isSearch, setIsSearch]);

    return (
        <>
            <div className="flex gap-6 text-lg pl-5 cursor-pointer active:text-akpica-pastel text-akpica-white">
                <FaMagnifyingGlass onClick={handleOpenSearch} />
            </div>

            {isSearch && (
                <div
                    ref={searchRef}
                    className="absolute flex justify-center items-center gap-4 text-lg z-10 top-[62px] border right-0 md:left-0 md:translate-x-1/2 w-full md:w-1/2"
                >
                    <div className="flex justify-between bg-akpica-black text-akpica-white w-full">
                        <input
                            type="text"
                            placeholder={placeholder}
                            value={wordEntered}
                            onChange={handleFilter}
                            className="h-10 w-full p-4 bg-akpica-black outline-none border-b border-akpica-white"
                        />
                        <button
                            className="flex items-center pr-3 border-b border-akpica-white"
                            onClick={clearInput}
                        >
                            <HiOutlineBackspace />
                        </button>
                    </div>

                    {filteredData.length != 0 && (
                        <div className="absolute flex flex-col top-10 bg-akpica-black text-akpica-white p-4 leading-9 w-full h-52 overflow-hidden overflow-y-auto">
                            {filteredData.slice(0, 15).map((value, key) => {
                                return (
                                    <Link
                                        key={key}
                                        to={`/${value.slug}`}
                                        onClick={handleLinkClick}
                                    >
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={`${BACKEND_URL}/posts/photo/${encodeURIComponent(
                                                    value.title
                                                )}`}
                                                alt="post image"
                                                className="w-12 h-full object-cover"
                                            />
                                            <p>{value.title} </p>
                                        </div>
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
