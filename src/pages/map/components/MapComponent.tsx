import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { Loader } from "@googlemaps/js-api-loader";
import SearchOnCurrentMapButton from "./SearchOnCurrentMapButton";

export interface Pharmacy extends google.maps.places.PlaceResult {
  place_id: string;
  geometry: google.maps.places.PlaceGeometry;
  distance?: string;
}

export interface PharmacyDetails extends Pharmacy {
  formatted_phone_number?: string;
  formatted_address?: string;
  opening_hours?: google.maps.places.PlaceOpeningHours;
  photos?: google.maps.places.PlacePhoto[];
  rating?: number;
  reviews?: google.maps.places.PlaceReview[];
  vicinity?: string;
}

const MapComponent: React.FC<{
  onPharmaciesFound: (pharmacies: Pharmacy[]) => void;
  onPharmacySelect: (pharmacy: Pharmacy) => void;
  onPositionUpdate: (position: { lat: number; lng: number }) => void;
}> = ({ onPharmaciesFound, onPharmacySelect, onPositionUpdate }) => {
  const googleAPI = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const currentLocationMarkerRef =
    useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 37.5665,
    lng: 126.978,
  });
  const [isMapMoved, setIsMapMoved] = useState(false);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const loader = useMemo(
    () =>
      new Loader({
        apiKey: googleAPI ?? "",
        version: "weekly",
        libraries: ["places", "geometry", "marker"],
      }),
    [googleAPI]
  );

  const getUserLocation = useCallback(() => {
    return new Promise<{ lat: number; lng: number }>((resolve) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            resolve(newPosition);
          },
          () => {
            resolve({ lat: 37.5665, lng: 126.978 });
          }
        );
      } else {
        resolve({ lat: 37.5665, lng: 126.978 });
      }
    });
  }, []);

  const updateMarkers = useCallback(
    (pharmacies: Pharmacy[]) => {
      if (!mapRef.current || !window.google?.maps) return;

      markersRef.current.forEach((marker) => (marker.map = null));
      markersRef.current = [];

      const newMarkers = pharmacies
        .map((pharmacy) => {
          if (!pharmacy.geometry?.location) return null;

          const marker = new google.maps.marker.AdvancedMarkerElement({
            map: mapRef.current!,
            position: pharmacy.geometry.location,
            title: pharmacy.name,
          });

          marker.addListener("click", () => onPharmacySelect(pharmacy));
          return marker;
        })
        .filter(
          (m): m is google.maps.marker.AdvancedMarkerElement => m !== null
        );

      markersRef.current = newMarkers;
    },
    [onPharmacySelect]
  );

  const fetchPharmacyDetails = useCallback(
    async (
      pharmacy: Pharmacy,
      centerLocation: google.maps.LatLngLiteral
    ): Promise<PharmacyDetails | null> => {
      if (!mapRef.current || !window.google?.maps) return null;

      const service = new google.maps.places.PlacesService(mapRef.current);

      return new Promise<PharmacyDetails | null>((resolve) => {
        service.getDetails(
          {
            placeId: pharmacy.place_id,
            fields: [
              "name",
              "rating",
              "formatted_phone_number",
              "formatted_address",
              "opening_hours",
              "photos",
              "business_status",
              "reviews",
              "vicinity",
            ],
          },
          (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
              const distance =
                google.maps.geometry.spherical.computeDistanceBetween(
                  new google.maps.LatLng(centerLocation),
                  pharmacy.geometry.location!
                );

              resolve({
                ...place,
                place_id: pharmacy.place_id,
                geometry: pharmacy.geometry,
                distance: `${Math.round(distance / 100) / 10}km`,
              } as PharmacyDetails);
            } else {
              resolve(null);
            }
          }
        );
      });
    },
    []
  );

  const searchNearbyPharmacies = useCallback(
    async (searchCenter?: google.maps.LatLngLiteral) => {
      if (!mapRef.current || !window.google?.maps) return;

      const service = new google.maps.places.PlacesService(mapRef.current);
      const searchLocation = searchCenter || currentPosition;

      const request = {
        location: searchLocation,
        radius: 5000,
        type: "pharmacy",
      };

      try {
        const results = await new Promise<Pharmacy[]>((resolve, reject) => {
          service.nearbySearch(request, (results, status) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              results
            ) {
              const pharmacies = results.map((place) => ({
                ...place,
                place_id: place.place_id!,
                geometry: place.geometry!,
              })) as Pharmacy[];
              resolve(pharmacies);
            } else {
              reject(new Error("Failed to find pharmacies"));
            }
          });
        });

        const detailedPharmacies = await Promise.all(
          results.map((pharmacy) =>
            fetchPharmacyDetails(pharmacy, searchLocation)
          )
        );

        const validPharmacies = detailedPharmacies.filter(
          (p): p is PharmacyDetails => p !== null
        );
        onPharmaciesFound(validPharmacies);
        updateMarkers(validPharmacies);

        return validPharmacies;
      } catch (error) {
        console.error("Error searching pharmacies:", error);
        return [];
      }
    },
    [currentPosition, onPharmaciesFound, fetchPharmacyDetails, updateMarkers]
  );

  const initMap = useCallback(
    async (position: google.maps.LatLngLiteral) => {
      try {
        const google = await loader.load();
        const mapInstance = new google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            center: position,
            zoom: 14,
            mapId: "DEMO_MAP_ID",
          }
        );
        mapRef.current = mapInstance;

        currentLocationMarkerRef.current =
          new google.maps.marker.AdvancedMarkerElement({
            map: mapInstance,
            position: position,
            title: "현재 위치",
          });

        mapInstance.addListener("dragend", () => {
          setIsMapMoved(true);
        });

        mapInstance.addListener("drag", () => {
          setIsMapMoved(true);
        });

        setIsMapInitialized(true);
        await searchNearbyPharmacies(position);
      } catch (error) {
        console.error("Error loading map:", error);
      }
    },
    [loader, searchNearbyPharmacies]
  );

  const handleSearchCurrentMap = useCallback(() => {
    if (!mapRef.current) return;

    const center = mapRef.current.getCenter();
    if (center) {
      const searchCenter = {
        lat: center.lat(),
        lng: center.lng(),
      };
      searchNearbyPharmacies(searchCenter);
      setIsMapMoved(false);
    }
  }, [searchNearbyPharmacies]);

  useEffect(() => {
    const initializeMap = async () => {
      const position = await getUserLocation();
      setCurrentPosition(position);
      onPositionUpdate(position);
      await initMap(position);
    };

    if (!isMapInitialized) {
      initializeMap();
    }
  }, [getUserLocation, initMap, isMapInitialized, onPositionUpdate]);

  useEffect(() => {
    return () => {
      markersRef.current.forEach((marker) => (marker.map = null));
      if (currentLocationMarkerRef.current) {
        currentLocationMarkerRef.current.map = null;
      }
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <div id="map" className="w-full h-full" />
      {isMapMoved && (
        <div className="fixed inset-x-0 z-30" style={{ bottom: "24px" }}>
          <div
            className="w-full flex justify-center"
            onClick={handleSearchCurrentMap}
          >
            <SearchOnCurrentMapButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
