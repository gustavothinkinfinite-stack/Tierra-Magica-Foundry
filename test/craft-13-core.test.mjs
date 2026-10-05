import test from "node:test";
import assert from "node:assert/strict";

import {
  adjustedBaseTimeMinutes,
  applyUniversalTimeReductions,
  directSaleReferenceCopper,
  failedAccelerationTotalMinutes,
  projectRequirements,
  qualityMaterialCostCopper,
  qualityValueCopper,
  quickSaleCopper,
  repairQuote,
  saleValueForConditionCopper,
  salvageQuote,
  specialMaterialSupplementCopper,
  totalCraftMaterialCostCopper,
  totalReferenceValueCopper,
  validateProjectPrerequisites
} from "../scripts/rules/crafting.mjs";

test("CRAFT-13A: CM universal redondea hacia arriba y venta hacia abajo", () => {
  assert.equal(qualityMaterialCostCopper(1, "common"), 1);
  assert.equal(directSaleReferenceCopper(1), 0);
  assert.equal(quickSaleCopper(3), 0);
});

test("CRAFT-13A: Calidad conserva las proporciones canónicas de valor y materiales", () => {
  assert.equal(qualityValueCopper(200, "common"), 200);
  assert.equal(qualityValueCopper(200, "superior"), 300);
  assert.equal(qualityValueCopper(200, "exceptional"), 500);
  assert.equal(qualityMaterialCostCopper(200, "common"), 100);
  assert.equal(qualityMaterialCostCopper(200, "superior"), 150);
  assert.equal(qualityMaterialCostCopper(200, "exceptional"), 250);
  assert.throws(() => qualityMaterialCostCopper(200, "defective"), /Defectuosa/);
});

test("CRAFT-13A: Material Especial calcula SM por grado y cobertura", () => {
  assert.equal(specialMaterialSupplementCopper(400, { grade:"specialized", coverage:"dominant" }), 100);
  assert.equal(specialMaterialSupplementCopper(400, { grade:"rare", coverage:"major" }), 100);
  assert.equal(specialMaterialSupplementCopper(400, { grade:"exceptional", coverage:"component" }), 100);
});

test("CRAFT-13A: VRT y coste material compuesto no crean margen universal", () => {
  const vr = 400;
  const sm = specialMaterialSupplementCopper(vr, { grade:"rare", coverage:"major" });
  const cost = totalCraftMaterialCostCopper({
    referenceValueCopper: vr,
    quality: "superior",
    specialMaterialSupplementsCopper: [sm]
  });
  const value = totalReferenceValueCopper({
    referenceValueCopper: vr,
    quality: "superior",
    specialMaterialSupplementsCopper: [sm]
  });
  assert.equal(cost, 400);
  assert.equal(value, 800);
  assert.equal(directSaleReferenceCopper(value), cost);
  assert.ok(quickSaleCopper(value) < cost);
});

test("CRAFT-13A: TBA aplica Calidad y Material antes de reducciones", () => {
  const tba = adjustedBaseTimeMinutes(480, { quality:"superior", materialGrade:"rare" });
  assert.equal(tba, 900);
  assert.equal(applyUniversalTimeReductions(tba, { workAssistants:2, accelerated:true }), 225);
  assert.equal(failedAccelerationTotalMinutes(tba), 1125);
});

test("CRAFT-13A: el piso temporal universal impide compresión inferior al 25%", () => {
  const result = applyUniversalTimeReductions(480, {
    workAssistants:20,
    accelerated:true,
    reductionFactors:[0.5, 0.5, 0.5]
  });
  assert.equal(result, 120);
});

test("CRAFT-13A: BRA cobra sólo la base afectada", () => {
  const damaged = repairQuote({
    condition:"damaged",
    affectedValueCopper:300,
    affectedTimeMinutes:480
  });
  assert.deepEqual(damaged, {
    repairableByUniversalRule:true,
    materialCopper:30,
    timeMinutes:120
  });

  const disabled = repairQuote({
    condition:"disabled",
    affectedValueCopper:300,
    affectedTimeMinutes:20
  });
  assert.equal(disabled.materialCopper,75);
  assert.equal(disabled.timeMinutes,10);
});

