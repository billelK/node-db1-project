const db = require("../../data/db-config")

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if(req.body.name === undefined || req.body.budget === undefined) {
    res.status(400).json({message: "name and budget are required"})
  } else if (!(req.body.name.trim().length >= 3) || !(req.body.name.trim().length <= 100)) {
    res.status(400).json({message: "name of account must be between 3 and 100"})
  } else if (typeof req.body.budget !== "number" || isNaN(req.body.budget) ) {
    res.status(400).json({message: "budget of account must be a number"})
  } else if (!(req.body.budget >= 0) || !(req.body.budget <= 1000000)) {
    res.status(400).json({message: "budget of account is too large or too small"})
  } else {
    req.trimed = {
      name: req.body.name.trim(),
      budget: req.body.budget
    }
    next()
  }

  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
}

exports.checkAccountNameUnique =async (req, res, next) => {
  // DO YOUR MAGIC
  const accounts = await db('accounts').where("name", req.body.name.trim())
  if (accounts.length > 0) {
    res.status(400).json({message: "that name is taken"})
  } else {
    next()
  }
}

exports.checkAccountId =async (req, res, next) => {
  // DO YOUR MAGIC
  const accountID = await db('accounts').where('id', req.params.id)
  if(accountID.length > 0) {
    next()
  } else {
    res.status(404).json({message: "account not found"})
  } 
}
