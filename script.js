let formEle = document.getElementById("form-container");
let textInputEle = document.getElementById("text-input");
let categorySelectEle = document.getElementById("category-ele")
let addBtnEle = document.getElementById("add-btn")
let habitsListContainer = document.getElementById("habits-container")

let emptyPara = document.getElementById("empty-para")

let quotePara = document.getElementById("quote-para")
let authorName = document.getElementById("by-name")

const quotesList = [
  { quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
  { quote: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
  { quote: "Successful people are simply those with successful habits.", author: "Brian Tracy" },
  { quote: "Good habits formed at youth make all the difference.", author: "Aristotle" },
  { quote: "Your habits will determine your future.", author: "Jack Canfield" },
  { quote: "Small habits build up to big changes over time.", author: "Anonymous" },
  { quote: "The secret to your success is found in your daily routine.", author: "John C. Maxwell" },
  { quote: "You’ll never change your life until you change something you do daily.", author: "Mike Murdock" },
  { quote: "Good habits are worth being fanatical about.", author: "John Irving" },
  { quote: "Drop by drop is the water pot filled.", author: "Buddha" },
  { quote: "The chains of habit are too weak to be felt until they are too strong to be broken.", author: "Samuel Johnson" },
  { quote: "Your net worth to the world is usually determined by what remains after your bad habits are subtracted from your good ones.", author: "Benjamin Franklin" },
  { quote: "Habits change into character.", author: "Ovid" },
  { quote: "Depending on what they are, our habits will either make us or break us.", author: "Sean Covey" },
  { quote: "We first make our habits, and then our habits make us.", author: "John Dryden" },
  { quote: "Good habits save us from ourselves; bad habits are chains that bind us.", author: "Anonymous" },
  { quote: "Motivation gets you going, but discipline keeps you growing.", author: "John C. Maxwell" },
  { quote: "Winning is a habit. Unfortunately, so is losing.", author: "Vince Lombardi" },
  { quote: "The difference between an amateur and a professional is in their habits.", author: "Steven Pressfield" },
  { quote: "Excellence is not an exception, it is a prevailing attitude.", author: "Colin Powell" }
];

let index = Math.floor(Math.random()*(quotesList.length))
quotePara.textContent = `"${quotesList[index].quote}"`
authorName.textContent = `- ${quotesList[index].author}`

formEle.addEventListener("submit",(event) => {
    event.preventDefault()
    let inputtitle = textInputEle.value.trim()
    let inputCategory = categorySelectEle.value 
    const newHabit = {
        id: habitsList.length ? habitsList[habitsList.length-1].id + 1 : 1 ,
        title: inputtitle,
        category: inputCategory,
        datesList: []
    }
    habitsList.push(newHabit)
    textInputEle.value = ""
    categorySelectEle.value = "Health"
    localStorage.setItem("savedHabits",habitsList)
    renderHabits()
})


function deleteHabit(id){
    habitsList = habitsList.filter(each => each.id != id)
    localStorage.setItem("savedHabits",JSON.stringify(habitsList))
    renderHabits()
}


function getStringDate(date){
    let day = date.getDate()
    let month = date.getMonth()+1
    let year = date.getFullYear()

    return `${day<10 ? ("0"+day) : day}/${month<10 ? ("0"+month) : month}/${year}`
}


function changeCheckBoxStatus(id){
    // let checkboxEle = document.getElementById(`checkbox${id}`)
    let currDate = getStringDate(new Date)
    habitsList = habitsList.map(each => {
        if(each.id == id){
            if(each.datesList.includes(currDate)){ //unchecked habit
                return ({...each,
                    datesList: each.datesList.filter(date => date !== currDate)
                })
            }else{ //checked habit
                return ({...each,
                    datesList: [...each.datesList,currDate]
                })
            }
        }else{
            return each
        }
    })
    
    localStorage.setItem("savedHabits",JSON.stringify(habitsList))
    renderHabits()
}


let savedList = localStorage.getItem("savedHabits")
let habitsList = savedList === null ? [
    {   
        id: 1,
        title: "Drink Water",
        category: "Health",
        datesList: []
    },
] : JSON.parse(savedList)



function getStreakCount(datesList){
    let curr = new Date();
    count = 0
    while(true){
        if(datesList.includes(getStringDate(curr))){
            count += 1
        }else{
            break
        }
        curr = new Date(curr - 1000 * 60 * 60 * 24)
    }
    return count
    
}




function createHabits(habit){
    let {id,title,category,datesList} = habit

    let checkedStatus = datesList.length ? datesList.includes(getStringDate(new Date())) : false;

    let habitItem = document.createElement("li")
    habitsListContainer.appendChild(habitItem)
    habitItem.classList.add("habit-item",category);
    if(checkedStatus){
        habitItem.classList.add("checked-item")
    }


    let checkBoxEle = document.createElement("input");
    habitItem.appendChild(checkBoxEle)
    checkBoxEle.title = "Status"
    checkBoxEle.classList.add("checkbox")
    checkBoxEle.type = "checkbox"
    checkBoxEle.id = `checkbox${id}`
    checkBoxEle.checked = checkedStatus;
    checkBoxEle.addEventListener("change",() => changeCheckBoxStatus(habit.id))

    let paraEle = document.createElement("label")
    habitItem.append(paraEle)
    paraEle.textContent = title
    paraEle.classList.add("habit-para")
    paraEle.htmlFor = `checkbox${habit.id}`


    let categoryPara = document.createElement("label")
    habitItem.append(categoryPara)
    categoryPara.textContent = `(${category})`
    categoryPara.classList.add("habit-category")
    categoryPara.htmlFor = `checkbox${habit.id}`
    

    let streakPara = document.createElement("p")
    habitItem.append(streakPara)
    streakPara.textContent = `🔥${getStreakCount(datesList)}`
    streakPara.classList.add("streak")

    let deleteBtn = document.createElement("label")
    habitItem.append(deleteBtn)
    deleteBtn.innerHTML = "&#x2716;"
    deleteBtn.title = "Delete   "
    deleteBtn.classList.add("delete-btn")
    deleteBtn.addEventListener("click", () => deleteHabit(id))
}


function renderEmptyListsView(){

}

function renderHabits(){
    habitsListContainer.innerHTML = ""
    habitsList.forEach((habit) => {
        createHabits(habit)
    })
    if(habitsList.length===0){
        emptyPara.style.display = "block"
    }else{
        emptyPara.style.display = "none"
    }
    console.log(habitsList)
}


renderHabits()