test("CRAFT-13A: Desmantelamiento usa VR Común y SM, no VRQ", () => {
  const quote = salvageQuote({
    condition:"operative",
    referenceValueCopper:400,
    specialMaterialSupplementsCopper:[100],
    fabricationTimeMinutes:240
  });
  assert.equal(quote.ordinaryCopper,100);
  assert.equal(quote.specialCopper,50);
  assert.equal(quote.valueInMaterialsCopper,150);
  assert.equal(quote.timeMinutes,60);
});

test("CRAFT-13A: requisitos de Calidad y Material se acumulan con techos canónicos", () => {
  assert.deepEqual(
    projectRequirements({
      baseRank:2,
      baseInstallation:"adequate",
      quality:"superior",
      materialGrade:"rare"
    }),
    { rank:4, installation:"specialized" }
  );

  assert.deepEqual(
    projectRequirements({
      baseRank:4,
      baseInstallation:"specialized",
      quality:"exceptional",
      materialGrade:"exceptional"
    }),
    { rank:5, installation:"exceptional" }
  );
});

test("CRAFT-13A: requisitos esenciales no se sustituyen por una tirada", () => {
  const result = validateProjectPrerequisites({
    actorRank:5,
    availableInstallation:"exceptional",
    requiredRank:3,
    requiredInstallation:"professional",
    hasStableProcedure:false,
    materialsReady:true,
    essentialToolReady:false
  });
  assert.equal(result.valid,false);
  assert.deepEqual(result.issues.map((issue) => issue.code), ["procedure","tool"]);
});

test("CRAFT-13A: barrido 1 c a 1000 o no permite fabricar y vender con ganancia por redondeo", () => {
  const qualities = ["common","superior","exceptional"];
  const materials = [
    { grade:"ordinary", coverage:"dominant" },
    { grade:"specialized", coverage:"component" },
    { grade:"specialized", coverage:"major" },
    { grade:"specialized", coverage:"dominant" },
    { grade:"rare", coverage:"component" },
    { grade:"rare", coverage:"major" },
    { grade:"rare", coverage:"dominant" },
    { grade:"exceptional", coverage:"component" },
    { grade:"exceptional", coverage:"major" },
    { grade:"exceptional", coverage:"dominant" }
  ];

  for (let vr=1; vr<=100000; vr++) {
    for (const quality of qualities) {
      for (const material of materials) {
        const sm = material.grade === "ordinary"
          ? 0
          : specialMaterialSupplementCopper(vr, material);
        const cost = totalCraftMaterialCostCopper({
          referenceValueCopper:vr,
          quality,
          specialMaterialSupplementsCopper:[sm]
        });
        const value = totalReferenceValueCopper({
          referenceValueCopper:vr,
          quality,
          specialMaterialSupplementsCopper:[sm]
        });
        assert.ok(directSaleReferenceCopper(value) <= cost);
        assert.ok(quickSaleCopper(value) <= cost);
      }
    }
  }
});

test("CRAFT-13A: recuperación genérica + especial no supera venta rápida equivalente", () => {
  const qualities = ["common","superior","exceptional"];
  const conditions = ["operative","damaged","disabled","ruined"];
  const materialCases = [
    { grade:"ordinary", coverage:"dominant" },
    { grade:"specialized", coverage:"dominant" },
    { grade:"rare", coverage:"major" },
    { grade:"exceptional", coverage:"component" }
  ];

  for (let vr=1; vr<=10000; vr++) {
    for (const quality of qualities) {
      for (const condition of conditions) {
        for (const material of materialCases) {
          const sm = material.grade === "ordinary"
            ? 0
            : specialMaterialSupplementCopper(vr, material);
          const value = totalReferenceValueCopper({
            referenceValueCopper:vr,
            quality,
            specialMaterialSupplementsCopper:[sm]
          });
          const salvage = salvageQuote({
            condition,
            referenceValueCopper:vr,
            specialMaterialSupplementsCopper:[sm]
          });
          assert.ok(salvage.valueInMaterialsCopper <= saleValueForConditionCopper(value, condition, { mode:"quick" }));
        }
      }
    }
  }
});
