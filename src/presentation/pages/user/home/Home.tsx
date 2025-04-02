import MapCard from "@/presentation/components/CardDashboard";

export default function Home() {
  return (
    <div>
      <div style={{ position: 'relative', height: '100vh' }}>
      <iframe
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799181496!2d-93.2146422!3d17.9794344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d32e8b1b4ef77b%3A0xc76ed3b6d5042a97!2sTabasco!5e0!3m2!1ses!2smx!4v1676187192837!5m2!1ses!2smx"
        style={{ width: '100%', height: '100%', border: 0 }}
        allowFullScreen
        loading="lazy"
      />
      <MapCard />
      </div>
    </div>
  );
}
