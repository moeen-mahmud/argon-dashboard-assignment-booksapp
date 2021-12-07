import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import initializeAuthentication from "Firebase/firebase.init";
import { useEffect, useState } from "react";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [authError, setAuthError] = useState("");

  const auth = getAuth();

  const registerUser = (email, password, name) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError("");

        // Setup new user
        const newUser = { email, displayName: name };
        setUser(newUser);
      })
      .catch((err) => {
        console.log(err.message);
        setAuthError(err.message);
      });
  };

  const logInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setAuthError("");
      })
      .catch((err) => {
        console.log(err.message);
        setAuthError(err.message);
      });
  };

  useEffect(() => {
    const monitorUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
    });
    return () => monitorUser;
  }, [auth]);

  const logOut = () => {
    signOut(auth)
      .then(() => setUser({}))
      .catch((err) => console.log(err.message));
  };

  return {
    user,
    authError,
    registerUser,
    logInUser,
    logOut,
  };
};

export default useFirebase;
