import Image from "next/image";
import EXIF from "exif-js";
import { ChangeEvent, MouseEvent, useState } from "react";
import { recoil_Latitude, recoil_Longitude } from "../lib/gps_state";
import { useRecoilState, useRecoilValue } from "recoil";

function getExif(imgFile: any): Promise<{ GPSlat: number; GPSlon: number }> {
  return new Promise((resolve, reject) => {
    EXIF.getData(imgFile, function () {
      const exifData = imgFile.exifdata;
      const latitude = exifData?.GPSLatitude;
      const longitude = exifData?.GPSLongitude;

      const GPSlat = latitude[0] / 1 + latitude[1] / 60 + latitude[2] / 3600;
      const GPSlon = longitude[0] / 1 + longitude[1] / 60 + longitude[2] / 3600;

      if (GPSlat && GPSlon) {
        resolve({ GPSlat, GPSlon });
      } else {
        reject(new Error("緯度・経度情報が含まれていない画像ファイルです"));
      }
    });
  });
}

const SingleFileUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [latitude, setLatitude] = useRecoilState(recoil_Latitude);
  const [longitude, setLongitude] = useRecoilState(recoil_Longitude);

  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    //ファイル選択時に呼び出し
    const fileInput = e.target; //eはイベントオブジェクト

    if (!fileInput.files) {
      alert("No file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Files list is empty");
      return;
    }

    const file = fileInput.files[0];

    if (!file.type.startsWith("image")) {
      //アップされたファイルが画像かどうかを確認
      alert("Please select a valide image");
      return;
    }

    setFile(file); // サーバー送信に使用
    setPreviewUrl(URL.createObjectURL(file)); // 画像プレビュー表示用

    e.currentTarget.type = "text";
    e.currentTarget.type = "file";
  };

  const onCancelFile = (e: MouseEvent<HTMLButtonElement>) => {
    //キャンセルボタンを押した時に呼び出し
    e.preventDefault();
    if (!previewUrl && !file) {
      return;
    }
    setFile(null); //ステートをnullにして画像選択を解除
    setPreviewUrl(null);
  };

  const onUploadFile = async (e: MouseEvent<HTMLButtonElement>) => {
    //アップロードボタンを押した時に呼び出し
    e.preventDefault();

    if (!file) {
      //ファイルが選択されてないときは処理を終了する
      return;
    }

    try {
      //緯度経度取得
      let gpsData = await getExif(file);
      const gpsLatitude = gpsData.GPSlat;
      const gpsLongitude = gpsData.GPSlon;

      setLatitude(gpsLatitude);
      setLongitude(gpsLongitude);

      console.log("緯度", gpsLatitude);
      console.log("経度", gpsLongitude);

      var formData = new FormData();
      formData.append("media", file); //選択されたデータをformDataに代入

      const res = await fetch("/api/upload", {
        //エンドポイントにファイルを送信
        method: "POST",
        body: formData,
      });

      const {
        data,
        error,
      }: {
        data: {
          url: string | string[];
        } | null;
        error: string | null;
      } = await res.json();

      if (error || !data) {
        alert(error || "Sorry! something went wrong.");
        return;
      }

      console.log("File was uploaded successfylly:", data);
    } catch (error) {
      console.error(error);
      alert("Sorry! something went wrong.");
    }
  };

  return (
    <form
      className="w-full p-3 border border-gray-500 border-dashed"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col md:flex-row gap-1.5 md:py-4">
        <div className="flex-grow">
          {previewUrl ? (
            <div className="mx-auto w-80">
              <Image
                alt="file uploader preview"
                objectFit="cover"
                src={previewUrl}
                width={320}
                height={218}
                layout="fixed"
              />
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-full py-3 transition-colors duration-150 cursor-pointer hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-14 h-14"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                />
              </svg>
              <strong className="text-sm font-medium">Select an image</strong>
              <input
                className="block w-0 h-0"
                name="file"
                type="file"
                onChange={onFileUploadChange}
              />
            </label>
          )}
        </div>
        <div className="flex mt-4 md:mt-0 md:flex-col justify-center gap-1.5">
          <button
            disabled={!previewUrl}
            onClick={onCancelFile}
            className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600"
          >
            Cancel file
          </button>
          <button
            disabled={!previewUrl}
            onClick={onUploadFile}
            className="w-1/2 px-4 py-3 text-sm font-medium text-white transition-colors duration-300 bg-gray-700 rounded-sm md:w-auto md:text-base disabled:bg-gray-400 hover:bg-gray-600"
          >
            Upload file
          </button>
        </div>
      </div>
    </form>
  );
};

export default SingleFileUploadForm;
