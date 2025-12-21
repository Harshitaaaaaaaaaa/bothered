import { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ================= FIX LEAFLET ICON ================= */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});
/* =================================================== */

/* ================= COUNTRY HELPLINES ================= */
const COUNTRY_HELPLINES = {
  India: [
    {
      name: "Kiran (Govt. of India)",
      phone: "1800-599-0019",
      desc: "24/7 national mental health helpline",
    },
    {
      name: "AASRA",
      phone: "+91 9820466726",
      desc: "24/7 emotional support",
    },
    {
      name: "iCALL (TISS)",
      phone: "+91 9152987821",
      desc: "Mon–Sat professional counselling",
    },
  ],
};
/* =================================================== */

function Helpline({ onBack }) {
  const [coords, setCoords] = useState(null);
  const [country, setCountry] = useState("");
  const [helplines, setHelplines] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= GET LOCATION ================= */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          setCoords([latitude, longitude]);

          const res = await axios.get(
            "https://nominatim.openstreetmap.org/reverse",
            {
              params: {
                lat: latitude,
                lon: longitude,
                format: "json",
              },
            }
          );

          const detectedCountry = res.data.address?.country;
          setCountry(detectedCountry);
          setHelplines(COUNTRY_HELPLINES[detectedCountry] || []);
        } catch {
          setError("Unable to detect your location.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission denied.");
        setLoading(false);
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-emerald-800 text-white px-6 py-10">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-6">
        <h1 className="text-4xl font-extrabold mb-2">
          📍 Mental Health Support Near You
        </h1>
        <p className="text-white/80">
          Help is closer than you think 💚
        </p>
      </div>

      {/* MAP CARD */}
      {coords && (
        <div className="max-w-4xl mx-auto mb-8 rounded-3xl overflow-hidden shadow-2xl border border-emerald-700">
          <MapContainer
            center={coords}
            zoom={12}
            style={{ height: "300px", width: "100%" }}
          >
            <TileLayer
              attribution="© OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={coords}>
              <Popup>
                📍 You are here
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}

      {/* LOCATION TEXT */}
      {country && (
        <p className="text-center text-white/80 mb-6">
          🌍 Detected country: <strong>{country}</strong>
        </p>
      )}

      {/* LOADING / ERROR */}
      {loading && (
        <p className="text-center text-white/70">
          Detecting your location...
        </p>
      )}

      {error && (
        <p className="text-center text-red-300">
          {error}
        </p>
      )}

      {/* HELPLINE CARDS */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {helplines.map((h, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-emerald-800">
              {h.name}
            </h3>

            <p className="text-sm text-emerald-700 mb-4">
              {h.desc}
            </p>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-emerald-800">
                📞 {h.phone}
              </span>

              <a
                href={`tel:${h.phone}`}
                className="bg-emerald-800 text-white px-4 py-2 rounded-full hover:bg-emerald-900 transition"
              >
                Call
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="text-center mt-10">
        <button
          onClick={onBack}
          className="underline text-white/80 hover:text-white"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default Helpline;
