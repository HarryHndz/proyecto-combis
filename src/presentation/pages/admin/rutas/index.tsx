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

  useEffect(() => {
    const fetchData = async () => {
      const userLocal = localRepository.get('user')
      console.log('id', userLocal)
      const user = await adminRepository.getDataDriverCar(Number(userLocal?.id))
      setData(user)
      console.log('Datos de usuario pero de chofer', user)
    }
    fetchData()
  }, [])

  const [search, setSearch] = useState<IRoute | null>(null);
  const [placesByRoute, setPlacesByRoute] = useState<IPlaceUpdate[]>([]);
  const places = [
    {
      id: 1,
      name: 'Place 1',
      latitude: -12.04318,
      longitude: -77.02824,
      order: 1,
    },
    {
      id: 2,
      name: 'Place 2',
      latitude: -12.04518,
      longitude: -77.03224,
      order: 2,
    },
    {
      id: 3,
      name: 'Place 3',
      latitude: -12.04618,
      longitude: -77.03624,
      order: 3,
    },
  ]


  useEffect(() => {
    mapboxgl.accessToken = ACCESS_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      zoom: 10.20,
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
    const client = mqtt.connect('ws://0.tcp.ngrok.io:18049');
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

  useEffect(() => {
    if (!search || !client) return;

    const interval = setInterval(() => {
      mapboxgl.accessToken = ACCESS_TOKEN
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: currentLocation ? [currentLocation.longitude, currentLocation.latitude] : undefined,
        zoom: 10.12,
      })
      mapRef.current.on('click', (e) => {
        setCurrentLocation({
          latitude: e.lngLat.lat,
          longitude: e.lngLat.lng
        })
      })

      const locationData = {
        latitude: currentLocation?.latitude,
        longitude: currentLocation?.longitude,
        idCombi: data?.id_conductor,
      };

      client.publish(`ubicacion/ruta/${search.id}`, JSON.stringify(locationData));
      console.log('📤 Ubicación enviada automáticamente:', locationData);
    }, 1000);

    return () => clearInterval(interval);
  }, [search, client, places]);

  const handlePublish = () => {
    if (client && search && currentLocation) {
      const locationData = {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
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

        {search && (
          <button
            onClick={handlePublish}
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              padding: '10px 15px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Compartir mi ubicación
          </button>
        )}
      </div>
    </div>
  );
}