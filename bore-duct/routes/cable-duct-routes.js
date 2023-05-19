/*
==============================================================================
; Title: bore-duct-routes.js
; Author: Shane Hingtgen
; Bellevue University
; Date: 05/17/2023
; Description: cable and duct schemas for our API
; Work Cited: 

=================================================================================================================
*/
const express = require("express");
const router = express.Router();
const Duct = require("../models/duct.js");
const Cable = require("../models/cable.js");

/**
 * createDuct
 * @openapi
 * /api/duct:
 *   post:
 *     tags:
 *       - Duct API
 *     description: API for creating a new duct document.
 *     summary: creates a new duct document.
 *     requestBody:
 *       description: creation of duct.
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - ductSize
 *             properties:
 *               ductSize:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Created a new duct size
 *       '400':
 *         description: Duct Already Exists
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/duct", async (req, res) => {
  try {
    const existingDuct = await Duct.findOne({ ductSize: req.body.ductSize });
    if (existingDuct) {
      console.log(`Duct already exists`);
      res.status(400).send({
        message: `Duct Already Exists`,
      });
    } else {
      const newDuct = {
        ductSize: req.body.ductSize,
      };
      Duct.create(newDuct, function (err, duct) {
        if (err) {
          console.log(`MongoDB Exception: ${err}`);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(`New duct created: ${duct}`);
          res.status(200).json(duct);
        }
      });
    }
  } catch (err) {
    console.log(`Server Exception: ${err}`);
    res.status(500).send({
      message: `Server Exception: ${err}`,
    });
  }
});

/**
 * findAllDuct
 * @openapi
 * /api/duct:
 *  get:
 *     tags:
 *       - Duct API
 *     description: API for returning all ducts from MongoDB.
 *     summary: returns an array ducts.
 *     responses:
 *       '200':
 *         description: Array of duct documents
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get("/duct", async (req, res) => {
  try {
    Duct.find({}, function (err, duct) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(duct);
        res.json(duct);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/**
 * deleteDuct
 * @openapi
 * /api/duct/{id}:
 *   delete:
 *     tags:
 *       - Duct API
 *     name: deleteDuct
 *     description: API for deleting a duct
 *     summary: deletes a duct
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: duct document size
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Duct document
 *       '401':
 *         description: Invalid Duct
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.delete("/duct/:id", async (req, res) => {
  try {
    Duct.findByIdAndDelete({ _id: req.params.id }, function (err, duct) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(duct);
        res.status(200).send({
          message: duct,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/**
 * createCable
 * @openapi
 * /api/cable:
 *   post:
 *     tags:
 *       - Cable API
 *     description: API for creating a new cable document.
 *     summary: creates a new cable document.
 *     requestBody:
 *       description: creation of cable.
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - cableSize
 *             properties:
 *               cableSize:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Created a new cable size
 *       '400':
 *         description: Cable Already Exists
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/cable", async (req, res) => {
  try {
    const existingCable = await Cable.findOne({
      cableSize: req.body.cableSize,
    });
    if (existingCable) {
      console.log(`Cable already exists`);
      res.status(400).send({
        message: `Cable Already Exists`,
      });
    } else {
      const newCable = {
        cableSize: req.body.cableSize,
      };
      Cable.create(newCable, function (err, cable) {
        if (err) {
          console.log(`MongoDB Exception: ${err}`);
          res.status(501).send({
            message: `MongoDB Exception: ${err}`,
          });
        } else {
          console.log(`New cable created: ${cable}`);
          res.status(200).json(cable);
        }
      });
    }
  } catch (err) {
    console.log(`Server Exception: ${err}`);
    res.status(500).send({
      message: `Server Exception: ${err}`,
    });
  }
});

/**
 * findAllCable
 * @openapi
 * /api/cable:
 *  get:
 *     tags:
 *       - Cable API
 *     description: API for returning all cables from MongoDB.
 *     summary: returns an array cable.
 *     responses:
 *       '200':
 *         description: Array of cable documents
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get("/cable", async (req, res) => {
  try {
    Cable.find({}, function (err, cable) {
      if (err) {
        console.log(err);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(cable);
        res.json(cable);
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

/**
 * deleteCable
 * @openapi
 * /api/cable/{id}:
 *   delete:
 *     tags:
 *       - Cable API
 *     name: deleteCable
 *     description: API for deleting a cable
 *     summary: deletes a cable
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: cable document size
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Cable document
 *       '401':
 *         description: Invalid Cable
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.delete("/cable/:id", async (req, res) => {
  try {
    Cable.findByIdAndDelete({ _id: req.params.id }, function (err, cable) {
      if (err) {
        console.log(err);
        res.status(500).send({
          message: `MongoDB Exception: ${err}`,
        });
      } else {
        console.log(cable);
        res.status(200).send({
          message: cable,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Exception: ${e.message}`,
    });
  }
});

// exporting router to make this work, otherwise app will crash
module.exports = router;
