// in Future it will allow for deleting
// only show delete button if hovering over

const GearListItem = () => {
  return (
    <>
      <p key={item.id}>
        {item.name} - {item.kilometers} km
      </p>
      <DeleteButton>delete</DeleteButton>
    </>
  );
};
