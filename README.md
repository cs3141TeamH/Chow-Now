# Chow-Now
A Web Application created in React that works as a meal planner

The application will consist of
1. A Landing page
2. A Recipe and Lookup page
3. Various filters to remove ingrediants or recipes that the user "doesn't want"
4. ways to add and remove recipes and ingredients from the list

this repository will contain all commits to the React application in particular and not the database currently

Run on Lab Computer
1. Confirm you have git installed.  To test, open a terminal and type git. If it says a bunch of stuff you are good otherwise it will say git not known or something like that.

2. Download the repository by running <i>git clone "https://github.com/cs3141TeamH/Chow-Now"</i> where you would like to top level folder to be

2. Confirm you have npm installed.  To test, open a terminal and type npm. If it says a bunch of stuff you are good
otherwise it will say git not known or something like that.
  2a) if you do not have npm installed do the following
     0. Download and extract npm
     1. In a terminal window type <i>gedit ~/.profile</i>.
     2. In the opened window append <i>export PATH=$PATH:/home/campusxx/yourusername/.../bin</i>.  This URL is the where you extracted the bin file from the npm download. Save and close
     3. In a terminal window type <i>gedit ~/.cshrc</i>.
     4. In the opened window append <i>setenv PATH "${PATH}:/classes/cs1121/bin/home/campusxx/yourusername/gradle/gradle-4.10.2/bin"</i>.  This URL is the where you extracted the bin file from the npm download. Save and close
     4. In a terminal window type <i>gedit ~/.bashrc</i>.
     5. In the opened window append <i>export PATH=$PATH:/home/campusxx/yourusername/.../bin</i>.  This URL is the where you extracted the bin file from the npm download. Save and close
     6. Close and open the terminal.  Type in npm, if you get text you are good, if you don't, cry.
 
3. Navigate to the github repository directory and run npm install.

4. After run <i>npm run dev</i>.  This command should open a new window running the app.  If it does not, open a browser and type <i>localhost:3000</i> in the url bar.

5. If you run <i>npm run dev</i> and you get an error.  Delete the node_modules folder in your github repository directory, and re-run <i>npm install</i>.  This function just re-created the node_modules folder.  After you should be able to run <i>npm run dev</i> again
