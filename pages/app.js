import sample from "./sample.json";
import { useState } from "react";
import style from "./style.module.css";

export default function App() {
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedItemVariety, setSelectedItemVariety] = useState([]);

  const itemOnChange = (e) => {
    setSelectedItem(e.target.value);
    setSelectedItemVariety([]);
  };

  const varietyOnChange = (e, index) => {
    const newSelectedItemVariety = [...selectedItemVariety];
    newSelectedItemVariety[index] = e.target.value;
    setSelectedItemVariety(newSelectedItemVariety);
  };

  const currentItem = sample.items.find((item) => item.code === selectedItem);

  const itemGeneratedCode = () => {
    if (currentItem) {
      let generatedCode = "";
      const selectedOptions = currentItem.varieties.map((code, index) => {
        const variety = sample.varieties.find((v) => v.code === code);
        const selectedOption = variety.options.find(
          (option) => option.code === selectedItemVariety[index]
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

  const generatedCodeFunctionCall = () => {
    if (selectedItem && currentItem.varieties) {
      if (selectedItemVariety.length === currentItem.varieties.length) {
        if (selectedItemVariety.every((variety) => variety !== ""))
          return itemGeneratedCode();
      }
    }
    return "";
  };

  return (
    <div className={style.mainDiv}>
      <div className={style.innerDiv}>
        <label>Izvēlieties preci:</label>
        <select className={style.select} onChange={itemOnChange}>
          <option className={style.option} value={""}>
            ---Prece ---
          </option>
          {sample.items.map((item) => (
            <option className={style.option} key={item.code} value={item.code}>
              {item.description}
            </option>
          ))}
        </select>

        {currentItem && (
          <div>
            {currentItem.varieties.map((code, index) => {
              const variety = sample.varieties.find((v) => v.code === code);
              return (
                <div className={style.selectDiv} key={variety.code}>
                  <label className={style.option}>{variety.description}:</label>
                  <select
                    className={style.innerSelect}
                    onChange={(e) => varietyOnChange(e, index)}
                    value={selectedItemVariety[index] || ""}
                  >
                    <option className={style.option} value={""}>
                      --- {variety.description}---
                    </option>
                    {variety.options.map((option) => (
                      <option
                        className={style.option}
                        key={option.code}
                        value={option.code}
                      >
                        {option.description}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        )}

        <p className={style.p}>{generatedCodeFunctionCall()}</p>
      </div>
    </div>
  );
}
