import calculator from "calculator";

describe("calculator tests", () => {
  it("should return SUM", async () => {
    const n1 = RandomInt(999), n2 = RandomInt(999)
    const result = calculator.sum(n1,n2)
    expect(result).toBe(n1+n2);
  });
})
describe("calculator tests", () => {
  it("should return SUB", async () => {
    const n1 = RandomInt(999), n2 = RandomInt(999)
    const result = calculator.sub(n1,n2)
    expect(result).toBe(n1-n2);
  });
})
describe("calculator tests", () => {
  it("should return DIV", async () => {
    const n1 = RandomInt(999), n2 = RandomInt(999)
    const result = calculator.div(n1,n2)
    expect(result).toBe(n1/n2);
  });
})
describe("calculator tests", () => {
  it("should return MUL", async () => {
    const n1 = RandomInt(999), n2 = RandomInt(999)
    const result = calculator.mul(n1,n2)
    expect(result).toBe(n1*n2);
  });
})

function RandomInt(max:number){
  return Math.floor(Math.random() * max)
}