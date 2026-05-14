"use client";

import { useState } from "react";

export default function TestPage() {
  const [result, setResult] = useState("");

  async function register() {
    const res = await fetch(
      "http://localhost:3000/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Narendra",
          email: "admin@gmail.com",
          password: "123456",
        }),
      }
    );

    const data = await res.json();

    setResult(JSON.stringify(data, null, 2));
  }

  async function login() {
    const res = await fetch(
      "http://localhost:3000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "admin@gmail.com",
          password: "123456",
        }),
      }
    );

    const data = await res.json();

    setResult(JSON.stringify(data, null, 2));
  }

  async function protectedTest() {
  try {
    const loginRes = await fetch(
      "http://localhost:3000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "admin@gmail.com",
          password: "123456",
        }),
      }
    );

    const loginData = await loginRes.json(); 

    console.log(loginData);

    const token = loginData.token;

    const res = await fetch(
      "http://localhost:3000/api/articles",
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    console.log(data);

    setResult(JSON.stringify(data, null, 2));

  } catch (error) {
    console.error(error);

    setResult("ERROR");
  }
}

  return (
    <main style={{ padding: 20 }}>
      <button onClick={register}>
        Register
      </button>

      <button
        onClick={login}
        style={{ marginLeft: 10 }}
      >
        Login
      </button>

      <button
        onClick={protectedTest}
        style={{ marginLeft: 10 }}
      >
        Protected Test
      </button>

      <pre>{result}</pre>
    </main>
  );
}