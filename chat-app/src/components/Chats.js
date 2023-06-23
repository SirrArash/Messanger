import React, { useState, useEffect, useContext } from "react";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import axios from "axios";

//Components
import Navbar from "./Navbar";

//Styles
import styles from "./Chats.module.css";

//Context
import { AuthContext } from "../contexts/AuthContextProvider";

const Chats = () => {
  const [loading, setLoading] = useState(true);
  const user = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": "c189002a-2463-4733-aeee-10630076cf15",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);
        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": "cd102ee1-34f8-489e-bb7a-039a750073d9",
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, history]);

  const getFile = async (url) => {
    const responce = await fetch(url);
    const data = await responce.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };
  //Signiout function
  const logoutHandler = async () => {
    await auth.signOut();
    history.push("/");
  };

  if (!user || loading) return "Loading...";

  return (
    <div className={styles.container}>
      <Navbar LogoutHandler={logoutHandler} />
      <ChatEngine
        height="calc(100vh - 50px)"
        projectID="c189002a-2463-4733-aeee-10630076cf15"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
