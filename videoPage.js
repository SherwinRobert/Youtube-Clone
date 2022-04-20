
let videoKey = window.sessionStorage.getItem('videoKey')

document.getElementById("mainButton").addEventListener("click",()=>{
    document.getElementById("navFull").classList.toggle("menu-slider")
  })

  document.getElementById("showMore").addEventListener("click",(e)=>{
    document.getElementById("v-des").classList.toggle("h-auto")
    if(e.target.innerText == "SHOW MORE"){
      e.target.innerText = 'SHOW LESS'
    }else{
      e.target.innerText = 'SHOW MORE'
    }
  })

  document.getElementById("searchButton").addEventListener("click",()=>{
    searchWord = searchBar.value
    window.sessionStorage.setItem("searchWord",searchWord)
    location.assign("searchResults.html")
  })

  document.getElementById("rating-block").addEventListener("click",(e)=>{
    let likeButton = e.target.closest(".liker")
    let dislike = e.target.closest(".disliker")

    if(likeButton){

      if(document.getElementById("like-icon").classList.contains("text-blue-700")){
        document.getElementById("like-icon").classList.remove("text-blue-700")
        document.getElementById("dislike-icon").classList.remove("text-red-700")
        liker(videoKey,"none")
      }else{
        document.getElementById("like-icon").classList.add("text-blue-700")
        document.getElementById("dislike-icon").classList.remove("text-red-700")
        liker(videoKey,"like")
      }

    }else if(dislike){

      if(document.getElementById("dislike-icon").classList.contains("text-blue-700")){
        document.getElementById("dislike-icon").classList.remove("text-red-700")
        document.getElementById("like-icon").classList.remove("text-blue-700")
        liker(videoKey,"none")
      }else{
        document.getElementById("dislike-icon").classList.add("text-red-700")
        document.getElementById("like-icon").classList.remove("text-blue-700")
        liker(videoKey,"dislike")
      }
    }

  })

  document.querySelector("#subs-button").addEventListener("click",function (e) {
    console.log("hi")
    e.target.classList.toggle("bg-red-600")
    e.target.classList.toggle("bg-gray-500")

    e.target.innerText = e.target.innerText=="SUBSCRIBE" ? "SUBSCRIBED": "SUBSCRIBE"
  
  })

document.getElementById("commentSection").addEventListener("click", async function(e){
  e.preventDefault()
  let switcher = e.target.closest(".replyButton")
  let replySwitcher = e.target.closest(".moreReplyButton")
  let component = e.target
  console.log(e)
  const loaderElement = loader()
  console.log(switcher)
  console.log(replySwitcher)
  
  if(switcher){

    switcher.nextSibling.classList.toggle("hidden")

  }else if(replySwitcher){

   repliesPaginator(replySwitcher,loaderElement)

  }else if(component.dataset.identifier){
    eventDelegator(component.dataset.identifier,component,auth_token)
  }
})
  
document.getElementById("videosDiv").addEventListener("click",(e)=>{
  let wrapperDiv = e.target.closest(".videosDiv")
  console.log(wrapperDiv)
  if(wrapperDiv){
    console.log(wrapperDiv.id)
    window.sessionStorage.setItem("videoKey",wrapperDiv.id)
    const commentDiv = document.createElement("div")
    commentDiv.setAttribute("id","commentsDiv")
  
    document.getElementById("commentsDiv").remove()
    document.getElementById("commentSection").append(commentDiv)
  
    retriveVidData(wrapperDiv.id)
    commentParams.videoId = wrapperDiv.id
    console.log(commentParams)
    commentRetriver(commentParams)
    document.getElementById("vidFrame").setAttribute("src",`https://www.youtube.com/embed/${wrapperDiv.id}?autoplay=1`)
  }
})


document.getElementById("commentSubmitter").addEventListener("click",function(e){
  e.preventDefault()
  console.log(e.target.id)
  if((e.target.id == "commentButton")&&(!document.getElementById("comment-box").value.trim() =="")){
    topLevelComment(videoKey,document.getElementById("comment-box").value.trim())
    this.classList.add("hidden")
  }else if(e.target.id == "cancelButton"){
    this.classList.add("hidden")
    document.getElementById("comment-box").value =""
    document.getElementById("comment-box").style.height = "28px"
  }else{
    console.log("skip")
  }
})

