import firebse from "firebase/app";
import "firebase/auth";

export const auth = firebse
  .initializeApp({
    apiKey: "AIzaSyDEpGDy_NZYq18N9j8V5BCOancG0f6NnvE",
    authDomain: "arashgram-a8f7a.firebaseapp.com",
    projectId: "arashgram-a8f7a",
    storageBucket: "arashgram-a8f7a.appspot.com",
    messagingSenderId: "54899618849",
    appId: "1:54899618849:web:cd5a0966fc6d1cbd5adf60",
  })
  .auth();
