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

  const [search,setSearch] = useState<IRoute | null>(null)
  const [placesByRoute,setPlacesByRoute] = useState<IPlaceUpdate[]>([])
  useEffect(() => {
    mapboxgl.accessToken = ACCESS_TOKEN
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      zoom:10.20,
      
    });
    if (placesByRoute.length > 0) {
      placesByRoute.forEach((place)=>{
        new mapboxgl.Marker().setLngLat([place.longitude,place.latitude]).setPopup(
          new mapboxgl.Popup({ offset: 25 }).setText(`${place.name} (Orden: ${place.order})`)
        ).addTo(mapRef.current)
      })
    }
    return () => {
      mapRef.current.remove()
    }
  }, [placesByRoute])

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

    const client = mqtt.connect('ws://0.tcp.ngrok.io:15231');
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
      setMessages(prev => [...prev, message.toString()]);
    });

    client.on('error', (err) => {
      console.error('🚨 Error MQTT:', err);
    });

    // Cleanup
    return () => {
      client.end();
    };
  }, [search]);

  const handlePublish = () => {
    if (client && search) {
      client.publish(`ubicacion/ruta/${search.id}`,'prueba')
    }
  };

  console.log("mensajes",messages);
  


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
