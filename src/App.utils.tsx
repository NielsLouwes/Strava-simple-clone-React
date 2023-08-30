const checkWornOutShoes = (gearListState, setGearWarning, setWornOutGear) => {
  const wornOutItem = gearListState.find((gear) => gear.kilometers > 749);
  console.log("worn out item:", wornOutItem);
  if (wornOutItem) {
    setGearWarning(true);
    setWornOutGear(wornOutItem.name);
  } else {
    setGearWarning(false);
    setWornOutGear("");
  }
};

const updateGearKilometers = (newRun: Run, gearListState, setGearListState) => {
  // 2. function to match kilometers from run to our gear item
  const updatedGearList = gearListState.map((gear) => {
    if (gear.name === newRun.pickedGear) {
      return {
        ...gear,
        kilometers: gear.kilometers + Number(newRun.distance)
      };
    }
    return gear;
  });
  setGearListState(updatedGearList); // 3. Update the gearListState
};

export const AppUtils = {
  checkWornOutShoes,
  updateGearKilometers
};
