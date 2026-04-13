// components/Contact/GoogleMap.jsx

"use client";

const GoogleMap = ({
  lat = 45.5017, // Montreal coordinates
  lng = -73.5673,
  zoom = 14,
  address = "Montreal, Quebec, Canada",
}) => {
  // Google Maps Embed API
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(address)}&zoom=${zoom}`;

  // Alternative: Direct embed (no API key needed but limited features)
  const directMapUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=ar&z=${zoom}&output=embed`;

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg border border-[#023048]/10">
      <iframe
        src={directMapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="موقعنا على الخريطة"
        className="w-full h-full"
      />
    </div>
  );
};

export default GoogleMap;
