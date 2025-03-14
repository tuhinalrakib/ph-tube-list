function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => {
            displayCategories(data.categories)
        })
}

function loadVideos() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            const btnAll = document.getElementById('btn-all')
            btnAll.classList.add('active')
            displayVideos(data.videos)
        })
}

function loadCategoryVideos(id){
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        removeActiveClass()
        const clickedButton = document.getElementById(`btn-${id}`)
        clickedButton.classList.add("active")
        

        displayVideos(data.category)
    })
}

function removeActiveClass(){
    const activeBtn = document.getElementsByClassName('active')
    for(const btn of activeBtn){
        btn.classList.remove('active')
    }
}

function displayCategories(categories) {
    const categoriesContainer = document.getElementById('categories-container')

    categories.map(item => {
        const div = document.createElement("div")

        div.innerHTML = `
        <button id="btn-${item.category_id}" onClick="loadCategoryVideos(${item.category_id})" class="btn btn-sm bg-[rgba(37,37,37,.15)] hover:bg-[#FF1F3D] hover:text-white">${item.category}</button>
        `
        categoriesContainer.appendChild(div)
    })
}

const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos-container')
    videosContainer.innerHTML = ''

    if(videos.length == 0){
        videosContainer.innerHTML = `
            <div class="col-span-full flex flex-col justify-center items-center py-7 gap-5">
                <img class="w-[120px]" src="./images/Icon.png" alt="">
                <h2 class="text-2xl font-bold text-center">Oops!! Sorry, There is no content here</h2>
            </div>
        `
        return
    }

    videos.map(item => {
        const videoCard = document.createElement("div")
        videoCard.innerHTML = `
            <div class="card bg-base-100  shadow-sm">
            <figure class="relative">
              <img
                class="w-full h-[150px] object-cover"
                src="${item.thumbnail}"
                alt="Shoes" />
                <span class="absolute bottom-2 right-2 bg-black text-white px-2 rounded text-sm">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 px-0 py-5">
              <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                      <img src="${item.authors[0].profile_picture}" />
                    </div>
                  </div>
              </div>
              <div class="intro">
                <h2 class="text-sm font-semibold"> ${item.title} </h2>
                <p class="text-sm text-gray-400 flex gap-1"> ${item.authors[0].profile_name} <img class="w-5 h-5" src="https://img.icons8.com/?size=100&id=98A4yZTt9abw&format=png&color=000000" alt=""></p>
                <p class="text-sm text-gray-400"> ${item.others.views} </p>
              </div>
            </div>
          </div>
        `
        videosContainer.appendChild(videoCard)
    })
}

loadCategories()


/*
{
    "category_id": "1003",
    "video_id": "aaae",
    "thumbnail": "https://i.ibb.co/Yc4p5gD/inside-amy.jpg",
    "title": "Inside Amy Schumer",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/YD2mqH7/amy.jpg",
            "profile_name": "Amy Schumer",
            "verified": ""
        }
    ],
    "others": {
        "views": "3.6K",
        "posted_date": "15147"
    },
    "description": "'Inside Amy Schumer' is a comedy show by the popular comedian Amy Schumer, blending sharp satire and unfiltered humor to tackle everyday issues and societal norms. With 3.6K views, the show promises a blend of hilarious sketches, thought-provoking stand-up, and candid interviews. It's a must-watch for fans of bold, edgy comedy."
}
*/