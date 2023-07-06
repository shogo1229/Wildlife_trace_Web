import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import firebaseConfig from "../lib/firebase";

const UserPage = ({ userID }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const docRef = doc(firebaseConfig, "Users", userID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        // ユーザが存在しない場合の処理
      }
    };

    fetchUserData();
  }, [userID]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User ID: {userData.ID}</h2>
      <p>Point: {userData.point}</p>
      {/* 他のユーザーデータの表示 */}
    </div>
  );
};

export default UserPage;
