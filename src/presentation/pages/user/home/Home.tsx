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
  const mapRef = useRef<mapboxgl.Map>()
  const mapContainerRef = useRef<HTMLDivElement>()
  const combiMarkersRef = useRef<Record<string, mapboxgl.Marker>>({});

  const [search,setSearch] = useState<IRoute | null>(null)
  const [placesByRoute,setPlacesByRoute] = useState<IPlaceUpdate[]>([])
  useEffect(() => {
    mapboxgl.accessToken = ACCESS_TOKEN
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      zoom:10.20,
      center:{
        lat:17.8192384,
        lng:-91.5308544
      }
    });
    if (placesByRoute.length > 0) {
      placesByRoute.forEach((place)=>{
        new mapboxgl.Marker().setLngLat([place.longitude,place.latitude]).setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div style="color:rgb(10, 1, 83); font-weight: bold;">
              ${place.name} <br/>
              <span style="font-size: 12px; color: #555;">Orden: ${place.order}</span>
            </div>
          `)
        ).addTo(mapRef.current)
      })
    }
    return () => {
      mapRef.current.remove()
    }
  }, [placesByRoute])

  useEffect(() => {
    if (!mapRef.current) return;
    messages.forEach((msg) => {
      const { idCombi, longitude, latitude } = msg;

      // Si ya existe el marcador, solo actualizamos su posición
      if (combiMarkersRef.current[idCombi]) {
        combiMarkersRef.current[idCombi].setLngLat([longitude, latitude]);
      } else {
        // Si no existe, creamos uno nuevo y lo guardamos en el ref
        const markerElement = createMarkerWithImage('/combi.jpg'); // ruta de tu imagen
        const newMarker = new mapboxgl.Marker({ element:markerElement })
          .setLngLat([longitude, latitude])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div style="color:rgb(10, 1, 83); font-weight: bold;">
              id de la combi ${idCombi} <br/>
            </div>
          `)
          ).addTo(mapRef.current);

        combiMarkersRef.current[idCombi] = newMarker;
      }
    });
  }, [messages]);


  useEffect(()=>{
    const getPlacesByRoute = async()=>{
      try {
        if (!search)return
        const repository = new PlaceUseCases()
        const response = await repository.getPlaceByRoute(search.id)
        setPlacesByRoute(response)
        console.log("response",response);
      } catch (error) {
        console.log("error",error);
        
      }
    }
    if (search) {
      getPlacesByRoute()
    }
  },[search])

  useEffect(() => {
    if (!search)return
    const client = mqtt.connect('ws://0.tcp.ngrok.io:18049');
    setClient(client)
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

    // Recibir mensajes
    client.on('message', (topic, message) => {
      console.log(`📩 Mensaje recibido en ${topic}:`, message.toString());
      const dataLocation = JSON.parse(message.toString())
      console.log("aqui",dataLocation);
      setMessages((prevMessages) => {
        const existingIndex = prevMessages.findIndex(msg=> msg.idCombi === dataLocation.idCombi);
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
  
  
  return (
    <div>
      <div style={{ position: 'relative', height: '100vh' }}>
      <div id="map-container" ref={mapContainerRef} style={{width:'100%',height:'100vh'}} />
      <MapCard
        setRouteValue={setSearch}
        routeValue={search}
      />
      </div>
    </div>
  );
}
