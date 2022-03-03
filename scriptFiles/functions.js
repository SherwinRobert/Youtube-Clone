function getSubs(){
    gapi.client.youtube.subscriptions.list({
      part : ["snippet","contentDetails"],
      mine : true,
      maxResults : 25
    })
    .then(response => {
      console.log(response)
      data = response.result.items
  
      let urlArray = data.map( e => {
        return {id :e.snippet.resourceId.channelId}
      })
      return urlArray
  
    }).then(urlArray => {
      return profileGetter(urlArray)
    }).then(response => {
      console.log(response)
      response.forEach( e =>{
        let name = e.chTitle
        let img = e.chUrl
        subsDiv.append(homeSubscriptions(name,img))
      })
      
    })
    .catch(error =>console.log(error))
  }
  
  const getVideos = async (section,searchParams) => {
      try{
          const response = await axios.get(urlVideo + new URLSearchParams(searchParams))
          console.log(response)
          window.sessionStorage.setItem("nextPageToken",response.data.nextPageToken)
          results = videoCreater(response.data.items)
          urlData =  await profileGetter(results)
          console.log(urlData)
          videoData = dataBinder(results,urlData)
          console.log(videoData)
          dataParser(videoData,section)
      }
      catch(error){
          console.log(error)
      }
  }
  
  const getChannel = async (token,channel) => {
    try{
        const response = await axios.get(urlChannels + new URLSearchParams({
            key: API,
            part:['snippet','contentDetails','statistics'],
            id: channel,
            
        }),{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        })
        console.log(response)
        
        return urlGetter(response.data.items)
    }
    catch(error){
        console.log(error)
    }
  }
  
  const urlGetter = (array) =>{
  const urls = array.map(e => {
    url = e.snippet.thumbnails.high.url
    title = e.snippet.title
    subCount = e.statistics.subscriberCount
  
    return {
      chUrl : url,
      chTitle : title,
      subsCount : subCount
    }
  })
  return urls
  }
  
  const videoCreater = (dataArray) => {
      dataResults = dataArray.map((e)=>{
          const name = e.snippet.title
          const thumbImg = e.snippet.thumbnails.high.url
          const publishData = e.snippet.publishedAt
          const channelId = e.snippet.channelId
          const channelTitle = e.snippet.channelTitle
          const channelDescription = e.snippet.description
          const views = e.statistics.viewCount
          const videoId = e.id
          const likeCount = e.statistics.likeCount
          const commentCount = e.statistics.commentCount
  
          return {
              vidName : name,
              thumbnail : thumbImg,
              date : publishData,
              id : channelId,
              title : channelTitle,
              viewCount : views,
              description: channelDescription,
              videoId : videoId,
              likeCount : likeCount,
              commentCount : commentCount
          }
      })
  
      return dataResults
  }
  
  const profileGetter = async (array) =>{
    profileUrls = array.map(e => e.id)
    return urlData = await getChannel(auth_token,profileUrls)
  }
  
  const dataBinder = (array, urlArray ) => {
    urlArray.forEach(e =>{
      for(i=0;i<array.length;i++){
        if(e.chTitle == array[i].title) {
          array[i].url = e.chUrl
          array[i].subCount = e.subsCount
        }
      }
    })
    return array
  }
  
  const dataParser = (data,switcher) => {
      data.forEach((e)=> {
          const vidTitle = e.vidName
          const vidThum = `${e.thumbnail}`
          const chTitle = e.title
          const profileUrl = e.url
          const viewData = e.viewCount
          const date = e.date
          const description = e.description
          const videoId = e.videoId

          switch (switcher) {
            case "home":
              const homeDiv = homeVidoes(vidTitle,vidThum,chTitle,profileUrl,viewData,date,videoId)
              videoMainDiv.append(homeDiv)
              break;
            case "videoSection":
              const videoDiv = videosDiv(vidTitle,vidThum,chTitle,viewData,date,videoId)
              videoSectionDiv.append(videoDiv)
              break;
            case "search":
              const searchDiv = searchVideoDiv(vidTitle,vidThum,chTitle,profileUrl,viewData,date,description,videoId)
              document.getElementById("videoArray").append(searchDiv)
              break;
          }
      })
  }
  
  const viewsConverter = (count) =>{
    let data; 
    let trimmedData = count.trim()
    length = trimmedData.length
     switch (length){
      case 1:
      case 2: 
      case 3:
        data =  count
        break;
      case 4:
        data = count[0]+ "." + count[1] +"K"
        break;
      case 5:
        data = count.slice(0,2) + "K"
        break;
      case 6:
        data = count.slice(0,3) + "K"
        break;
      case 7:
        if (count[1] == 0){data = count[0] +"M"}
        data = count[0]+ "." + count[1] +"M"
        break;
      case 8:
        data = count.slice(0,2) + "M"
      case 9:
        data = count.slice(0,3) + "M"
        break;
      case 10:
        data = count[0] + "B"
        break;
     }
     return data
  }
  
  const timeParser = (dateString) =>{
    let result;
    let referenceDate = dateSplitter("")
    let videoDate = dateSplitter(dateString)
  
    for(i=0;i<videoDate.length;i++){
      result = Math.abs(referenceDate[i] - videoDate[i])
      if(result != 0){
        return dateFormatter(i,result) 
      }
    }
  }
  
  const dateFormatter = (index,date) =>{
    let publishTime;
    let describer;
    if (date == 1){
      describer = " ago"
    }else{
      describer = "s ago"
    }
  
    switch(index){
      case 0:
        publishTime = `${date} year${describer}`
        break;
      case 1:
        publishTime = `${date} month${describer}`
        break;
      case 2:
        publishTime = `${date} day${describer}`
        break;
      case 3:
        publishTime = `${date} hour${describer}`
        break;
      case 4:
        publishTime = `${date} min${describer}`
        break;
      case 5:
        publishTime = `${date} sec${describer}`
        break;
    }
  
    return publishTime
  }
  
  const dateSplitter = (dateString) =>{
    var date;
    if(dateString == ""){
      date = new Date();
    }else{
      date = new Date(dateString);
    }
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const days = date.getDate()
    const hrs = date.getHours()
    const mins = date.getMinutes()
    const secs = date.getSeconds()
  
    return [year,month,days,hrs,mins,secs]
  }

  //functions specifically for search page

  const search = (param) =>{
    return gapi.client.youtube.search.list(param)
        .then(response =>{
            console.log(response)
            sessionStorage.setItem("searchNext",response.result.nextPageToken)
            return searchData(response)

        }).then(data =>{
            retriveChannel(data)
        })
        
        .catch(error =>{
            console.log(error)
        })
}

