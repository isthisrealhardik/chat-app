import Login from "./screens/Login";
import Chat from "./screens/Chat";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    })
    return () => unsubscribe;
  }, [])

  // console.log(user);

  return (
    <div className="h-screen w-screen flex-col text-center justify-center items-center flex bg-primary">
      {user ? <Chat /> : <Login />}
    </div>
  )
}

export default App;