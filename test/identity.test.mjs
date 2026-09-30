import test from "node:test";
import assert from "node:assert/strict";
import { normalizeSlug, identityKey, duplicateIdentity } from "../scripts/rules/identity.mjs";

test("CREA-11 slug is stable and accent-insensitive", () => {
  assert.equal(normalizeSlug("Doble Sostenimiento"), "doble-sostenimiento");
  assert.equal(normalizeSlug("Restauración"), "restauracion");
  assert.equal(identityKey("discipline", "Restauración"), "discipline:restauracion");
});

test("unique mechanical content detects duplicates by type+slug, not display name", () => {
  const items=[{id:"a",type:"discipline",name:"Mi magia",system:{slug:"restauracion"}}];
  const duplicate=duplicateIdentity(items,{type:"discipline",name:"Restauración",system:{slug:"restauracion"}});
  assert.equal(duplicate?.id,"a");
});

test("specialization uniqueness includes mother skill", () => {
  const items=[{id:"a",type:"specialization",name:"Campo",system:{slug:"campo",skill:"medicine"}}];
  assert.equal(duplicateIdentity(items,{type:"specialization",name:"Campo",system:{slug:"campo",skill:"medicine"}})?.id,"a");
  assert.equal(duplicateIdentity(items,{type:"specialization",name:"Campo",system:{slug:"campo",skill:"arcana"}}),null);
});
