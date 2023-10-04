import { getInfractionsFrom } from "infractions-service";
import * as repository from "infractions-repository";
import * as usersRepository from "users-repository";
import { faker } from "@faker-js/faker";

jest.spyOn(repository,"getInfractionsFrom").mockImplementationOnce(():any=>{
  return [{
    id:0,date:new Date(),description:faker.lorem.sentence(),cost:faker.number.int(),level:"LIGHT",userId:0
  }]
})

jest.spyOn(usersRepository,"getUserByDocument").mockImplementation(():any=>{
  return {
    id:0,
    firstName:faker.person.firstName(),
    lastName:faker.person.lastName(),
    licenseId:0
  }
})

describe("Infractions Service Tests", () => {
  it("should get infractions from user", async () => {
    const licenseId = "1"
    const result = await getInfractionsFrom(licenseId)
    expect(result).toEqual({
      id:0,
      firstName:expect.any(String),
      lastName:expect.any(String),
      licenseId:0,
      infractions:[{
        id:0,
        date:expect.any(Date),
        description:expect.any(String),
        cost:expect.any(Number),
        level:"LIGHT",
        userId:0
      }]
    });
  });

  it("should throw an error when driver license does not exists", () => {
    jest.spyOn(usersRepository,"getUserByDocument").mockImplementationOnce(():any=>{
      return undefined
    })
    const licenseId = "10"
    const result = getInfractionsFrom(licenseId)
    expect(result).rejects.toEqual({ type: "NOT_FOUND", message: "Driver not found." });
  })
});