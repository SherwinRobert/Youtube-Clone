const homeVidoes = (videoTitle,thumbnail,name,url,views,date,videoId) => {
    
  const wrapperDiv = document.createElement("div")
  const thumbnailImg = document.createElement("div")
  const contentDiv = document.createElement("div")
  const profileImg = document.createElement("img")
  const detailsDiv = document.createElement("div")
  const title = document.createElement("div")
  const channelName = document.createElement("small")
  const postedTime = document.createElement("small")

  const viewCount = viewsConverter(views)
  const viewTime = timeParser(date)

  wrapperDiv.setAttribute("id",videoId)
  wrapperDiv.setAttribute("class","w-[23.5%] cursor-pointer video-block h-auto p-2 box-content")
  contentDiv.setAttribute("class","flex text-sm mt-4")
  thumbnailImg.setAttribute("class","w-full pt-[56.25%] bg-no-repeat bg-cover bg-center")
  detailsDiv.setAttribute("class","flex flex-col")
  title.setAttribute("class","font-semibold text-sm min-h-0 max-h-12 overflow")
  profileImg.setAttribute("class","rounded-full h-12 p-1 mr-2")
  
  thumbnailImg.setAttribute("style",`background-image: url('${thumbnail}');`)
  profileImg.setAttribute("src",`${url}`)
  channelName.innerText = `${name}`
  postedTime.innerText = `${viewTime} • ${viewCount} views`

  title.innerText = videoTitle
  thumbnailImg.setAttribute("src",thumbnail)

  wrapperDiv.append(thumbnailImg)
  wrapperDiv.append(contentDiv)
  contentDiv.append(profileImg)
  contentDiv.append(detailsDiv)
  detailsDiv.append(title)
  detailsDiv.append(channelName)
  detailsDiv.append(postedTime)

  wrapperDiv.addEventListener("click",()=>{
    window.sessionStorage.setItem("videoKey",videoId)
    location.assign("videoPlayer.html")
  })

  return wrapperDiv
}

const homeSubscriptions = (name,img) =>{

const wrapperDiv = document.createElement("div")
const title = document.createElement("div")
const icon = document.createElement("img")

wrapperDiv.setAttribute("class", "flex mx-4 mb-2 items-center hover:bg-gray-100 cursor-pointer" )
icon.setAttribute("class", "rounded-full h-9 p-1 mr-2")
title.setAttribute("class","truncate text-sm")

icon.setAttribute("src",img)
title.innerText = name

wrapperDiv.append(icon)
wrapperDiv.append(title)

return wrapperDiv
}

const searchVideoDiv = (videoTitle,thumbnail,name,url,views,date,description,videoId) => {
    const wrapperDiv = document.createElement("div")
    const imgWrapper = document.createElement("div")
    const thumbnailImg = document.createElement("img")
    const contentDiv = document.createElement("div")
    const titleDiv = document.createElement("div")
    const viewsDiv = document.createElement("small")
    const nameWrapper = document.createElement("div")
    const profileImg = document.createElement("img")
    const nameDiv = document.createElement("small")
    const descDiv = document.createElement("div")

    wrapperDiv.setAttribute("id",videoId)
    wrapperDiv.setAttribute("class","flex sm:flex-row flex-col p-4 cursor-pointer searchBlock")
    imgWrapper.setAttribute("class","basis-1/3 shrink-0 sm:mr-6 self-center max-w-sm")
    // thumbnailImg.setAttribute("class","w-full  aspect-video bg-no-repeat bg-cover bg-center")
    thumbnailImg.setAttribute("class","aspect-video object-cover")
    profileImg.setAttribute("class","h-8 rounded-full mr-2")
    nameWrapper.setAttribute("class","flex items-center mb-[1%]")
    descDiv.setAttribute("class","text-xs overflow sm:h-8")
    viewsDiv.setAttribute("class","mb-[1%]")
    contentDiv.setAttribute("class","basis-2/3 flex-1 p-2")
    titleDiv.setAttribute("class","font-semibold text-sm")

    const viewCount = viewsConverter(views)
    const viewTime = timeParser(date)


    titleDiv.innerText = videoTitle
    nameDiv.innerText = name
    // thumbnailImg.setAttribute("style",`background-image: url('${thumbnail}');`)
    thumbnailImg.setAttribute("src",thumbnail)
    profileImg.setAttribute("src",url)
    viewsDiv.innerText = `${viewTime} • ${viewCount} views`
    descDiv.innerText = description

    nameWrapper.append(profileImg)
    nameWrapper.append(nameDiv)

    contentDiv.append(titleDiv)
    contentDiv.append(viewsDiv)
    contentDiv.append(nameWrapper)
    contentDiv.append(descDiv)

    imgWrapper.append(thumbnailImg)
    wrapperDiv.append(imgWrapper)
    wrapperDiv.append(contentDiv)

    return wrapperDiv

}

