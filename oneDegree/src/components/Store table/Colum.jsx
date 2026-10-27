export const columns = () => [
  {
    name: "Pincode",
    selector: (row) => row.Pincode,
    sortable: true,
  },
  {
    name: "State",
    selector: (row) => row.State,
    sortable: true,
  },
  {
    name: "City",
    selector: (row) => row.City,
    sortable: true,
  },
  {
    name: "Subcity",
    selector: (row) => row.Subcity,
    sortable: true,
  },
  {
    name: "Full Address",
    selector: (row) => row.fullAddress,
    sortable: true,
  },

  {
    name: "BpName",
    selector: (row) => row.bpName,
    sortable: true,
  },
  {
    name: "Number",
    selector: (row) => row.number,
    sortable: true,
  },

];
