// in Future it will allow for deleting
// only show delete button if hovering over
import { GearList } from "../../App";
import { DeleteButton, Container } from "./GearListItem.styled";

type GearListItemProps = {
  item: GearList;
}

export const GearListItem = ({ item }: GearListItemProps) => {
  return (
    <Container>
      <p key={item.id}>
        {item.name} - {item.kilometers} km
      </p>
      <DeleteButton>Delete</DeleteButton>
    </Container>
  );
};
