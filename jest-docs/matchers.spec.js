// import { sum } from './functions'; Cannot use import, this is in node.
const { sum } = require('./matchers');

// expect is the assertion which returns an 'expectation' object. Generally is not used by itself. Use a matcher method for evaluation.

// Common matchers

// .toBe() - Exact equality
test('should add 1 + 1 to equal 2', () => {
  expect(sum(1, 1)).toBe(2);
});

// toEqual() - Exactly equality for OBJECTS. Recursively checks every field of an object or array.
test('object assignment', () => {
  const data = { one: 1 };
  data['two'] = 2;

  expect(data).toEqual({ one: 1, two: 2 });
});

// .not.toBe() - Check OPPOSITE of matcher
test('adding positive numbers is not zero', () => {
  for (let a = 1; a <= 10; a++) {
    for (let b = 1; b <= 10; b++) {
      expect(sum(a, b)).not.toBe(0);
    }
  }
});

/*
  Truthiness - Compare true, false, null, and undefined in different ways
  toBeNull matches only null
  toBeUndefined matches only undefined
  toBeDefined is the opposite of toBeUndefined
  toBeTruthy matches anything that an if statement treats as true
  toBeFalsy matches anything that an if statement treats as false
*/
test('null', () => {
  const n = null;

  expect(n).toBeNull(); // Matches if null
  expect(n).toBeDefined(); // null !== undefined
  expect(n).not.toBeUndefined(); // matches if defined
  // expect(n).toBe(5); If the test fails right here then it immediately stops execution
  expect(n).not.toBeTruthy(); // Matches if not truthy - TRUTHY not true! Does not check type
  expect(n).toBeFalsy(); // Matches if falsy - FALSY not false! Does not check type
});

test('zero', () => {
  const z = 0;

  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined;
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

// Numbers
test('dos mas dos', () => {
  const value = sum(2, 2);

  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // .toBe() and .toEqual() are the same for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});

// Floating Point Numbers - Test won't fail due to tiny rounding error
test('adding floating point numbers', () => {
  const value = sum(0.1, 0.2);
  // expect(value).toBe(0.3); // Fails due to rounding error. Remember, it's JS afterall..
  expect(value).toBeCloseTo(0.3); // Passes with tiny rounding errors. JS floating point is not percise
});

// Strings - Can use RegEx
test('there is no I in team', () => {
  expect('team').not.toMatch(/i/i);
});

test('but there is a "stop" in Christoph', () => {
  expect('ChrisTOph').toMatch(/stop/i);
});

test('check if user is named David', () => {
  const user = 'David';
  expect(user).toBe('David');
});

// Arrays and Iterables
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer'
];

test('the shopping list has beer in it', () => {
  expect(shoppingList).toContain('beer');
});

test('the shopping list does not have vegetables', () => {
  expect(shoppingList).not.toContain('vegetables');
});

// Exceptions - Check if function throws an Error
const compileAndroidCode = () => {
  throw new Error('you are using the wrong JDK');
};

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow(); // Throws Error
  expect(compileAndroidCode).toThrow(Error); // Pass in Error.. hmmm...

  // Can check the exact error message or regex
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/i);
});
