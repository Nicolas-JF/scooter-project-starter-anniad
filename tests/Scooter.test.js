const Scooter = require('../src/Scooter')
const User = require('../src/User')

//typeof scooter === object
describe('scooter object', () => {
  test('Scooter class should create Scooter instance', () => {
    const scooter = new Scooter();
    expect(scooter).toBeInstanceOf(Scooter);
  });
})

describe('scooter methods', () => {
  const scooter = new Scooter('Sunnyvale');
  test('should be able to assign new user', () =>{
    scooter.rent("Adrian");
    expect(scooter.user).toBe("Adrian");
  })
  test('user should be able to checkout scooter', () => {
    scooter.charge = 82;
    scooter.isBroken = false;
    expect(() => {scooter.rent('Adrian');})
  })
  test('should return error if scooter is not charged', () => {
    scooter.charge = 15;
    expect(() => {scooter.rent("Adrian");}).toThrow('scooter needs to charge.')
  })
  test('should return error if scooter is charged but broken', () => {
    scooter.charge = 100;
    scooter.isBroken = true;
    expect(() => {scooter.rent("Adrian");}).toThrow('scooter needs repair.')
  })
  test('should clear user after returning scooter', () => {
    scooter.dock("Sunnvale");
    expect(scooter.user).toBe(null);
  })
})
