## MongoBoard
It's basic Kanban board using mongodb as database.  
**Technologies:**
- Backend: Spring 4.0.1
- Frontend: Next.js + TypeScript
- Storage: MongoDB
- Environment: Docker

**Requirements:**
- Docker  
  
**How to Set Up:**  
1. Download repo  
2. Open MongoBoard folder  
3. Type command `docker-compose up -d`  
  
## **Architecture:**  
  
**Frontend:**
Frontend is divided into 3 main parts: components, hooks and api  

API: contains calls to backend and general structure of responses

Components: contains structure of components and defines how they should be displayed  

Hooks: uses context and api to make calls to backend  

**Backend:**

Backend contains 5 main parts: controller, entity, dto, service and repository  

Controller: Handles the calls to api, defines structure of request and reponse and addresses  

DTO: Contains structures of objects and mappers that are used in application logic  

Entity: Defines how objects will be saved in MongoDB  

Repository: Handles saving and reading data from MongoDB  
   
## Usage
On first run of docker-compose the test data should be automatically added from file init-db.js
To use app open browser and go to address http://localhost:3000
