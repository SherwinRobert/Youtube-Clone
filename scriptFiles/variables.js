const API = "AIzaSyBQdetz1i0kZomMkrlaYKom5gdHXoEKx-A"
// const API ='AIzaSyBihRkmdYOQEnMhfSeIrKaXtuRk-xzKCs4'
const id = "999525935030-ljsuq33ud5r3iq6e83522p1ged7uhpm0.apps.googleusercontent.com"
// const id ="869999588694-ne0t8dt94uofdmis03spv3dp79lcqg4i.apps.googleusercontent.com"
const urlVideo = "https://www.googleapis.com/youtube/v3/videos?"
const urlChannels ="https://www.googleapis.com/youtube/v3/channels?"
const urlSubs = 'https://www.googleapis.com/youtube/v3/subscriptions?'
const urlcommentReply = 'https://www.googleapis.com/youtube/v3/comments?'
const SCOPE = 'https://www.googleapis.com/auth/youtube.force-ssl'
const videoMainDiv = document.getElementById("videosHome")
const videoArray = document.getElementById("videoArray")
const subsDiv = document.getElementById("subsDiv")
const signInButton = document.getElementById("sign-in-or-out-button")
const signInButton1 = document.getElementById("sign-in-or-out-button1")
const signInDiv = document.getElementById("signInDiv")
const signInDiv1 = document.getElementById("signInDiv1")
const searchBar = document.getElementById("searchBar")
const videoSectionDiv =  document.getElementById("videosDiv")
let GoogleAuth;
var auth_token;
var searchWord;
var searchParam;

let defaultParams = {
    key:API,
    part: ['snippet','contentDetails',"statistics"],
    maxResults: 24,
    regionCode: "US",
    chart: 'mostPopular'
}

let replyParams = {
    "part": [
      "snippet"
    ],
    "parentId": ""
  }

let commentParams = {
  "part":["snippet,replies"],
  "videoId": "",
  "order" : "relevance",
  "textFormat" : "html"
}

let defaultSearch = {
  "part": ["snippet"],
  "maxResults": 24,
  "q": "",
  "type": ["video"]
}

//common event listeners for all pages

document.getElementById("search-button-sm").addEventListener("click",function(){
  document.getElementById("search-button-sm").classList.add("hidden")
  document.getElementById("reverter").classList.remove("hidden")
  document.getElementById("left-nav").classList.add("hidden")
  document.getElementById("right-nav").classList.add("hidden")
  document.getElementById("searchButton").classList.remove("hidden")
  document.getElementById("searchBar").classList.remove("hidden")
})

document.getElementById("reverter").addEventListener("click",function(){
  document.getElementById("search-button-sm").classList.remove("hidden")
  document.getElementById("reverter").classList.add("hidden")
  document.getElementById("left-nav").classList.remove("hidden")
  document.getElementById("right-nav").classList.remove("hidden")
  document.getElementById("searchButton").classList.add("hidden")
  document.getElementById("searchBar").classList.add("hidden")
})

document.getElementById("log-menu").addEventListener("click",function(){
  document.getElementById("log-menu-child").classList.toggle("hidden")
})