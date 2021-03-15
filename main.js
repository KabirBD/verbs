console.log("main js is connected");

// Make sure sw are supported

if ('serviceWorker' in navigator) {

  window.addEventListener('load', () => {

    navigator.serviceWorker

    .register('sw.js')

    .then(reg => console.log('Service Worker: Registered (Pages)'))

    .catch(err => console.log(`Service Worker: Error: ${err}`));

  });

}

//--- Global variables -------

var verbList, userInput, input, output, historyTable;

userInput = document.getElementById("input");

outputDOM = document.getElementById("output");

historyTable = document.getElementById("historyTable");

//------- fetch VerbForms -------

fetch('VerbForms.json')

.then(function (response) {

  return response.json();

})

.then(function (data) {

  document.getElementById("loadingView").style.display = "none";

  document.getElementById("mainView").style.display = "block";

  verbList = data;

  console.log("data loaded");

});

function search() {

  // Get user input

  input = userInput.value;

  // remove all all other characters but a-Z

  input = input.replace(/[^a-zA-Z]/gi, '');

  input = input.toLowerCase();

  output = ``;

  // check i input is not empty

  if (input) {

    // check the input if in the verb lists

    for (var verb of verbList) {

      if (verb.vb == input || verb.vt == input || verb.vp == input || verb.vpp == input || verb.ving == input) {

        var base,

        third,

        past,

        pastp,

        prep;

        base = capitalize(verb.vb);

        third = capitalize(verb.vt);

        past = capitalize(verb.vp);

        pastp = capitalize(verb.vpp);

        prep = capitalize(verb.ving);

        storeHistory(base, third, past, pastp, prep);

        // Bind output table

        output = output + `

        <table class="table table-bordered my-2">

        <thead class="bg-success text-light">

        <tr>

        <th scope="col">Type</th>

        <th scope="col">Form</th>

        </tr>

        </thead>

        <tbody>

        <tr>

        <td>Base Form</td>

        <td class="">${base}</td>

        </tr>

        <tr>

        <td>Smple Present Form for 3<sup>rd</sup> Person Singular Number</td>

        <td>${third}</td>

        </tr>

        <tr>

        <td>Past Form</td>

        <td>${past}</td>

        </tr>

        <tr>

        <td>Past Participle Form</td>

        <td>${pastp}</td>

        </tr>

        <tr>

        <td>Present Participle Form</td>

        <td>${prep}</td>

        </tr>

        </tbody>

        </table>

        `;

        //console.log(verb);

      }

    }

  }

  // if input is empty then go to else

  else {

    output = `

    <div class="alert alert-warning " role="alert">

    <strong>Input is empty!</strong> Please write a verb.

    </div>

    `

  }

  //if input doesn't match to any Verb

  if (!output) {

    output = `

    <div class="alert alert-warning " role="alert">

    <strong>Doesn't match to any verb!</strong> Please check your input and try again.

    </div>

    `

  }

  // Show the output

  outputDOM.innerHTML = output;

}

//Save history

function storeHistory(base, third, past, pastp, prep) {

  var history;

  if (localStorage.getItem('history') != null) {

    history = localStorage.getItem('history');

  } else {

    history = "";

  }

  // Bind history table

  history = `<tr>

  <td>${base}</td>

  <td>${third}</td>

  <td>${past}</td>

  <td>${pastp}</td>

  <td>${prep}</td>

  <tr>` + history;

  localStorage.setItem('history', history);

  history = "";

  // Show history output

  historyTable.innerHTML = localStorage.getItem('history');

}

//show history output on start

historyTable.innerHTML = localStorage.getItem('history');

// delete history from storage

function deleteHistory() {

  localStorage.setItem('history', "");

  historyTable.innerHTML = localStorage.getItem('history');

}

// function। to make first letter capital

function capitalize(str) {

  // converting first letter to uppercase

  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;

}

//On Enter Key Press

document.getElementById("input").addEventListener("keyup", function(event) {

  // Number 13 is the "Enter" key on the keyboard

  if (event.keyCode === 13) {

    // Cancel the default action, if needed

    event.preventDefault();

    // Trigger search() function

    search();

    //hide keyboard

    document.getElementById("input").blur();

  }

});
