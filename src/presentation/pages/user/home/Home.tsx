import { useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { ACCESS_TOKEN } from "@/presentation/utils/constants";
import { PlaceUseCases } from "@/domain/useCases/placeUseCases";
import { IPlaceUpdate, IRoute } from "@/domain/entities/IPlaces";
import mqtt from "mqtt";
import MapCard from "@/presentation/components/CardDashboard";

export default function Home() {
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const mapRef = useRef<mapboxgl.Map>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const combiMarkersRef = useRef<Record<string, mapboxgl.Marker>>({});
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const stopMarkersRef = useRef<mapboxgl.Marker[]>([]);

  const [search, setSearch] = useState<IRoute | null>(null)
  const [placesByRoute, setPlacesByRoute] = useState<IPlaceUpdate[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);

  // Obtener ubicación del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error obteniendo ubicación:", error);
          setUserLocation({
            lat: 17.9753722,
            lng: -92.9465036
          });
        }
      );
    } else {
      console.error("Geolocalización no soportada");
      setUserLocation({
        lat: 17.9753722,
        lng: -92.9465036
      });
    }
  }, []);

  // Inicialización del mapa (solo una vez)
  useEffect(() => {
    mapboxgl.accessToken = ACCESS_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current ?? '',
      zoom: 10.20,
      center: userLocation || {
        lat: 17.9753722,
        lng: -92.9465036,
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [userLocation]);

  // Actualizar centro del mapa cuando cambia la ubicación del usuario
  useEffect(() => {
    if (mapRef.current && userLocation) {
      mapRef.current.setCenter([userLocation.lng, userLocation.lat]);
    }
  }, [userLocation]);

  // Marcador del usuario
  useEffect(() => {
    if (!mapRef.current || !userLocation) return;
    
    // Eliminar marcador anterior si existe
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
    }

    // Crear nuevo marcador
    userMarkerRef.current = new mapboxgl.Marker({ color: '#3FB1CE' })
      .setLngLat([userLocation.lng, userLocation.lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="color:rgb(163, 12, 12); font-weight: bold;">
          Tu ubicación
        </div>
      `))
      .addTo(mapRef.current);

    // Asegurar que el marcador del usuario esté siempre visible
    if (userMarkerRef.current.getElement()) {
      userMarkerRef.current.getElement().style.zIndex = '1000';
    }

    return () => {
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
      }
    };
  }, [userLocation]);

  // Marcadores de paradas
  useEffect(() => {
    if (!mapRef.current || placesByRoute.length === 0) return;

    // Limpiar marcadores antiguos
    stopMarkersRef.current.forEach(marker => marker.remove());
    stopMarkersRef.current = [];

    // Crear nuevos marcadores
    placesByRoute.forEach((place) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([place.longitude, place.latitude])
        .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div style="color:rgb(0, 0, 0); font-weight: bold; font-color: rgb(0, 0, 0)">
            ${place.name} <br/>
            <span style="font-size: 12px; color: #000;">Orden: ${place.order}</span>
          </div>
        `))
        .addTo(mapRef.current as mapboxgl.Map);
      
      stopMarkersRef.current.push(marker);
    });
  }, [placesByRoute]);

  // Marcadores de combis
  useEffect(() => {
    if (!mapRef.current) return;
    
    messages.forEach((msg) => {
      const { idCombi, longitude, latitude } = msg;

      if (combiMarkersRef.current[idCombi]) {
        combiMarkersRef.current[idCombi].setLngLat([longitude, latitude]);
      } else {
        const markerElement = createMarkerWithImage('/combi.jpg');
        const newMarker = new mapboxgl.Marker({ element: markerElement })
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div style="color:rgb(10, 1, 83); font-weight: bold;">
              id de la combi ${idCombi} <br/>
            </div>
          `))
          .addTo(mapRef.current as mapboxgl.Map)

        combiMarkersRef.current[idCombi] = newMarker;
      }
    });
  }, [messages]);

  // Obtener paradas por ruta
  useEffect(() => {
    const getPlacesByRoute = async () => {
      try {
        if (!search) return;
        const repository = new PlaceUseCases();
        const response = await repository.getPlaceByRoute(search.id);
        setPlacesByRoute(response);
      } catch (error) {
        console.log("error", error);
      }
    };
    
    if (search) {
      getPlacesByRoute();
    }
  }, [search]);

  // Conexión MQTT
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

    client.on('message', (_, message) => {
      const dataLocation = JSON.parse(message.toString());
      setMessages((prevMessages) => {
        const existingIndex = prevMessages.findIndex(msg => msg.idCombi === dataLocation.idCombi);
        if (existingIndex !== -1) {
          const updatedMessages = [...prevMessages];
          updatedMessages[existingIndex] = dataLocation;
          return updatedMessages;
        } else {
          return [...prevMessages, dataLocation];
        }
      });
    });

    client.on('error', (err) => {
      console.error('🚨 Error MQTT:', err);
    });

    return () => {
      client.end();
    };
  }, [search]);

  const createMarkerWithImage = (imageUrl: string): HTMLElement => {
    const el = document.createElement('div');
    el.style.backgroundImage = `url(${imageUrl})`;
    el.style.width = '40px';
    el.style.height = '40px';
    el.style.backgroundSize = 'contain';
    el.style.backgroundRepeat = 'no-repeat';
    return el;
  };

  console.log("client", client);

  return (
    <div>
      <div style={{ position: 'relative', height: '100vh' }}>
        <div 
          id="map-container" 
          ref={mapContainerRef} 
          style={{ width: '100%', height: '100vh' }} 
        />
        <MapCard
          setRouteValue={setSearch}
          routeValue={search}
          messages={messages}
          userLocation={userLocation}
        />
      </div>
    </div>
  );
}