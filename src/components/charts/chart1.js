import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";

const Chart1 = (patology) => {
  const [isRateOpen, setRateOpen] = useState(false);
  const [RateName, setRateName] = useState("Tasso standard");
  const [selectedRate, setSelectedRate] = useState("Tasso standard");

  const [isYearVisible, setYearVisible] = useState(false);
  const [selectedYears, setSelectedYears] = useState("2020");

  const [isSexOpen, setSexOpen] = useState(false);
  const [selectedSex, setSelectedSex] = useState("Maschi e Femmine");

  const [isAgeVisible, setAgeVisible] = useState(false);
  const [selectedAge, setSelectedAge] = useState([
    "0-4",
    "5-9",
    "10-14",
    "15-19",
    "20-24",
    "25-29",
    "30-34",
    "35-39",
    "40-44",
    "45-49",
    "50-54",
    "55-59",
    "60-64",
    "65-69",
    "70-74",
    "75-79",
    "80-84",
    "85-89",
    ">=90",
  ]);

  const [allTumorPopulation, setAllTumorPopulation] = useState([]);

  const sendFilter = async (filter) => {
    try {
      console.log("filter:", filter);

      const response = await fetch(
        `http://localhost:8000/ricevi-filtri`,
        {
          method: "POST",
          headers: {
            'Accept':'application/json',
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filter),
        }
      );
      if (response.ok) {
        console.log("Filter send succesfully!");
        console.log(response.json());
      } else {
        console.error("Error to send filter");
      }
    } catch (error) {
      console.error("General error:", error);
    }
  };

  const handleChangeFilters = () => {
    const newFilters = {
      Patologia: patology.name,
      filtri: {
        years: `${selectedYears}`,
        eta: `${selectedAge}`,
        sex: `${selectedSex}`,
      },
    };
    sendFilter(newFilters);
  };

  useEffect(() => {
    handleChangeFilters();
  }, [selectedYears, selectedAge, selectedSex]);

  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: "2020", checked: true },
    { id: 2, label: "2019", checked: false },
    { id: 3, label: "2018", checked: false },
    { id: 4, label: "2017", checked: false },
    { id: 5, label: "2016", checked: false },
    { id: 6, label: "2015", checked: false },
    { id: 7, label: "2014", checked: false },
    { id: 8, label: "2013", checked: false },
    { id: 9, label: "2012", checked: false },
    { id: 10, label: "2011", checked: false },
    { id: 11, label: "2010", checked: false },
    { id: 12, label: "2009", checked: false },
    { id: 13, label: "2008", checked: false },
    { id: 14, label: "2007", checked: false },
    { id: 15, label: "2006", checked: false },
  ]);

  // SELECTABLE AGES
  const [ageOptions, setAgeOptions] = useState([
    { id: 1, label: "0-4", checked: true },
    { id: 2, label: "5-9", checked: true },
    { id: 3, label: "10-14", checked: true },
    { id: 4, label: "15-19", checked: true },
    { id: 5, label: "20-24", checked: true },
    { id: 6, label: "25-29", checked: true },
    { id: 7, label: "30-34", checked: true },
    { id: 8, label: "35-39", checked: true },
    { id: 9, label: "40-44", checked: true },
    { id: 10, label: "45-49", checked: true },
    { id: 11, label: "50-54", checked: true },
    { id: 12, label: "55-59", checked: true },
    { id: 13, label: "60-64", checked: true },
    { id: 14, label: "65-69", checked: true },
    { id: 15, label: "70-74", checked: true },
    { id: 16, label: "75-79", checked: true },
    { id: 17, label: "80-84", checked: true },
    { id: 18, label: "85-89", checked: true },
    { id: 19, label: ">=90", checked: true },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermAge, setSearchTermAge] = useState("");

  // CLOSING/OPENING FILTERS
  const toggleDropdownFiltri = (dropdown) => {
    switch (dropdown) {
      case "rate":
        setRateOpen(!isRateOpen);
        setYearVisible(false);
        setSexOpen(false);
        setAgeVisible(false);
        break;
      case "sex":
        setRateOpen(false);
        setYearVisible(false);
        setSexOpen(!isSexOpen);
        setAgeVisible(false);
        break;
      case "years":
        setRateOpen(false);
        setYearVisible(!isYearVisible);
        setSexOpen(false);
        setAgeVisible(false);
        break;
      case "ages":
        setAgeVisible(!isAgeVisible);
        setSexOpen(false);
        setYearVisible(false);
        setRateOpen(false);
        break;
      default:
        setAgeVisible(false);
        setYearVisible(false);
        setAgeVisible(false);
        setRateOpen(false);
    }
  };

  const handleYearVisible = () => {
    setYearVisible(!isYearVisible);
  };

  const handleCheckboxChange = (id) => {
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      );

      const selectedYears = updatedCheckboxes
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.label);

      setSelectedYears(selectedYears);
      console.log("selected Years", selectedYears);
      return updatedCheckboxes;
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // CLEANING YEARS
  const handleClearAll = () => {
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = prevCheckboxes.map((checkbox) => ({
        ...checkbox,
        checked: false,
      }));
      setSelectedYears([]);

      return updatedCheckboxes;
    });
  };
  // SELECT ALL YEARS
  const handleSelectAll = () => {
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = prevCheckboxes.map((checkbox) => ({
        ...checkbox,
        checked: checkbox.label
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      }));
      setSelectedYears(
        updatedCheckboxes
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox.label)
      );
      return updatedCheckboxes;
    });
  };
  // SELECT ALL AGES
  const handleSelectAllYears = () => {
    setAgeOptions((prevAgeOptions) => {
      const updateAge = prevAgeOptions.map((option) => ({
        ...option,
        checked:
          option.label.toLowerCase().includes(searchTermAge.toLowerCase()) ||
          option.checked,
      }));
      setSelectedAge(
        updateAge
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox.label)
      );
      return updateAge;
    });
  };

  // CLEANING AGE
  const handleSelectAllAge = () => {
    setAgeOptions((prevAgeOptions) => {
      const updateAge = prevAgeOptions.map((option) => ({
        ...option,
        checked: false,
      }));
      setSelectedAge([]);
      return updateAge;
    });
  };

  const handleAgeOptionChange = (id) => {
    setAgeOptions((prevAgeOptions) => {
      const updateAge = prevAgeOptions.map((option) =>
        option.id === id ? { ...option, checked: !option.checked } : option
      );
      const selectedAge = updateAge
        .filter((option) => option.checked)
        .map((option) => option.label);
      setSelectedAge(selectedAge);
      console.log("Selected ages", selectedAge);
      return updateAge;
    });
  };

  const filteredCheckboxes = checkboxes.filter((checkbox) =>
    checkbox.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEtaOptions = ageOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTermAge.toLowerCase())
  );

  const handleRate = (RateName) => {
    if (selectedRate !== RateName) {
      setSelectedRate(RateName);
    }
    setRateOpen(!isRateOpen);
  };

  const handleSex = () => {
    setSexOpen(!isSexOpen);
  };

  // RESTORE TO INITIAL SETTINGS
  const restore = () => {
    setSelectedRate("Tasso standard");
    setRateName("Tasso standard");
    setSelectedYears([]);
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = prevCheckboxes.map((checkbox) => ({
        ...checkbox,
        checked: false,
      }));
      setSelectedYears([]);
      return updatedCheckboxes;
    });
    setAgeOptions((prevAgeOptions) => {
      const updateAge = prevAgeOptions.map((option) => ({
        ...option,
        checked:
          option.label.toLowerCase().includes(searchTermAge.toLowerCase()) ||
          option.checked,
      }));
      setSelectedAge(
        updateAge
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox.label)
      );
      return updateAge;
    });
    setSelectedSex("Maschi e Femmine");
    setSelectedAge([]);
    console.log("RATE AFTER RESTORATION:", selectedRate);
    console.log("YEARS AFTER RESTORATION:", selectedYears);
    console.log("SEX AFTER RESTORATION:", selectedSex);
    console.log("AGE AFTER RESTORATION:", selectedAge);
  };

  highchartsMore(Highcharts);

  // CHART SETTINGS
  const options = {
    title: {
      text: "Incidenza Polmonare per ASL e Regione",
    },
    subtitle: {
      text: `polmone, ${selectedYears},TS, Regione, Asl, ${selectedSex}, ${selectedAge}`,
    },
    xAxis: {
      title: null,
      // categories: asl,
    },
    yAxis: {
      title: null,
      tickPixelInterval: 85,
      labels: {
        formatter: function () {
          return this.value;
        },
      },
      // plotLines: regionRange,
    },
    chart: {
      type: "scatter",
      inverted: true,
    },
    plotOptions: {
      scatter: {
        marker: {
          symbol: "square",
          lineColor: null,
          lineWidth: 2,
          radius: 4,
          states: {
            hover: {
              enabled: false,
            },
          },
        },
      },
      series: {
        color: "black",
      },
    },
    series: [
      {
        name: "Incidenza",
        // data: values,
        zIndex: 1,
        tooltip: {
          pointFormat: RateName + ": {point.y}",
        },
      },
      {
        name: "Intervallo",
        type: "columnrange",
        // data: intervals,
        pointWidth: 0,
        zIndex: 0,
        tooltip: {
          pointFormat: "lcl: {point.low} <br/> ucl: {point.high}",
        },
      },
    ],
  };

  return (
    <div>
      <div className="mt-5">
        {/* FILTERS */}
        <div className="flex xs:flex-col sm:flex-row items-center space-x-3 xs:pl-2 md:pl-4 lg:pl-16 w-auto justify-between ">
          <div className="flex sm:flex-row items-center space-x-3 xs:pl-2 sm:pl-4 w-auto ">
            {/* RATE */}
            <div className="xs:w-20 md:w-28 lg:w-32 ">
              <button
                className="xs:h-7 md:h-5 xs:w-20 md:w-28 lg:w-32 xs:text-xs md:text-base bg-gray-200 border border-black flex items-center justify-center"
                onClick={() => {
                  handleRate(selectedRate);
                  toggleDropdownFiltri("rate");
                }}
              >
                {RateName}
              </button>
              {isRateOpen && (
                <div className="pr-32">
                  <div className=" flex flex-col p-1 h-20 w-40 bg-white border border-gray-400 absolute z-10 rounded-md">
                    <div class="flex mt-1">
                      <input
                        checked={RateName === "Tasso standard"}
                        id="TassoStandard"
                        type="radio"
                        value="Tasso standard"
                        name="rate"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
                        onClick={() => {
                          setRateName("Tasso standard");
                        }}
                      />
                      <label
                        for="TassoStandard"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Tasso standard
                      </label>
                    </div>
                    <div className="flex ">
                      <input
                        checked={RateName === "Tasso grezzo"}
                        id="TassoGrezzo"
                        type="radio"
                        value="Tasso grezzo"
                        name="rate"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                        onClick={() => {
                          setRateName("Tasso grezzo");
                        }}
                      />
                      <label
                        for="TassoGrezzo"
                        className=" ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Tasso grezzo
                      </label>
                    </div>
                    <div className="flex ">
                      <input
                        checked={RateName === "SIR"}
                        id="SIR"
                        type="radio"
                        value="SIR"
                        name="rate"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                        onClick={() => {
                          setRateName("SIR");
                        }}
                      />
                      <label
                        for="SIR"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        SIR
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* YEARS */}
            <div className="xs:w-20  md:w-28 lg:w-32">
              <button
                className="xs:h-7 md:h-5 xs:w-20 md:w-28 lg:w-32 bg-gray-200 border border-black flex items-center justify-center "
                onClick={() => {
                  handleYearVisible();
                  toggleDropdownFiltri("years");
                }}
              >
                {selectedYears.length > 0 ? (
                  selectedYears.length > 3 ? (
                    <p className="xs:text-xs md:text-base">
                      {" "}
                      {selectedYears.length} selezionati
                    </p>
                  ) : (
                    selectedYears.join(", ")
                  )
                ) : (
                  "Anni"
                )}
              </button>
              {isYearVisible && (
                <div className="w-36 h-40 overflow-auto flex flex-col  bg-white border border-black absolute z-10 rounded-md">
                  <input
                    type="text"
                    placeholder="Ricerca..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-28 m-1"
                  ></input>
                  <button
                    className="border hover:bg-gray-400 hover:text-white rounded-lg m-1"
                    onClick={handleClearAll}
                  >
                    Pulisci
                  </button>
                  <button onClick={handleSelectAll}>Seleziona tutti</button>
                  {filteredCheckboxes.map((checkbox) => (
                    <div
                      className={`flex w-auto hover:bg-gray-400 pl-1 pr-1 ${
                        checkbox.checked ? "bg-slate-300" : ""
                      } `}
                      key={checkbox.id}
                    >
                      <input
                        type="checkbox"
                        id={`checkbox-${checkbox.id}`}
                        checked={checkbox.checked}
                        onChange={() => handleCheckboxChange(checkbox.id)}
                      />
                      <label
                        className="ml-3"
                        htmlFor={`checkbox-${checkbox.id}`}
                      >
                        {checkbox.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* SEX */}
            <div className="xs:w-20  md:w-28 lg:w-32">
              <button
                className="xs:h-7 md:h-5 xs:w-20 md:w-28 lg:w-32 bg-gray-200 border border-black flex items-center justify-center"
                onClick={() => {
                  handleSex(selectedSex);
                  toggleDropdownFiltri("sex");
                }}
              >
                <p
                  className={
                    selectedSex === "Maschi e Femmine" &&
                    "xs:text-xs lg:text-sm"
                  }
                >
                  {selectedSex}
                </p>
              </button>
              {isSexOpen && (
                <div className="pr-32">
                  <div className=" flex flex-col p-1 h-20 w-44 bg-white border border-gray-400 rounded-md absolute z-10">
                    <div class="flex mt-1">
                      <input
                        checked={selectedSex === "Maschi e Femmine"}
                        id="Maschi e Femmine"
                        type="radio"
                        value="Maschi e Femmine"
                        name="sex"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
                        onClick={() => {
                          setSelectedSex("Maschi e Femmine");
                        }}
                      />
                      <label
                        for="Maschi e Femmine"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Maschi e Femmine
                      </label>
                    </div>
                    <div class="flex mt-1">
                      <input
                        checked={selectedSex === "Maschi"}
                        id="Maschi"
                        type="radio"
                        value="Maschi"
                        name="sex"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
                        onClick={() => {
                          setSelectedSex("Maschi");
                        }}
                      />
                      <label
                        for="Maschi"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Maschi
                      </label>
                    </div>
                    <div class="flex mt-1">
                      <input
                        checked={selectedSex === "Femmine"}
                        id="Femmine"
                        type="radio"
                        value="Femmine"
                        name="sex"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
                        onClick={() => {
                          setSelectedSex("Femmine");
                        }}
                      />
                      <label
                        for="Femmine"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Femmine
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* AGE */}
            <div className="xs:w-20 md:w-28 lg:w-32">
              <button
                className="xs:h-7 md:h-5 xs:w-20 md:w-28 lg:w-32 bg-gray-200 border border-black flex items-center justify-center"
                onClick={() => {
                  handleAgeOptionChange();
                  toggleDropdownFiltri("ages");
                }}
              >
                {selectedAge.length > 0 ? (
                  selectedAge.length > 3 ? (
                    <p className="xs:text-xs md:text-base">
                      {selectedAge.length} selezionati
                    </p>
                  ) : (
                    selectedAge.join(", ")
                  )
                ) : (
                  "Età"
                )}
              </button>
              {isAgeVisible && (
                <div className="w-36 h-40 overflow-auto flex flex-col items-center bg-white border border-black absolute z-10 rounded-md">
                  <input
                    type="text"
                    placeholder="Ricerca..."
                    value={searchTermAge}
                    onChange={(e) => setSearchTermAge(e.target.value)}
                    className="w-28 m-1"
                  />
                  <button
                    className="w-28 border hover:bg-gray-400 hover:text-white rounded-lg m-1"
                    onClick={handleSelectAllAge}
                  >
                    Pulisci
                  </button>
                  <button onClick={handleSelectAllYears}>Seleziona tutti</button>
                  {filteredEtaOptions.map((option) => (
                    <div
                      className={` w-full flex hover:bg-gray-400 pl-1 pr-1 ${
                        option.checked ? "bg-slate-300" : ""
                      } `}
                      key={option.id}
                    >
                      <input
                        type="checkbox"
                        id={`checkbox-age-${option.id}`}
                        checked={option.checked}
                        onChange={() => handleAgeOptionChange(option.id)}
                      />
                      <label
                        className="ml-3"
                        htmlFor={`checkbox-age-${option.id}`}
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* IMPORT/EXPORT */}
          <div className="flex xs:mt-2 sm:mt-0 flex-row items-center space-x-3  w-auto ">
            <div className="flex space-x-3 xs:pr-1 md:pr-0 lg:pr-8 ">
              <button
                className="xs:h-7 md:h-5 xs:w-16 md:w-24 bg-gray-200 border border-black flex items-center justify-center"
                onClick={restore}
              >
                Ripristina
              </button>
              <button className="xs:h-7 md:h-5 xs:w-16 md:w-24 bg-gray-200 border border-black flex items-center justify-center">
                Esporta
              </button>
            </div>
          </div>
        </div>
        {/* CHART */}
        <div className="static z-40">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
      <button onClick={handleChangeFilters}>PREMI</button>
    </div>
  );
};

export default Chart1;