
import { test } from "node:test";
import assert from "node:assert/strict";
import { interpretarClima } from "./clima.js";

test("código 0 deve retornar Céu limpo", () => {
    assert.strictEqual(interpretarClima(0), "Céu limpo");
});

test("código 61 deve retornar Chuva leve", () => {
    assert.strictEqual(interpretarClima(61), "Chuva leve");
});

test("código desconhecido deve retornar Condição desconhecida", () => {
    assert.strictEqual(
        interpretarClima(999),
        "Condição desconhecida"
    );
});
