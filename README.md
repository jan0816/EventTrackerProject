#### Event Tracker Project: Week 12 Homework for Skill Distillery

---
### Overview
> This project's purpose is to allow users to track their daily gratitudes. A user has to input three gratitudes for the day and will eventually be able to track their entries by filtering through dates on a calendar and/or by keyword.



---
### **Table of REST endpoints**
**HTTP Verb**| **URI**| **Request Body**|**Response Body**|**Purpose**|
--------|--------|--------|--------|--------|
**GET** | /api/gratitudes|       |Collection of all *gratitude entries* | **List** or **Collection** endpoint
**GET** | /api/gratitudes/{gratId}| | Representation of entry at id number-- {gratId}| **Retrieve** endpoint
**POST** | /api/gratitudes| Representation of new *gratitude* entry| Description of the result of the operation| **Create** endpoint
**PUT** | api/gratitudes/{gratId}| Representation of a *new version* of entry at id number--{gratId}| | **Replace** endpoint
**PATCH** | api/gratitudes/{gratId}| Description of changes to make to entry at id number--{gratId}| | **Update** endpoint
**DELETE** | api/gratitudes/{gratId}| | | **Delete** route


### How to Use



---
### Technologies Used
- Gradle
- MySQL
- JPA
- JSON
- Java
- Spring Boot
- Spring REST
- RESTful API
- Postman
---
### Lessons Learned

- How to perform basic CRUD operations utilizing a RESTful API rather than JSPs.
- How to check functioning routes (URIs) using Postman
- Using HttpServlet response and request to notify clients of status code
