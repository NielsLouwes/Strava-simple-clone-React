import "./styles.css";
import { useEffect, useState } from "react";
import {
  RunContainer,
  WarningMessage,
  Container,
  Button,
  DuplicateError,
} from "./App.styled";
import { NewRunForm } from "./NewRunForm";
import { GearListItem } from "./components/GearListItem/GearListItem";
import { useGearManagement } from "./hooks/useGearManagement";

export type Run = {
  title: string;
  distance: number;
  pickedGear: string;
};

export type GearList = {
  id: number;
  name: string;
  kilometers: number;
};

export default function App() {
  const [runCollection, setRunCollection] = useState<Run[]>([]);

  const {
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
    setGearListState
  } = useGearManagement();

  useEffect(() => {
    checkWornOutShoes();
  }, [gearListState]);

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
      {duplicateError ? (
        <DuplicateError>
          Shoe name already exists. Try a different name.
        </DuplicateError>
      ) : (
        ""
      )}
      <div>
        {gearListState &&
          gearListState.map((item) => (
            <GearListItem
              key={item.id}
              item={item}
              deleteGear={() => deleteGear(item.id)}
            />
          ))}
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
