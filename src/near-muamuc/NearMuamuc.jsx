import {Map} from '@vis.gl/react-google-maps';
import TopFilter from "./TopFilter.jsx";

const NearMuamuc = () => {

    return (
        <>
            <div className={"z-10 absolute"}>
                <TopFilter />
            </div>
            <Map
                style={{width: '1060px', height: '808px'}}
                defaultCenter={{lat: 22.54992, lng: 0}}
                defaultZoom={3}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            />
        </>
    )
}

export default NearMuamuc;