const retriveChannel = (videosIds) =>{
    return gapi.client.youtube.videos.list({
        "part": [
          "snippet",
          "statistics"
        ],
        "id": videosIds,
      }).then(response => {
          console.log(response)
          results = videoCreater(response.result.items)
          console.log(results)
          return profileGetter(results)
      }).then( urlData =>{
        console.log(urlData)
        videoData = dataBinder(results,urlData)
        console.log(videoData)
        dataParser(videoData,"search")
      })
      .catch(error => console.log(error))
}

const searchData = (data) =>{
    dataArray = data.result.items
    videoIds = dataArray.map( e =>{
        return e.id.videoId
    })
    return videoIds
}



// specifically for third page - refactor

const retriveVidData = (videosId) =>{
  return gapi.client.youtube.videos.list({
      "part": [
        "snippet",
        "statistics"
      ],
      "id": videosId,
    }).then(response => {
        console.log(response)
        results = videoCreater(response.result.items)
        console.log(results)
        return profileGetter(results)
    }).then( urlData =>{
      console.log(urlData)
      videoData = dataBinder(results,urlData)
      console.log(videoData)
      VidStatsUpdater(videoData)
    })
    .catch(error => console.log(error))
}

const dateDisplayer = (data)=>{
  const months =["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]
  const date = new Date(data)
  const year = date.getFullYear()
  const month = date.getMonth()
  const days = date.getDate()

  return `${months[month]} ${days}, ${year}`
}

const viewsCommaFormat = (data) =>{
  let views = ""
  const param = data.length % 3
  const stopper = Math.floor(data.length/3)
  views = `${data.slice(0,param)}`

  for(let i=0;i<stopper;i++){
    console.log(i)
    let temp = data.slice(param+(3*i),param+3+(i*3))
    views = views.concat(",",temp)
  }
  if(!param){
    views = views.slice(1)
  }
  return views
}

const VidStatsUpdater = (data) =>{

  let e = data[0]
  const vidTitle = e.vidName
  const vidThum = `${e.thumbnail}`
  const chTitle = e.title
  const profileUrl = e.url
  const viewData = e.viewCount
  const date = e.date
  const description = e.description
  const likes = e.likeCount
  const subCount = e.subCount

  document.getElementById("v-title").innerText = vidTitle
  document.getElementById("v-des").innerText = description
  document.getElementById("v-profile").innerText = profileUrl
  document.getElementById("v-channel-name").innerText = chTitle
  document.getElementById("v-profile").setAttribute("src",profileUrl)
  document.getElementById("v-likes").innerText = viewsConverter(likes)
  document.getElementById("v-subs").innerText = `${viewsConverter(subCount)} subscribers`
  document.getElementById("v-stats").innerText = `${viewsCommaFormat(viewData)} views . ${dateDisplayer(date)}`
  // document.getElementById("commentCount").innerText = `${view}`
}

const commentRetriver = (commentParams) =>{
  return gapi.client.youtube.commentThreads.list(commentParams)
  .then(function(response) {
  console.log("Response", response);
  let commentData = commentParser(response.result.items)
  console.log(commentData)
  commentAppender(commentData)
  sessionStorage.setItem("commentNextPage",response.result.nextPageToken)
  })
  .catch( error => console.log(error))
}

const commentParser = (data) =>{
  console.log(data)

  let commentData = data.map(e =>{
    const path = e.snippet.topLevelComment.snippet

    const commentContent = path.textOriginal
    const likesCount = path.likeCount
    const channelName = path.authorDisplayName
    const date = path.publishedAt
    const profileImg = path.authorProfileImageUrl
    const replyCount = e.snippet.totalReplyCount
    const parentId = e.id

    if(e.replies){
      const replies = e.replies.comments
      return {
        comment : commentContent,
        likesCount : likesCount,
        channelName : channelName,
        date :date,
        profileImg : profileImg,
        replyCount : replyCount,
        replies : replies,
        parentId : parentId        
      }
    }else{
      return {
        comment : commentContent,
        likesCount : likesCount,
        channelName : channelName,
        date :date,
        profileImg : profileImg,
        parentId : parentId
      }
    }
  })

  return commentData
}

const commentAppender = (data) =>{
  let divs;
  data.forEach(e =>{
    const comment = e.comment
    const likesCount = e.likesCount
    const channelName = e.channelName
    const date = e.date
    const profileImg = e.profileImg
    const replyCount = e.replyCount
    const replies = e.replies
    const parentId = e.parentId

    if(replyCount){
      let replyDivs = replies.map(e=>{
        const comment = e.snippet.textOriginal
        const likesCount = e.snippet.likeCount
        const channelName = e.snippet.authorDisplayName
        const date = e.snippet.publishedAt
        const profileImg = e.snippet.authorProfileImageUrl
        return commentDiv(channelName,date,profileImg,comment,likesCount,false,parentId)
      })
      divs = commentDiv(channelName,date,profileImg,comment,likesCount,true,parentId,replyDivs,replyCount,true)
    }else{
      divs = commentDiv(channelName,date,profileImg,comment,likesCount,true,parentId)
    }
    document.getElementById("commentsDiv").append(divs)
  })
}

const topLevelComment = (videoId,comment) =>{
  return gapi.client.youtube.commentThreads.insert({
    "part": [
      "snippet"
    ],
    "resource": {
      "snippet": {
        "topLevelComment": {
          "snippet": {
            "textOriginal": comment
          }
        },
        "videoId": videoId
      }
    }
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              console.log("Response", response);
              response = response.result.snippet.topLevelComment.snippet
              const channelName = response.authorDisplayName
              const date = response.publishedAt
              const profileImg = response.authorProfileImageUrl
              const commentText = response.textOriginal
              const likesCount = response.likeCount

              let targetDiv =document.getElementById("commentsDiv")
              targetDiv.prepend(commentDiv(channelName,date,profileImg,commentText,likesCount,true))
            },
            function(err) { console.error("Execute error", err); });

}

const liker = (videoId,rating) =>{
  return gapi.client.youtube.videos.rate({
    "id": videoId,
    "rating": rating
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              console.log("Response", response);
            },
            function(err) { console.error("Execute error", err); });
}

const getRating = (videoId) => {
  return gapi.client.youtube.videos.getRating({
    "id":videoId
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              console.log("Response", response.result.items[0].rating);
              if(response.result.items[0].rating == "like"){
                document.getElementById("like-icon").classList.add("text-blue-700")
              }else if(response.result.items[0].rating == "dislike"){
                document.getElementById("dislike-icon").classList.add("text-red-700")
              }
            },
            function(err) { console.error("Execute error", err); });
}

const repliesFetcher = (params) =>{
  return gapi.client.youtube.comments.list(params)
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              console.log("Response", response.result);
              const replies = response.result.items
              const nextPgToken =  response.result.nextPageToken
              return {replies , nextPgToken}
            },
            function(err) { console.error("Execute error", err); });
}


