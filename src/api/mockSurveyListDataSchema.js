var surveyDetailSchema = {
    "$id": "https://example.com/arrays.schema.json",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "description": "A representation of a person, company, organization, or place",
    "type": "object",
    "properties": {
      "energyBills": {
        "type": "array",
        "items": { "$ref": "#/definitions/Survey" }
      }
    },
    "definitions": {
      "Survey": {
        "type": "object",
        "required": [ "treeId", "species","experiment","site","by","location","plantDate","inspectionDate","treatment",
        "healthScore","pathogenFound","woodBorerFound","notes" ],
        "properties": {
          "treeId": {
            "type": "string",
            "description": "Unique identifier of each Tree."
          },
          "species": {
            "type": "string",
            "description": "Type of Tree"
          },
          "experiment": {
            "type": "string",
            "description": "Details of Experiment"
          },
          "site": {
            "type": "string",
            "description": "Location of experiment"
          },
          "by": {
            "type": "string",
            "description": "Name of surveyor who conducted the Survey"
          },
          "location": {
            "type": "string",
            "description": "Location of survey"
          },
          "plantDate": {
            "type": "string",
            "format": "date",
            "description": "Date when Tree was planted"
          },
          "inspectionDate": {
            "type": "string",
            "format": "date",
            "description": "Date when Tree was inspected"
          },
          "treatment": {
            "type": "string",
            "description": "Nature of treatment"
          },
          "healthScore": {
            "type": "string",
            "description": "Rating indicating health of Tree"
          },
          "pathogenFound": {
            "type": "string",
            "description": "Indicator of pathogen infection"
          },
          "woodBorerFound": {
            "type": "string",
            "description": "Indicator of wood borer infection"
          },
          "notes": {
            "type": "string",
            "description": "Comments about survey and tree"
          }
        }
      }
    }
  };

  module.exports = surveyDetailSchema;
