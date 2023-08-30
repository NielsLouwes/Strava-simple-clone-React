// in Future it will allow for deleting
// only show delete button if hovering over
import { DeleteButton, Container } from "./GearListItem.styled";

export const GearListItem = ({ item }) => {
  return (
    <Container>
      <p key={item.id}>
        {item.name} - {item.kilometers} km
      </p>
      <DeleteButton>Delete</DeleteButton>
    </Container>
  );
};
