import { useState, useEffect } from "react";
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
  const [data, setData] = useState<Todo[]>([]);
  const [selectedPin, setSelectedPin] = useState<Todo | null>(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(
    null
  );

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
      });

      if (data.length > 0) {
        // Get the last added pin's coordinates
        const lastPin = data[data.length - 1];
        const lastPinPosition = {
          lat: lastPin.latitude,
          lng: lastPin.longitude,
        };

        // Set the map's center to the last pin's position
        map.setCenter(lastPinPosition);

        // Display pins
        data.forEach((todo) => {
          const marker = new window.google.maps.Marker({
            position: { lat: todo.latitude, lng: todo.longitude },
            map: map,
            title: todo.class,
          });

          // Add click event listener to the marker
          marker.addListener("click", () => {
            setSelectedPin(todo);
            if (infoWindow) {
              infoWindow.close();
            }
            const newInfoWindow = new window.google.maps.InfoWindow({
              content: `
                <div>
                  <p>Latitude: ${todo.latitude}</p>
                  <p>Longitude: ${todo.longitude}</p>
                  <p>Class: ${todo.class}</p>
                  <p>User: ${todo.user}</p>
                  <p>path* ${todo.imagepath}</p>
                  <img src="${todo.imagepath}" alt="Pin Image" width="250" height="250" />
                </div>
              `,
            });
            setInfoWindow(newInfoWindow);
            newInfoWindow.open(map, marker);
          });
        });
      }
    });
  }, [data]);

  return (
    <div>
      <div id="map" style={{ height: "400px" }}></div>
    </div>
  );
};

export default MultiPIN_MAP;
