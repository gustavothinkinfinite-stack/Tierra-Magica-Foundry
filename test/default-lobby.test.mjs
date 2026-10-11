import assert from "node:assert/strict";
import test from "node:test";
import { stat } from "node:fs/promises";
import {
  DEFAULT_LOBBY_IMAGE,
  canInitializeDefaultLobby,
  defaultLobbySource,
  ensureDefaultLobby
} from "../scripts/rules/default-lobby.mjs";

function harness({ existing = [], active = null, gm = true, twoGms = false } = {}) {
  const scenes = [...existing];
  scenes.active = active;
  const users = twoGms
    ? [{ id: "a", active: true, isGM: true }, { id: "z", active: true, isGM: true }]
    : [{ id: "a", active: true, isGM: gm }];
  const game = { user: { id: "a", isGM: gm }, users, scenes };
  let created = 0;
  let activated = 0;
  const SceneClass = {
    async create(source) {
      created++;
      const doc = scene(source);
      scenes.push(doc);
      return doc;
    }
  };
  function scene(source) {
    const doc = {
      ...source,
      updates: [],
      getFlag(ns, key) { return this.flags?.[ns]?.[key]; },
      async update(changes) {
        this.updates.push(changes);
        if (changes.navigation !== undefined) this.navigation = changes.navigation;
        if (changes["flags.tierra-magica.defaultLobby"] !== undefined) {
          this.flags ??= {};
          this.flags["tierra-magica"] ??= {};
          this.flags["tierra-magica"].defaultLobby = true;
        }
      },
      async activate() {
        activated++;
        scenes.active = doc;
      }
    };
    return doc;
  }
  return { game, SceneClass, scene, get created() { return created; }, get activated() { return activated; } };
}

test("Lobby oficial: fondo aprobado, navegación y canvas sin cuadrícula", () => {
  const source = defaultLobbySource();
  assert.equal(source.name, "Lobby");
  assert.equal(source.navigation, true);
  assert.equal(source.levels[0].background.src, DEFAULT_LOBBY_IMAGE);
  assert.equal(source.background, undefined);
  assert.equal(source.fog.mode, 0);
  const v13 = defaultLobbySource({generation:13});
  assert.equal(v13.background.src, DEFAULT_LOBBY_IMAGE);
  assert.equal(v13.levels, undefined);
  assert.deepEqual([source.width, source.height], [1672, 941]);
  assert.equal(source.grid.type, 0);
  assert.equal(source.flags["tierra-magica"].defaultLobby, true);
});

test("un mundo nuevo crea y activa Lobby una vez", async () => {
  const h = harness();
  assert.deepEqual(await ensureDefaultLobby(h), { status: "created", activated: true });
  assert.equal(h.created, 1);
  assert.equal(h.activated, 1);
  assert.deepEqual(await ensureDefaultLobby(h), { status: "existing", activated: false });
  assert.equal(h.created, 1);
});

test("no altera la escena activa de una partida", async () => {
  const other = { name: "Exploración", navigation: true };
  const h = harness({ existing: [other], active: other });
  assert.deepEqual(await ensureDefaultLobby(h), { status: "created", activated: false });
  assert.equal(h.game.scenes.active, other);
});

test("reutiliza Lobby personalizado, lo hace visible y no reemplaza su imagen", async () => {
  const h = harness({ active: { name: "Aventura" } });
  const lobby = h.scene({ name: "Lobby", navigation: false, background: { src: "custom.webp" } });
  h.game.scenes.push(lobby);
  assert.deepEqual(await ensureDefaultLobby(h), { status: "existing", activated: false });
  assert.equal(h.created, 0);
  assert.equal(lobby.background.src, "custom.webp");
  assert.equal(lobby.navigation, true);
  assert.equal(lobby.getFlag("tierra-magica", "defaultLobby"), true);
});

test("solo el primer GM activo puede crear la escena", async () => {
  const noGm = harness({ gm: false });
  assert.equal(canInitializeDefaultLobby(noGm.game), false);
  assert.equal((await ensureDefaultLobby(noGm)).status, "skipped");
  const second = harness({ twoGms: true });
  second.game.user.id = "z";
  assert.equal((await ensureDefaultLobby(second)).status, "skipped");
  assert.equal(second.created, 0);
});

test("reconoce el Lobby por marca tras renombrarlo", async () => {
  const h = harness();
  const marked = h.scene({ name: "Sala de expediciones", navigation: true, flags: { "tierra-magica": { defaultLobby: true } } });
  h.game.scenes.push(marked);
  assert.equal((await ensureDefaultLobby(h)).status, "existing");
  assert.equal(h.created, 0);
});


test("la imagen aprobada se empaqueta como recurso local del sistema", async () => {
  const file = new URL("../assets/scenes/lobby.webp", import.meta.url);
  const metadata = await stat(file);
  assert.ok(metadata.size > 100_000);
});