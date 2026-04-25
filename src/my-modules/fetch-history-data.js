// Cloud Firestoreから取得したデータを表示する
export const fetchHistoryData = async (getDocs, collection, db) => {
  let tags = "";

  // reportsコレクションのデータを取得
  const querySnapshot = await getDocs(collection(db, "reports"));

  // データをテーブル表の形式に合わせてHTMLに挿入
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    console.log(`${doc.id} =>`, data);
    tags += `<tr><td>${data.date ?? ""}</td><td>${data.name ?? ""}</td><td>${data.work ?? ""}</td><td>${data.comment ?? ""}</td></tr>`;
  });
  document.getElementById("js-history").innerHTML = tags;
};