const replyParser = function(params){
  let updatedReplies = params.replies

  console.log(this.dataset)
  if(this.dataset.token =="true"){
    updatedReplies = params.replies.slice(5,params.replies.length)
    console.log("hi",updatedReplies)
  }
  this.dataset.token = false
  updatedReplies.forEach(e =>{
        const comment = e.snippet.textOriginal
        const likesCount = e.snippet.likeCount
        const channelName = e.snippet.authorDisplayName
        const date = e.snippet.publishedAt
        const profileImg = e.snippet.authorProfileImageUrl
        this.parentNode.insertBefore(commentDiv(channelName,date,profileImg,comment,likesCount),this)
  })

  if(params.nextPgToken){
    this.dataset.nextPgToken = params.nextPgToken
  }else{
    this.remove()
  }
  console.log(this)

}

// const commentReplier = async (id,comment,token) => {
//   console.log("in function",id)
//   console.log(urlcommentReply)
//   try{
//       const response = await axios.get(urlcommentReply + new URLSearchParams({
//         "key" : API,
//         "part": [
//           "snippet"
//         ],
//         "resource": {
//           "snippet": {
//             "parentId": id,
//             "textOriginal": comment
//           }
//         }
//       }),{
//         headers:{
//           Authorization: `Bearer ${token}`,
//         }
//       })
//       console.log(response)
//   }
//   catch(error){
//       console.log(error)
//   }
// }

