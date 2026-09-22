const number = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

/**
 * Evita que una declaración en la ficha se interprete como creación de recursos.
 * No inventa inventario, participantes ni una red de Caudal: exige confirmar que
 * esos elementos existen realmente en la escena antes de gastar el Maná del Director.
 */
export function installRitualGuards(ActorClass) {
  const original = ActorClass.prototype.performRitual;

  ActorClass.prototype.performRitual = async function (item, options = {}) {
    if (!item || item.type !== "ritual") return null;

    const assistantMana = Math.max(0, number(options.assistantMana));
    const flowRequired = Math.max(0, number(item.system?.flowRequired));
    const components = String(item.system?.components ?? "").trim();
    const needsExternalResources = assistantMana > 0 || flowRequired > 0 || Boolean(components);

    if (needsExternalResources) {
      const confirmed = await Dialog.confirm({
        title: "Recursos del ritual — " + item.name,
        content: "<p>Este ritual declara recursos externos al Director.</p>" +
          "<p>Maná de asistentes: <strong>" + assistantMana + "</strong> · Caudal requerido: <strong>" + flowRequired + "</strong>" +
          (components ? " · Componentes: <strong>declarados</strong>" : "") + ".</p>" +
          "<p>Confirma sólo si los asistentes, fuentes y componentes requeridos existen realmente y están disponibles. Foundry no los crea ni los descuenta automáticamente.</p>",
        yes: () => true,
        no: () => false,
        defaultYes: false
      });
      if (!confirmed) return null;
    }

    return original.call(this, item, options);
  };
}
