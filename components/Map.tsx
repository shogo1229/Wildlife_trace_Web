import { useEffect, useRef } from 'react';

interface MapProps {
	latitude: number;
	longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
	const mapContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Load Google Maps API script
		const googleMapsScript = document.createElement('script');
		googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAIORL_apItyiqnoDPu4WRbnuBAmKV3WBM&libraries=places`;
		googleMapsScript.async = true;
		window.document.body.appendChild(googleMapsScript);

	googleMapsScript.addEventListener('load', () => {
	  // Initialize the map
		const map = new google.maps.Map(mapContainerRef.current!, {
			center: { lat: latitude, lng: longitude },
			zoom: 15,
					mapId:'6c6ec6ddb735a534'
			});

	  // Place a pin at the provided coordinates
		new google.maps.Marker({
			position: { lat: latitude, lng: longitude },
			map: map,
		});
	});

	return () => {
	  // Clean up the Google Maps API script
		window.document.body.removeChild(googleMapsScript);
	};
	}, [latitude, longitude]);

	return <div ref={mapContainerRef} style={{ height: '400px' }} />;
};

export default Map;
