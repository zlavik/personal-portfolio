import { FormEvent, useEffect, useState } from "react";
import { remult } from "remult";
import App from "./App";


export default function Auth() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); 
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState(""); 
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    fetch("/api/currentUser").then(async (result) => {
      const user = await result.json()
      remult.user = user;
      remult.user!.name = user.username;
      // remult.user = await result.json();
      if (remult.user) setSignedIn(true);
    });
  }, []);


  async function doSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await fetch("/api/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (result.ok) {
      const user = await result.json()
      remult.user = user;
      remult.user!.name = user.username;
      setSignedIn(true);
      setUsername("");
      setPassword("")
    } else {
      alert(await result.json())
    }
  }

  async function doRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ newUsername, newPassword })
    });
    if (result.ok) {
      const user = await result.json()
      remult.user = user;
      remult.user!.name = user.username;
      setSignedIn(true);
      setNewUsername("");
      setNewPassword("");
    } else {
      alert(await result.json())
    }
  }

  if (!signedIn) {
    return <>
      <h1>Todo's</h1>
      <main>
        <form onSubmit={doSignIn}>
          <input 
            value={username} 
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Sign In</button>
        </form>
        <form onSubmit={doRegister}> {/* Separate form for registration */}
          <input 
            value={newUsername} 
            onChange={e => setNewUsername(e.target.value)}
            placeholder="Username"
          />
          <input 
            type="password" 
            value={newPassword} 
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Register</button>
        </form>
      </main>
    </>
  }

  async function signOut() {
    await fetch("/api/signOut", {
      method: "POST"
    });
    setSignedIn(false);
    remult.user = undefined; 
  }
  async function deleteAccount() {
    const result = await fetch("/api/deleteAccount", {
      method: "POST"
    });
    alert(result.ok)
    setSignedIn(false);
    remult.user = undefined; 
  }

  return (
    <>
      <header>
        Hello {remult.user!.name}
        <button onClick={() => signOut()}>Sign Out</button>
        <button onClick={() => deleteAccount()}>DELETE ACCOUNT</button>
      </header>
      <App />
    </>
  );
}