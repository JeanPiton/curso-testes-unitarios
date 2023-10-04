import { faker } from "@faker-js/faker";

import { createOrder, getOrderByProtocol } from "../../src/order-service";
import * as orderRepository from "../../src/order-repository";
import { OrderInput } from "../../src/validator";

jest.spyOn(orderRepository,"create").mockImplementationOnce((order):any =>{
  return {
    id:0,
    client: order.client,
    description: order.description,
    protocol: "010",
    status: "IN_PREPARATION"
  }
})

jest.spyOn(orderRepository,"getByProtocol").mockImplementationOnce((protocol):any=>{
  return {
    protocol,
    status:"Valid"
  }
})

describe("Order Service Tests", () => {
  it("should create an order", async () => {
    const order = {client:faker.person.fullName(),description:faker.lorem.sentence()}
    const result = await createOrder(order)
    expect(result).toEqual({
      id:0,
      client: order.client,
      description: order.description,
      protocol: expect.any(String),
      status: "IN_PREPARATION"
    });
  });

  it("should return an order based on the protocol", async () => {
    const protocol = "010"
    const result = await getOrderByProtocol(protocol)
    expect(result).toEqual({protocol:"010",status:"Valid"});
  });

  it("should return status INVALID when protocol doesn't exists", async () => {
    jest.spyOn(orderRepository,"getByProtocol").mockImplementationOnce((protocol):any =>{})
    const protocol = "011"
    const result = await getOrderByProtocol(protocol)
    expect(result).toEqual({protocol:"011",status:"INVALID"});
  });
});