
const main = document.getElementById('main');
const userBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double');
const showMilionairesBtn = document.getElementById('show-millionaires');
const sort = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');


let data = [];

getRandomUsers();
getRandomUsers();
getRandomUsers();
getRandomUsers();
getRandomUsers();
getRandomUsers();

async function getRandomUsers (){
  const response = await fetch('https://randomuser.me/api');
  const data = await response.json();

  const user = data.results[0];

  const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random()* 1000000)
  };
  addData(newUser);
}

// Double everyones money
function doubleMoney() {

 data = data.map(function(user){

    return {...user, money: user.money * 2}

  });
  updateDOM();
}

// Show only millionaires
function showMilionaires (){

  data =  data.filter( mill => mill.money > 1000000)

  updateDOM();
}

// Sort users by riches
function sortByRichest(){

  // a,b are object but we need to return numbers so use b.money - a.money 
  data = data.sort((a,b) => b.money - a.money);
  
  updateDOM();
}

// Add new object to data arr
function addData (obj){

  data.push(obj);

  updateDOM();
}

// update DOM
function updateDOM (provideData = data ) {

  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  // Each item it's an object with {name, money}

  provideData.forEach(function(item){

    const element = document.createElement('div')

    element.classList.add('person')

    element.innerHTML = `<strong>${item.name}</strong>
    ${formatMoney(item.money)}`;

    main.appendChild(element);

  });

};


// Format money 
// https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney (number) {

return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
}


// Calculate the total Wealth
function calculateWealth() {

  const wealth = data.reduce(( accumulator, currentValue) => accumulator += currentValue.money,
    0
  )

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
  main.appendChild(wealthEl);

}


// Add event listeners
userBtn.addEventListener('click', getRandomUsers);
doubleMoneyBtn.addEventListener('click', doubleMoney);
sort.addEventListener('click', sortByRichest);
showMilionairesBtn.addEventListener('click', showMilionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);

