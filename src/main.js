import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { fetchHistoryData } from "./my-modules/fetch-history-data";

// 設定情報
const firebaseConfig = {
  apiKey: "AIzaSyATpRgZ6jgtg3uxqBzcLckqHuiuBK6QKDM",
  authDomain: "daily-report-7892c.firebaseapp.com",
  projectId: "daily-report-7892c",
  storageBucket: "daily-report-7892c.appspot.com",
  messagingSenderId: "570988925649",
  appId: "1:570988925649:web:b76b640cbf09889b022bf0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Cloud Firestoreの初期化
const db = getFirestore(app);

// Cloud Firestoreから取得したデータを表示する
if (document.getElementById("js-history")) {
  fetchHistoryData(getDocs, collection, db);
}

// Cloud Firestoreにデータを送信する
const submitData = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  try {
    const docRef = await addDoc(collection(db, "reports"), {
      date: new Date(),
      name: formData.get("name"),
      work: formData.get("work"),
      comment: formData.get("comment"),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Cloud Firestoreにデータを送信する
if (document.getElementById("js-form")) {
  document.getElementById("js-form").addEventListener("submit", (e) => submitData(e, addDoc, collection, db));
}