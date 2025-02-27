import {Map} from '@vis.gl/react-google-maps';

const NearMuamuc = () => {

    return (
        <>
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