import React, { useState, useEffect } from "react";


const Server = () => {
  const [TumorsPopulation, setTumorsPopulation] = useState(null);
  const [Cities, setCities] = useState(null);
  const [ASL, setASL] = useState(null);
  const [Districts, setDistricts] = useState(null);
  const [Classes, setClasses]= useState(null);
  const [Scoreboard, setScoreboard] = useState(null);

  // *********************CITIES TUMORS POPULATION************************

  const fetchTumorsPopulation = async (pageNumber, pageSize) => {
    try {
      const response = await fetch(`http://localhost:8765/comunePopolazioneTumoriTest?page=${pageNumber}&limit=${pageSize}`);
      if (!response.ok) {
        throw new Error('Error in HTTP request');
      }
      const data = await response.json();
      console.log( "TUMORSPOPULATION",data)
      return data;

    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const fetchAllTumorsPopulation = async () => {
    try {
      const dataPage1 = await fetchTumorsPopulation(1, 100000);
      const dataPage2 = await fetchTumorsPopulation(2, 100000);

      const allData = [...dataPage1, ...dataPage2];
      setTumorsPopulation(allData);
      // console.log("TumorsPopulation:",TumorsPopulation);
      // console.log("TumorsPopulation1:",dataPage1);
      // console.log("TumorsPopulation2:",dataPage2);
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  // *********************ASL************************

  const fetchASL = async () => {
    try {
      const response = await fetch(`http://localhost:8765/asl`);
      if (!response.ok) {
        throw new Error('Error in HTTP request');
      }
      var data = await response.json();
      // console.log("data", datax);
      if (data) {
        setASL(prevASL => {
          console.log("ASL:", prevASL); // Previous value of ASL printed
          return data; // Setting the new state
        });
        return data;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };
  // *********************CLASSES************************
  const fetchClasses = async () => {
    try {
      const response = await fetch(`http://localhost:8765/classi`);
      if (!response.ok) {
        throw new Error('Error in HTTP request');
      }
      var data = await response.json();
      console.log("data", data);
      if (data) {
        setClasses(prevClasses => {
          console.log("CLASSES:", prevClasses);
          return data;
        });
        return data;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

// *********************DISTRICTS******************
const fetchDistricts = async () => {
  try {
    const response = await fetch(`http://localhost:8765/distretti`);
    if (!response.ok) {
      throw new Error('Error in HTTP request');
    }
    var datax = await response.json();
    console.log("data", datax);
    if (datax) {
      setDistricts(prevDistricts => {
        console.log("Districts:", prevDistricts);
        return datax;
      });
      return datax;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

// ******************SCOREBOARD*********************
const fetchScoreboard = async () => {
  try {
    const response = await fetch(`http://localhost:8765/comuni/query`);
    if (!response.ok) {
      throw new Error('Error in HTTP request');
    }
    var data = await response.json();
    console.log("SCOREBOARD", data);
    if (data) {
      // Update state only if data is present
      setScoreboard(prevScoreboard => {
        console.log("Scoreboard:", prevScoreboard);
        return data;
      });
      return data;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

const fetchSum = async () => {
  try {
    const response = await fetch(`http://localhost:8765/somma-popolazione`);
    if (!response.ok) {
      throw new Error('Error in HTTP request');
    }
    var data = await response.json();
    console.log("SCOREBOARD", data);
    if (data) {
      // Update state only if data is present
      setScoreboard(prevScoreboard => {
        console.log("Scoreboard:", prevScoreboard);
        return data;
      });
      return data;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

  useEffect(() => {
    // fetchAllTumorsPopulation();
    // fetchASL();
    // fetchScoreboard();
    // fetchDistricts();
    fetchClasses();
    // fetchSum();
  }, []);
  return (
    <div>
      <br></br>
    </div>
  )
}
export default Server