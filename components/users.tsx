import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import firebaseConfig from "../lib/firebase";
import Image from "next/image";
import boarIcon from "../public/icons/rank1.png";
import deerIcon from "../public/icons/rank4.png";

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

const UserInfo = ({ userId }: Props) => {
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
          Boar_point: data.Boar_point,
          Deer_point: data.Deer_point,
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
    return <div className="text-red-500">User not found.</div>;
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-lg text-gray-700 font-bold">User ID: {user.ID}</p>
        <p className="ml-4 text-black font-bold text-lg">
          Total Point: {user.point}
        </p>
        <p className="ml-4 text-black font-bold text-lg">
          Boar Point: {user.Boar_point}
        </p>
        <p className="ml-4 text-black font-bold text-lg">
          Deer Point: {user.Deer_point}
        </p>
      </div>

      <div className="mt-4 bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-bold">Badges</h2>
        {user.Boar_point > 10 && (
          <div className="flex items-center mt-2">
            <div className="w-16 h-16 relative">
              <Image
                src={boarIcon}
                alt="Boar Icon"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="ml-2 text-green-500 font-bold text-lg">
              Boar Trace professor!!
            </span>
          </div>
        )}
        {user.Deer_point > 10 && (
          <div className="flex items-center mt-2">
            <div className="w-16 h-16 relative">
              <Image
                src={deerIcon}
                alt="Deer Icon"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="ml-2 text-green-500 font-bold text-lg">
              Deer Trace professor!!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
