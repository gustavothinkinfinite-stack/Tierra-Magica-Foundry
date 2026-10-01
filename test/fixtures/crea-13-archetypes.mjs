export const CREA13_ARCHETYPES = Object.freeze([
  {
    id: "C13-01",
    key: "soldier",
    label: "Soldado",
    coverage: ["melee-combat", "armor", "shield", "guard", "parry", "trauma"]
  },
  {
    id: "C13-02",
    key: "engineer",
    label: "Ingeniera",
    coverage: ["engineering", "equipment", "devices", "rule-elements", "derived-state"]
  },
  {
    id: "C13-03",
    key: "healer",
    label: "Sanador",
    coverage: ["medicine", "healing", "health-max", "zero-health", "rests", "reconciliation"]
  },
  {
    id: "C13-04",
    key: "explorer",
    label: "Exploradora",
    coverage: ["ranged-combat", "movement", "position", "exploration"]
  },
  {
    id: "C13-05",
    key: "alchemist",
    label: "Alquimista",
    coverage: ["alchemy", "formula", "saturation", "bounded-recovery"]
  },
  {
    id: "C13-06",
    key: "channeler",
    label: "Canalizador",
    coverage: ["mana", "channeling", "ritualism", "spells", "sustained-magic", "contextual-defense"]
  },
  {
    id: "C13-07",
    key: "bonded",
    label: "Vinculado",
    coverage: ["familiar", "linked-action", "bond-capabilities", "no-second-turn", "no-second-mana-pool"]
  }
]);

export const CREA13_REQUIRED_PILLARS = Object.freeze([
  "melee-combat",
  "ranged-combat",
  "movement",
  "armor",
  "shield",
  "trauma",
  "engineering",
  "devices",
  "medicine",
  "healing",
  "alchemy",
  "saturation",
  "mana",
  "spells",
  "sustained-magic",
  "ritualism",
  "familiar",
  "reconciliation",
  "derived-state"
]);
