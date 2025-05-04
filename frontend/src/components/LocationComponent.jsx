import { useEffect } from "react";

function LocationComponent() {
  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (!storedLocation && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const loc = { latitude, longitude };
          localStorage.setItem("userLocation", JSON.stringify(loc));
          console.log("Location saved:", loc);
        },
        (error) => {
          console.error("Error retrieving location:", error);
        }
      );
    }
  }, []);

  return null; // No UI rendered
}

export default LocationComponent;
