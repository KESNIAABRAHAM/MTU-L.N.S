import { useEffect, useState, useRef } from "react";
import "../Styles/Mainpage.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet-routing-machine";
import L from "leaflet";
import Swal from "sweetalert2";
import "leaflet-control-geocoder";

function userWatchLocation(setUserLocation) {
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting user location", error);
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [setUserLocation]);
}

export default function Mainpage() {
  const schoolCoordinates = [
    { name: "CBAS", lat: 6.73076, lng: 3.41134 },
    { name: "CHMS", lat: 6.73101, lng: 3.41141 },
    { name: "ICT", lat: 6.73097, lng: 3.41369 },
    { name: "LIBRARY", lat: 6.72534, lng: 3.41121 },
    { name: "POSTGRADUATE", lat: 6.7304, lng: 3.4141 },
    { name: "ADMIN", lat: 6.72985, lng: 3.41459 },
    { name: "ORGANHOUSE", lat: 6.72965, lng: 3.41476 },
    { name: "CHAPEL", lat: 6.72961, lng: 3.41029 },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [destination, setDestination] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  userWatchLocation(setUserLocation);

  const mapRef = useRef(null);

  const SetMapInstance = () => {
    const map = useMap();
    mapRef.current = map;
    return null;
  };

  useEffect(() => {
    if (destination && userLocation && mapRef.current) {
      const mapInstance = mapRef.current;

      // Remove any existing routing control
      if (mapInstance._routingControl) {
        mapInstance.removeControl(mapInstance._routingControl);
      }

      // Add new routing control
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(userLocation.lat, userLocation.lng),
          L.latLng(destination.lat, destination.lng),
        ],
        routeWhileDragging: false,
        lineOptions: { styles: [{ color: "#FF0000", weight: 6 }] },
      }).addTo(mapInstance);

      // Store the routing control on the map instance
      mapInstance._routingControl = routingControl;
    }
  }, [destination, userLocation]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSearchSubmit = () => {
    const foundDestination = schoolCoordinates.find((building) =>
      building.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (foundDestination) {
      setDestination(foundDestination);
    } else {
      Swal.fire({
        title: "Venue search failure",
        text: "Venue does not exist",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Search by location name"
          className="searchbar"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          className="searchbutton"
          onClick={handleSearchSubmit}
          type="submit"
        >
          Search
        </button>
        <br />
        <br />

        <div>
          <MapContainer
            center={[6.728, 3.412]}
            zoom={17}
            scrollWheelZoom={false}
            style={{ height: "700px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {userLocation && (
              <Marker position={[userLocation.lat, userLocation.lng]} style= {{color:"green"}}>
                <Popup>Your Location</Popup>
              </Marker>
            )}
            {destination && (
              <Marker position={[destination.lat, destination.lng]}>
                <Popup>{destination.name}</Popup>
              </Marker>
            )}
            {schoolCoordinates.map((building, index) => (
              <Marker key={index} position={[building.lat, building.lng]}>
                <Popup>{building.name}</Popup>
              </Marker>
            ))}
            <SetMapInstance />
          </MapContainer>
        </div>
      </div>
    </>
  );
}
