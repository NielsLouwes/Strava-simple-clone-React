import { Button } from "../../App.styled";

type GearListFormProps = {
   addNewGear: () => void;
   gearInput: string;
   setGearInput: (value: React.SetStateAction<string>) => void;
}

export const GearListForm = ({addNewGear, gearInput, setGearInput}: GearListFormProps) => {
  return (
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
  );
};
