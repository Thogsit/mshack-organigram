export const dataBezreg = {
  combos: [
    { id: "bezreg_leitung", label: "Leitung", combo: "bezreg_ms" },
    { id: "bezreg_abteilungen", label: "Abteilungen", combo: "bezreg_ms" },
    {
      id: "bezreg_regionale_angelegenheiten",
      label: "Regionale Angelegenheiten",

      combo: "bezreg_ms",
    },
    {
      id: "bezreg_gesundheitswesen",
      label: "Öffentliche Gesundheit und Soziales",
      combo: "bezreg_ms",
    },
    { id: "bezreg_umwelt", label: "Umwelt", combo: "bezreg_ms" },
    { id: "bezreg_notfall", label: "Gefahrenabwehr", combo: "bezreg_ms" },
    {
      id: "bezreg_bildung",
      label: "Bildung und Schulen",
      combo: "bezreg_ms",
    },
    {
      id: "bezreg_rechtsangelegenheiten",
      label: "Rechtsangelegenheiten und Governance",
      combo: "bezreg_ms",
    },
    { id: "bezreg_personal", label: "Personalwesen", combo: "bezreg_ms" },
  ],
  nodes: [
    {
      combo: "bezreg_leitung",
      id: "bezreg_0",
      data: {
        name: "Dr. Silwedel",
        position: "Leitung",
        contact: "2318 / T",
      },
    },
    {
      combo: "bezreg_gesundheitswesen",
      id: "bezreg_1",
      data: {
        name: "Dr. Waßmann",
        position: "Medizinische Leitung",
        contact: "3126 / T",
      },
    },
    {
      combo: "bezreg_umwelt",
      id: "bezreg_2",
      data: {
        name: "Lauth, RBD'in",
        position: "Umweltangelegenheiten",
        contact: "1413 / N",
      },
    },
    {
      combo: "bezreg_abteilungen",
      id: "bezreg_3",
      data: {
        name: "Dr. Waurick",
        position: "Regulierungsleitung",
        contact: "3126 / T",
      },
    },
    {
      combo: "bezreg_regionale_angelegenheiten",
      id: "bezreg_4",
      data: {
        name: "Dr. Zander-Kallerhoff",
        position: "Regionale Angelegenheiten",
        contact: "2510 / T",
      },
    },
    {
      combo: "bezreg_bildung",
      id: "bezreg_5",
      data: {
        name: "Scholz, LRSD'in",
        position: "Bildungsabteilung",
        contact: "4183 / N",
      },
    },
    {
      combo: "bezreg_notfall",
      id: "bezreg_6",
      data: {
        name: "Poguntke, LRD'in",
        position: "Gefahrenabwehr",
        contact: "1660 / T",
      },
    },
    {
      combo: "bezreg_umwelt",
      id: "bezreg_7",
      data: {
        name: "Sahrhage, LRD",
        position: "Umweltschutz",
        contact: "1538 / N",
      },
    },
    {
      combo: "bezreg_abteilungen",
      id: "bezreg_8",
      data: {
        name: "Beatrix-Heß, LRD'in",
        position: "Abteilungsleiterin",
        contact: "1447 / T",
      },
    },
    {
      combo: "bezreg_rechtsangelegenheiten",
      id: "bezreg_9",
      data: {
        name: "Dr. Waßmann",
        position: "Leitung Rechtsangelegenheiten",
        contact: "2043 / T",
      },
    },
    {
      combo: "bezreg_personal",
      id: "bezreg_10",
      data: {
        name: "Dr. Neubert, ORR'in",
        position: "Personalwesen",
        contact: "1446 / A",
      },
    },
    {
      combo: "bezreg_rechtsangelegenheiten",
      id: "bezreg_11",
      data: {
        name: "Schmidt, RD'in",
        position: "Rechtsberaterin",
        contact: "2043 / T",
      },
    },
    {
      combo: "bezreg_rechtsangelegenheiten",
      id: "bezreg_12",
      data: {
        name: "Poguntke, LRD'in",
        position: "Ordnungsrechtliche Angelegenheiten",
        contact: "2043 / T",
      },
    },
    {
      combo: "bezreg_personal",
      id: "bezreg_13",
      data: {
        name: "Grotendorst, RBr",
        position: "Personalentwicklung",
        contact: "1446 / A",
      },
    },
    {
      combo: "bezreg_personal",
      id: "bezreg_14",
      data: {
        name: "Knebelkamp, ORR",
        position: "Koordination Personalwesen",
        contact: "2510 / T",
      },
    },
  ],
  edges: [
    {
      target: "bezreg_leitung",
      source: "bezreg_abteilungen",
      label: "Überwacht",
    },
    {
      target: "bezreg_regionale_angelegenheiten",
      source: "bezreg_leitung",
      label: "Berichtet an",
    },
    {
      target: "bezreg_gesundheitswesen",
      source: "bezreg_leitung",
      label: "Berichtet an",
    },
    {
      target: "bezreg_umwelt",
      source: "bezreg_leitung",
      label: "Berichtet an",
    },
    {
      target: "bezreg_notfall",
      source: "bezreg_leitung",
      label: "Berichtet an",
    },
    {
      target: "bezreg_bildung",
      source: "bezreg_leitung",
      label: "Berichtet an",
    },
    {
      target: "bezreg_rechtsangelegenheiten",
      source: "bezreg_leitung",
      label: "Berichtet an",
    },
    {
      target: "bezreg_personal",
      source: "bezreg_leitung",
      label: "Berichtet an",
    },
    {
      target: "bezreg_rechtsangelegenheiten",
      source: "bezreg_gesundheitswesen",
      label: "Kooperiert mit",
    },
    {
      target: "bezreg_personal",
      source: "bezreg_gesundheitswesen",
      label: "Kooperiert mit",
    },
    {
      target: "bezreg_3",
      source: "bezreg_ms",
    },
    {
      target: "bezreg_1",
      source: "bezreg_ms",
    },
  ],
};
