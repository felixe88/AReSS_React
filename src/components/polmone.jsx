import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { MultiSelect } from "primereact/multiselect";
import { Checkbox } from "primereact/checkbox";

const Polmone = () => {
  const [selectedCities, setSelectedCities] = useState(null);
  const [selectAllVisible, setSelectAllVisible] = useState(false);
  const [filteredCities, setFilteredCities] = useState(null);

  const fetchDataForPage = async (pageNumber, pageSize) => {
    try {
      const response = await fetch(`http://localhost:8765/comunePopolazioneTumoriTest?page=${pageNumber}&limit=${pageSize}`);
      if (!response.ok) {
        throw new Error('Errore nella richiesta HTTP');
      }
      const data = await response.json();
      console.log("data", data)
      return data;

    } catch (error) {
      console.error('Errore:', error);
      return null;
    }
  };
  
  const fetchData = async () => {
    try {
      const dataPage1 = await fetchDataForPage(1, 100000);
      const dataPage2 = await fetchDataForPage(2, 100000);

      const allData = [...dataPage1, ...dataPage2];
      console.log(allData);
      return allData

    } catch (error) {
      console.error('Errore durante il recupero dei dati:', error);
    }
  };
  
  useEffect(() => {
    fetchData(); 
  }, []); 
  
  const options = {
    title: {
      text: "Il tuo grafico Highcharts",
    },
    xAxis: {
      categories: ["A", "B", "C", "D", "E"],
    },
    yAxis: {
      title: {
        text: "Valori",
      },
    },
    series: [
      {
        name: "Dati",
        data: [1, 2, 3, 4, 5],
      },
    ],
  };

  const cities = [
    { name: "Select All", code: "SA" },
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const handleCheckboxChange = (e) => {
    if (e.checked) {
      setSelectedCities(filteredCities.map((city) => city.name));
    } else {
      setSelectedCities([]);
    }
  };

  const handleOnFilter = (e) => {
    setFilteredCities(e.filteredValue);
    setSelectAllVisible(e.query !== "");
  };

  useEffect(() => {
    // Imposta la visibilità della checkbox "Seleziona tutto" al valore iniziale
    setSelectAllVisible(false);
  }, [selectedCities]);

  return (
    <div className="h-40">
      <p>Grafici</p>
      <div>
        <Checkbox
          onChange={handleCheckboxChange}
          checked={selectAllVisible && selectedCities.length > 0}
        />
        <MultiSelect
          value={selectedCities}
          onChange={(e) => setSelectedCities(e.value)}
          options={cities}
          optionLabel="name"
          filter
          placeholder="Seleziona le città"
          maxSelectedLabels={3}
          className="w-24 border border-black bg-red-600"
          panelClassName="custom-multiSelect-panel p-4 bg-gray-100 border border-gray-300 rounded shadow-lg"
          onFilter={handleOnFilter}
        />

        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default Polmone;
