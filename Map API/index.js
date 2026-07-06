const apiKey = "SkJ5bYYcUlmdxlmQtoYE";

maptilersdk.config.apiKey = apiKey;

const map = new maptilersdk.Map({
    container: "map",
    style: maptilersdk.MapStyle.STREETS,
    center: [78.4867, 17.3850], // Hyderabad
    zoom: 5
});

let marker;

async function searchPlace(){

    const place = document.getElementById("place").value.trim();

    if(place === ""){
        alert("Please enter a place");
        return;
    }

    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(place)}.json?key=${apiKey}`;

    try{

        const response = await fetch(url);
        const data = await response.json();

        if(data.features.length === 0){
            alert("Place not found");
            return;
        }

        const coordinates = data.features[0].center;

        map.flyTo({
            center: coordinates,
            zoom: 12
        });

        if(marker){
            marker.remove();
        }

        marker = new maptilersdk.Marker()
            .setLngLat(coordinates)
            .addTo(map);

    }
    catch(error){
        alert("Something went wrong!");
        console.log(error);
    }

}