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
import UserInfo from "./users";

interface Rank {
  id: string;
  ID: number;
  point: number;
  icon: StaticImageData;
}

const PointRank = () => {
  const [data, setData] = useState<Rank[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

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

  const handleViewProfile = (userId: string) => {
    setSelectedUserId(userId);
  };

  const closeModal = () => {
    setSelectedUserId(null);
  };

  const UserProfileModal = ({ userId }: { userId: string }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-overlay fixed inset-0 bg-gray-800 opacity-75"></div>
        <div className="modal-container bg-white w-64 rounded-lg shadow-lg z-10">
          <div className="modal-content p-4">
            <h2 className="text-xl font-bold mb-4">User Profile</h2>
            <UserInfo userId={userId} />
          </div>
          <div className="modal-footer p-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-4">発見数ランキング</h1>
      <ol>
        {data.map((todo, index) => (
          <li key={todo.id} className="flex items-center space-x-2 mb-2">
            <span className="font-bold">{index + 1}位</span>
            <Image
              src={getIcon(todo.point, index)}
              alt="Icon"
              className="h-8 w-8 rounded-full"
            />
            <span>
              User ID: {todo.ID}, Point:{" "}
              <span className="font-bold">{todo.point}</span>
            </span>
            <a
              href="#"
              className="ml-2 text-blue-500"
              onClick={() => handleViewProfile(todo.id)}
            >
              View Profile
            </a>
          </li>
        ))}
      </ol>
      {selectedUserId && <UserProfileModal userId={selectedUserId} />}
    </div>
  );
};

export default PointRank;
