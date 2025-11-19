import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState } from 'react';

// Fix marker icon issue in Leaflet
const defaultIcon = new L.Icon({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
function ChangeMapView({ coords }) {
  const map = useMap();

  map.flyTo(coords, 10, {
    duration: 1.5, // smooth animation
  });

  return null;
}
const Map = ({ districtsData }) => {
  console.log(districtsData);
  const bangladeshCenter = [23.8103, 90.4125];
  const [searchValue, setSearchValue] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // Filter by partial + ignore case
  const handleSearch = e => {
    e.preventDefault();
    const text = e.target.text.value.toLowerCase();
    console.log(text);
    setSearchValue(text);
    const match = districtsData.find(
      d =>
        d.city.toLowerCase().includes(text) ||
        d.district.toLowerCase().includes(text)
    );
    console.log(match);
    setSelectedDistrict(match || null);
  };
  return (
    <div className="max-w-6xl mx-auto ">
      <div className="mt-6 flex ">
        <div className="join">
          <form onSubmit={handleSearch} className=" flex">
            <label className="input validator join-item rounded-l-3xl">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                defaultValue={searchValue}
                name="text"
                type="text"
                placeholder="Search"
              />
            </label>
            <button
              type="submit"
              className="btn btn-neutral join-item rounded-r-3xl"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      {/* Map Section */}
      <div className="mt-10 w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={bangladeshCenter}
          zoom={7}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          {/* Map Tile */}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* If district selected -> move the map */}
          {selectedDistrict && (
            <ChangeMapView
              coords={[selectedDistrict.latitude, selectedDistrict.longitude]}
            />
          )}

          {districtsData.map((item, index) => (
            <Marker
              key={index}
              position={[item.latitude, item.longitude]}
              icon={defaultIcon}
            >
              <Popup>
                <h2 className="font-semibold">{item.district}</h2>
                <p>
                  <b>Region:</b> {item.region}
                </p>
                <p>
                  <b>City:</b> {item.city}
                </p>

                <p className="mt-2 text-sm">
                  <b>Covered Areas:</b>
                  <br />
                  {item.covered_area.join(', ')}
                </p>

                <a
                  href={item.flowchart}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mt-2 block"
                >
                  View Flowchart
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
