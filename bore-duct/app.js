/*
==============================================================================
; Title: app.js bore-duct
; Author: Shane Hingtgen
; Bellevue University
; Date: 05/17/2023
; Description: This file sets up the backend for a bore-duct sheet
; Work Cited: 

=================================================================================================================
*/
"use-strict";
//imports with require statements
const express = require("express");
const http = require("http");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const mongoose = require("mongoose");
const ductAPI = require("./routes/cable-duct-routes.js");

//app variable assigned to express
const app = express();

app.set("port", process.env.PORT || 3000);

// MongoDB Atlas connection String
const conn =
  "mongodb+srv://web335_user:s3cret@bellevueuniversity.ut5xprd.mongodb.net/non-class";
mongoose
  .connect(conn, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Connection to non-class on MongoDB Atlas successful`);
  })
  .catch((err) => {
    console.log(`MongoDB Error: ${err.message}`);
  });

// setting app to use express.json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// object literal
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "bore duct RESTful APIs",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"], //files containing annotations for the OpenAPI Specification
};

// assigning a variable to call swaggerJsdoc
const openapiSpecification = swaggerJsdoc(options);

// wire openapiSpecification to app variable
app.use(
  "/api-bore-duct",
  swaggerUi.serve,
  swaggerUi.setup(openapiSpecification)
);
app.use("/api", ductAPI);

//creating our http server on the port number
http.createServer(app).listen(app.get("port"), function () {
  console.log(`Application started and listening on port ${app.get("port")}`);
});
