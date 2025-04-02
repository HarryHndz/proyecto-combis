import { useParams } from "react-router-dom";

export default function UpdateDriver() {
  const params = useParams();

  return (
    <div>
      <h1>Actualizar driver {params.id}</h1>
    </div>
  );
}
