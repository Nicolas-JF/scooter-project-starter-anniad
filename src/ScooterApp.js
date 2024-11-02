const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
  constructor() {
    this.stations = {
      "Station A": [],
      "Station B": [],
      "Station C": [],
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (this.registeredUsers[username]) {
      throw new Error("already registered");
    }
    if (age < 18) {
      throw new Error("too young to register");
    }
    const user = new User(username, password, age);
    this.registeredUsers[username] = user;
    console.log("user registered");
    return user;
  }

  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (!user || user.password !== password) {
      throw new Error("Username or password is incorrect");
    }
    user.loggedIn = true;
    console.log("user logged in");
  }

  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (!user) {
      throw new Error("no such user is logged in");
    }
    user.loggedIn = false;
    console.log("user is logged out");
  }

  createScooter(station) {
    if (!this.stations[station]) {
      throw new Error("no such station");
    }
    const scooter = { id: Date.now(), station: station };
    this.stations[station].push(scooter);
    console.log("created new scooter");
    return scooter;
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error("no such station");
    }
    if (this.stations[station].includes(scooter)) {
      throw new Error("scooter already at station");
    }
    this.stations[station].push(scooter);
    scooter.station = station;
    console.log("scooter is docked");
  }

  rentScooter(scooter, user) {
    if (scooter.user) {
      throw new Error("scooter already rented");
    }
    const station = scooter.station;
    if (!this.stations[station]) {
      throw new Error("scooter not at a station");
    }
    const index = this.stations[station].indexOf(scooter);
    if (index === -1) {
      throw new Error("scooter not found at station");
    }
    this.stations[station].splice(index, 1);
    scooter.user = user;
    scooter.station = null;
    console.log("scooter is rented");
  }
}

module.exports = ScooterApp;
