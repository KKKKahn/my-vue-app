// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // 🔥 需要导入 getAuth
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAj0DtZ7kXqks0U70MidhA0eFH3GzV1Z5s",
  authDomain: "kahnweb-3fe04.firebaseapp.com",
  projectId: "kahnweb-3fe04",
  storageBucket: "kahnweb-3fe04.firebasestorage.app",
  messagingSenderId: "897664503131",
  appId: "1:897664503131:web:0a5be4b31dd7bfc898de7e",
  measurementId: "G-5QW4GEGMQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // ✅ 确保定义 auth

export { auth };