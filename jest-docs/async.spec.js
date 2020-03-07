// Jest needs to know when asynchronous code has completed running.

const fetchData = callback => {
  setTimeout(() => {
    return callback('peanut butter');
    // return 'peanut butter';
  }, 1000);
};

// Simulate promise
const fetchDataPromise = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 1000, 'peanut butter');
  });
};

/*
  Callbacks
  - Use an alternate form of test that takes in a done argument instead of an empty argument
  - Wait until done callback is called before finishing test
  - If done() is never called then the test will fail due to timeout
  - Wrap in the try/catch block to see test logs
*/

// Runs fetchData then run callback. It is tested in the callback when it is completed!
test('callback - the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      // Call done when complete!
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});

/*
  Promises
  - Return promise from test and Jest will wait for it to resolve.
  - If promise is rejected, test will fail
*/
test('promise - the data is peanut butter', () => {
  // Make sure to return the promise. in this case, fetchData returns a promise. Jest waits for it to resolve
  return fetchDataPromise().then(data => {
    expect(data).toBe('peanut butter');
  });
});

// If expecting an error, add expect.assertions otherwise a resolved promise will not fail the test
// test('the fetch fails with an error', () => {
//   expect.assertions(1);
//   return fetchDataError().catch(e => expect(e).toMatch('error'));
// });

/*
  .resolve/.rejects matchers
  - Jest will wait for promise to resolve
*/
test('resolves - the data is peanut butter', () => {
  return expect(fetchDataPromise()).resolves.toBe('peanut butter');
});

// Expect promise to be rejected - use .rejects matcher
// test('rejects - the fetch fails with an error', () => {
//   expect.assertions(1);
//   try {
//     await fetchData();
//   } catch (e) {
//     expect(e).toMatch('error')
//   }
// })

// Async/Await
test('async/await the data is peanut butter', async () => {
  const data = await fetchDataPromise();
  expect(data).toBe('peanut butter');
});

// test('async/await - the fetch fails with an error', async () => {
//   expect.assertions(1);
//   try {
//     await fetchData();
//   } catch (e) {
//     expect(e).toMatch('error');
//   }
// });

// Combine async/await with resolves/rejects
test('async/await/resolves', async () => {
  await expect(fetchDataPromise()).resolves.toBe('peanut butter');
});

// test('the fetch fails with an error', async () => {
//   await expect(fetchDataPromise()).rejects.toThrow('error');
// });
