import type { NextPage } from "next";
import Head from "next/head";
import SingleFileUploadForm from "../components/SingleUploadForm";
import NewImageUp from "../components/NewImage_Upload";
import Map from "../components/Map";
import { recoil_Latitude, recoil_Longitude } from "../lib/gps_state";
import { useRecoilState, useRecoilValue } from "recoil";
import DBgetComponent from "../components/DB_get";
import DBuploadComponent from "../components/DB_up";
import MultiPIN_Map from "../components/multi_pin";

const Home: NextPage = () => {
  let latitude_data = useRecoilValue(recoil_Latitude);
  let longitude_data = useRecoilValue(recoil_Longitude);
  console.log("index", latitude_data);
  console.log("index", longitude_data);
  return (
    <div>
      <Head>
        <title>File uploader</title>
        <meta name="description" content="File uploader" />
      </Head>

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
            <div>
              <MultiPIN_Map />
            </div>
            <div>
              <DBgetComponent />
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="w-full max-w-3xl px-3 mx-auto">
          <p>This Area is Footer</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
