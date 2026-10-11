/** Escena de entrada visual del sistema, instalada una sola vez por mundo. */
export const DEFAULT_LOBBY_IMAGE = "systems/tierra-magica/assets/scenes/lobby.webp";
export const DEFAULT_LOBBY_NAME = "Lobby";
export const DEFAULT_LOBBY_SIZE = Object.freeze({ width: 1672, height: 941 });

export function defaultLobbySource({ generation = 14 } = {}) {
  const v14 = Number(generation) >= 14;
  return {
    name: DEFAULT_LOBBY_NAME,
    navigation: true,
    navName: DEFAULT_LOBBY_NAME,
    navOrder: 0,
    active: false,
    width: DEFAULT_LOBBY_SIZE.width,
    height: DEFAULT_LOBBY_SIZE.height,
    padding: 0,
    grid: { type: 0 },
    // Desde Foundry v14 el fondo vive en el nivel, no en Scene.background.
    ...(v14 ? {
      levels: [{ name: "Lobby", background: { src: DEFAULT_LOBBY_IMAGE } }],
      fog: { mode: 0 }
    } : {
      background: { src: DEFAULT_LOBBY_IMAGE },
      fog: { exploration: false }
    }),
    backgroundColor: "#17202a",
    flags: { "tierra-magica": { defaultLobby: true } }
  };
}

/** Solo un GM activo escribe para evitar creaciones simultáneas. */
export function canInitializeDefaultLobby(game) {
  if (!game?.user?.isGM) return false;
  const gms = Array.from(game.users ?? [])
    .filter((user) => user.active && user.isGM)
    .sort((a, b) => String(a.id).localeCompare(String(b.id)));
  return gms.length > 0 && gms[0].id === game.user.id;
}

/**
 * Mantiene Lobby en la navegación y lo activa solo si NO existe escena activa.
 * Respeta mapas y escenas existentes, incluidas las ediciones del GM al Lobby.
 */
export async function ensureDefaultLobby({ game, SceneClass }) {
  if (!canInitializeDefaultLobby(game) || !game.scenes || !SceneClass?.create) {
    return { status: "skipped", activated: false };
  }
  let lobby = game.scenes.find((scene) => scene.getFlag?.("tierra-magica", "defaultLobby") === true);
  // Reutiliza un Lobby preexistente: no duplica ni sustituye fondos personalizados.
  if (!lobby) lobby = game.scenes.find((scene) => scene.name === DEFAULT_LOBBY_NAME);
  const existing = Boolean(lobby);
  if (!lobby) {
    const generation = Number(game.release?.generation ?? game.version?.split(".")?.[0] ?? 14);
    lobby = await SceneClass.create(defaultLobbySource({ generation }));
    if (!lobby) throw new Error("No se pudo crear la escena Lobby.");
  } else {
    const changes = {};
    if (!lobby.navigation) changes.navigation = true;
    if (lobby.getFlag?.("tierra-magica", "defaultLobby") !== true) {
      changes["flags.tierra-magica.defaultLobby"] = true;
    }
    if (Object.keys(changes).length) await lobby.update(changes);
  }
  let activated = false;
  if (!game.scenes.active) {
    await lobby.activate();
    activated = true;
  }
  return { status: existing ? "existing" : "created", activated };
}