import Head from "next/head";
import User_multiMAP from "../components/user_multi_map";
import { recoil_Latitude, recoil_Longitude } from "../lib/gps_state";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import Link from "next/link";

const MapPage = () => {
  const latitude_data = useRecoilValue(recoil_Latitude);
  const longitude_data = useRecoilValue(recoil_Longitude);
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <nav className="flex justify-between bg-gray-900 text-white">
        <div className="px-4 py-2 cursor-pointer" onClick={handleMenuToggle}>
          Menu
        </div>
        <div className={`w-64 bg-gray-800 ${menuOpen ? "block" : "hidden"}`}>
          <ul className="p-4">
            <li className="mb-2">
              <Link href="/">Main Page</Link>
            </li>
            <li className="mb-2">
              <Link href="/multi_map_page">ALL Trace Map</Link>
            </li>
            <li>
              <Link href="/rank_page">User Ranking</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div>
        <main className="py-10">
          <div className="w-full max-w-3xl px-3 mx-auto">
            <h1 className="mb-10 text-2xl font-bold text-gray-900">Map Page</h1>

            <div>
              <User_multiMAP />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MapPage;