const videosDiv = (videoTitle,thumbnail,name,views,date,videoId) => {
  const wrapperDiv = document.createElement("div")
  const thumbnailImg = document.createElement("img")
  const contentDiv = document.createElement("div")
  const titleDiv = document.createElement("div")
  const viewsDiv = document.createElement("div")
  const nameDiv = document.createElement("div")
  const imageWrapper = document.createElement("div")

  wrapperDiv.setAttribute("class","dark:hover:bg-zinc-700 flex pl-1 py-1 cursor-pointer videosDiv")
  wrapperDiv.setAttribute("id",videoId)
  imageWrapper.setAttribute("class","w-[43%] mr-2")
  thumbnailImg.setAttribute("class","aspect-video object-cover")
  titleDiv.setAttribute("class","overflow h-10 text-sm leading-5")
  viewsDiv.setAttribute("class","text-xs text-neutral-700 dark:text-neutral-400")
  nameDiv.setAttribute("class","text-xs text-neutral-700 dark:text-neutral-400")
  contentDiv.setAttribute("class","flex-1")

  const viewCount = viewsConverter(views)
  const viewTime = timeParser(date)

  titleDiv.innerText = videoTitle
  nameDiv.innerText = name
  thumbnailImg.setAttribute("src",`${thumbnail}`)
  viewsDiv.innerText = `${viewTime} • ${viewCount} views`

  contentDiv.append(titleDiv)
  contentDiv.append(nameDiv)
  contentDiv.append(viewsDiv)

  imageWrapper.append(thumbnailImg)
  wrapperDiv.append(imageWrapper)
  wrapperDiv.append(contentDiv)

  return wrapperDiv

}

const commentDiv = (channelName,date,profileUrl,comment,likes,replyAtr,parentId,replyDivs=[],replyCount=0,switcher=false) =>{
  const wrapperDiv = document.createElement("div")
  const thumbnailImg = document.createElement("img")
  const contentDiv = document.createElement("section")
  const nameContentDiv = document.createElement("div")
  const timeDiv = document.createElement("div")
  const nameDiv = document.createElement("div")
  const commentDiv = document.createElement("div")
  const buttonWrapper = document.createElement("div")
  const likeButton = document.createElement("button")
  const dislikeButton =document.createElement("button")
  const replyButton = document.createElement("button")

  if(replyAtr){
    wrapperDiv.setAttribute("class","flex mb-[2%] text-sm overflow-hidden commentBlock")
  }else{
    wrapperDiv.setAttribute("class","flex mb-[2%] text-sm overflow-hidden")
  }
  
  thumbnailImg.setAttribute("src",profileUrl)
  thumbnailImg.setAttribute("class","h-12 rounded-full mr-4")
  nameContentDiv.setAttribute("class","flex font-normal")
  replyButton.setAttribute("class","text-sm")
  likeButton.setAttribute("class","mr-[1%] pr-1")
  dislikeButton.setAttribute("class","mr-[1%] pr-1")
  nameDiv.setAttribute('class',"mr-2 mb-[2%]")
  commentDiv.setAttribute("class","text-neutral-600 dark:text-neutral-400 mb-[2%]")
  contentDiv.setAttribute("class","flex-1 top-level-block")

  nameDiv.innerText = channelName
  const yo = timeParser(date)
  timeDiv.innerText = `${timeParser(date)}`
  commentDiv.innerText = comment

  const viewData = likes.toString()
  likeButton.innerHTML = `<i data-identifier="raters" class="far fa-thumbs-up"></i> ${viewsConverter(viewData)}`
  dislikeButton.innerHTML = `<i data-identifier="raters" class="far fa-thumbs-down"></i>`
  likeButton.dataset.identifier = "raters"
  dislikeButton.dataset.identifier = "raters"
  
  replyButton.innerText = `Reply`
  replyButton.dataset.parentId = parentId
  replyButton.dataset.identifier = "Replier"
  if(!replyAtr){
    replyButton.dataset.type = "replyDiv"
  }

  buttonWrapper.append(likeButton)
  buttonWrapper.append(dislikeButton)
  buttonWrapper.append(replyButton)

  nameContentDiv.append(nameDiv)
  nameContentDiv.append(timeDiv)

  contentDiv.append(nameContentDiv)
  contentDiv.append(commentDiv)
  contentDiv.append(buttonWrapper)

  if(switcher){
    const repliesContainer = document.createElement("div")
    const repliesDivButton = document.createElement("button")

    repliesContainer.setAttribute("class","hidden repliesContainer")
    repliesDivButton.setAttribute("class","flex items-center text-blue-600 mt-[2%] replyButton")
    repliesDivButton.innerHTML=`<i class="fas fa-caret-up"></i><div>View ${replyCount} replies</div>`
    contentDiv.append(repliesDivButton)

    replyDivs.forEach(e=>{
      repliesContainer.append(e)
    })

    if(replyCount > 5){
      repliesContainer.append(moreReplies(parentId))
    }
    contentDiv.append(repliesContainer)
  }

  wrapperDiv.append(thumbnailImg)
  wrapperDiv.append(contentDiv)

  return wrapperDiv
}

