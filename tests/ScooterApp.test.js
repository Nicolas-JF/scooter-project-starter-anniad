const Scooter = require("../src/Scooter");
const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");

describe("ScooterApp", () => {
  let scooterApp;

  beforeEach(() => {
    scooterApp = new ScooterApp();
  });

  // register user
  describe("registerUser method tests", () => {
    test("Should return instance of User", () => {
      let response = scooterApp.registerUser("Joe Bloggs", "test123", 21);
      expect(response).toBeInstanceOf(User);
    });
  });

  // log in
  describe("loginUser method tests", () => {
    test("Should login registered user", () => {
      scooterApp.registerUser("Joe Bloggs", "test123", 21);
      scooterApp.loginUser("Joe Bloggs", "test123");
      expect(scooterApp.registeredUsers["Joe Bloggs"].loggedIn).toBe(true);
    });
  });

  // log out
  describe("logoutUser method tests", () => {
    test("Should logout user", () => {
      scooterApp.registerUser("Joe Bloggs", "test123", 21);
      scooterApp.loginUser("Joe Bloggs", "test123");
      scooterApp.logoutUser("Joe Bloggs");
      expect(scooterApp.registeredUsers["Joe Bloggs"].loggedIn).toBe(false);
    });
  });

  // rent scooter
  describe("rentScooter method tests", () => {
    test("Should rent available scooter", () => {
      const user = scooterApp.registerUser("Joe Bloggs", "test123", 21);
      const scooter = scooterApp.createScooter("Station A");
      scooterApp.rentScooter(scooter, user);
      expect(scooter.user).toBe(user);
      expect(scooterApp.stations["Station A"]).not.toContain(scooter);
    });
  });

  // dock scooter
  describe("dockScooter method tests", () => {
    test("Should dock scooter at station", () => {
      const user = scooterApp.registerUser("Joe Bloggs", "test123", 21);
      const scooter = scooterApp.createScooter("Station A");
      scooterApp.rentScooter(scooter, user);
      scooterApp.dockScooter(scooter, "Station B");
      expect(scooterApp.stations["Station B"]).toContain(scooter);
      expect(scooter.station).toBe("Station B");
    });
  });
});
