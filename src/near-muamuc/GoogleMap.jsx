import {useCallback, useEffect, useRef, useState} from "react";
import {AdvancedMarker, InfoWindow} from "@vis.gl/react-google-maps";
import YumBubble from "/src/assets/icon/bubble/yumBubble.svg?react"
import BadBubble from "/src/assets/icon/bubble/badBubble.svg?react"
import NoneBadBubble from "/src/assets/icon/bubble/noneBadBubble.svg?react"
import NoneGoodBubble from "/src/assets/icon/bubble/noneGoodBubble.svg?react"
import NoneSosoBubble from "/src/assets/icon/bubble/noneSosoBubble.svg?react"
import ForkBubble from "/src/assets/icon/bubble/forkBubble.svg?react"

import {throttle} from "lodash";
import {Map} from "@vis.gl/react-google-maps";
import RestaurantStore from "../store/RestaurantStore.js";

const GoogleMap = ({width, height, lat, lng, zoom, onChange, onClickMarker}) => {

    const {restaurantList} = RestaurantStore()
    const mapInstance = useRef(null)

    const [markers, setMarkers] = useState([])

    const onBoundsChange = useCallback(
        throttle((data) => {
            onChange(data?.detail?.bounds)
        }, 1500), [])

    const constMarkerType = {
        1: YumBubble,
        2: BadBubble,
        3: NoneSosoBubble,
        4: NoneGoodBubble,
        5: NoneBadBubble,
        6: ForkBubble
    }

    useEffect(() => {
        setMarkers(restaurantList.map(((d) => {
            return {
                restaurantInfo: d,
                type: d.tasteCode? d.tasteCode: 3,
                name: d.name,
                lat: d.lat,
                lng: d.lng
            }
        })))
    }, [restaurantList])

    return (
        <>
            <Map
                style={{width: width, height: height}}
                defaultCenter={{lat, lng}}
                defaultZoom={zoom}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                mapId={"9ef6f7f0425fa870"}
                onBoundsChanged={onBoundsChange}
                center={[lat, lng]}
            >
                {
                    markers.map((marker, index) => {
                        const MarkerIcon = constMarkerType[marker.type]
                        return (
                            <AdvancedMarker position={{lat: marker.lat, lng: marker.lng}} key={index}
                                            onClick={() => onClickMarker(marker.restaurantInfo)}>
                                <div className={"flex justify-center items-center"}>
                                    {marker.name}<MarkerIcon className={"w-[50px]"}/>
                                </div>
                            </AdvancedMarker>
                        )
                    })
                }
            </Map>
        </>
    )
}

export default GoogleMap