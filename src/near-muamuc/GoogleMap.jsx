import {useCallback, useEffect, useState} from "react";
import {AdvancedMarker, InfoWindow} from "@vis.gl/react-google-maps";
import YumBubble from "/src/assets/icon/bubble/yumBubble.svg?react"
import BadBubble from "/src/assets/icon/bubble/badBubble.svg?react"
import NoneBadBubble from "/src/assets/icon/bubble/noneBadBubble.svg?react"
import NoneGoodBubble from "/src/assets/icon/bubble/noneGoodBubble.svg?react"
import NoneSosoBubble from "/src/assets/icon/bubble/noneSosoBubble.svg?react"
import ForkBubble from "/src/assets/icon/bubble/forkBubble.svg?react"

import {throttle} from "lodash";
import {Map} from "@vis.gl/react-google-maps";

const GoogleMap = ({width, height, lat, lng, zoom, markers, onChange, onClickMarker}) => {
    const onBoundsChange = useCallback(
        throttle((data) => {
            onChange(data?.detail?.bounds);
        }, 1500), [])

    const constMarkerType = {
        0: YumBubble,
        1: BadBubble,
        2: NoneGoodBubble,
        3: NoneSosoBubble,
        4: NoneBadBubble,
        5: ForkBubble
    }

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