import React, { useState } from "react";
import Logo from "../imgs/logo.jpg";
import { Link } from "react-router-dom";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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

  const CloseSideBar = () => {
    setSidebarOpen(!sidebarOpen);
    setPopulationOpen(false);
    setChronicityOpen(false);
    setTumorsOpen(false);
  };
  const [populationOpen, setPopulationOpen] = useState(false);
  const [chronicityOpen, setChronicityOpen] = useState(false);
  const [tumorsOpen, setTumorsOpen] = useState(false);

  return (
    <div className="flex h-36 bg-bg-header ">
      {/* SIDEBAR UNDER 720PX */}
      <div className=" pt-12 pl-5 sm:block md:hidden">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#FFFFFF"
          className="h-10"
          onClick={toggleSideBar}
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M20 7L4 7"
              stroke="#FFFFFF"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>
            <path
              d="M20 12L4 12"
              stroke="#FFFFFF"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>
            <path
              d="M20 17L4 17"
              stroke="#FFFFFF"
              stroke-width="1.5"
              stroke-linecap="round"
            ></path>
          </g>
        </svg>
        {sidebarOpen && (
          <div className="flex ">
            <div className="fixed inset-0 bg-white w-11/12 transition-all duration-300 ease-out z-50">
              <svg
                fill="#000000"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-auto w-5 mt-5 mr-5"
                onClick={CloseSideBar}
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M0 14.545L1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z"
                    fill-rule="evenodd"
                  ></path>
                </g>
              </svg>
              <div className="h-96 block w-auto absolute">
                <div className=" flex flex-col items-start space-y-7 text-red-600 underline text-lg">
                  {/* POPULATION SECTION */}
                  <div className=" relative inline-block group">
                    <label
                      className="px-4 py-2 rounded-md"
                      onClick={() => toggleDropdown("popolazione")}
                    >
                      Popolazione e Demografia
                    </label>
                    <div
                      className={`${populationOpen ? "block" : "hidden"
                        } w-48 z-10 bg-white  rounded-md `}
                    >
                      <Link
                        to="/Popolazione"
                        className="block w-full px-4 py-2  hover:underline text-red-500"
                        onClick={CloseSideBar}
                      >
                        Popolazione
                      </Link>
                      <Link
                        to="/Demografia"
                        className="block w-full px-4 py-2 hover:underline text-red-500"
                        onClick={CloseSideBar}
                      >
                        Demografia
                      </Link>
                    </div>
                  </div>
                  {/* CHRONICITY' SECTION */}
                  <div className=" relative inline-block group">
                    <label
                      className="flex px-4 py-2  "
                      onClick={() => toggleDropdown("cronicita")}
                    >
                      Cronicità
                    </label>
                    <div
                      className={`${chronicityOpen ? "block" : "hidden"
                        } ml-12 w-48 z-10 bg-white `}
                    >
                      <Link
                        to="/BPCO"
                        className="flex  hover:underline text-red-500"
                        onClick={() => CloseSideBar()}
                      >
                        BPCO
                      </Link>
                      <Link
                        to="/Diabete"
                        className="flex hover:underline text-red-500"
                        onClick={() => CloseSideBar()}
                      >
                        Diabete
                      </Link>
                      <Link
                        to="/Ipertensione"
                        className="flex hover:underline text-red-500"
                        onClick={() => CloseSideBar()}
                      >
                        Ipertensione
                      </Link>
                      <Link
                        to="/ScompensoCardiaco"
                        className="flex   hover:underline text-red-500"
                        onClick={() => CloseSideBar()}
                      >
                        Scompenso cardiaco
                      </Link>
                    </div>
                  </div>
                  {/* TUMORS SECTION */}
                  <div className="relative inline-block group">
                    <label
                      className="flex px-4 py-2 rounded-md"
                      onClick={() => toggleDropdown("tumori")}
                    >
                      Tumori
                    </label>
                    <div
                      className={`${tumorsOpen ? "block" : "hidden"
                        } mr-11 w-40 z-10 bg-white `}
                    >
                      <Link
                        to="/Polmoni"
                        className="block w-full px-4 py-2 hover:underline text-red-500"
                        onClick={() => CloseSideBar()}
                      >
                        Polmone
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="fixed inset-0 ml-auto h-screen w-1/12 bg-bg-finalSidebar z-50"
              onClick={CloseSideBar}
            ></div>
          </div>
        )}
      </div>

      <div className="flex p-9 text-white">
        <Link to="/">
          <img src={Logo} alt="" className="h-16 rounded-sm"></img>
        </Link>
        <div className="flex items-start flex-col ml-3">
          <p className="text-4xl">AReSS</p>
          <p className="xs:hidden md:block">
            Agenzia Regionale Strategica per la Salute ed il Sociale
          </p>
        </div>
      </div>
    </div>
  );
};
export default Header;
