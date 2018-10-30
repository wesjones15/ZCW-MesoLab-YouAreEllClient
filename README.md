# ZCW-MesoLabs-YouAreEllClient

## **Objective:**
* Write a font-end client that interacts with the YouAreEll RESTful API. 
* The client should visually display the user's message threads, with each thread containing a list of messages to and from another user.
* The client should allow the user to post a new message to a particular user.

## **Constraint:**
* No front end frameworks or libraries, including JQuery.
* This project uses the latest JavaScript features, many of which are not available in browsers without using a transpiling technology. To avoid using a transpiller, you **MUST USE GOOGLE CHROME** for this lab.

### **Purpose:**
* To establish familiarity with
    * HTML
    * HTML forms
    * CSS
    * JavaScript
    * JavaScript Modules
    * The Document Object Model
    * Http requests

### **Resources:**
* [Intro to HTML, CSS, and JS]()
* [MDN](https://developer.mozilla.org/en-US/docs/Learn)

### Part 0.0 - Familiarize Yourself with the Project Structure

* Your project contains two files, ``index.html`` and ``styles.css``, providing you with the basic html structure of the project and some basic styles.

### Part 0.1 - Serve your project

* Navigate to your project directory in the command line. Run the command ``python -m SimpleHTTPServer 8000``. This will expose the project on ``localhost:8000``. Navigate there in your browser to view your project.

### Part 1.0 - Creating you JavaScript file

* Create a new file in the project directory called ``index.js``.
* Link this file in the ``<head>`` of your ``index.html`` file, using the ``<script>`` tag.
    * In addition to src, you'll need two extra attributes on your ``<script>`` tag, ``type`` and ``async``.
    * For the ``type`` attribute, assign it a value of ``module``. This denotes that the file should be treated as a JavaScript module. Normally, JavaScript files are executed immediately once they are downloaded, even if the HTML hasn't finished parsing yet. We'll explore the benefits of JavaScirpt modules throughout this lab, but one benefit is that the executive of ``modules`` is ``deferred`` until after the HTML is Parsed. 
    [Read more about JavaScript modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/)
    * For the ``async`` attribute, assign it a value of ``true``. Typically, when an HTML file hits a ``<script>`` tag, it stops parsing the HTML, downloads the JavaScript, and then executes the JavaScript. ``async="true"`` overrides this behavior, instead allowing the HTML to be parsed **alongside** downloading the JavaScript. Once the JavaScript is finished downloading, the HTML parsing is paused and the script executes. [Read more about async and defer](https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)
* At the top of your ``index.html`` file, declare a new variable called ``currentUser`` and assign it your YouAreEll username (You should have made one in the previous YouAreEll lab).
* [Add an event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) to the [``window``](https://developer.mozilla.org/en-US/docs/Web/API/Window) object. The ``addEventListener`` method takes two parameters, the type of event you're listening for (examples include "load", "click", "keydown", etc), and a function reference, known as a [callback](), representing the function you want to invoke when the event occurs. Wraping code in a "load" event listener attached to the ``window`` object will insure that your code is only ran once the page has loaded.
```javascript
let userId = "dominiqueclarke";

window.addEventListener("load", function () {

});
```
* Our goal is to add some text to the ``<h2`` element, nested within the ``header`` element containing the ``id`` of ``greeting``. In order to do so, we need to grab this element off the [``document``](https://developer.mozilla.org/en-US/docs/Web/API/Document) object 
* Use the [``getElementById``](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) method to grab the element containing the id ``greeting``. This will return to you an object of type [``element``](https://developer.mozilla.org/en-US/docs/Web/API/Element), allowing you to use any of the methods or access any of the properites available on the element interface.
* Assign the [``innerHTML``](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) property the [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) ``` `Welcome ${userId}` ```
```javascript
let userId = "dominiqueclarke";

window.addEventListener("load", function () {
    document.getElementById("greeting").innerHTML = `Welcome ${userId}!`;
});
```
* Refresh your page to view your changes

### Part 2.0 - Create Your Service

* Create a new JavaScript file called ``message-serivce.js``. This file will contain a [JavaScript class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) called ``MessageService``, responsible for making HTTP requests to fetch and update data from the YouAreEll RESTful API.
```javascript
class MessageService {
   
}
```
* Configure your ``MessageService`` as a module. 
    * In JavaScript, the word "modules" refers to small units of independent, reusable code. They are the foundation of many JavaScript design patterns and are critically necessary when building any non-trivial JavaScript-based application. The closest analog in the Java language are Java Classes. However, JavaScript modules export a value, rather than define a type. In practice, most JavaScript modules export an object literal, a function, or a constructor. Modules that export a string containing an HTML template or a CSS stylesheet are also common.
    * The [``export``](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export) statement is used when creating JavaScript modules to export functions, objects, classes or primitive values from the module so they can be used by other programs with the import statement.
    * ``export`` your ``MessageService`` as the ``default``.
```javascript
export default class MessageService {

}
```
* Import your MessageService module into your ``index.js`` file using the [``import``](https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/import) statement. This creates a global variable containing the exported value from the imported module.
```javascript
import MessageService from "./message-service.js";

let userId = "dominiqueclarke";

window.addEventListener("load", function () {
    document.getElementById("greeting").innerHTML = `Welcome ${userId}!`;
});
```
* Create a new ``MessageService`` object by using the ``new`` keyword to invoke the ``MessageService`` constructor.
```javascript
import MessageService from "./message-service.js";

let userId = "dominiqueclarke";
const messageService = new MessageService();

window.addEventListener("load", function () {
    document.getElementById("greeting").innerHTML = `Welcome ${userId}!`;
});
```

### Part 3.0 - Creating AJAX HTTP Requests

* In ``message-service.js``, create a method called ``getAllMessages``, which takes 0 parameters
* Create a ``XMLHTTPRequest`` (XHR) object and assign it to a variable called ``request``. XMLHttpRequest (XHR) objects  interact with servers through ``HTTP`` requests. You can retrieve data from a URL without having to do a full page refresh. XMLHttpRequest is used heavily in [Ajax](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started) programming.
* Use the [``open``](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/open) method on the ``request`` object, passing the type of ``HTTP`` request you'd like to make and the request endpoint as the first two arguments. To get all the global messages, use the ``/messages/`` endpoint. Refer back to the original [YouAreEll lab](https://git.zipcode.rocks/ZipCodeWilmington/YouAreEll) for documentation on the API if necessary.
* Use the [``send``](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/send) method to send the request. This method takes an optional parameter of the request ``body`` when necessary.
```javascript
export default class MessageService {

    getAllMessages() {
        let request = new XMLHttpRequest();

        request.open("GET", "http://zipcode.rocks:8085/messages");

        request.send();
    }
}
```

### Part 3.5 - Listening for Request Responses

* We've configured and sent the request, but what happens when we receive the request back? We can define a function to be used once the response is received using the [``onload``](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestEventTarget/onload) property of the ``request`` object.
```javascript
getAllMessages() {
    let request = new XMLHttpRequest();

    // Setup our listener to process compeleted requests
    request.onload = function() {
        // do something
    };

    request.open("GET", `http://zipcode.rocks:8085/messages`);

    request.send();
}
```
* If the status is greater than or equal to 200 and less than 300, than we have a successful response. Else, we have an error. Create an if/else statement to handle the response or error.
* The response is stored in the ``responseText`` property of the ``request`` object as an array of [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) objects. To convert it into an array of JavaScript objects, use ``JSON.parse(request.responseText)``. 
```javascript
getAllMessages() {
    let request = new XMLHttpRequest();

    // Setup our listener to process compeleted requests
    request.onload = function() {
        if (request.status >= 200 && request.status < 300) {
            console.log(JSON.parse(request.responseText)); // 'This is the returned text.'
        } else {
            console.log('Error: ' + request.status); // An error occurred during the request.
        }
    };

    request.open("GET", "http://zipcode.rocks:8085/messages");

    request.send();
}
```
* Test the function by navigating back to ``index.js`` and invoking the function.
```javascript
import MessageService from "./message-service.js";

let userId = "dominiqueclarke";
const messageService = new MessageService(userId);

window.addEventListener("load", function () {
    document.getElementById("greeting").innerHTML = `Welcome ${userId}!`;
    messageService.getAllMessages();
});
```
* Refresh your browser. Right click on the page and select ``inspect``. When the dev tools container pops up, click the ``console`` tab. Once the response is returned, you should see the returned array of messages printed to the console.

### Part 4.0 - Promise based AJAX requests

* Our current ``getAllMessages`` method has some issues. XMLHTTPRequests are processed asynchronously using callbacks. Callbacks cannot contain a return value. This makes it difficult to pass back a value to ``index.js`` where this ``messageService.getAllMessages()`` is being called. Fortunately, we can alieviate this issue using [``promises``](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
    * A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is an object representing a contract to preform some task asynchronous (often, an ``HTTP`` request), providing a value (often, an ``HTTP`` response) when the task is complete.
    * Promises allow us to continue running syncronous code while waiting for for the execution of the promised task.
    * Promises allow us to specify a function that should be run once the task is complete using the ``then`` method.
    * Promises are tricky. Familiarize yourself with Promises with [this tutorial](https://www.sitepoint.com/overview-javascript-promises/)
* Wrap your ``request.onload`` function in a ``new`` ``Promise``;
```javascript
getAllMessages() {
    const request = new XMLHttpRequest();

    new Promise(function (resolve, reject) {
        // Setup our listener to process compeleted requests
        request.onload = function () {
            // Process the response
            if (request.status >= 200 && request.status < 300) {
                console.log(JSON.parse(request.responseText)); // 'This is the returned text.'
            } else {
                console.log('Error: ' + request.status); // An error occurred during the request.
            }
        };

        request.open("GET", "http://zipcode.rocks:8085/messages");

        request.send();
    });
}
```
* If the request is successful, ``resolve`` the ``promise`` passing in the ``threads`` object``
```javascript
getAllMessages() {
    const request = new XMLHttpRequest();

    new Promise(function (resolve, reject) {
        // Setup our listener to process compeleted requests
        request.onload = function () {
            // Process the response
            if (request.status >= 200 && request.status < 300) {
                const threads = JSON.parse(request.responseText); // 'This is the returned text.'
                resolve(threads);
            } else {
                console.log('Error: ' + request.status); // An error occurred during the request.
            }
        };

        request.open("GET", "http://zipcode.rocks:8085/messages");

        request.send();
    });
}
```
* If the request returns an error, ``reject`` the ``promise`` passing in the ``threads`` object``
```javascript
getAllMessages() {
    const request = new XMLHttpRequest();

    new Promise(function (resolve, reject) {
        // Setup our listener to process compeleted requests
        request.onload = function () {
            // Process the response
            if (request.status >= 200 && request.status < 300) {
                const threads = JSON.parse(request.responseText); // 'This is the returned text.'
                resolve(threads);
            } else {
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        };

        request.open("GET", "http://zipcode.rocks:8085/messages");

        request.send();
    });
}
```
* Specify the function you'd like executed when the promise is resolved by using the ``then`` method.
    * The [``then``](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) method is part of the ``Promise`` interface. It takes up to two parameters: a ``callback`` function for the success case and a callback function for the failure case of the ``Promise``.
    * If the ``Promise`` is successful, the first parameter (the success callback), is executed. If the ``Promise`` results in an error, the second parameter (the failure callback), is excuted.  
```javascript
getAllMessages() {
    const request = new XMLHttpRequest();

    new Promise(function (resolve, reject) {
        // Setup our listener to process compeleted requests
        request.onload = function () {
            // Process the response
            if (request.status >= 200 && request.status < 300) {
                // If successful
                const threads = JSON.parse(request.responseText);
                resolve(threads);
            } else {
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        };

        request.open("GET", "http://zipcode.rocks:8085/messages");

        request.send();
    }).then(successCallback, errorCallback);

    function successCallback() {
        console.log("Promise is successful!");
    }

    function errorCallback() {
        console.log("An error occurred");
    }
}
```
* When the callbacks are executed, the receive a special parameter. The success callback receives the value passed to the ``resolve`` method, while the failure callback receives the value passed to the ``reject`` method.
```javascript
getAllMessages() {
    const request = new XMLHttpRequest();

    new Promise(function (resolve, reject) {
        // Setup our listener to process compeleted requests
        request.onload = function () {
            // Process the response
            if (request.status >= 200 && request.status < 300) {
                // If successful
                const threads = JSON.parse(request.responseText);
                // this data is passed to the success callback
                resolve(threads);
            } else {
                // this data is passed to the failure callback
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        };

        request.open("GET", "http://zipcode.rocks:8085/messages");

        request.send();
    }).then(successCallback, errorCallback);

    function successCallback(response) {
        // This data comes from the resolve method
        console.log(response);
    }

    function errorCallback(response) {
        // This data comes from the reject method
        console.log(response);
    }
}
```

### Part 5.0 - Consuming the Promise elsewhere

* By refactoring our ``getAllMessages`` method, we can consume the ``Promise`` within our ``index.js`` file, allowing for separation of concerns.
* Remove the ``then`` method, ``successCallback`` declaration and ``errorCallback`` declaration from ``getAllMessages``.
* ``return`` the Promise from the ``getAllMessages`` method. This will allow us to call the ``then`` method, passing in the appropriate success and failure callbacks, elsewhere. 
```javascript
getAllMessages() {
    const request = new XMLHttpRequest();

    return new Promise(function (resolve, reject) {
        // Setup our listener to process compeleted requests
        request.onload = function () {
            // Process the response
            if (request.status >= 200 && request.status < 300) {
                // If successful
                const threads = JSON.parse(request.responseText);
                // this data is passed to the success callback
                resolve(threads);
            } else {
                // this data is passed to the failure callback
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        };

        request.open("GET", "http://zipcode.rocks:8085/messages");

        request.send();
    })
}
```
* Navigate back to your ``index.js`` file. ``getAllMessages`` now returns a ``Promise``. We can now use the ``then`` method to specify a ``callback`` function to be executed in case of success or failure of that ``Promise``. Call ``.then`` on ``messageService.getAllMessages``, reimplementing the original code.
```javascript
messageService.getAllMessages()
    .then(successCallback, errorCallback);

function successCallback(response) {
    // This data comes from the resolve method
    console.log(response);
}

function errorCallback(response) {
    // This data comes from the reject method
    console.log(response);
}
```
### Part 6.0 - Populating the DOM

* Now that we have our messages, let's add them to our page visually. Using the DOM interface, we can create and add HTML elements to our page.
    * We'll populate our  messages inside the unordered list``<ul id="message-list">``.
* Create a new function in ``index.js`` called ``populateMessages``. ``populateMessages`` should take one parameter, a list of messages.
```javascript
import MessageService from "./message-service.js";

let userId = "dominiqueclarke";
const messageService = new MessageService(userId);

window.addEventListener("load", function () {

    document.getElementById("greeting").innerHTML = `Welcome ${userId}!`;
    messageService.getAllMessages()
        .then(successCallback, errorCallback);

    function successCallback(response) {
        // This data comes from the resolve method
        console.log(response);
    }

    function errorCallback(response) {
        // This data comes from the reject method
        console.log(response);
    }
});

function populateMessages(messages) {

}
```
* In order to add content to the ``DOM``, we need to create new ``nodes``. A [``node``](https://developer.mozilla.org/en-US/docs/Web/API/Node) is an interface is an interface from which a number of ``DOM`` API object types inherit, including ``document``, ``element`` and more. A ``node`` represents a piece of the ``DOM`` tree.
* Using a ``forEach`` loop, loop through each message in the array of ``messages``.
* For each message, create a new ``<li>`` ``element`` to hold the sender username and the message content and assign it to ``messageListItem``.
    * You can do this by calling the ``createElement`` method on the ``document`` object, passing in the element tag name as a string. This will return a new HTML ``element`` that you can later append to the ``DOM``. Remember, ``elements`` are a type of ``node``.
* For each message, create a new ``<h3>`` element for the sender username and assign it to ``const userIdHeading``.
* For each message, create a new ``<p>`` element for the message content and assign it to ``const messageParagraph``.
```javascript
function populateThread(messages) {
    messages.forEach(message => {
        const messageListItem = document.createElement("LI"); 
        const userIdHeading = document.createElement("h3");
        const messageParagraph = document.createElement("p"); 
    })
}
```
* Both our ``<h3>`` element and our ``<p>`` element will contain text.
    * To add new text to our page, we need to first create a new ``text node``. You can create a ``text node`` using the [``createTextNode``](https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode) method on the ``document`` object, passing in the text you wish to include in the node. This will return a new ``text node`` that you can later append to an ``element``.
* For each message, create a ``text node`` using the ``fromid`` property on the ``message`` object and assign it to const ``userIdContent``.
* For each message, create a ``text node`` using the ``message`` property on the ``message`` object and assign it to ``const messageContent``.
```javascript
function populateThread(messages) {
    messages.forEach(message => {
        const messageListItem = document.createElement("LI");
        const userIdHeading = document.createElement("h3");
        const messageParagraph = document.createElement("p");
        const messageContent = document.createTextNode(message.message);
        const userIdContent = document.createTextNode(message.fromid);
    })
}
```
* Now that we've created these text nodes, we need to add them to our new html elements. 
    * To add any node to another node, use the [``appendChild``] method. The ``Node.appendChild()`` method adds a node to the end of the list of children of a specified parent node. ``appendChild`` returns the modified ``node`` object, allowing you to perform method chaining.
* Add your ``messageContent`` ``node`` to your ``messageParagraph`` ``node`` using the ``appendChild`` method.
* Add your ``userIdContent`` ``node`` to your ``userIdHeading`` ``node`` using the ``appendChild`` method.
* Add both your ``userIdHeading`` ``node`` and your ``messageParagraph`` ``node`` to your ``messageListItem`` node, using the ``appendChild`` method and method chaining.
```javascript
function populateThread(messages) {
    messages.forEach(message => {
        const messageListItem = document.createElement("LI");
        const userIdHeading = document.createElement("h3");
        const messageParagraph = document.createElement("p");
        const messageContent = document.createTextNode(message.message);
        const userIdContent = document.createTextNode(message.fromid);
        userIdHeading.appendChild(userIdContent);
        messageParagraph.appendChild(messageContent);
        messageListItem
            .appendChild(userIdHeading)
            .appendChild(messageParagraph);
    })
}
```
* By using these methods, we've created a complete ``DOM`` ``node`` for each message that includes an ``<li>`` containing a ``<h3>`` ``element`` for the ``message.fromId`` and an ``<p>`` ``element`` for the ``message.message``.
* Now that we've created our new ``node``, we need to add it to an existing HTML ``element`` on our page. Review the ``index.html`` file and find ``<ul id="message-list">``. We want to add all of our new individual ``<li>`` elements to this ``<ul>``. To grab this ``element`` using javascript, we can use the [``getElementById``](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) method on the ``document`` object, passing in the element's ``id`` as a string.
* Using the ``appendChild`` method, append the ``messageListItem`` ``node`` to the ``element`` returned using ``document.getElementById("message-list")``. This will add a new ``<li>`` representing each message to our ``<ul id="message-list">`` element.
```javascript
function populateThread(messages) {
    messages.forEach(message => {
        const messageListItem = document.createElement("LI");
        const userIdHeading = document.createElement("h3");
        const messageParagraph = document.createElement("p");
        const messageContent = document.createTextNode(message.message);
        const userIdContent = document.createTextNode(message.fromid);
        userIdHeading.appendChild(userIdContent);
        messageParagraph.appendChild(messageContent);
        messageListItem
            .appendChild(userIdHeading)
            .appendChild(messageParagraph);
        document.getElementById("message-list").appendChild(messageListItem);
    })
}
```
* Now that we've created our message, let's invoke the function from our ``successCallback`` method, passing in the array of ``messages`` returned from our HTTP request.
```javascript
window.addEventListener("load", function () {
    document.getElementById("greeting").innerHTML = `Welcome ${userId}!`;
    messageService.getAllMessages()
        .then(successCallback, errorCallback);

    function successCallback(response) {
        // This data comes from the resolve method
        populateMessages(response);
    }

    function errorCallback(response) {
        // This data comes from the reject method
        console.log(response);
    }
});
```
* Refresh your page to review the results and check for any errors

### Part 7.0 - Creating A New Messages

* Now that we've fetched all the current messages, let's send new messages out into the atmosphere.
* Navigate to your ``message-service.js`` file. Add a new method called ``createNewMessage``. It should take one parameter, the new ``message`` object.
* Set up your ``XMLHTTPRequest``. The set up is the same as our ``getAllMessages`` method, except for calling the ``request.open`` and ``request.send`` methods.
* To add a new message to the database, we need to use the HTTP ``POST`` method. In the ``request.open`` method, pass in ``"POST"`` as the first parameter, and the Post endpoint as the second parameter. The endpoint to send a new message is ``/ids/:mygithubid/messages/``.  Refer back to the original [YouAreEll lab](https://git.zipcode.rocks/ZipCodeWilmington/YouAreEll) for documentation on the API if necessary.
* For ``HTTP`` methods where a request ``body`` is necessary, pass the request body as a parameter to the ``request.send`` method. To send our ``message`` object as the ``request`` body, first convert it from a JavaScript object to a JSON object using the ``JSON.stringify`` method. 
```javascript
createNewMessage(message) {
    const request = new XMLHttpRequest();

    return new Promise(function (resolve, reject) {
        // Setup our listener to process compeleted requests
        request.onload = function () {
            // Process the response
            if (request.status >= 200 && request.status < 300) {
                // If successful
                resolve(JSON.parse(request.responseText));
            } else {
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }
        };

        request.open("POST", `http://zipcode.rocks:8085/ids/${message.fromid}/messages`);

        request.send(JSON.stringify(message));
    });
}
```
* Navigate to your ``index.js`` file. Notice that in our ``index.html`` file, we have a ``form``. This form exists to create and send new messages. In order to set up the form to listen to input from the user and respond propertly to the user hitting the submit button, we need to set up an ``eventListener`` for our form.
* Create a new function in ``index.js`` called ``createFormListener``. This method takes 0 parameters.
```javascript
function createFormListener() {

}
```
* Grab the ``form`` ``element`` using ``document.getElementById`` passing in the ``id`` of the ``form``.
* Set the onsubmit property of the ``form`` to a function reference. This function takes one parameter, ``event``. This function will fire when the form is submitted.
* To prevent the default form action from occuring, use the ``preventDefault`` method on the ``event`` object.
```javascript
function createFormListener() {
    const form = document.getElementById("new-message-form");

    form.onsubmit = function (event) {
        // stop the regular form submission
        event.preventDefault();
    }
};
```
* Navigate to ``index.html`` and find the ``form`` element. Notice that the ``form`` contains two form elements, ``textarea`` and ``button``. ``textarea`` has an ``attribute`` of ``name`` set to the property ``message``. When form elements are given a ``name`` ``attribute``, it adds information about that element the ``form`` object as a property.
* Create a object called ``data`` with two properties, ``fromid`` and ``message``. ``fromid`` should be assigned the value of ``userid``, and message should be assigned the value of ``form.message.value`` (the value of the textarea with attribute ``name="message"``).
* Call the ``createNewMessage`` method on the ``messageService`` object, passing in the ``data`` object. The ``createNewMessage`` method returns a ``Promise``, so specify your success and failure ``callbacks`` using the ``then`` method.
* In your ``successCallback`` method, invoke the populateMessages
```javascript
function createFormListener() {
    const form = document.getElementById("new-message-form");

    form.onsubmit = function (event) {
        // stop the regular form submission
        event.preventDefault();

        const data = {
            fromid: userId,
            message: form.message.value
        };

        messageService.createNewMessage(data)
            .then(successCallback, errorCallback);

        function successCallback(response) {
            // This data comes from the resolve method
            console.log(response);
        }

        function errorCallback(response) {
            // This data comes from the reject method
            console.log(response);
        }
    }
};
```
### Part 8.0 - Adding Your New Message To the DOM

* Just like we added our array of messages from before, we now need to add our new message to our list of messages.
* Navigate to your ``index.js`` file. Add a method called ``addMessageToThread``. The method should take on parameter, a single ``message``.
* Like before, we need to create a bunch of individual nodes and combine them together in order to create a full ``<li>`` element containing a message.  
```javascript
function addMessageToThread(message) {
    const messageListItem = document.createElement("LI");
    const userIdHeading = document.createElement("h3");
    const messageParagraph = document.createElement("p");
    const messageContent = document.createTextNode(message.message);
    const userIdContent = document.createTextNode(message.fromid);
    userIdHeading.appendChild(userIdContent);
    messageParagraph.appendChild(messageContent);
    messageListItem
        .appendChild(userIdHeading)
        .appendChild(messageParagraph);
    document.getElementById("message-list").appendChild(messageListItem);
}
```
* Does this code look familiar? Before we move forward, let's go back and refactor our ``populateThread`` method to use this ``addMessageToThread`` method.
```javascript
function populateMessages(messages) {
    messages.forEach(message => {
        addMessageToThread(message);
    })
}
```
* Navigate back to your ``createFormListener`` method. In the ``successCallback``, invoke the ``addMessageToThread`` method, passing in the response, instead of logging the response.
```javascript
function createFormListener() {
    const form = document.getElementById("new-message-form");

    form.onsubmit = function (event) {
        // stop the regular form submission
        event.preventDefault();

        const data = {
            fromid: userId,
            message: form.message.value
        };

        messageService.createNewMessage(data)
            .then(successCallback, errorCallback);

        function successCallback(response) {
            // This data comes from the resolve method
            addMessageToThread(response);
        }

        function errorCallback(response) {
            // This data comes from the reject method
            console.log(response);
        }
    }
};
```
* Navigate back to your browser and refresh. Type a message into the form and hit submit. Scroll down to the bottom of the list to see your new message.
* Bonus:
    * Try to make the new message append to the top, instead of the bottom
    OR
    * Try to make the the message container stay scrolled to the bottom