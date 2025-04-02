import { useParams } from "react-router-dom";

export default function DetailsDriver() {
  const params = useParams();

  return <div>Detalles del chofer {params.id}</div>;
}