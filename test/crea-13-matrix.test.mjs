import test from "node:test";
import assert from "node:assert/strict";
import { CREA13_ARCHETYPES, CREA13_REQUIRED_PILLARS } from "./fixtures/crea-13-archetypes.mjs";

test("CREA-13 inicia con exactamente siete fixtures de validación", () => {
  assert.equal(CREA13_ARCHETYPES.length, 7);
  assert.equal(new Set(CREA13_ARCHETYPES.map((entry) => entry.id)).size, 7);
  assert.equal(new Set(CREA13_ARCHETYPES.map((entry) => entry.key)).size, 7);
});

test("la matriz provisional cubre los pilares mecánicos globales sin convertirlos en clases", () => {
  const covered = new Set(CREA13_ARCHETYPES.flatMap((entry) => entry.coverage));
  for (const pillar of CREA13_REQUIRED_PILLARS) {
    assert.equal(covered.has(pillar), true, "Cobertura ausente: " + pillar);
  }
});