function commentReplier(id,comment) {
  return gapi.client.youtube.comments.insert({
    "part": [
      "snippet"
    ],
    "resource": {
      "snippet": {
        "textOriginal": comment,
        "parentId": id
      }
    }
  })
      .then(function(response) {
              // Handle the results here (response.result has the parsed body).
              console.log("Response", response);
              return response.result.snippet
            },
            function(err) { console.error("Execute error", err); });
}



const repliesPaginator = async function(replySwitcher,loaderElement){
  let parentId = replySwitcher.dataset.parentId
  replyParams.parentId = parentId

  if(replySwitcher.dataset.token=="true"){
    console.log("getting first time results")
    console.log(replySwitcher.dataset.token)
    
    replySwitcher.parentNode.insertBefore(loaderElement,replySwitcher)
    let repliesData = await repliesFetcher(replyParams)
    loaderElement.remove()
    
    replyParser.call(replySwitcher,repliesData)
    console.log(repliesData)

  }else{
    console.log("gettting more results")
    let updatedParams = {...replyParams}
    updatedParams.pageToken = replySwitcher.dataset.nextPgToken
    
    replySwitcher.parentNode.insertBefore(loaderElement,replySwitcher)
    let repliesData = await repliesFetcher(updatedParams)
    loaderElement.remove()

    replyParser.call(replySwitcher,repliesData)
    console.log("updatedReplies",repliesData)
  }
}

