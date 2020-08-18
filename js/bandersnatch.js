// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'Ch5MEJk5ZCQ',
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 3000);
    // load scenario 1
    player.loadVideoById('B6Lh-TB2_mA',0);
    player.playVideo();
    done = true;
}
}
function stopVideo() {
    player.stopVideo();
}

// current intro video: [next intro video, option 1 video, option 2 video]
var videoPaths = {
    'B6Lh-TB2_mA': ['1YTeasbvJ2E','st8-EY71K84','mbnBYh-BJ1g'],
    'ADrBo7u3tR4': ['EdzQ9wEOElw', 'UR_byRbXxvs', 'XeFxdkaFzRA']
};

var list = [];
var currentId = '';
var loadUrl = '';


function option1() {
    currentId = getVideoId(player.getVideoUrl());
    targetId = videoPaths[currentId];
    list.push(1);
}

function option2() {
    player.loadVideoById("1YTeasbvJ2E",0);
    player.playVideo();
    list.push(2);
}

function getListState() {
    console.log(list);
}

function getVideoId(url) {
    id = url.substring(url.indexOf('=')+1, url.length);
    return id;
}

