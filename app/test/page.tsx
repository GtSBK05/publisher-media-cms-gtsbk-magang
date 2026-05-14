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

      setResult(JSON.stringify(data, null, 2));

    } catch (error) {
      console.error(error);

      setResult("ERROR");
    }
  }

  async function createArticle() {
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

      const token = loginData.token;

      const res = await fetch(
        "http://localhost:3000/api/articles/create",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title: `Article ${Date.now()}`,
            content: "Hello CMS",
          }),
        }
      );

      const data = await res.json();

      setResult(JSON.stringify(data, null, 2));

    } catch (error) {
      console.error(error);

      setResult("ERROR");
    }
  }

  async function updateArticle() {
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

      const token = loginData.token;

      const articlesRes = await fetch(
        "http://localhost:3000/api/articles",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const articles = await articlesRes.json();

      const firstArticle = articles[0];

      const updateRes = await fetch(
        `http://localhost:3000/api/articles/${firstArticle.id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title: "UPDATED ARTICLE",
            content: "UPDATED CONTENT",
          }),
        }
      );

      const data = await updateRes.json();

      setResult(JSON.stringify(data, null, 2));

    } catch (error) {
      console.log(error);

      setResult("ERROR");
    }
  }

  async function deleteArticle() {
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

      const token = loginData.token;

      const articlesRes = await fetch(
        "http://localhost:3000/api/articles",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const articles = await articlesRes.json();

      const firstArticle = articles[0];

      const deleteRes = await fetch(
        `http://localhost:3000/api/articles/${firstArticle.id}`,
        {
          method: "DELETE",

          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await deleteRes.json();

      setResult(JSON.stringify(data, null, 2));

    } catch (error) {
      console.log(error);

      setResult("ERROR");
    }
  }

  async function publishArticle() {
    try {
      // LOGIN
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

      const token = loginData.token;

      // GET ARTICLES
      const articlesRes = await fetch(
        "http://localhost:3000/api/articles",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const articles =
        await articlesRes.json();

      const firstArticle = articles[0];

      // PUBLISH
      const publishRes = await fetch(
        `http://localhost:3000/api/articles/${firstArticle.id}/publish`,
        {
          method: "PATCH",

          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await publishRes.json();

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

      <button
        onClick={createArticle}
        style={{ marginLeft: 10 }}
      >
        Create Article
      </button>

      <button
        onClick={updateArticle}
        style={{ marginLeft: 10 }}
      >
        Update Article
      </button>

      <button
        onClick={deleteArticle}
        style={{ marginLeft: 10 }}
      >
        Delete Article
      </button>

      <button
        onClick={publishArticle}
        style={{ marginLeft: 10 }}
      >
        Publish Article
      </button>

      <pre>{result}</pre>
    </main>
  );
}