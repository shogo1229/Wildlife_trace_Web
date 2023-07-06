import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import firebaseConfig from "../lib/firebase";

interface Rank {
  id: string;
  ID: number;
  point: number;
}

const PointRank = () => {
  const [data, setData] = useState<Rank[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firebaseConfig, "Users"),
      (snapshot) => {
        const arrList: Rank[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          arrList.push({
            id: doc.id,
            ID: data.ID,
            point: data.point,
          });
        });

        // ソート
        arrList.sort((a, b) => {
          if (a.point === b.point) {
            return a.ID - b.ID; // pointが同じ場合はIDで比較
          }
          return b.point - a.point;
        });

        setData(arrList);
      }
    );

    return () => {
      unsubscribe(); // Unsubscribe the listener
    };
  }, []);

  return (
    <div>
      <h1>Point Rank</h1>
      <ul>
        {data.map((todo) => (
          <li key={todo.id}>
            User ID: {todo.ID}, Point: {todo.point}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PointRank;
