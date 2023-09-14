import { GearList } from "./App";

type Run = {
  title: string;
  distance: number;
  pickedGear: string;
};

const checkWornOutShoes = (
  gearListState: GearList[],
  setGearWarning: React.Dispatch<React.SetStateAction<boolean>>,
  setWornOutGear: React.Dispatch<React.SetStateAction<string>>
) => {
  const wornOutItem = gearListState.find((gear) => gear.kilometers > 749);

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
  gearListState: GearList[],
  setGearListState: React.Dispatch<React.SetStateAction<GearList[]>>
) => {
  // 2. function to match kilometers from run to our gear item
  const updatedGearList = gearListState.map((gear) => {
    if (gear.name === newRun.pickedGear) {
      return {
        ...gear,
        kilometers: gear.kilometers + Number(newRun.distance),
      };
    }
    return gear;
  });
  setGearListState(updatedGearList); 
};

const addNewGear = (
  gearListState: GearList[],
  gearInput: string,
  setDuplicateError: React.Dispatch<React.SetStateAction<boolean>>,
  setGearListState: React.Dispatch<React.SetStateAction<GearList[]>>,
  setGearInput: React.Dispatch<React.SetStateAction<string>>
) => {
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

const deleteGear = (
  id: number,
  gearListState: GearList[],
  setGearListState: React.Dispatch<React.SetStateAction<GearList[]>>
) => {
  const newGearList = gearListState.filter((item) => {
    return item.id != id;
  });
  setGearListState(newGearList);
};

export const AppUtils = {
  checkWornOutShoes,
  updateGearKilometers,
  deleteGear,
  addNewGear,
};
