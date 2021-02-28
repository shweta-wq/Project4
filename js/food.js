const search=document.getElementById('search-input');
const button=document.getElementById('btn');
const mealList=document.getElementById('list');
const mealDetails=document.querySelector('.meal-details-content');
const close=document.getElementById('close');
const meald=document.querySelector('.meald');

btn.addEventListener('click',getMealList);
mealList.addEventListener('click',getMealRecipe);


function getMealList(){
    let search = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`)
    .then(response => response.json())
    .then(data => {
        
console.log(data);

        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
          <div class="meal-card">
		<div class="meal-img">
					<img  src="${meal.strMealThumb}">
				</div>
				<div class="meal-name">
					<h3>${meal.strMeal}</h3>
					<a  id="${meal.idMeal}" href="#" class="recipe-btn">Get Recipe</a>
				</div>
			</div>

`
  });
            
        } else{
            html = "Sorry, we didn't find any meal!";
            
        }

        mealList.innerHTML = html;
    });
}
function getMealRecipe(e){

   
    if(e.target.classList.contains('recipe-btn')){
        
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e.target.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals))
         
    }
    
}

function mealRecipeModal(meal){
   
    meal = meal[0];
    
    
    let html = `
     
        <h2 class = "title" >${meal.strMeal}</h2>
        <p >${meal.strCategory}</p>
        <div class = "instructions">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "rec-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
   4     <div class = "recipe-link">
            <a  id="${meal.idMeal} " href = "${meal.strYoutube}">Watch Video</a>
        </div>
    `
    mealDetails.innerHTML = html;
    meald.style.display="block";
    close.addEventListener('click', () => {
    meald.style.display="none";
});
} 