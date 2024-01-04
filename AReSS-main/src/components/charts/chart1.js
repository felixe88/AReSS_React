import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more"; // Importa il modulo highcharts-more per columnrange

const Chart1 = (patology) => {
  const [isTassoOpen, setTassoOpen] = useState(false);
  const [TassoName, setTassoName] = useState("Tasso standard");
  const [selectedTasso, setSelectedTasso] = useState("Tasso standard");

  const [isAnnoVisible, setAnnoVisible] = useState(false);
  const [selectedAnni, setSelectedAnni] = useState("2020");

  const [isSessoOpen, setSessoOpen] = useState(false);
  const [selectedSesso, setSelectedSesso] = useState("Maschi e Femmine");

  const [isEtaVisible, setEtaVisible] = useState(false);
  const [selectedEta, setSelectedEta] = useState([
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

  const [allPopolazioneTumori, setAllPopolazioneTumori] = useState([]);

  // const [filtro, setFiltro]= useState({
  //     Patologia: patology.name,
  //     filtri: {
  //         anno: `${selectedAnni}`,
  //         eta: `${selectedEta}`,
  //         sesso: `${selectedSesso}`,
  //     },
  // });

  const sendFilter = async (filter) => {
    try {
      console.log("filtri:", filter);
      const response = await fetch(
        "http://localhost:8765/chart1/handleFilters",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filter),
        }
      );

      if (response.ok) {
        console.log("Filter send succesfully!");
      } else {
        console.error("Error to send filter");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChangeFilters = () => {
    const newFilters = {
      Patologia: patology.name,
      filtri: {
        anno: `${selectedAnni}`,
        eta: `${selectedEta}`,
        sesso: `${selectedSesso}`,
      },
    };
    sendFilter(newFilters);
  };

  useEffect(() => {
    handleChangeFilters();
  }, [selectedAnni, selectedEta, selectedSesso]);

  // useEffect(() => {
  // const gestisciInvio = async () => {
  //     try {
  //         console.log("FILTRI:",filtro);
  //         const risposta = await fetch('http://localhost:8765/ricevi-dati', {
  //             method: 'POST',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 // Aggiungi eventuali altri header necessari (token di autenticazione, ecc.)
  //             },
  //             body: JSON.stringify(filtro),
  //             credentials: 'include',  // Aggiungi questa opzione per includere le credenziali nella richiesta
  //             mode: 'cors',  // Imposta il modo CORS
  //         });

  //         if (!risposta.ok) {
  //             throw new Error('Errore durante la richiesta al server');
  //         }

  //         // Puoi gestire la risposta se necessario
  //         const datiRisposta = await risposta.json();
  //         console.log(datiRisposta);
  //     } catch (errore) {
  //         console.error('Errore durante l\'invio dei dati:', errore.message);
  //     }
  // };

  // gestisciInvio();
  // }, [selectedAnni, selectedEta]);

  // const gestisciInvio = async () => {
  //     try {
  //       const risposta = await fetch('http://localhost:8765/ricevi-dati', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           // Aggiungi eventuali altri header necessari (token di autenticazione, ecc.)
  //         },
  //         body: JSON.stringify(filtro),
  //       });

  //       if (!risposta.ok) {
  //         throw new Error('Errore durante la richiesta al server');
  //       }

  //       // Puoi gestire la risposta se necessario
  //       const datiRisposta = await risposta.json();
  //       console.log(datiRisposta);
  //     } catch (errore) {
  //       console.error('Errore durante l\'invio dei dati:', errore.message);
  //     }
  //   };

  //************************************************************************/
  // const fetchPopolazioneTumori = async (pageNumber, pageSize) => {
  //     try {
  //         const response = await fetch(`http://localhost:8765/comunePopolazioneTumoriTest?page=${pageNumber}&limit=${pageSize}`);
  //         if (!response.ok) {
  //             throw new Error('Errore nella richiesta HTTP');
  //         }
  //         const data = await response.json();
  //         console.log("data", data)
  //         return data;

  //     } catch (error) {
  //         console.error('Errore:', error);
  //         return null;
  //     }
  // };
  // const fetchAllPopolazioneTumori = async () => {
  //     try {
  //         const dataPage1 = await fetchPopolazioneTumori(1, 100000);
  //         const dataPage2 = await fetchPopolazioneTumori(2, 100000);

  //         const allData = [...dataPage1, ...dataPage2];
  //         console.log(allData);
  //         setAllPopolazioneTumori(allData);
  //         console.log(allPopolazioneTumori)
  //     } catch (error) {
  //         console.error('Errore durante il recupero dei dati:', error);
  //     }
  // };
  // useEffect(() => {
  //     fetchAllPopolazioneTumori();

  // }, []);
  //************************************************************************/

  // ANNI SELEZIONABILI

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

  // ETA SELEZIONABILI
  const [etaOptions, setEtaOptions] = useState([
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
  const [searchTermEta, setSearchTermEta] = useState("");

  // CHIUSURA/APERTURA FILTRI
  const toggleDropdownFiltri = (dropdown) => {
    switch (dropdown) {
      case "tasso":
        setTassoOpen(!isTassoOpen);
        setAnnoVisible(false);
        setSessoOpen(false);
        setEtaVisible(false);
        break;
      case "sesso":
        setTassoOpen(false);
        setAnnoVisible(false);
        setSessoOpen(!isSessoOpen);
        setEtaVisible(false);
        break;
      case "anno":
        setTassoOpen(false);
        setAnnoVisible(!isAnnoVisible);
        setSessoOpen(false);
        setEtaVisible(false);
        break;
      case "età":
        setEtaVisible(!isEtaVisible);
        setSessoOpen(false);
        setAnnoVisible(false);
        setTassoOpen(false);
        break;
      default:
        setEtaVisible(false);
        setAnnoVisible(false);
        setEtaVisible(false);
        setTassoOpen(false);
    }
  };

  const handleAnnoVisible = () => {
    setAnnoVisible(!isAnnoVisible);
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

      setSelectedAnni(selectedYears);
      console.log("Anni selezionati", selectedYears);
      return updatedCheckboxes;
    });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  //  PULIZIA ANNI
  const handleClearAll = () => {
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = prevCheckboxes.map((checkbox) => ({
        ...checkbox,
        checked: false,
      }));
      setSelectedAnni([]);

      return updatedCheckboxes;
    });
  };
  // SELEZIONA TUTTI GLI ANNI
  const handleSelectAll = () => {
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = prevCheckboxes.map((checkbox) => ({
        ...checkbox,
        checked: checkbox.label
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      }));
      setSelectedAnni(
        updatedCheckboxes
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox.label)
      );
      return updatedCheckboxes;
    });
  };
  // SELEZIONA TUTTE LE ETA
  const handleSelectAllEta = () => {
    setEtaOptions((prevEtaOptions) => {
      const updateEta = prevEtaOptions.map((option) => ({
        ...option,
        checked:
          option.label.toLowerCase().includes(searchTermEta.toLowerCase()) ||
          option.checked,
      }));
      setSelectedEta(
        updateEta
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox.label)
      );
      return updateEta;
    });
  };

  // PULIZIA ETA
  const handleClearAllEta = () => {
    setEtaOptions((prevEtaOptions) => {
      const updateEta = prevEtaOptions.map((option) => ({
        ...option,
        checked: false,
      }));
      setSelectedEta([]);
      return updateEta;
    });
  };

  const handleEtaOptionChange = (id) => {
    setEtaOptions((prevEtaOptions) => {
      const updateEta = prevEtaOptions.map((option) =>
        option.id === id ? { ...option, checked: !option.checked } : option
      );
      const selectedEta = updateEta
        .filter((option) => option.checked)
        .map((option) => option.label);
      setSelectedEta(selectedEta);
      console.log("Età selezionate", selectedEta);
      return updateEta;
    });
  };

  const filteredCheckboxes = checkboxes.filter((checkbox) =>
    checkbox.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEtaOptions = etaOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTermEta.toLowerCase())
  );

  const handleTasso = (tassoName) => {
    if (selectedTasso !== tassoName) {
      setSelectedTasso(tassoName);
    }
    setTassoOpen(!isTassoOpen);
  };

  const handleSesso = () => {
    setSessoOpen(!isSessoOpen);
  };

  // RIPRISTINA ALLE IMPOSTAZIONI INIZIALI
  const ripristina = () => {
    setSelectedTasso("Tasso standard");
    setTassoName("Tasso standard");
    setSelectedAnni([]);
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = prevCheckboxes.map((checkbox) => ({
        ...checkbox,
        checked: false,
      }));
      setSelectedAnni([]);
      return updatedCheckboxes;
    });
    setEtaOptions((prevEtaOptions) => {
      const updateEta = prevEtaOptions.map((option) => ({
        ...option,
        checked:
          option.label.toLowerCase().includes(searchTermEta.toLowerCase()) ||
          option.checked,
      }));
      setSelectedEta(
        updateEta
          .filter((checkbox) => checkbox.checked)
          .map((checkbox) => checkbox.label)
      );
      return updateEta;
    });
    setSelectedSesso("Maschi e Femmine");
    setSelectedEta([]);
    console.log("TASSO DOPO IL RIPRISTINO :", selectedTasso);
    console.log("ANNI DOPO IL RIPRISTINO :", selectedAnni);
    console.log("SESSO DOPO IL RIPRISTINO :", selectedSesso);
    console.log("ETA' DOPO IL RIPRISTINO :", selectedEta);
  };

  let data = allPopolazioneTumori.reduce((acc, item) => {
    acc[item.IDComune] = true;
    return acc;
  }, {});
  let arrayDiIDComune = Object.keys(data);

  highchartsMore(Highcharts);

  // IMPOSTAZIONI GRAFICO
  const options = {
    title: {
      text: "Incidenza Polmonare per ASL e Regione",
    },
    subtitle: {
      text: `polmone, ${selectedAnni},TS, Regione, Asl, ${selectedSesso}, ${selectedEta}`,
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
          pointFormat: TassoName + ": {point.y}",
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
        {/* FILTRI */}
        <div className="flex xs:flex-col sm:flex-row items-center space-x-3 xs:pl-2 md:pl-4 lg:pl-16 w-auto justify-between ">
          <div className="flex sm:flex-row items-center space-x-3 xs:pl-2 sm:pl-4 w-auto ">
            {/* TASSO */}
            <div className="xs:w-20 md:w-28 lg:w-32 ">
              <button
                className="xs:h-7 md:h-5 xs:w-20 md:w-28 lg:w-32 xs:text-xs md:text-base bg-gray-200 border border-black flex items-center justify-center"
                onClick={() => {
                  handleTasso(selectedTasso);
                  toggleDropdownFiltri("tasso");
                }}
              >
                {TassoName}
              </button>
              {isTassoOpen && (
                <div className="pr-32">
                  <div className=" flex flex-col p-1 h-20 w-40 bg-white border border-gray-400 absolute z-10 rounded-md">
                    <div class="flex mt-1">
                      <input
                        checked={TassoName === "Tasso standard"}
                        id="TassoStandard"
                        type="radio"
                        value="Tasso standard"
                        name="tassi"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
                        onClick={() => {
                          setTassoName("Tasso standard");
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
                        checked={TassoName === "Tasso grezzo"}
                        id="TassoGrezzo"
                        type="radio"
                        value="Tasso grezzo"
                        name="tassi"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                        onClick={() => {
                          setTassoName("Tasso grezzo");
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
                        checked={TassoName === "SIR"}
                        id="SIR"
                        type="radio"
                        value="SIR"
                        name="tassi"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                        onClick={() => {
                          setTassoName("SIR");
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
            {/* ANNO */}
            <div className="xs:w-20  md:w-28 lg:w-32">
              <button
                className="xs:h-7 md:h-5 xs:w-20 md:w-28 lg:w-32 bg-gray-200 border border-black flex items-center justify-center "
                onClick={() => {
                  handleAnnoVisible();
                  toggleDropdownFiltri("anno");
                }}
              >
                {selectedAnni.length > 0 ? (
                  selectedAnni.length > 3 ? (
                    <p className="xs:text-xs md:text-base">
                      {" "}
                      {selectedAnni.length} selezionati
                    </p>
                  ) : (
                    selectedAnni.join(", ")
                  )
                ) : (
                  "Anni"
                )}
              </button>
              {isAnnoVisible && (
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
            {/* SESSO */}
            <div className="xs:w-20  md:w-28 lg:w-32">
              <button
                className="xs:h-7 md:h-5 xs:w-20 md:w-28 lg:w-32 bg-gray-200 border border-black flex items-center justify-center"
                onClick={() => {
                  handleSesso(selectedSesso);
                  toggleDropdownFiltri("sesso");
                }}
              >
                <p
                  className={
                    selectedSesso === "Maschi e Femmine" &&
                    "xs:text-xs lg:text-sm"
                  }
                >
                  {selectedSesso}
                </p>
              </button>
              {isSessoOpen && (
                <div className="pr-32">
                  <div className=" flex flex-col p-1 h-20 w-44 bg-white border border-gray-400 rounded-md absolute z-10">
                    <div class="flex mt-1">
                      <input
                        checked={selectedSesso === "Maschi e Femmine"}
                        id="Maschi e Femmine"
                        type="radio"
                        value="Maschi e Femmine"
                        name="sesso"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
                        onClick={() => {
                          setSelectedSesso("Maschi e Femmine");
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
                        checked={selectedSesso === "Maschi"}
                        id="Maschi"
                        type="radio"
                        value="Maschi"
                        name="sesso"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
                        onClick={() => {
                          setSelectedSesso("Maschi");
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
                        checked={selectedSesso === "Femmine"}
                        id="Femmine"
                        type="radio"
                        value="Femmine"
                        name="sesso"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  "
                        onClick={() => {
                          setSelectedSesso("Femmine");
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
            {/* ETA' */}
            <div className="xs:w-20 md:w-28 lg:w-32">
              <button
                className="xs:h-7 md:h-5 xs:w-20 md:w-28 lg:w-32 bg-gray-200 border border-black flex items-center justify-center"
                onClick={() => {
                  handleEtaOptionChange();
                  toggleDropdownFiltri("età");
                }}
              >
                {selectedEta.length > 0 ? (
                  selectedEta.length > 3 ? (
                    <p className="xs:text-xs md:text-base">
                      {selectedEta.length} selezionati
                    </p>
                  ) : (
                    selectedEta.join(", ")
                  )
                ) : (
                  "Età"
                )}
              </button>
              {isEtaVisible && (
                <div className="w-36 h-40 overflow-auto flex flex-col items-center bg-white border border-black absolute z-10 rounded-md">
                  <input
                    type="text"
                    placeholder="Ricerca..."
                    value={searchTermEta}
                    onChange={(e) => setSearchTermEta(e.target.value)}
                    className="w-28 m-1"
                  />
                  <button
                    className="w-28 border hover:bg-gray-400 hover:text-white rounded-lg m-1"
                    onClick={handleClearAllEta}
                  >
                    Pulisci
                  </button>
                  <button onClick={handleSelectAllEta}>Seleziona tutti</button>
                  {filteredEtaOptions.map((option) => (
                    <div
                      className={` w-full flex hover:bg-gray-400 pl-1 pr-1 ${
                        option.checked ? "bg-slate-300" : ""
                      } `}
                      key={option.id}
                    >
                      <input
                        type="checkbox"
                        id={`checkbox-eta-${option.id}`}
                        checked={option.checked}
                        onChange={() => handleEtaOptionChange(option.id)}
                      />
                      <label
                        className="ml-3"
                        htmlFor={`checkbox-eta-${option.id}`}
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* IMPORTA/ESPORTA */}
          <div className="flex xs:mt-2 sm:mt-0 flex-row items-center space-x-3  w-auto ">
            <div className="flex space-x-3 xs:pr-1 md:pr-0 lg:pr-8 ">
              <button
                className="xs:h-7 md:h-5 xs:w-16 md:w-24 bg-gray-200 border border-black flex items-center justify-center"
                onClick={ripristina}
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
