import { useEffect } from "react";

function EwasteMap() {
  useEffect(() => {
    console.log("EwasteMap: Component mounted, starting nearby search...");
    const storedLocation = localStorage.getItem("userLocation");

    if (!storedLocation) {
      console.error("EwasteMap: No location found in localStorage.");
      return;
    }
    if (!window.google) {
      console.error("EwasteMap: Google Maps API is not loaded.");
      return;
    }

    const { latitude, longitude } = JSON.parse(storedLocation);
    console.log("EwasteMap: Retrieved location:", { latitude, longitude });

    const locationLatLng = new window.google.maps.LatLng(latitude, longitude);
    
    // Create a dummy map container (this container is not attached to DOM)
    const dummyDiv = document.createElement("div");
    const map = new window.google.maps.Map(dummyDiv, {
      center: locationLatLng,
      zoom: 14,
    });

    const request = {
      location: locationLatLng,
      radius: "2000", // Search within 2 km radius
      keyword: "ewaste disposal",
    };

    const service = new window.google.maps.places.PlacesService(map);
    console.log("EwasteMap: Initiating nearby search with request:", request);

    service.nearbySearch(request, (results, status) => {
      console.log("EwasteMap: Nearby search callback triggered.");
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const topResults = results.slice(0, 5);
        console.log("EwasteMap: Found nearby e-waste disposal centers:", topResults);
      } else {
        console.error("EwasteMap: Places service error with status:", status);
      }
    });
  }, []);

  return null; // Do not render any UI
}

export default EwasteMap;
