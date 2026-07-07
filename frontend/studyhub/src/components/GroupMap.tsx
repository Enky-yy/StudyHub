"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import Groups from "@/types/groups";

// Fix missing Leaflet marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface GroupMapProps {
  groups: Groups[];
}

export default function GroupMap({ groups }: GroupMapProps) {
  return (
    <MapContainer
      center={[25.2677, 82.9913]} // IIT BHU
      zoom={13}
      className="h-full w-full rounded-3xl"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {groups
        .filter(
          (group) =>
            group.lat !== null &&
            group.long !== null
        )
        .map((group) => (
          <Marker
            key={group.id}
            position={[group.lat!, group.long!]}
          >
            <Popup>
              <div className="space-y-1">
                <h3 className="font-bold text-lg">
                  {group.title}
                </h3>

                <p>
                  <strong>Topic:</strong> {group.topic}
                </p>

                <p>
                  <strong>Members:</strong> {group.total_member}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {group.meeting_location}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}