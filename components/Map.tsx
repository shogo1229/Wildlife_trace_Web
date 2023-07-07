import { useEffect, useRef } from "react";

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Google Maps API script
    const googleMapsScript = document.createElement("script");
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAIORL_apItyiqnoDPu4WRbnuBAmKV3WBM&libraries=places`;
    googleMapsScript.async = true;
    window.document.body.appendChild(googleMapsScript);

    googleMapsScript.addEventListener("load", () => {
      // Initialize the map
      const map = new google.maps.Map(mapContainerRef.current!, {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
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

      // Place a pin at the provided coordinates
      new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
      });

      // Disable Street View control
      map.setOptions({ streetViewControl: false });

      // Disable fullscreen control
      map.setOptions({ fullscreenControl: false });
    });

    return () => {
      // Clean up the Google Maps API script
      window.document.body.removeChild(googleMapsScript);
    };
  }, [latitude, longitude]);

  return <div ref={mapContainerRef} style={{ height: "400px" }} />;
};

export default Map;
