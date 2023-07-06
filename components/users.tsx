import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import firebaseConfig from "../lib/firebase";
interface Rank {
  id: string;
  ID: number;
  point: number;
  Boar_point: number;
  Deer_point: number;
}

interface Props {
  userId: string;
}

const PointRank = ({ userId }: Props) => {
  const [user, setUser] = useState<Rank | null>(null);

  useEffect(() => {
    const userRef = doc(firebaseConfig, "Users", userId);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setUser({
          id: doc.id,
          ID: data.ID,
          point: data.point,
          Boar_point: 0,
          Deer_point: 0,
        });
      } else {
        // ユーザーが存在しない場合の処理
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [userId]);

  if (!user) {
    // ユーザーが存在しない場合の表示
    return <div>User not found.</div>;
  }

  // ユーザーの情報を表示する JSX
  return (
    <div>
      <p>User ID: {user.ID}</p>
      <p>Point: {user.point}</p>
      <p>Boar Point: {user.Boar_point}</p>
      <p>Deer Point: {user.Deer_point}</p>
    </div>
  );
};

export default PointRank;
