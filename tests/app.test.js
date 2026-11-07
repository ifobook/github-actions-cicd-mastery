const { test } = require("node:test");
const assert = require("node:assert/strict");
const app = require("../src/app");

async function startServer() {
  const server = app.listen(0);

  await new Promise((resolve) => {
    server.once("listening", resolve);
  });

  return {
    server,
    url: `http://127.0.0.1:${server.address().port}`
  };
}

test("GET / returns application information", async () => {
  const { server, url } = await startServer();

  try {
    const response = await fetch(url);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.application, "GitHub Actions CI/CD Mastery");
  } finally {
    server.close();
  }
});

test("GET /health returns healthy status", async () => {
  const { server, url } = await startServer();

  try {
    const response = await fetch(`${url}/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, "healthy");
  } finally {
    server.close();
  }
});

test("GET /unknown returns 404", async () => {
  const { server, url } = await startServer();

  try {
    const response = await fetch(`${url}/unknown`);
    assert.equal(response.status, 404);
  } finally {
    server.close();
  }
});
