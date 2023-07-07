import { useState, useEffect, useRef, SetStateAction } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import firebaseConfig from "../lib/firebase";
import Image from "next/image";

interface Todo {
  id: string;
  class: string;
  latitude: number;
  longitude: number;
  user: number;
  imagepath: string;
}

const loadGoogleMapsAPI = () => {
  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById("google-maps-api");

    if (existingScript) {
      resolve();
    } else {
      const script = document.createElement("script");
      script.id = "google-maps-api";
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAIORL_apItyiqnoDPu4WRbnuBAmKV3WBM&libraries=places`;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    }
  });
};

const MultiPIN_MAP = () => {
  const [filter, setFilter] = useState<string>("all"); // Track the selected filter
  const [data, setData] = useState<Todo[]>([]);
  const [selectedPin, setSelectedPin] = useState<Todo | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const handleFilterChange = (filter: SetStateAction<string>) => {
    setFilter(filter);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firebaseConfig, "trace_DB"),
      (snapshot) => {
        const arrList: Todo[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          arrList.push({
            id: doc.id,
            class: data.class,
            latitude: data.latitude,
            longitude: data.longitude,
            user: data.user,
            imagepath: data.imagePath,
          });
        });
        setData(arrList);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    loadGoogleMapsAPI().then(() => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        disableDefaultUI: true, // Disable the default UI controls
        styles: [
          {
            stylers: [
              {
                saturation: -100,
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#0099dd",
              },
            ],
          },
          {
            elementType: "labels",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#aadd55",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "labels",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
          {},
        ],
      });

      mapRef.current = map;

      if (data.length > 0) {
        const lastPin = data[data.length - 1];
        const lastPinPosition = {
          lat: lastPin.latitude,
          lng: lastPin.longitude,
        };

        map.setCenter(lastPinPosition);

        data.forEach((todo) => {
          let iconImage;
          if (todo.class === "Boar") {
            iconImage = "/icons/Boar_pin_Red.png";
          } else if (todo.class === "Deer") {
            iconImage = "/icons/Deer_pin_Red.png";
          }

          const marker = new window.google.maps.Marker({
            position: { lat: todo.latitude, lng: todo.longitude },
            map: map,
            title: todo.class,
            icon: {
              url: iconImage,
              scaledSize: new window.google.maps.Size(32, 32),
            },
          });

          if (filter === "all" || todo.class === filter) {
            marker.setVisible(true);
          } else {
            marker.setVisible(false);
          }

          marker.addListener("click", () => {
            setSelectedPin(todo);
            if (infoWindowRef.current) {
              infoWindowRef.current.close();
            }
            const newInfoWindow = new window.google.maps.InfoWindow({
              content: `
              <div class="max-w-xs p-4 flex">
              <div class="mr-4">
                <img src="${todo.imagepath}" alt="Pin Image" width="100%" style="max-width: 250px; height: auto;" />
              </div>
              <div>
                <p class="mb-2">
                  <strong class="text-blue-500 font-bold">Latitude:</strong>
                  <br>
                  <span class="font-bold">${todo.latitude}</span>
                </p>
                <p class="mb-2">
                  <strong class="text-blue-500 font-bold">Longitude:</strong>
                  <br>
                  <span class="font-bold">${todo.longitude}</span>
                </p>
                <p class="mb-2">
                  <strong class="text-blue-500 font-bold">Class:</strong>
                  <br>
                  <span class="font-bold">${todo.class}</span>
                </p>
                <p class="mb-2">
                  <strong class="text-blue-500 font-bold">User:</strong>
                  <br>
                  <span class="font-bold">${todo.user}</span>
                </p>
              </div>
            </div>
            
              `,
            });
            infoWindowRef.current = newInfoWindow;
            newInfoWindow.open(map, marker);

            // Close the InfoWindow when clicking outside of it
            google.maps.event.addListener(map, "click", () => {
              newInfoWindow.close();
            });
          });
        });
      }
    });
  }, [data, filter]);

  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap -mb-px text-base font-medium text-center text-gray-500 dark:text-gray-400">
          <button
            className={`mr-2 inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${
              selectedFilter === "all"
                ? "text-blue-700 border-b-2 font-medium border-blue-700"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group text-gray-600"
            } py-4 px-6 block hover:text-blue-500 focus:outline-none`}
            onClick={() => handleFilterChange("all")}
          >
            All
          </button>
          <button
            className={`mr-2 inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${
              selectedFilter === "Boar"
                ? "text-blue-700 border-b-2 font-medium border-blue-700"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group text-gray-600"
            } py-4 px-6 block hover:text-blue-500 focus:outline-none`}
            onClick={() => handleFilterChange("Boar")}
          >
            Boar
          </button>
          <button
            className={`mr-2 inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${
              selectedFilter === "Deer"
                ? "text-blue-700 border-b-2 font-medium border-blue-700"
                : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group text-gray-600"
            } py-4 px-6 block hover:text-blue-500 focus:outline-none`}
            onClick={() => handleFilterChange("Deer")}
          >
            Deer
          </button>
        </div>
      </div>
      <div id="map" style={{ height: "400px" }}></div>
    </div>
  );
};

export default MultiPIN_MAP;
