import { Button } from "../../App.styled";
import styled from "styled-components";

type GearListFormProps = {
   addNewGear: () => void;
   gearInput: string;
   setGearInput: (value: React.SetStateAction<string>) => void;
   duplicateError: boolean
}

const GearInput = styled.input<{ duplicateError?: boolean }>`
  border: 1px solid ${props => props.duplicateError ? "red" : "initial"};
  color:  ${props => props.duplicateError ? "red" : "black"};
  padding: 5px;

  &:focus {
    border: 1px solid ${props => props.duplicateError ? "red" : "yourDesiredFocusColor"};
    outline: none; 
  }
`

export const GearListForm = ({addNewGear, gearInput, setGearInput, duplicateError}: GearListFormProps) => {
  return (
    <form
      action="submit"
      onSubmit={(event) => {
        event.preventDefault();
        addNewGear();
      }}
    >
      <GearInput
        type="text"
        placeholder="name of shoe"
        value={gearInput}
        onChange={(event) => setGearInput(event.target.value)}
        duplicateError={duplicateError}
      />
      <Button>+</Button>
    </form>
  );
};
