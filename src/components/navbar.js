import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [populationOpen, setPopulationOpen] = useState(false);
  const [chronicityOpen, setChronicityOpen] = useState(false);
  const [tumorsOpen, setTumorsOpen] = useState(false);

  const toggleDropdown = (dropdown) => {
    switch (dropdown) {
      case "popolazione":
        setPopulationOpen(!populationOpen);
        setChronicityOpen(false);
        setTumorsOpen(false);
        break;
      case "cronicita":
        setPopulationOpen(false);
        setChronicityOpen(!chronicityOpen);
        setTumorsOpen(false);
        break;
      case "tumori":
        setPopulationOpen(false);
        setChronicityOpen(false);
        setTumorsOpen(!tumorsOpen);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="xs:hidden md:block h-10 bg-bg-header text-white">
        <div className="flex space-x-7 ml-12">
          {/* SECTION POPULATION */}
          <div className="relative inline-block group">
            <button
              className="bg-bg-header text-white px-4 py-2 rounded-md"
              onClick={() => toggleDropdown("popolazione")}
            >
              Popolazione e Demografia
            </button>
            <div
              className={`${populationOpen
                  ? "block opacity-100 h-auto"
                  : "hidden opacity-0 h-0"
                } w-48 absolute z-10 bg-white border rounded-md shadow-lg transition-opacity transition-height duration-300 ease-out`}
            >
              <Link
                to="/Popolazione"
                className="flex  w-full px-4 py-2  hover:underline text-red-500"
                onClick={() => toggleDropdown("popolazione")}
              >
                Popolazione
              </Link>
              <Link
                to="/Demografia"
                className="flex w-full px-4 py-2 hover:underline text-red-500"
                onClick={() => toggleDropdown("popolazione")}
              >
                Demografia
              </Link>
            </div>
          </div>
          {/* SECTION CHRONICITY' */}
          <div className="relative inline-block group">
            <button
              className="bg-bg-header text-white px-4 py-2 rounded-md"
              onClick={() => toggleDropdown("cronicita")}
            >
              Cronicità
            </button>
            <div
              className={`${chronicityOpen
                  ? "block opacity-100 h-auto"
                  : "hidden opacity-0 h-0"
                } mr-11 w-48 absolute z-10 bg-white border rounded-md shadow-lg transition-opacity transition-height duration-300 ease-out `}
            >
              <Link
                to="/BPCO"
                className="flex w-full px-4 py-2 hover:underline text-red-500"
                onClick={() => toggleDropdown("cronicita")}
              >
                BPCO
              </Link>
              <Link
                to="/Diabete"
                className="flex w-full px-4 py-2 hover:underline text-red-500"
                onClick={() => toggleDropdown("cronicita")}
              >
                Diabete
              </Link>
              <Link
                to="/Ipertensione"
                className="flex w-full px-4 py-2 hover:underline text-red-500"
                onClick={() => toggleDropdown("cronicita")}
              >
                Ipertensione
              </Link>
              <Link
                to="/ScompensoCardiaco"
                className="flex w-full px-4 py-2 hover:underline text-red-500"
                onClick={() => toggleDropdown("cronicita")}
              >
                Scompenso cardiaco
              </Link>
            </div>
          </div>
          {/* SECTION TUMORS */}
          <div className="relative inline-block group">
            <button
              className="bg-bg-header text-white px-4 py-2 rounded-md"
              onClick={() => toggleDropdown("tumori")}
            >
              Tumori
            </button>
            <div
              className={`${tumorsOpen ? "block opacity-100 h-auto" : "hidden opacity-0 h-0"
                } mr-11 w-40 absolute z-10 bg-white border rounded-md shadow-lg transition-opacity transition-height duration-300 ease-out`}
            >
              <Link
                to="/Polmoni"
                className="flex w-full px-4 py-2 hover:underline text-red-500"
                onClick={() => toggleDropdown("tumori")}
              >
                Polmone
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
