export const gearList = [
  { id: 1, name: "Asics Trebuco Max", kilometers: 78 },
  { id: 2, name: "Nike Pegasus", kilometers: 550 },
  { id: 3, name: "Asics Novablast", kilometers: 400 }
];

export const sortedGearList = gearList.sort((a,b) => b.kilometers - a.kilometers);

console.log("sorted", sortedGearList)
