'use strict';

const { server } = require('../src/server.js'); // => {server,start}
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server);
const base64 = require("base-64");


describe("API Server", () => {
  it('POST to /signup to create a new user', async () => {
    const obj = {
      username: 'samer',
      password: '1234',
    };
    const response = await request.post('/api/v1/signup').send(obj);
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('samer');
  });
  it('POST to /signin to login an existing user', async () => {
    const user = base64.encode("samer:1234");
    let response = await request
      .post('/api/v1/signin')
      .set(`Authorization`, "Basic " + user);
    expect(response.body.username).toEqual('samer');
    expect(response.status).toEqual(200);
  });
  it('Handle error routes', async () => {
    const response = await request.get(`/test`);
    expect(response.status).toEqual(404);
  });
  it('Handle error routes', async () => {
    const response = await request.post(`/api/v1/test12`);
    expect(response.status).toEqual(404);
  });

})