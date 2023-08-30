import { GearList } from "./App";

type Run = {
  title: string;
  distance: number;
  pickedGear: string;
};



const checkWornOutShoes = (gearListState: GearList[], setGearWarning: React.Dispatch<React.SetStateAction<boolean>>, setWornOutGear: React.Dispatch<React.SetStateAction<string>>) => {
  const wornOutItem = gearListState.find((gear) => gear.kilometers > 749);
  
  if (wornOutItem) {
    setGearWarning(true);
    setWornOutGear(wornOutItem.name);
  } else {
    setGearWarning(false);
    setWornOutGear("");
  }
};

const updateGearKilometers = (newRun: Run, gearListState: GearList[], setGearListState:  React.Dispatch<React.SetStateAction<GearList[]>>) => {
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
