import axios from "axios"; //🔥

// Modules for authentication
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

// The initializer
import initializeAuthentication from "Firebase/firebase.init";

// React
import { useEffect, useState } from "react";

// Calling the function to initialize the auth
initializeAuthentication();

const useFirebase = () => {
  // States for the user and the errors
  const [user, setUser] = useState({});
  const [authError, setAuthError] = useState("");

  const auth = getAuth();

  // Function for registering the user
  const registerUser = (email, password, name, history) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userID = userCredential.user?.uid;
        setAuthError("");

        // Setup new user
        const newUser = { email, displayName: name };
        setUser(newUser);

        // Save the user in database
        saveUser(email, userID, history);

        // Remove the comment for testing purpose
        // As the endpoint is not working right
        // Redirect to success page
        // history.replace("/auth/success");
      })
      .catch((err) => {
        console.log(err.message);
        setAuthError(err.message.slice(9)); // Slice only the message body
      });
  };

  // Function for logging the user
  const logInUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setAuthError(""); // Set to its initial state if there is no error
      })
      .catch((err) => {
        console.log(err.message);
        setAuthError(err.message.slice(9)); // Slice only the message body
      });
  };

  // hold the user and monitor the state change
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

  // Function for logging out the user
  const logOut = () => {
    signOut(auth)
      .then(() => setUser({}))
      .catch((err) => console.log(err.message));
  };

  // Function for saving the user to the database
  const saveUser = (email, uid, history) => {
    const user = { email, uid };
    axios
      .post("https://registertest.free.beeceptor.com/init", user)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          // Redirect to success page if response status is ok
          history.replace("/auth/success");
        }
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
