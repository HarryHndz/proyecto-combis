import MapCard from "@/presentation/components/CardDashboard";
import { useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import { ACCESS_TOKEN } from "@/presentation/utils/constants";
import { PlaceUseCases } from "@/domain/useCases/placeUseCases";
import { IPlaceUpdate, IRoute } from "@/domain/entities/IPlaces";
// import client from '@/presentation/utils/clientMqtt'

export default function Home() {
  const mapRef = useRef<mapboxgl.Map>()
  const mapContainerRef = useRef<HTMLDivElement>()
  // const [mensaje, setMensaje] = useState('');
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



  // useEffect(() => {
  //   if (search) {
  //     console.log("entro");
  //     client.on('connect', () => {
  //       console.log('Conectado a MQTT');
  //       client.subscribe(`ubicacion/ruta/${search.id}`);
  //     })
  //     client.on('message', (topic, message) => {
  //       console.log(`Mensaje recibido en ${topic}: ${message.toString()}`);
  //       setMensaje(message.toString());
  //     })
  
  //   }
  //   return () => {
  //     client.end();
  //   };
  // }, [search]);

  // const sendMessage= () => {
  //   client.publish('demo/temperatura', '¡Hola desde React!');
  // };

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
