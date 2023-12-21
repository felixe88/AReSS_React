import React, { useState, useEffect } from "react";


const Server = () => {
  const [PopolazioneTumori, setPopolazioneTumori] =useState(null);
  const [Comuni, setComuni] = useState(null);
  const [Asl, setAsl] = useState(null);
  const [Distretti, setDistretti] = useState(null);
  const [Classi, setClassi]= useState(null);
  const [Tabellone, setTabellone] = useState(null);

  // *********************COMUNE POPOLAZIONE TUMORI************************

  const fetchPopolazioneTumori = async (pageNumber, pageSize) => {
    try {
      const response = await fetch(`http://localhost:8765/comunePopolazioneTumoriTest?page=${pageNumber}&limit=${pageSize}`);
      if (!response.ok) {
        throw new Error('Errore nella richiesta HTTP');
      }
      const data = await response.json();
      console.log( "COMUNEPOPTUMORI",data)
      return data;

    } catch (error) {
      console.error('Errore:', error);
      return null;
    }
  };

  const fetchAllPopolazioneTumori = async () => {
    try {
      const dataPage1 = await fetchPopolazioneTumori(1, 100000);
      const dataPage2 = await fetchPopolazioneTumori(2, 100000);

      const allData = [...dataPage1, ...dataPage2];
      setPopolazioneTumori(allData);
      // console.log("PopolazioneTumori:",PopolazioneTumori);
      // console.log("PopolazioneTumori1:",dataPage1);
      // console.log("PopolazioneTumori2:",dataPage2);
    } catch (error) {
      console.error('Errore durante il recupero dei dati:', error);
    }
  };

  // *********************ASL************************

  const fetchAsl = async () => {
    try {
      const response = await fetch(`http://localhost:8765/asl`);
      if (!response.ok) {
        throw new Error('Errore nella richiesta HTTP');
      }
      var data = await response.json();
      // console.log("data", datax);
      if (data) {
        setAsl(prevAsl => {
          console.log("ASL:", prevAsl); // Log del valore precedente di Asl
          return data; // Impostazione del nuovo stato
        });
        return data;
      }
    } catch (error) {
      console.error('Errore:', error);
      return null;
    }
  };
  // *********************CLASSI************************
  const fetchClassi = async () => {
    try {
      const response = await fetch(`http://localhost:8765/classi`);
      if (!response.ok) {
        throw new Error('Errore nella richiesta HTTP');
      }
      var data = await response.json();
      console.log("data", data);
      if (data) {
        setClassi(prevClassi => {
          console.log("CLASSI:", prevClassi);
          return data;
        });
        return data;
      }
    } catch (error) {
      console.error('Errore:', error);
      return null;
    }
  };

// *********************DISTRETTI******************
const fetchDistretti = async () => {
  try {
    const response = await fetch(`http://localhost:8765/distretti`);
    if (!response.ok) {
      throw new Error('Errore nella richiesta HTTP');
    }
    var datax = await response.json();
    console.log("data", datax);
    if (datax) {
      setDistretti(prevDistretti => {
        console.log("Distretti:", prevDistretti);
        return datax;
      });
      return datax;
    }
  } catch (error) {
    console.error('Errore:', error);
    return null;
  }
};

// ******************TABELLONE*********************
const fetchTabellone = async () => {
  try {
    const response = await fetch(`http://localhost:8765/comuni/query`);
    if (!response.ok) {
      throw new Error('Errore nella richiesta HTTP');
    }
    var data = await response.json();
    console.log("TABELLONE", data);
    if (data) {
      // Aggiorna lo stato solo se i dati sono presenti
      setTabellone(prevTabellone => {
        console.log("Tabellone:", prevTabellone);
        return data;
      });
      return data;
    }
  } catch (error) {
    console.error('Errore:', error);
    return null;
  }
};

const fetchSomma = async () => {
  try {
    const response = await fetch(`http://localhost:8765/somma-popolazione`);
    if (!response.ok) {
      throw new Error('Errore nella richiesta HTTP');
    }
    var data = await response.json();
    console.log("TABELLONE", data);
    if (data) {
      // Aggiorna lo stato solo se i dati sono presenti
      setTabellone(prevTabellone => {
        console.log("Tabellone:", prevTabellone);
        return data;
      });
      return data;
    }
  } catch (error) {
    console.error('Errore:', error);
    return null;
  }
};

  useEffect(() => {
    // fetchAllPopolazioneTumori();
    // fetchAsl();
    // fetchTabellone();
    // fetchDistretti();
    // fetchClassi();
    fetchSomma();
  }, []);
  return (
    <div>
      UTILIZZO DEI DATI:
    </div>
  )
}
export default Server