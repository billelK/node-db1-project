const router = require('express').Router()
const model = require("./accounts-model")
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId} = require("./accounts-middleware")

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const accounts = await model.getAll()
    res.status(200).json(accounts)
  } catch(error) {
    next(error)
  }
  
})

router.get('/:id',checkAccountId,async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await model.getById(req.params.id)
    res.status(200).json(account)
  } catch(error) {
    next(error)
  }
})

router.post('/',checkAccountPayload,checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const addedAccount = await model.create(req.trimed)
    res.status(201).json(addedAccount)
  } catch(error) {
    next(error)
  }
})

router.put('/:id',checkAccountId,checkAccountPayload,checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const addedAccount = await model.updateById(req.params.id ,req.trimed)
    res.status(200).json(addedAccount)
  } catch(error) {
    next(error)
  }
});

router.delete('/:id',checkAccountId,async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const deletedAccount = await model.deleteById(req.params.id)
    res.status(200).json(deletedAccount)
  } catch(error) {
    next(error)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(500).json({
    status: err.status,
    message: err.message})
})

module.exports = router;
