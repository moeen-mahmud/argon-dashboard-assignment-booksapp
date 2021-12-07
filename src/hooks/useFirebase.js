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
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const registerUser = (email, password, name) => {
    setLoading(true);
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
      })
      .finally(() => setLoading(false));
  };

  const logInUser = (email, password) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setAuthError("");
      })
      .catch((err) => {
        console.log(err.message);
        setAuthError(err.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const monitorUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setLoading(false);
    });
    return () => monitorUser;
  }, [auth]);

  const logOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => setUser({}))
      .catch((err) => console.log(err.message));
  };

  return {
    user,
    authError,
    loading,
    registerUser,
    logInUser,
    logOut,
  };
};

export default useFirebase;
