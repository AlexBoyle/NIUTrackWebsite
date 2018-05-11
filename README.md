# NIUTrackWebsite
## Configs
There is not yet a dedicated config file for this project  
  
Port:
- The `main.js` file specifies this server to run on port 80 in the last line of the file, this can be changed.
- The docker-compose.yml file starts the project on port 84(personal development port). will change in the future
  
    
## Running this Project
Through Docker:  
 - Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)  
 - Run the command "docker-compose up --build -d" in the root directory to bring up the project 
   
 Through node:
 - Install [npm](https://www.npmjs.com/) and [Node.js](https://nodejs.org/en/download/)
 - Run "npm install" in the app/ directory to install dependencies
 - Run "nodejs main.js" in the same directory to bring up the server 
