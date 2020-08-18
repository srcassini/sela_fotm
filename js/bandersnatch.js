var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'Ch5MEJk5ZCQ', //intro video id
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
});
}
function onPlayerReady(event) {
    event.target.playVideo();
}

var done = false;
function onPlayerStateChange(event){
if (event.data == YT.PlayerState.PLAYING && !done) {
    // load scenario 1
    player.playVideo();
    done = true;
}
}

// current option 2 video: merged (next intro video, option 1 video, option 2 video)
var videoPaths = {
    'Ch5MEJk5ZCQ': 'mbnBYh-BJ1g', // intro -> disasters
    'mbnBYh-BJ1g': 'XeFxdkaFzRA', // disasters -> antibiotics
    'XeFxdkaFzRA': 'jHs5POy8-8Y', // antibiotics -> food
    'jHs5POy8-8Y': 'jJA3dYwIB3s', // food -> water
    'jJA3dYwIB3s': '110iUX1Ursk' // water -> renewables
};

var conclusions = [
    ['XP8BUWr4AT4', '6Jz0JcQYtqo'],
    ['Z-BbpaNXbxg', 'J4gJY_5eNqQ'],
    ['XVWQCd5j_ec', 'o5Ejup_nfPY'],
    ['5DH9IZ01Qqg', 'wFAR3WggSRk'],
    ['CNrF0JbDVc8', 'Q1zbgd6xpGQ']
]

var decisions = [];
var endPlaylist = [];
var currentId = 'Ch5MEJk5ZCQ';

function getListState() {
    console.log(decisions);
}

function getVideoId(url) {
    id = url.substring(url.indexOf('=')+1, url.length);
    return id;
}
function playSequence(id) {
    player.loadVideoById(id);
    player.playVideo();
}

function option1() {
    decisions.push(0);
    currentId = getVideoId(player.getVideoUrl());
    targetId = videoPaths[currentId];
    playSequence(targetId);
}

function option2() {
    decisions.push(1);    
    currentId = getVideoId(player.getVideoUrl());
    targetId = videoPaths[currentId];
    playSequence(targetId);
}

function confirmChoices() {
    for (i=0; i<decisions.length; i++){
        if (decisions[i] == 0) {
            endPlaylist.unshift(conclusions[i][0]);
        } else {
            endPlaylist.unshift(conclusions[i][1]);
        };
    };
    player.loadPlaylist(endPlaylist);
    player.playVideo();
}
