import { useEffect, useState } from "react";
import { GearList, Run } from "../App";
import { gearList } from "../data";

export const useGearManagement = () => {
  const [gearListState, setGearListState] = useState(gearList);
  const [gearWarning, setGearWarning] = useState(false);
  const [wornOutGear, setWornOutGear] = useState("");
  const [gearInput, setGearInput] = useState("");
  const [duplicateError, setDuplicateError] = useState(false);

  const checkWornOutShoes = () => {
    const wornOutItem = gearListState.find((gear) => gear.kilometers > 749);
     console.log("Checking worn out items:", wornOutItem); // Debug line

    if (wornOutItem) {
      setGearWarning(true);
      setWornOutGear(wornOutItem.name);
    } else {
      setGearWarning(false);
      setWornOutGear("");
    }
  };

  const updateGearKilometers = (
    newRun: Run,
  ) => {
    const updatedGearList = gearListState.map((gear) => {
      if (gear.name === newRun.pickedGear) {
        return {
          ...gear,
          kilometers: gear.kilometers + Number(newRun.distance),
        };
      }
      return gear;
    });
    console.log("Updated gearList", updatedGearList); // Debug line
    setGearListState(updatedGearList);
    checkWornOutShoes();
  };

  const addNewGear = () => {
    const checkDuplicates = gearListState.some(
      (gear) => gear.name.toLowerCase() === gearInput.toLocaleLowerCase()
    );
    if (checkDuplicates) {
      setDuplicateError(true);
      return;
    }
    if (gearInput.length > 0) {
      const newGear = {
        id: gearListState.length + 1,
        name: gearInput,
        kilometers: 0,
      };
      setGearListState([...gearListState, newGear]);
      setGearInput("");
      setDuplicateError(false);
    } else {
      alert("Please enter a shoe name.");
    }
  };

  const deleteGear = (id: number) => {
    const newGearList = gearListState.filter((item) => {
      return item.id != id;
    });
    setGearListState(newGearList);
  };

   useEffect(() => {
    checkWornOutShoes();
  }, [gearListState]);

  return {
    checkWornOutShoes,
    addNewGear,
    deleteGear,
    updateGearKilometers,
    gearWarning,
    gearListState,
    wornOutGear,
    gearInput,
    duplicateError,
    setGearInput,
    setGearListState,
  };
};
