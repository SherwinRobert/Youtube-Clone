//Event Listeners configuration

document.getElementById("mainButton").addEventListener("click",()=>{
  document.getElementById("navFull").classList.toggle("menu-slider")
  document.getElementById("videosHome").classList.toggle("main-section")
})

document.getElementById("searchButton").addEventListener("click",()=>{
  searchWord = searchBar.value
  window.sessionStorage.setItem("searchWord",searchWord)
  location.assign("searchResults.html")
})

let observer = new IntersectionObserver(async(entries,observer)=>{

  let lastguy = entries[0]
  console.log(lastguy)
  if(!lastguy.isIntersecting) return

  let nextPageObj = {...defaultParams}
  nextPageObj.pageToken = window.sessionStorage.getItem("nextPageToken")
  const loaderElement = loader()
  document.getElementById("videosHome").append(loaderElement)
  
  await getVideos("home",nextPageObj)
  loaderElement.remove()

  console.log(lastguy.target)
  observer.unobserve(lastguy.target)
  observer.observe(document.querySelector(".video-block:last-child"))
  // document.querySelector(".videosDiv:last-child").classList.add("hidden")
},{
  threshold:0.75,
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
    signInButton1.addEventListener("click",function() {
      console.log("button1")
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
    getVideos("home",defaultParams)
  }

  var isAuthorized = user.hasGrantedScopes(SCOPE);
  if (isAuthorized) {
    signInButton.textContent= 'Sign Out'
    subsDiv.setAttribute("class","block")
    signInDiv1.setAttribute("class","hidden")
    videoFetcher()
  } else {
    signInButton.textContent= 'Sign In';
    signInDiv1.setAttribute("class","block p-4")
    subsDiv.setAttribute("class","hidden")
  }
}

function updateSigninStatus() {
  setSigninStatus();
}

const videoFetcher = async()=>{
  getSubs()
  await getVideos("home",defaultParams)
  let lastChild = document.querySelector(".video-block:last-child")
  console.log(lastChild)
  observer.observe(lastChild)
}


