export const data = {
  combos: [
    { id: "gf", label: "Geschäftsführung", combo: "stw" },
    { id: "vp", label: "Vertrieb + Prozessmanagement", combo: "stw" },
    { id: "it", label: "IT-Management", combo: "stw" },
    { id: "marketing", label: "Produktmanagement + Marketing", combo: "stw" },
    { id: "hr", label: "Personal", combo: "stw" },
    { id: "finance", label: "Finanzmanagement + Finanzierung", combo: "stw" },
    { id: "mobility", label: "Mobilitätsbetrieb", combo: "stw" },
    { id: "energy", label: "Energiewirtschaft", combo: "stw" },
    {
      id: "environment",
      label: "Umweltschutz + Arbeitssicherheit",
      combo: "stw",
    },
    { id: "stw", label: "Stadtwerke", combo: "stadt" },
    {
      id: "stadt",
      label: "Stadt Münster",
      combo: "bezreg_ms",
    },
    {
      id: "bezreg_ms",
      label: "Bezierksregierung Münster",
      combo: "landNrw",
    },
    {
      id: "landNrw",
      label: "Land Nrw",
      combo: "de",
    },
    {
      id: "de",
      label: "Deutschland",
    },
  ],
  nodes: [
    {
      combo: "gf",
      id: "0",
      data: {
        name: "Sebastian Jurczyk",
        position: "Vorsitzender der GF",
      },
    },
    {
      combo: "gf",
      id: "1",
      data: {
        name: "Frank Gäfgen",
        position: "GF",
      },
    },
    {
      combo: "vp",
      id: "2",
      data: {
        name: "Thomas Richter",
        position: "Prozesssteuerung",
      },
    },
    {
      combo: "it",
      id: "3",
      data: {
        name: "Peter Knoll",
        position: "IT-Management",
      },
    },
    {
      combo: "vp",
      id: "4",
      data: {
        name: "Dirk Blasberg",
        position: "Portfoliomanagement",
      },
    },
    {
      combo: "marketing",
      id: "5",
      data: {
        name: "MK-PM",
        position: "Produktmanagement + Marketing",
      },
    },
    {
      combo: "hr",
      id: "6",
      data: {
        name: "KG-PE",
        position: "Personal",
      },
    },
    {
      combo: "finance",
      id: "7",
      data: {
        name: "Benedikt Schröder",
        position: "Finanzmanagement + Finanzierung",
      },
    },
    {
      combo: "mobility",
      id: "8",
      data: {
        name: "MB-WF",
        position: "Werkstatt Fahrzeugflotte",
      },
    },
    {
      combo: "mobility",
      id: "9",
      data: {
        name: "MB-FB",
        position: "Fahrbetrieb",
      },
    },
    {
      combo: "energy",
      id: "10",
      data: {
        name: "E",
        position: "Energie",
      },
    },
    {
      combo: "environment",
      id: "11",
      data: {
        name: "UA",
        position: "Umweltschutz + Arbeitssicherheit",
      },
    },
  ],
  edges: [
    { target: "gf", source: "vp", label: "Reports to" },
    { target: "gf", source: "it", label: "Reports to" },
    { target: "gf", source: "marketing", label: "Reports to" },
    { target: "gf", source: "hr", label: "Reports to" },
    { target: "gf", source: "finance", label: "Reports to" },
    { target: "gf", source: "mobility", label: "Reports to" },
    { target: "gf", source: "energy", label: "Reports to" },
    { target: "gf", source: "environment", label: "Reports to" },
  ],
};
