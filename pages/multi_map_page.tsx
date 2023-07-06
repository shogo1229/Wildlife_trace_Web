import Head from "next/head";
import MultiPIN_Map from "../components/multi_pin";
import { useState } from "react";
import Link from "next/link";

const MultiPinMapPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <div>
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
                <Link href="/map_page">Map</Link>
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
              MultiPIN Map Page
            </h1>

            <div>
              <MultiPIN_Map />
            </div>
          </div>
        </main>

        <footer>
          <div className="w-full max-w-3xl px-3 mx-auto">
            <p>This Area is Footer</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MultiPinMapPage;
