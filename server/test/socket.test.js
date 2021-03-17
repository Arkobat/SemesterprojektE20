/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const { assert } = require("chai");
const chai = global.chai;
const agent = global.agent;
const socket = require("../middleware/socket");
let io;

describe("Socket io", () => {
  it(`should return io`, () => {
    assertEquals(io, responseBodyForRequested(socket.init(server)));
  });
});