let map

function printInitialMap() {

    const { Map } = google.maps

    const details = {
        zoom: 10,
        center: { lat: 40.392499, lng: -3.698214 },
        styles: mapStyles.retro
    }

    map = new Map(ironMap, details)
}

generateRoute.onclick = () => {
    const text = destinationInput.value
    calculateRoute(text)
}


function calculateRoute(text) {

    const { DirectionsService } = google.maps

    const routeDetails = {
        origin: 'Ironhack Madrid',
        destination: text,
        travelMode: 'DRIVING'
    }

    const service = new DirectionsService()
    service.route(routeDetails, details => showRouteDetails(details))
}


function showRouteDetails(details) {

    const road = details.routes[0].summary
    const duration = details.routes[0].legs[0].duration.text

    routeDetails.innerHTML = '<h2>Desplazamiento por la ' + road + ' , ' + duration + ' </h2>'

    details.routes[0].legs[0].steps.forEach(eachStep => {
        routeDetails.innerHTML += eachStep.instructions + '<br>'
    })

    renderRoute(details)
}


function renderRoute(details) {

    const { DirectionsRenderer } = google.maps

    const renderer = new DirectionsRenderer()

    renderer.setDirections(details)
    renderer.setMap(map)
}