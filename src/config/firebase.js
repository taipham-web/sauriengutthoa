// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: QUAN TRỌNG - Bạn phải copy đoạn config từ Firebase Console của bạn dán đè lên đoạn này nhé
const firebaseConfig = {
    apiKey: "AIzaSyALuuViiTiNWn1abu-QxooH-T04_6l291s",
    authDomain: "my-brand-web.firebaseapp.com",
    projectId: "my-brand-web",
    storageBucket: "my-brand-web.firebasestorage.app",
    messagingSenderId: "563347552562",
    appId: "1:563347552562:web:44f02facd0a1fdf132bf2b",
    measurementId: "G-KTVVG2ZR8M"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo và xuất database để các file khác dùng
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);