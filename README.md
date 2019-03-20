[![CircleCI](https://circleci.com/gh/Rodgers-M/sms-management-api.svg?style=svg)](https://circleci.com/gh/Rodgers-M/sms-management-api)
# sms-management-api
This is an API that enables users to send and receive text messages. It is a Nodejs API built using the express framework and Postgres as the data store.

**Installing locally**
* clone the repo
* checkout to develop branch 
* install postgres and create database  both for development and testing
* Use `yarn install` to install to install dependencies
* Run database migrations `yarn db:migrate`
* start the application with `yarn start` or `yarn start:dev`
* Use `yarn test` to run the tests

**API features**
* creating contants
* sending and recieving sms

**Endpoints exposed by the API**


Endpoint                    |  Functionality
 ------------------------   |   ------------------------ 
GET /contants               | get all contants
GET /contants/:id           | get contant with the given id
POST /contants              | create contant
DELETE /contants/:id        | delete contant with the given id
GET /sms                    | get all sms 
GET /sms/:id                | get sms with the given id
POST /sms                   | send an sms
DELETE /sms/:id             | delete sms with the given id


**Endpoint payload**

* POST /contants
```
{
  "name": "name",
  "phone": "phone number"
}
```

* POST /sms

```
{
  "message": "message to send",
  "sender": "the phone number of the sender",
  "receiver": "the phone number of message reciepient"
}
```
**Note Both the sender and receiver contants have to be existing for successful
message sending**

