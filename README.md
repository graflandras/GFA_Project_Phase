# Tribes

## Description

A strategy game based on the logic of Travian
- https://en.wikipedia.org/wiki/Travian
- http://travian.com/


The main goals are to:
- create a working application where several developers collaborate in Scrum metodology
- clearly separate Node.JS backend and REACT webapp functionality
- implement proper APIs
- write proper game logic


## Main features

- registration and authentication
- player overview screen (= town page)
- tribe screen
- time based buildings & troops generation and upgrade
- resources
- search & attack on other players
- Leaderboard

## Technology

- Node.JS backend
	- Express
	- MongoDB
  - Mongoose
	- HTTP request handling with REST APIs
	- Endpoint testing
- REACT Webapp
	- HTTP request initiating to REST APIs
  - Reusable components
  - Redux
  - Router
  - Saga middleware
  - Component testing
- Common
	- multi-environments
	- deployment with CircleCI
	- unit testing

## Further specification
- [Api spec](specification/api-spec.md)
- [Models](specification/models.md)
- [Rules](specification/rules.md)
