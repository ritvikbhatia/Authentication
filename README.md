# Authentication
<br>
<br>
# How to run the project:
<br>
Download as zip and extract at your system Open folder in VS code Open terminal and make the project folder as your current directory 
<br>
Input following command: npm install To start the server,
<br>
use command: npm start Go to https://localhost/8000 on your browser to use the application

# Folder Structure
<br>
/models
<br>
contains all your ORM models (called Schemas in mongoose)<br>
/views
<br>
contains your view-templates (using ejs in express)<br>
/assets 
<br>contains all static content (images, style-sheets, client-side JavaScript)<br>
/assets/images 
<br>contains image files<br>
/css 
<br>contains style sheets (or compiled output by a css engine scss in this case)<br>
/js
<br>contains client side JavaScript<br>
/controllers
<br>contain all your express routes, separated by module/area of your application (note: when using the bootstrapping functionality of express, this folder is called /routes)<br>
