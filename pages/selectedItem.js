import sample from "./sample.json";
import { useState } from "react";

export default function App() {
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemVariety, setSelectedItemVariety] = useState([]);
  const [showText, setShowText] = useState(false);

  const itemOnChange = (e) => {
    setSelectedItem(e.target.value);
    setSelectedItemVariety([]);
    setShowText(false);
  };

  const varietyOnChange = (e, index) => {
    const newSelectedItemVariety = [...selectedItemVariety];
    newSelectedItemVariety[index] = e.target.value;
    setSelectedItemVariety(newSelectedItemVariety);
    setShowText(false);
  };

  const currentItem = sample.items.find(
    (item) => item.description === selectedItem
  );

  const itemgeneratedCode = () => {
    if (currentItem) {
      let generatedCode = "";
      const selectedOptions = currentItem.varieties.map((code, index) => {
        const variety = sample.varieties.find((v) => v.code === code);
        const selectedOption = variety.options.find(
          (option) => option.description === selectedItemVariety[index]
        );
        if (selectedOption) {
          return selectedOption.code;
        }
        return "";
      });
      generatedCode = `${currentItem.code}.${selectedOptions.join(".")}`;
      return generatedCode;
    }
    return "";
  };

  const showGeneratedText = () => {
    setShowText(true);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          border: "2px dotted",
          borderRadius: "5px",
          width: "300px",
          height: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label for="Items">Izvēlieties preci:</label>
        <select
          style={{
            marginTop:10,
            textAlign: "center",
            padding: "4px",
            width: "100%",
            boxSizing: "border-box",
            marginBottom: "15px",
          }}
          onChange={itemOnChange}
        >
          <option>---Prece ---</option>
          {sample.items.map((item) => (
            <option key={item.code}>{item.description}</option>
          ))}
        </select>

        {currentItem && (
          <div>
            {currentItem.varieties.map((code, index) => {
              const variety = sample.varieties.find((v) => v.code === code);
              return (
                <div
                  key={variety.code}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    marginBottom: "10px",
                    width: "100%",
                  }}
                >
                  <label>{variety.description}:</label>
                  <select
                    id={variety.code}
                    onChange={(e) => varietyOnChange(e, index)}
                    style={{
                      textAlign: "center",
                      padding: "4px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    <option>--- {variety.description}---</option>
                    {variety.options.map((option) => (
                      <option key={option.code}>{option.description}</option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        )}
        <button
          onClick={showGeneratedText}
          style={{
            position: "fixed",
            justifyContent: "center",
            padding: "10px",
            width: "100px",
            marginTop: 250,
          }}
        >
          ok
        </button>
        {showText && (
          <p style={{ marginTop: "20px" }}>
            {itemgeneratedCode()}
          </p>
        )}
      </div>
    </div>
  );
}
