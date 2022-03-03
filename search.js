let searchVal = sessionStorage.getItem("searchKey")

//Event Listeners configuration
document.getElementById("mainButton").addEventListener("click",()=>{
  document.getElementById("navFull").classList.toggle("menu-slider")
  document.getElementById("videosHome").classList.toggle("main-section")
})

document.getElementById("searchButton").addEventListener("click",()=>{
  const searchDIv =  document.createElement("div")
  searchDIv.setAttribute("id","videoArray")
  searchDIv.setAttribute("class"," w-full max-w-6xl mx-auto")
  document.getElementById("videoArray").remove()
  document.getElementById("videosHome").append(searchDIv)
  
  defaultSearch.q = searchBar.value
  search(defaultSearch)
})

document.getElementById("videoArray").addEventListener("click",function(e){
  let searchBlock = e.target.closest(".searchBlock")
  const videoKey = searchBlock.id
  window.sessionStorage.setItem("videoKey",videoKey)
  location.assign("videoPlayer.html")
})

let observer = new IntersectionObserver(async(entries,observer)=>{

  let lastguy = entries[0]
  console.log(lastguy)
  if(!lastguy.isIntersecting) return

  let nextPageObj = {...defaultSearch}
  nextPageObj.pageToken = window.sessionStorage.getItem("searchNext")
  const loaderElement = loader()
  document.getElementById("videoArray").append(loaderElement)
  
  await search(nextPageObj)
  loaderElement.remove()

  console.log(lastguy.target)
  observer.unobserve(lastguy.target)
  observer.observe(document.querySelector(".searchBlock:last-child"))
  
},{
  threshold:1,
})

function handleClientLoad() {
  // Load the API's client and auth2 modules.
  // Call the initClient function after the modules load.
  gapi.load('client:auth2', initClient);
}

function initClient() {
  // In practice, your app can retrieve one or more discovery documents.
  var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';
  // Initialize the gapi.client object, which app uses to make API requests.
  // Get API key and client ID from API Console.
  // 'scope' field specifies space-delimited list of access scopes.
  gapi.client.init({
      'apiKey': API,
      'clientId': id ,
      'discoveryDocs': [discoveryUrl],
      'scope': SCOPE
  }).then(function () {
    GoogleAuth = gapi.auth2.getAuthInstance();
    // Listen for sign-in state changes.
    GoogleAuth.isSignedIn.listen(updateSigninStatus);

    // Handle initial sign-in state. (Determine if user is already signed in.)
    var user = GoogleAuth.currentUser.get();
    setSigninStatus();

    // Call handleAuthClick function when user clicks on
    //      "Sign In/Authorize" button.
    console.log("Working")
    signInButton.addEventListener("click",function() {
      console.log("button")
      handleAuthClick();
    });
  });
}

function handleAuthClick() {
  if (GoogleAuth.isSignedIn.get()) {
    // User is authorized and has clicked "Sign out" button.
    GoogleAuth.signOut();
  } else {
    // User is not signed in. Start Google auth flow.
    GoogleAuth.signIn();
  }
}

function setSigninStatus() {
  var user = GoogleAuth.currentUser.get();
  
  try{
    console.log(user)
    auth_token = user.wc.access_token
  }catch(error){
    console.log(error)
  }

  var isAuthorized = user.hasGrantedScopes(SCOPE);
  if (isAuthorized) {
    searcher()
    signInButton.textContent= 'Sign Out'
    signInDiv1.setAttribute("class","hidden")
  } else {
    signInButton.textContent= 'Sign In';
    signInDiv1.setAttribute("class","block")
    // subsDiv.remove()
  }
}

function updateSigninStatus() {
  setSigninStatus();
}

const searcher = async () =>{
  defaultSearch.q = sessionStorage.getItem("searchWord")
  await search(defaultSearch)
  let lastChild = document.querySelector(".searchBlock:last-child")
  console.log(lastChild)
  observer.observe(lastChild)
  getSubs()
}
