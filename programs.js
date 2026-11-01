const PROGRAMS = [
  {
    n: "01",
    title: "Design The Basic HTML Page Creation",
    aim: "To create a simple web page using basic HTML tags.",
    note: "The link address is now w3schools.com (your record has w3school.com). The image loads from the internet, so connect to the internet to see it.",
    files: [
      {
        name: "program1.html",
        code: `<html>
<head>
<title>Web Page</title>
</head>
<body align = center>
<h1><u>Welcome to My Web Page</u></h1>
<h2>About This Page</h2>
<p>This is a simple HTML page created to demonstrate the basic structure of a webpage.
It includes headings, paragraphs, a link, and an image.</p>
<h3>Why Learn HTML?</h3>
<p><mark>HTML (HyperText Markup Language)</mark> is the foundation of all websites. Learning it allows you to create and structure content for the web. It's easy to learn and extremely powerful when combined with CSS and JavaScript.</p>
<h3> HTML Logo </h3>
<img src="https://www.devopsschool.com/blog/wp-content/uploads/2023/07/image-249.png" alt="Sample placeholder image" width="400" height="200">
<p>Want to learn more? Visit
<a href="https://www.w3schools.com/html/default.asp" alt = "This is the image description"> Click here </a>.
</p>
</body>
</html>`
      }
    ]
  },
  {
    n: "02",
    title: "Styling A Web Page With CSS",
    aim: "To create a simple shopping-style web page using HTML and apply CSS for layout and styling.",
    note: "The file is named index.html (your record has Index.html) and the missing </nav> closing tag is added.",
    files: [
      {
        name: "index.html",
        code: `<html>
<head>
<title>Sample</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<header>
<h1> Shopping Styles</h1>
<nav>
<a href = "#">Home</a>
<a href = "#">Products</a>
<a href="#"> Categories </a>
<a href="#">Contact</a>
</nav>
</header>
<main>
<section class="product">
<h2>Sneakers</h2>
<p>Stylish and comfy footwear</p>
<p>$49.99</p>
</section>
<section class="product">
<h2>Leather Wallet</h2>
<p>Elegant and durable wallet.</p>
<p>$29.99</p>
</section>
<section class="product">
<h2>Smart Watch</h2>
<p>Track fitness</p>
<p>$99.99</p>
</section>
</main>
</body>
</html>`
      },
      {
        name: "styles.css",
        code: `body {
font-family: Arial, sans-serif;
margin: 0;
background-color:grey;
}
header {
background-color: black;
color: white;
padding: 20px;
text-align: center;
}
nav a{
color: white;
margin: 0 10px;
}
main {
display: flex;
justify-content: space-around;
flex-wrap: wrap;
padding: 20px;
}
.product {
background-color: white;
border-radius: 8px;
padding: 15px;
margin: 10px;
width: 250px;
text-align: center;
}`
      }
    ]
  },
  {
    n: "03",
    title: "DOM Manipulation in JavaScript",
    aim: "To demonstrate how to manipulate HTML elements dynamically using JavaScript and the Document Object Model (DOM).",
    note: "",
    files: [
      {
        name: "program3.html",
        code: `<html>
<head>
<title> DOM Manipulation </title>
</head>
<body>
<h2 id="heading"> Welcome to my page </h2>
<p id="info"> Click the button to change this content and color.</p>
<button onclick="manipulateDOM()"> Click here </button>
<br><br>
<script>
function manipulateDOM() {
var heading = document.getElementById("heading");
heading.innerHTML = "<u> Content Changed! </u>";
heading.style.color = "green";
heading.style.fontSize = "30px";
var info = document.getElementById("info");
info.innerHTML = "<b> This is updated using JavaScript! </b>";
info.style.backgroundColor = "lightyellow";
}
</script>
</body>
</html>`
      }
    ]
  },
  {
    n: "04",
    title: "Handling Forms and Input Validation",
    aim: "To create a user registration form and validate input fields using JavaScript.",
    note: "",
    files: [
      {
        name: "program4.html",
        code: `<html>
<head>
<title>Form Validation</title>
<script>
function validateForm() {
const form = document.forms["myForm"];
const name = form["username"].value.trim();
const age = form["age"].value;
const email = form["email"].value.trim();
const password = form["password"].value;
const gender = form["gender"].value;
if (name === "") {
alert("Name is required");
return false;
}
if (isNaN(age) || age < 1 || age > 120) {
alert("Enter a valid age between 1 and 120");
return false;
}
if (!email.includes("@")) {
alert("Enter a valid email address");
return false;
}
if (password.length < 6) {
alert("Password must be at least 6 characters");
return false;
}
if (gender === "") {
alert("Please select a gender");
return false;
}
alert("Form submitted successfully!");
return true;
}
</script>
</head>
<body>
<h2>User Registration Form</h2>
<form name="myForm" onsubmit="return validateForm()">
Name: <input type="text" name="username"><br><br>
Age: <input type="text" name="age"><br><br>
Email: <input type="text" name="email"><br><br>
Password: <input type="password" name="password"><br><br>
Gender:
<select name="gender">
<option value="">Select</option>
<option value="Male">Male</option>
<option value="Female">Female</option>
<option value="Other">Other</option>
</select><br><br>
<input type="submit" value="Submit">
</form>
</body>
</html>`
      }
    ]
  },
  {
    n: "05",
    title: "Creating A Responsive Web Page Using CSS",
    aim: "To design a responsive web page that automatically adjusts text size and color based on the screen width using CSS media queries.",
    note: "",
    files: [
      {
        name: "program5.html",
        code: `<html>
<head>
<title> Responsive </title>
<style>
body {
font-family: Arial, sans-serif;
margin : 20px;
line-height : 1.6;
}
h1 {
font-size : 50px;
color : red;
}
p {
font-size : 20px;
}
@media (max-width:900px) and (orientation : portrait) {
 h1 {
 font-size : 30px;
 color : blue;
 }
 p {
 font-size : 18px;
 }
}
@media(max-width : 500px) {
 h1{
 font-size : 15px;
 color : green;
 }
 p {
 font-size : 16px;
 }
}
</style>
</head>
<body>
<h1> RESPONSIVE WEBPAGE </h1>
<p> This is a simple responsive text example. Resize the browser window and the text size and color changes automatically. </p>
</body>
</html>`
      }
    ]
  },
  {
    n: "06",
    title: "Event Handling Using JavaScript",
    aim: "To implement JavaScript event handling for interactive web pages.",
    note: "ondbclick in your record is a typo. It is now ondblclick, so the double-click message works.",
    files: [
      {
        name: "program6.html",
        code: `<html>
<head>
<title> Event Handling </title>
</head>
<body>
<h2> JavaScript Event Handling with multiple events </h2>
<button id="btn"> Click me </button>
<p id = "output"> </p>
<input type = "text" id = "textbox" placeholder = "Type Something..."/>
<script>
const btn = document.getElementById("btn");
const output = document.getElementById("output");
const textbox = document.getElementById("textbox");
btn.onclick = function() {
output.textContent="Button Clicked";
};
btn.ondblclick = function() {
output.textContent = "Button double-clicked!";
};
btn.onmouseover = function() {
output.textContent = "Mouse is over the button!";
};
btn.onmouseout = function() {
output.textContent = "Mouse moved away!";
};
textbox.onkeydown = function(event) {
output.textContent = "Key pressed :"+ event.key;
};
textbox.onkeyup = function(event) {
output.textContent = "You released :"+event.key;
};
</script>
</body>
</html>`
      }
    ]
  }
];
