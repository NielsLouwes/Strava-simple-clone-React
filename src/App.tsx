import "./styles.css";
import { gearList } from "./data";
import { useEffect, useState } from "react";
import { RunContainer, WarningMessage, Container, Button } from "./App.styled";
import { NewRunForm } from "./NewRunForm";
import { AppUtils } from "./App.utils";
import { GearListItem } from "./components/GearListItem/GearListItem";

export type Run = {
  title: string;
  distance: number;
  pickedGear: string;
};

export type GearList = {
  id: number;
  name: string;
  kilometers: number;
}

export default function App() {
  const [runCollection, setRunCollection] = useState<Run[]>([]);
  const [gearListState, setGearListState] = useState<GearList[]>(gearList); // 1. Put the entire gearList in state
  const [gearWarning, setGearWarning] = useState<boolean>(false);
  const [wornOutGear, setWornOutGear] = useState("");
  const [gearInput, setGearInput] = useState("");

  useEffect(() => {
    AppUtils.checkWornOutShoes(gearListState, setGearWarning, setWornOutGear);
  }, [gearListState]);

  // creating a new run gear object, adding that to our array , spread array , newgear object
  const addNewGear = () => {
    const checkDuplicates = gearListState.some(gear => gear.name.toLowerCase() === gearInput.toLocaleLowerCase());
    if (checkDuplicates) {
      setGearInput(""); 
      return;
    }
    if (gearInput.length > 0) {
      const newGear = {
        id: gearListState.length + 1, 
        name: gearInput,
        kilometers: 0
      };
      setGearListState([...gearListState, newGear]);
      setGearInput(""); 
    } else {
      alert("Please enter a shoe name."); 
    }
  };
  
  //delete gear
  const deleteGear = (id: number) => {
    const newGearList = gearListState.filter((item) => {
      return item.id != id;
    })
    setGearListState(newGearList)
  }


  // avoid duplicated gear when creating

  return (
    <div className="App">
      <Container>
        <h2>Gear list</h2>
        <form
          action="submit"
          onSubmit={(event) => {
            event.preventDefault();
            addNewGear();
          }}
        >
          <input
            type="text"
            placeholder="name of shoe"
            value={gearInput}
            onChange={(event) => setGearInput(event.target.value)}
          />
          <Button>+</Button>
        </form>
      </Container>
      <div>
        {gearListState &&
          gearListState.map((item) => <GearListItem key={item.id} item={item} deleteGear={deleteGear} />)}
      </div>
      {gearWarning && (
        <WarningMessage>
          *You have run over 750 kilometers with your pair of {wornOutGear}.
          Consider replacing them.
        </WarningMessage>
      )}
      <h2>Add new run</h2>
      <NewRunForm
        setRunCollection={setRunCollection}
        runCollection={runCollection}
        gearListState={gearListState}
        setGearListState={setGearListState}
      />
      <RunContainer>
        <h2>Runs</h2>
        {runCollection.length > 0 ? (
          runCollection.map((run: Run, index) => (
            <p key={index}>
              {run.title} - {run.distance} kms - {run.pickedGear}
            </p>
          ))
        ) : (
          <p>Add a run to get started</p>
        )}
      </RunContainer>
    </div>
  );
}
