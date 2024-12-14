
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, PhoneAuthProvider } from "firebase/auth";

// 您的 Firebase 配置
const firebaseConfig = {
  apiKey: "AIzaSyAj0DtZ7kXqks0U70MidhA0eFH3GzV1Z5s",
  authDomain: "kahnweb-3fe04.firebaseapp.com",
  projectId: "kahnweb-3fe04",
  storageBucket: "kahnweb-3fe04.appspot.com",
  messagingSenderId: "897664503131",
  appId: "1:897664503131:web:0a5be4b31dd7bfc898de7e",
  measurementId: "G-5QW4GEGMQG"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.languageCode = 'zh'; // 强制将语言更改为中文
const googleProvider = new GoogleAuthProvider(); 
const phoneProvider = new PhoneAuthProvider(auth); 

export { auth, googleProvider, phoneProvider };