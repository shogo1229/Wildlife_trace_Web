import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import firebaseConfig from "../lib/firebase";
import Image from "next/image";
import boarIcon from "../public/icons/rank1.png";
import deerIcon from "../public/icons/rank4.png";

import rank1icon from "../public/icons/rank1.png";
import rank2icon from "../public/icons/rank2.jpg";
import rank3icon from "../public/icons/rank3.jpg";
import rank4icon from "../public/icons/rank4.png";

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
        <h2 className="text-lg font-bold">RANK</h2>
        {user.point >= 0 && user.point <= 5 && (
          <div className="flex items-center mt-2">
            <div className="w-16 h-16 relative">
              <Image
                src={rank4icon}
                alt="Boar Icon"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="ml-2 text-green-500 font-bold text-lg">
              Assistant Professor LV1!!
            </span>
          </div>
        )}
        {user.point >= 6 && user.point <= 10 && (
          <div className="flex items-center mt-2">
            <div className="w-16 h-16 relative">
              <Image
                src={rank3icon}
                alt="Boar Icon"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="ml-2 text-yellow-400 font-bold text-lg">
              Assistant Professor LV2!!
            </span>
          </div>
        )}
        {user.point >= 11 && user.point <= 20 && (
          <div className="flex items-center mt-2">
            <div className="w-16 h-16 relative">
              <Image
                src={rank2icon}
                alt="Boar Icon"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="ml-2 text-orange-500 font-bold text-lg">
              Associate Professor !!
            </span>
          </div>
        )}
        {user.point >= 20 && (
          <div className="flex items-center mt-2">
            <div className="w-16 h-16 relative">
              <Image
                src={rank1icon}
                alt="Boar Icon"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="ml-2 text-red-500 font-bold text-lg">
              Professor !!
            </span>
          </div>
        )}
      </div>
      <div className="mt-4 bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-bold">Badges</h2>
        {user.Boar_point >= 0 && user.Boar_point <= 3 && (
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
              Boar Trace Beginner!!
            </span>
          </div>
        )}
        {user.Boar_point >= 4 && user.Boar_point <= 6 && (
          <div className="flex items-center mt-2">
            <div className="w-16 h-16 relative">
              <Image
                src={boarIcon}
                alt="Boar Icon"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="ml-2 text-yellow-400 font-bold text-lg">
              Boar Trace Amateur!!
            </span>
          </div>
        )}
        {user.Boar_point >= 7 && user.Boar_point <= 10 && (
          <div className="flex items-center mt-2">
            <div className="w-16 h-16 relative">
              <Image
                src={boarIcon}
                alt="Boar Icon"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="ml-2 text-orange-500 font-bold text-lg">
              Boar Trace Professional!!
            </span>
          </div>
        )}
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
            <span className="ml-2 text-red-500 font-bold text-lg">
              Boar Trace MATAGI Master!!
            </span>
          </div>
        )}
        {user.Deer_point >= 0 && user.Deer_point <= 3 && (
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
              Deer Trace Beginner!!
            </span>
          </div>
        )}
        {user.Deer_point >= 4 && user.Deer_point <= 6 && (
          <div className="flex items-center mt-2">
            <div className="w-16 h-16 relative">
              <Image
                src={deerIcon}
                alt="Deer Icon"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="ml-2 text-yellow-400 font-bold text-lg">
              Deer Trace Amateur!!
            </span>
          </div>
        )}
        {user.Deer_point >= 7 && user.Deer_point <= 10 && (
          <div className="flex items-center mt-2">
            <div className="w-16 h-16 relative">
              <Image
                src={deerIcon}
                alt="Deer Icon"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="ml-2 text-orange-500 font-bold text-lg">
              Deer Trace Professional!!
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
            <span className="ml-2 text-red-500 font-bold text-lg">
              Deer Trace MATAGI Master!!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfo;
