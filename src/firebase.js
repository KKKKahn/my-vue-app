// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, GoogleAuthProvider } from "firebase/auth"; // ✅ 导入 GoogleAuthProvider

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAj0DtZ7kXqks0U70MidhA0eFH3GzV1Z5s",
//   authDomain: "kahnweb-3fe04.firebaseapp.com", // 确保这里和 Firebase 控制台中 "授权网域" 保持一致
//   projectId: "kahnweb-3fe04",
//   storageBucket: "kahnweb-3fe04.firebasestorage.app",
//   messagingSenderId: "897664503131",
//   appId: "1:897664503131:web:0a5be4b31dd7bfc898de7e",
//   measurementId: "G-5QW4GEGMQG"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app); // ✅ 确保定义 auth
// const googleProvider = new GoogleAuthProvider(); // ✅ 定义 Google 提供商



// export { auth, googleProvider }; // ✅ 确保导出 googleProvider

// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, PhoneAuthProvider, RecaptchaVerifier } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj0DtZ7kXqks0U70MidhA0eFH3GzV1Z5s",
  authDomain: "kahnweb-3fe04.firebaseapp.com",
  projectId: "kahnweb-3fe04",
  storageBucket: "kahnweb-3fe04.appspot.com",
  messagingSenderId: "897664503131",
  appId: "1:897664503131:web:0a5be4b31dd7bfc898de7e",
  measurementId: "G-5QW4GEGMQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
auth.languageCode = 'zh'; // 这将强制将语言更改为中文
const googleProvider = new GoogleAuthProvider(); 
const phoneProvider = new PhoneAuthProvider(auth); 


export { auth, googleProvider, phoneProvider, RecaptchaVerifier };