const loader = () => {
  const wrapperDiv = document.createElement("div")
  const loaderDiv =  document.createElement("div")

  wrapperDiv.setAttribute("class","w-full relative h-20  flex items-center justify-center")
  loaderDiv.setAttribute("class","absolute animate-spin w-10 h-10 rounded-full border-4 border-t-gray-400")

  wrapperDiv.append(loaderDiv)

  return wrapperDiv
}

const moreReplies = (parentId) =>{
    const repliesDivButton = document.createElement("button")
    repliesDivButton.dataset.parentId = parentId
    repliesDivButton.dataset.token = true
    repliesDivButton.setAttribute("class","flex items-center text-blue-600 mt-[2%] moreReplyButton")
    repliesDivButton.innerHTML=`<i class="mr-2 fas fa-arrow-right"></i><div>Show more replies</div>`
    
    return repliesDivButton
}

const replyBox = (parentId,userName="",switcher=false) =>{
  const wrapperDiv = document.createElement("div")
  const textBoxWrapper = document.createElement("div")
  const profile = document.createElement("div")
  const textBox = document.createElement("textarea")

  const form = document.createElement('form')
  const cancelButton =  document.createElement("button")
  const submitButton = document.createElement("button")

  wrapperDiv.setAttribute("class","mt-2")
  textBoxWrapper.setAttribute("class","textbox flex items-center mb-[3%]")
  profile.setAttribute("class","h-12 w-12 flex justify-center items-center text-2xl rounded-full text-white bg-cyan-500 mr-2")
  profile.innerText = "S"
  textBox.setAttribute("class","outline-none resize-none h-7 border-b-2 w-full flex-1 overflow-y-hidden")
  textBox.setAttribute("placeholder","Reply to a public comment")
  textBox.innerText = `${userName}`

  form.setAttribute("class","textbox flex justify-end w-full")
  cancelButton.setAttribute("class","p-[1%] text-sm rounded-sm")
  cancelButton.innerText = "CANCEL"
  cancelButton.dataset.identifier= "textBoxRemove"

  submitButton.setAttribute("class","bg-blue-600 text-white p-[1%] text-sm font-normal rounded-sm")
  submitButton.innerText ="SUBMIT"
  submitButton.dataset.parentId = parentId
  submitButton.dataset.identifier ="submitter"

  if(!switcher){
    submitButton.dataset.type = "top"
  }

  textBoxWrapper.append(profile)
  textBoxWrapper.append(textBox)

  form.append(cancelButton)
  form.append(submitButton)

  wrapperDiv.append(textBoxWrapper)
  wrapperDiv.append(form)

  wrapperDiv.dataset.identifier = "textbox"
  return wrapperDiv
}