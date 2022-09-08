
function initGoogleApi(_callback){
return gapi.load("client", loadClient);
function loadClient() {
    gapi.client.setApiKey("AIzaSyCepw4_Sl2MMwLjdsUrcPz_3cIAXxXZkOs");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { _callback() },
                function(err) { console.error("Error loading GAPI client for API", err); });
}}

function getVideos(searchString,movieYear){
initGoogleApi(function(){
const videoList = document.getElementById('videoListContainer');
    var arr_search = {
        "part": 'snippet',
        "type": 'video',
        "order": "Relevance",
        "maxResults": 1,
        "q": searchString.concat(" "+movieYear).concat(" Trailer")
    };
    return gapi.client.youtube.search.list(arr_search)
    .then(function(response) {
        // Handle the results here (response.result has the parsed body).
        const listItems = response.result.items;
        if (listItems) {
            let output = '';

            listItems.forEach(item => {
                const videoId = item.id.videoId;
                const videoTitle = item.snippet.title;
                output += `
                <iframe style="position: absolute;top: 0;left: 0;bottom: 0;right: 0;width: 100%;height: 100%;" width="789" height="444" src="https://www.youtube.com/embed/${videoId}" title="${videoTitle}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                `;
            });

            // Output list
            videoList.innerHTML = output;
        }

})})}
