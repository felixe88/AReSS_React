import React, { useState } from "react";

const CheckboxSelector = () => {
  const [isDivVisible, setDivVisibility] = useState(false);
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: "2020", checked: false },
    { id: 2, label: "2019", checked: false },
    { id: 3, label: "2018", checked: false },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleButtonClick = () => {
    setDivVisibility(!isDivVisible);
  };

  const handleCheckboxChange = (id) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearAll = () => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) => ({ ...checkbox, checked: false }))
    );
  };

  const handleSelectAll = () => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) => ({ ...checkbox, checked: true }))
    );
  };

  const filteredCheckboxes = checkboxes.filter((checkbox) =>
    checkbox.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <button onClick={handleButtonClick}>Mostra/Nascondi</button>
      {isDivVisible && (
        <div>
          <input
            type="text"
            placeholder="Ricerca..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={handleSelectAll}>Seleziona tutti</button>
          {filteredCheckboxes.map((checkbox) => (
            <div key={checkbox.id}>
              <input
                type="checkbox"
                id={`checkbox-${checkbox.id}`}
                checked={checkbox.checked}
                onChange={() => handleCheckboxChange(checkbox.id)}
              />
              <label htmlFor={`checkbox-${checkbox.id}`}>
                {checkbox.label}
              </label>
            </div>
          ))}
          <button onClick={handleClearAll}>Pulisci tutti</button>
        </div>
      )}
    </div>
  );
};

export default CheckboxSelector;
