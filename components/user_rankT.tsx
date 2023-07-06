import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import firebaseConfig from "../lib/firebase";
import icon1 from "../public/icons/rank1.png";
import icon2 from "../public/icons/rank2.jpg";
import icon3 from "../public/icons/rank3.jpg";
import icon4 from "../public/icons/rank4.png";
import commonIcon from "../public/icons/Normal.jpg";
import { StaticImageData } from "next/image";
import Image from "next/image";

interface Rank {
  id: string;
  ID: number;
  point: number;
  icon: StaticImageData;
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
            icon: getIcon(data.point, data.ID),
          });
        });

        arrList.sort((a, b) => {
          if (a.point === b.point) {
            return a.ID - b.ID;
          }
          return b.point - a.point;
        });

        setData(arrList);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const getIcon = (point: number, index: number): StaticImageData => {
    console.log(index);
    if (index === 0) {
      return icon1;
    } else if (index === 1) {
      return icon2;
    } else if (index === 2) {
      return icon3;
    } else if (index === 3) {
      return icon4;
    }
    return commonIcon;
  };

  return (
    <div>
      <h1>発見数ランキング</h1>
      <ol>
        {data.map((todo, index) => (
          <li key={todo.id}>
            <span>{index + 1}位 </span>
            <Image src={getIcon(todo.point, index)} alt="Icon" />
            <span>
              User ID: {todo.ID}, Point: {todo.point}{" "}
            </span>
            <a href={`/users/${todo.ID}`}></a>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default PointRank;
