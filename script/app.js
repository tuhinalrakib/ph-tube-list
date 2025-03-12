function loadCategories(){
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res=>res.json())
    .then(data=>{
        displayCategories(data.categories)
    })
}

function displayCategories(categories){
    const categoriesContainer = document.getElementById('categories-container')

    
    
    categories.map(item=>{
        let button = document.createElement("button")
        button.classList.add('btn')
        button.classList.add('btn-sm')
        button.classList.add('bg-[rgba(37,37,37,.15)]')
        button.classList.add('hover:bg-[#FF1F3D]')
        button.classList.add('hover:text-white')
        button.innerText = `${item.category}`
        categoriesContainer.appendChild(button)
    })
}

loadCategories()