import { faker } from "@faker-js/faker";
import { generateProtocolForPacient } from "protocols-generator";

jest.mock("uuid",()=>({v4:()=>"valor uuid"}))

describe("protocal tests", () => {
  it("generate protocol", async () => {
    const firstName = faker.person.firstName(), lastName = faker.person.lastName(), priority = faker.datatype.boolean()
    const result = generateProtocolForPacient(firstName,lastName,priority)
    expect(result).toEqual({
      priority,
      date:expect.any(Date),
      pacient: `${firstName} ${lastName}`,
      protocol: "valor uuid"
    });
  });
});