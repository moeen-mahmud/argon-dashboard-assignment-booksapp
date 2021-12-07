import axios from "axios";
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
        const userID = userCredential.user?.uid;
        setAuthError("");

        // Setup new user
        const newUser = { email, displayName: name };
        setUser(newUser);

        // Save the user in database
        saveUser(email, userID);
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
        setAuthError(err.message.slice(22, -2));
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

  const saveUser = (email, uid) => {
    const user = { email, uid };
    axios
      .post("https://registertest.free.beeceptor.com/init", user)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
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
