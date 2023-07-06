import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import NewImageUp from "../components/NewImage_Upload";
import { recoil_Latitude, recoil_Longitude } from "../lib/gps_state";
import { useRecoilValue } from "recoil";
import Map from "../components/Map";

const Home = () => {
  const latitude_data = useRecoilValue(recoil_Latitude);
  const longitude_data = useRecoilValue(recoil_Longitude);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <>
      <div>
        <Head>
          <title>File uploader</title>
          <meta name="description" content="File uploader" />
        </Head>

        <nav className="flex justify-between bg-gray-900 text-white">
          <div
            className={`px-4 py-2 cursor-pointer ${
              isHovered ? "animate-pulse" : ""
            }`}
            onClick={handleMenuToggle}
            onMouseEnter={handleMenuHover}
            onMouseLeave={handleMenuHover}
          >
            Menu
          </div>
          <div className={`w-64 bg-gray-800 ${menuOpen ? "block" : "hidden"}`}>
            <ul className="p-4">
              <li className="mb-2">
                <Link href="/map_page">Map</Link>
              </li>
              <li className="mb-2">
                <Link href="/multi_map_page">MultiPIN Map</Link>
              </li>
              <li>
                <Link href="/rank_page">Point Rank</Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="py-10">
          <div className="w-full max-w-3xl px-3 mx-auto">
            <h1 className="mb-10 text-2xl font-bold text-gray-900">
              Upload your wildlife trace photo
            </h1>

            <div className="space-y-10">
              <div>
                <NewImageUp />
              </div>
              <div>
                <Map latitude={latitude_data} longitude={longitude_data} />
              </div>
            </div>
          </div>
        </main>

        <footer></footer>
      </div>
    </>
  );
};

export default Home;
