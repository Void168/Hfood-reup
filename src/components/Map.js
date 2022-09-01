import GoogleMapReact from 'google-map-react'

const Map = ({center, zoom}) => {
    return (
        <div className="map">
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCcnxveKJp24WgUHM6ZozJFVSX3Rx3eh1U'}}
                defaultCenter={center}
                defaultZoom={zoom} />
        </div>
        
    )
}

Map.defaultProps ={
    center:{
        lat: 10.761067,
        lng: 106.668179
    },
    zoom: 15
}

export default Map