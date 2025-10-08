const { sum } = require("../src/sum");

// FAIL_BUILD=true -> intentionally fail the assertion
const shouldFail = String(process.env.FAIL_BUILD || "").toLowerCase() === "true";

test("sum adds numbers", () => {
  const result = sum(2, 2);
  if (shouldFail) {
    // wrong on purpose to generate a red build
    expect(result).toBe(5);
  } else {
    expect(result).toBe(4);
  }
});
