const form = document.getElementById('form');
      startCity = document.getElementById('startCity');
      destination = document.getElementById('destination');
      roundTripCost = document.getElementById('roundTripCost');
      hotelCost = document.getElementById('hotelCost');
      mealCost = document.getElementById('mealCost');
      numDays = document.getElementById('numDays');
      startDate = document.getElementById('startDate');
      submit = document.getElementById('submit');
      table = document.getElementById('table');
      decimalFormat  = /^\d+(?:\.\d{0,2})$/;
      inputs = document.getElementsByTagName('input');
      inputsArr = [...inputs];
      viewToggles = document.getElementsByClassName('view-toggle');
      viewTogglesArr = [...viewToggles];
      views = document.getElementsByClassName('view');
      viewsArr = [...views];
      details = document.getElementById('details');

let isValid = true;
    dataObj = {
      startCity: null,
      destination: null,
      roundTripCost: null,
      hotelCost: null,
      mealCost: null,
      numDays: null,
      startDate: null
    };
      
// Toggle app view
const toggleView = (e) => {
  const elem = e.target;
  if (!elem.classList.contains('active')) {
    viewTogglesArr.forEach(btn => {
      btn.classList.toggle('active')
    })
    viewsArr.forEach(view => {
      view.toggleAttribute('data-view-hidden');
    })
  }
}

// Listen for view toggle clicks
viewTogglesArr.forEach(btn => {
  btn.addEventListener('click', toggleView);
})

// Listen for details button click
details.addEventListener('click', () => {
  const extras = document.getElementsByClassName('extra');
  const extrasArr = [...extras];
  extrasArr.forEach(extra => {
    extra.toggleAttribute("data-hidden");
  })
})

// Set Minimum Start Date
startDate.min = new Date().toISOString().split("T")[0];
      
// Listen for Submit
form.addEventListener('submit', allFieldsValid);

// Error Highlight Fields
const highlightError = (elem) => {
  elem.classList.add('error');
}

// Error Remove Highlight
const removeErr = (input) => {
  input.classList.remove('error');
}

// Form field validation
const validateInput = (e) => {
  const input = e.target;
  const inputId = e.target.id;
  const inputVal = e.target.value;
  
  switch(inputId) {
    case "startCity":
      valStartCity(input, inputVal);
      break;
      case "destination":
        valDestination(input, inputVal);
        break;
        case "roundTripCost":
      valRoundTripCost(input, inputVal);
      break;
    case "hotelCost":
      valHotelCost(input, inputVal);
      break;
    case "mealCost":
      valMealCost(input, inputVal);
      break;
    case "numDays":
      valNumDays(input, inputVal);
      break;
    case "startDate":
      valStartDate(input, inputVal);
      break;
  }
}

// Event listener for input fields
inputsArr.forEach(input => {
  input.addEventListener('blur', validateInput);
});

// Validate starting city
const valStartCity = (input, inputVal) => {
  console.log("validating starting city")
  if (inputVal == "") {
    startCity.setAttribute('placeholder', 'Please enter a starting city');
    highlightError(startCity);
  } else {
    removeErr(input);
  }
} 

// Validate destination
const valDestination = (input, inputVal) => {
  if (inputVal == "") {
    input.setAttribute('placeholder', 'Please enter a destination');
    highlightError(input);
  } else {
    removeErr(input);
  }
}

// Validate round-trip cost
const valRoundTripCost = (input, inputVal) => {
  if (inputVal == "" || !decimalFormat.test(inputVal)) {
    isValid = false;
    input.setAttribute('placeholder', 'Please enter dollar amount. Ex: "100.00"');
    highlightError(input);
  } else {
    removeErr(input);
  }
}

// Validate hotel cost
const valHotelCost = (input, inputVal) => {
  if (inputVal == "" || !decimalFormat.test(inputVal)) {
    input.setAttribute('placeholder', 'Please enter dollar amount. Ex: "100.00"');
    highlightError(input);
  } else {
    removeErr(input);
  }
}

// Validate meal cost
const valMealCost = (input, inputVal) => {
  if (inputVal == "" || !decimalFormat.test(inputVal)) {
    input.setAttribute('placeholder', 'Please enter dollar amount. Ex: "100.00"');
    highlightError(input);
  } else {
    removeErr(input);
  }
}

// Validate number of days
const valNumDays = (input, inputVal) => { 
  if (inputVal == "" || inputVal <= 0) {
    input.setAttribute('placeholder', 'Please enter a valid number of days.');
    highlightError(input);
  } else {
    removeErr(input);
  }
}

// Validate start date
const valStartDate = (input, inputVal) => {
  if (!Date.parse(inputVal)) {
    input.setAttribute('placeholder', 'Please select a start date.');
    highlightError(input);
  } else {
    removeErr(input);
  }
}

// Verify all fields valid
function allFieldsValid(e) {
  e.preventDefault();
  let hasError = false;
  inputsArr.forEach(input => {
    if(input.value === "") {
      input.classList.add('error');
      hasError = true;
    }
  })
  hasError ? alert('It appears one of more of the fields is invalid. Please correct the red areas and try again.'): alert('everything checks out');
}

// POPULATING THE TABLE
