// Seis establecimientos operativos de ejemplo, no nuevos NPC del canon narrativo.
// Son Actors del compendio de Comercio, no del Bestiario.
export const COMMERCE_ACTOR_PRESETS = Object.freeze([
  { slug: "herrero-pueblo", name: "Herrero de pueblo", specialty: "smith", tier: "village", mode: "merchant", role: "Herrero local" },
  { slug: "mercader-caminos", name: "Mercader de caminos", specialty: "general", tier: "town", mode: "merchant", role: "Mercader general" },
  { slug: "alquimista-ciudad", name: "Alquimista de ciudad", specialty: "alchemy", tier: "city", mode: "merchant", role: "Alquimista" },
  { slug: "ingeniero-bronce", name: "Ingeniero de la Liga de Bronce", specialty: "engineering", tier: "city", mode: "merchant", role: "Ingeniero comerciante" },
  { slug: "comerciante-arcano", name: "Comerciante arcano metropolitano", specialty: "arcane", tier: "metropolis", mode: "merchant", role: "Comerciante arcano" },
  { slug: "cofre-botin", name: "Cofre de botín", specialty: "general", tier: "village", mode: "chest", role: "Contenedor de recompensas" }
]);

const actorIcon = "systems/tierra-magica/assets/icons/actor.svg";
const chestIcon = "systems/tierra-magica/assets/icons/equipment.svg";

export function commerceActorCatalog() {
  return COMMERCE_ACTOR_PRESETS.map((preset) => {
    const image = preset.mode === "chest" ? chestIcon : actorIcon;
    return {
      key: preset.slug,
      name: preset.name,
      type: "npc",
      img: image,
      system: {
        details: { role: preset.role, concept: "Establecimiento configurable por el DJ" },
        npcProfile: { enabled: false }
      },
      prototypeToken: {
        actorLink: true,
        name: preset.name,
        disposition: 0,
        texture: { src: image }
      },
      flags: {
        "tierra-magica": {
          commercePresetId: preset.slug,
          commerce: {
            mode: preset.mode,
            specialty: preset.specialty,
            tier: preset.tier,
            offers: []
          }
        }
      },
      ownership: { default: 2 }
    };
  });
}
