1. Move the util functions and related state from app.tsx to a useCustomHook.

import { useState, useEffect } from 'react';

export const useGearManagement = (initialGearList) => {
  const [gearListState, setGearListState] = useState(initialGearList);
  const [gearWarning, setGearWarning] = useState(false);
  const [wornOutGear, setWornOutGear] = useState("");

  useEffect(() => {
    const wornOutItem = gearListState.find((gear) => gear.kilometers > 749);
    if (wornOutItem) {
      setGearWarning(true);
      setWornOutGear(wornOutItem.name);
    } else {
      setGearWarning(false);
      setWornOutGear("");
    }
  }, [gearListState]);

  const addNewGear = (gearInput, setDuplicateError, setGearInput) => {
    // ... same logic as before
  };

  const updateGearKilometers = (newRun) => {
    // ... same logic as before
  };

  const deleteGear = (id) => {
    // ... same logic as before
  };

  return {
    gearListState,
    setGearListState,
    gearWarning,
    wornOutGear,
    addNewGear,
    updateGearKilometers,
    deleteGear,
  };
};


 in app.tsx

 const {
  gearListState,
  setGearListState,
  gearWarning,
  wornOutGear,
  addNewGear,
  updateGearKilometers,
  deleteGear,
} = useGearManagement(initialGearList);