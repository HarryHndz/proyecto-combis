import { useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { ACCESS_TOKEN } from "@/presentation/utils/constants";
import { PlaceUseCases } from "@/domain/useCases/placeUseCases";
import { IPlaceUpdate, IRoute } from "@/domain/entities/IPlaces";
import mqtt from "mqtt";
import MapCard from "@/presentation/components/CardDashboard";
import { AdminUseCases } from "@/domain/useCases/adminUseCases";
import { AdminRepository } from "@/data/repository/adminRepository";
import { LocalStoreUseCase } from "@/domain/useCases/localStoreUseCase";
import { LocalStoreRepository } from "@/data/repository/localRepository";
import { IUser } from "@/domain/entities/IAuth";
import { IDriverCar } from "@/domain/entities/IDriverCar";

export default function RoutesCombi() {
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);
  const mapRef = useRef<mapboxgl.Map>();
  const mapContainerRef = useRef<HTMLDivElement>();
  const adminRepository = new AdminUseCases(new AdminRepository);
  const localRepository = new LocalStoreUseCase<IUser>(new LocalStoreRepository());
  const [data, setData] = useState<IDriverCar>();

  const [currentLocation, setCurrentLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [locationWatchId, setLocationWatchId] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const userLocal = localRepository.get('user')
      const user = await adminRepository.getDataDriverCar(Number(userLocal?.id))
      setData(user)
    }
    fetchData()
  }, [])

  const [search, setSearch] = useState<IRoute | null>(null);
  const [placesByRoute, setPlacesByRoute] = useState<IPlaceUpdate[]>([]);

  useEffect(() => {
    mapboxgl.accessToken = ACCESS_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      zoom: 10.20,
      center: {
        lat: 17.9753722,
        lng: -92.9465036,
      }

    });

    if (placesByRoute.length > 0) {
      placesByRoute.forEach((place) => {
        new mapboxgl.Marker().setLngLat([place.longitude, place.latitude]).setPopup(
          new mapboxgl.Popup({ offset: 25 }).setText(`${place.name} (Orden: ${place.order})`)
        ).addTo(mapRef.current)
      });
    }

    return () => {
      mapRef.current.remove();
    }
  }, [placesByRoute]);

  useEffect(() => {
    const getPlacesByRoute = async () => {
      try {
        if (!search) return;
        const repository = new PlaceUseCases();
        const response = await repository.getPlaceByRoute(search.id);
        setPlacesByRoute(response);
        console.log("response", response);
      } catch (error) {
        console.log("error", error);
      }
    }
    if (search) {
      getPlacesByRoute();
    }
  }, [search]);

  useEffect(() => {
    if (!search) return;
    const client = mqtt.connect('ws://6.tcp.us-cal-1.ngrok.io:17150');
    setClient(client);
    client.on('connect', () => {
      console.log('🟢 Conectado al broker MQTT');
      client.subscribe(`ubicacion/ruta/${search.id}`, (err) => {
        if (!err) {
          console.log('✅ Suscrito a mi/topic');
        } else {
          console.error('❌ Error al suscribirse:', err);
        }
      });
    });

    client.on('error', (err) => {
      console.error('🚨 Error MQTT:', err);
    });
    // Cleanup
    return () => {
      client.end();
    };
  }, [search]);





  // Obtener ubicación actual cada vez que cambie
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ latitude, longitude });

          // Centrar el mapa en la ubicación actual
          if (mapRef.current) {
            mapRef.current.setCenter([longitude, latitude]);
          }
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );

      setLocationWatchId(watchId);

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      console.error('Geolocalización no soportada por este navegador');
    }
  }, []);

  // Enviar ubicación cada 10 segundos
  useEffect(() => {
    if (!client || !search) return;

    const intervalId = setInterval(() => {
      if (currentLocation) {
        handlePublish();
      } else {
        console.warn('Ubicación actual no disponible');
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [client, search, currentLocation]);




  const handlePublish = () => {
    if (client && search && currentLocation) {
      console.log('🟢 Publicando ubicación...', currentLocation);
      const locationData = {
        latitude: currentLocation?.latitude,
        longitude: currentLocation?.longitude,
        idCombi: data?.id_conductor,
      };

      client.publish(`ubicacion/ruta/${search.id}`, JSON.stringify(locationData));
      console.log('📤 Ubicación enviada:', locationData);
    } else {
      console.warn('No se puede publicar: cliente MQTT no conectado, ruta no seleccionada o ubicación no disponible');
    }
  };

  return (
    <div>
      <div style={{ position: 'relative', height: '100vh' }}>
        <div id="map-container" ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />
        <MapCard
          setRouteValue={setSearch}
          routeValue={search}
        />
      </div>
    </div>
  );
}