var callBackFun = function (){ 
  document.getElementById("commentSubmitter").setAttribute("class","flex justify-end w-full")
  this.style.height = "28px"
  console.log(this.scrollHeight)

  this.style.height = (this.scrollHeight) + 'px'
  document.getElementById("commentButton").setAttribute("class","bg-blue-600 text-white p-[1%] text-sm font-normal rounded-sm")

  if(this.value == ""){
    document.getElementById("commentButton").setAttribute("class","bg-gray-300 text-gray-500 p-[1%] text-sm font-normal rounded-sm")
  }
}

document.getElementById("comment-box").addEventListener("keyup",callBackFun)

document.getElementById("like-button").addEventListener("click",()=>{

})

document.getElementById("show-more-results").addEventListener("click",async ()=>{
  console.log("show more")
  observer.unobserve(document.querySelector(".videosDiv:last-child"))
  
  let nextPageObj = {...defaultParams}
  nextPageObj.pageToken = window.sessionStorage.getItem("nextPageToken")
  const loaderElement = loader()
  document.getElementById("videosDiv").append(loaderElement)
  
  await getVideos("videoSection",nextPageObj)
  loaderElement.remove()

  observer.observe(document.querySelector(".videosDiv:last-child"))
})

let observer = new IntersectionObserver(async(entries,observer)=>{

  let lastguy = entries[0]
  console.log(lastguy)
  if(!lastguy.isIntersecting) return

  let nextPageObj = {...defaultParams}
  nextPageObj.pageToken = window.sessionStorage.getItem("nextPageToken")
  const loaderElement = loader()
  document.getElementById("videosDiv").append(loaderElement)
  
  await getVideos("videoSection",nextPageObj)
  loaderElement.remove()

  console.log(lastguy.target)
  observer.unobserve(lastguy.target)
  observer.observe(document.querySelector(".videosDiv:last-child"))
  
},{
  threshold:1,
})

let repliesAdder = new IntersectionObserver(async(entries)=>{

  let lastChild = entries[0]
  console.log(lastChild)
  if(!lastChild.isIntersecting) return

  let nextPageObj = {...commentParams}
  nextPageObj.pageToken = sessionStorage.getItem("commentNextPage")
  const loaderElement = loader()
  document.getElementById("commentsDiv").append(loaderElement)

  await commentRetriver(nextPageObj)
  loaderElement.remove()

  repliesAdder.unobserve(lastChild.target)
  repliesAdder.observe(document.querySelector(".commentBlock:last-child"))
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
      auth_token = user?.wc.access_token || user?.xc.access_token
    }catch(error){
      console.log(error)
    }
  
    var isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
      document.getElementById("sign-in-status").textContent= 'Sign Out'
      subsDiv.setAttribute("class","block")
      signInDiv1.setAttribute("class","hidden")
      fetcher()

    } else {
      document.getElementById("sign-in-status").textContent= 'Sign In'
      signInDiv1.setAttribute("class","block p-4")
      subsDiv.setAttribute("class","hidden")
    }
  }
  
  function updateSigninStatus() {
    setSigninStatus();
  }
  
  const fetcher = async ()=> {
      document.getElementById("vidFrame").setAttribute("src",`https://www.youtube.com/embed/${videoKey}`)
      retriveVidData(videoKey)

      commentParams.videoId = videoKey
      console.log(commentParams)
      await commentRetriver(commentParams)
      
      let commentsLastChild = document.querySelector(".commentBlock:last-child")
      repliesAdder.observe(commentsLastChild)
      console.log(commentsLastChild)

      await getVideos("videoSection",defaultParams)
      let lastChild = document.querySelector(".videosDiv:last-child")
      console.log(lastChild)
      observer.observe(lastChild)

      getRating(videoKey)
      getSubs()
  }
  
  
  