const eventDelegator =async function(dataAttribute,component,token){

  switch (dataAttribute) {
    case "Replier":
      if((component.parentNode.lastChild.dataset.identifier == "textbox")){
        break;
      }

      if(component.dataset.type == "replyDiv"){
        let userName = component.parentNode.parentNode.firstChild.firstChild.innerText
        component.parentNode.append(replyBox(component.dataset.parentId,`@${userName}`,true))
      }
      else{
        component.parentNode.append(replyBox(component.dataset.parentId))
      }
      break;
    
    case "submitter":
      const comment = component.parentNode.previousElementSibling.lastChild.value
      const parentId = component.dataset.parentId
      const response = await commentReplier(parentId,comment)

      const channelName = response.authorDisplayName
      const date = response.publishedAt
      const profileImg = response.authorProfileImageUrl
      const commentText = response.textOriginal
      const likesCount = response.likeCount
      
      if(component.dataset.type == "top"){
        let targetDiv = component.closest(".top-level-block")
        if(!(targetDiv.lastChild.classList.contains("repliesContainer"))){
          const repliesContainer = document.createElement("div")
          const repliesDivButton = document.createElement("button")

          repliesContainer.setAttribute("class","hidden repliesContainer")
          repliesDivButton.setAttribute("class","flex items-center text-blue-600 mt-[2%] replyButton")
          repliesDivButton.innerHTML=`<i class="fas fa-caret-up"></i><div>View replies</div>`
          targetDiv.append(repliesDivButton)
          repliesContainer.append(commentDiv(channelName,date,profileImg,commentText,likesCount,false,parentId))
          targetDiv.append(repliesContainer)
        }

      }else{
        let targetDiv = component.closest(".repliesContainer")
        targetDiv.prepend(commentDiv(channelName,date,profileImg,commentText,likesCount,false,parentId))
      }
  
      component.parentNode.parentNode.remove()
      break;
    
    case "textBoxRemove":
      component.parentNode.parentNode.remove()
      break;
    
    case "raters":
      document.getElementById("infoPopUp").classList.remove("hidden")
      setTimeout(()=>{
        document.getElementById("infoPopUp").classList.add("hidden")
      },2000)
      break;
    
    default:
      break;
  }
}

// else if(component.dataset.identifier == "Replier"){
//   if(!(component.parentNode.lastChild.dataset.identifier == "textbox") && component.dataset.type == "replyDiv"){
    
//     let userName = component.parentNode.parentNode.firstChild.firstChild.innerText
//     component.parentNode.append(replyBox(component.dataset.parentId,`@${userName}`))
//   }
//   else{
//     component.parentNode.append(replyBox(component.dataset.parentId))
//   }

// }else if(component.dataset.identifier =="submitter"){
//   console.log("calling api")

// }else if(component.dataset.identifier == "textBoxRemove"){
//   component.parentNode.parentNode.remove()
// }
// else if(component.dataset.identifier =="raters"){
//   document.getElementById("infoPopUp").classList.remove("hidden")
  
//   setTimeout(()=>{
//     document.getElementById("infoPopUp").classList.add("hidden")
//   },2000)
// }
