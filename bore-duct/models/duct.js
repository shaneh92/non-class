/*
==============================================================================
; Title: duct.js
; Author: Shane Hingtgen
; Bellevue University
; Date: 05/17/2023
; Description: cable & duct schema for cable-duct API
; Work Cited: 

=================================================================================================================
*/
const mongoose = require("mongoose"); //variable assigned to our mongoose require statement
const Schema = mongoose.Schema; //schema variable and assigned to the mongoose schema object

let ductSchema = new Schema({
  ductSize: { type: String },
});

module.exports = mongoose.model("Duct", ductSchema);
