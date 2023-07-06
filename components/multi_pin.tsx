import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import firebaseConfig from "../lib/firebase";

interface Todo {
  id: string;
  class: string;
  latitude: number;
  longitude: number;
  user: number;
}

const loadGoogleMapsAPI = () => {
  return new Promise((resolve, reject) => {
    const existingScript = document.getElementById("google-maps-api");

    if (existingScript) {
      resolve();
    } else {
      const script = document.createElement("script");
      script.id = "google-maps-api";
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    }
  });
};

const MultiPIN_MAP = () => {
  const [data, setData] = useState<Todo[]>([]);

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
        zoom: 15,
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
        });
      }
    });
  }, []);

  return <div id="map" style={{ height: "400px" }}></div>;
};

export default MultiPIN_MAP;
