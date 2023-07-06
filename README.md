# TalentGrowth-BackendDevTypeA_API
This repository contains a basic API designed for TalentGrowth's Backend Developer Technical Test for applying Backend's opportunities.

## Study Case
Create a CRUD API of a contact list. Please provide firstName, lastName, numberPhone, and address on the attribute.

## CRUD API Descryption
This NodeJS-based CRUD API for managing contact lists is developed using the express.js framework. It offers various methods, including POST, GET, UPDATE, and DELETE, to interact with the contact data.

### Pre-requisite
- NodeJS

### How to Use
1. Open GIT Bash and clone this repository into local machine
```bash
git clone https://github.com/NdnHnnt/TalentGrowth-BackendDevTypeA_API.git
```
2. Change the working directory into the cloned repository
```bash
cd TalentGrowth-BackendDevTypeA_API
```
3. Install the needed library using following command,
```bash
npm install
```
4. Start the API using following command,
```bash
npm start
```
5. Open the postman collection in [here](https://elements.getpostman.com/redirect?entityId=18863395-ccd2dfaf-8a81-458c-aaa7-59d709787bc9&entityType=collection), preferably using Postman Desktop Agent

### Endpoints
|         **Endpoint**         | **HTTP Method** |                                                                                                     **Description**                                                                                                    |                                                                           **Request Body Example in JSON (if any)**                                                                          |
|:----------------------------:|:---------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| `/contact`                   |       GET       | Retrieve every contact informations                                                                                                                                                                                    |                                                                                             None                                                                                             |
| `/contact/:param`            |       GET       | Retrieve every contact informations matching the parameter (can be number, firstName, or lastName)                                                                                                                     |                                                                                             None                                                                                             |
| `/contact/`                  |       POST      | Post a new contact information                                                                                                                                                                                         | {   "firstName": "Anne",   "lastName": "Who",   "numberPhone" : "12356791011",   "address": "Tugu Pahlawan Surabaya" }                                                                       |
| `/contact/:phoneNumberParam` |       PUT       | Update the contact information based  on the provided phoneNumberParam. If there are no changes to other information, the request body can be modified to only include the updated item such as only firstName or etc. | {   "firstName": "Jonnathan",   "lastName": "Mike",   "numberPhone": "12356708060",   "address": "Tambak Sawah no. 7" }  or  {   "lastName": "Alen",   "address": "Tugu Pahlawan Surabaya" } |
| `/contact/:phoneNumberParam` |      DELETE     | DELETE the contact information based on the provided phoneParam.                                                                                                                                                       |                                                                                             None                                                                                             |


