import {MapMarker, Map} from "react-kakao-maps-sdk";
import {useState} from "react";

const KakaoMap = ({lat, lng, name}) => {
    const [marker, setMarker] = useState({position: {lat, lng}, content: name})


    return (
        <Map
            center={{
                lat: lat,
                lng: lng,
            }}
            style={{
                width: "100%",
                height: "200px",
            }}
            level={3}
        >
            <MapMarker
                key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
            >
            </MapMarker>
        </Map>
    )
}

export default KakaoMap;