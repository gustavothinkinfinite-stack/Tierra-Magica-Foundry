// Inventario de retratos y tokens aprobados para el Bestiario.
// Las imágenes son recursos del sistema, nunca rutas específicas de un mundo.
export const APPROVED_BESTIARY_ART_SLUGS = Object.freeze([
  "civil",
  "bandido",
  "guardia",
  "soldado",
  "veterano",
  "canalizador-hostil",
  "lobo",
  "lobo-del-eco-muerto",
  "ciervo-astral",
  "arana-de-campanario",
  "jabali-igneo",
  "garza-de-cristal",
  "sabueso-espectral",
  "ogro",
  "centinela-de-bronce",
  "troll-dominante"
]);

export const PENDING_BESTIARY_ART_SLUGS = Object.freeze(["tirador"]);

const approved = new Set(APPROVED_BESTIARY_ART_SLUGS);
const IMAGE_ROOT = "systems/tierra-magica/assets/bestiary/";

export function bestiaryArtFiles(slug) {
  if (!approved.has(slug)) return null;
  return {
    portrait:slug + "-retrato.webp",
    token:slug + "-token.webp"
  };
}

// Nunca enlazar imágenes que todavía no estén incluidas en los archivos
// del sistema: Foundry debe conservar el icono genérico hasta publicarlas.
export function resolveBestiaryArt(slug, availableFiles = new Set()) {
  const files=bestiaryArtFiles(slug);
  if (!files) return null;
  if (!availableFiles.has(files.portrait) || !availableFiles.has(files.token)) return null;
  return {
    portrait:IMAGE_ROOT + files.portrait,
    token:IMAGE_ROOT + files.token
  };
}
