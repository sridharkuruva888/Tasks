const apiKey = "SkJ5bYYcUlmdxlmQtoYE";

maptilersdk.config.apiKey = apiKey;


const map = new maptilersdk.Map({
    container: "map",
    style: maptilersdk.MapStyle.STREETS,
    center: [78.4867, 17.3850], 
    zoom: 18
});

let marker;


if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(

        (position) => {

            const lng = position.coords.longitude;
            const lat = position.coords.latitude;

            
            map.flyTo({
                center: [lng, lat],
                zoom: 14
            });

            
            marker = new maptilersdk.Marker({
                color: "red"
            })
            .setLngLat([lng, lat])
            .addTo(map);

        },

        (error) => {
            console.log("Location access denied.", error);
            alert("Unable to access your location.");
        }

    );

} else {
    alert("Geolocation is not supported by this browser.");
}


async function searchPlace() {

    const place = document.getElementById("place").value.trim();

    if (place === "") {
        alert("Please enter a place");
        return;
    }

    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(place)}.json?key=${apiKey}`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        if (data.features.length === 0) {
            alert("Place not found");
            return;
        }

        const coordinates = data.features[0].center;

        
        map.flyTo({
            center: coordinates,
            zoom: 14
        });


        if (marker) {
            marker.remove();
        }

        marker = new maptilersdk.Marker({
            color: "blue"
        })
        .setLngLat(coordinates)
        .addTo(map);

    } catch (error) {

        console.log(error);
        alert("Something went wrong!");

    }

}