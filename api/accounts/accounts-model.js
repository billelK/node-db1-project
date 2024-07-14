const db = require("../../data/db-config")

const getAll = async () => {
  // DO YOUR MAGIC
  const result = await db('accounts')
  return result
}

const getById = async id => {
  // DO YOUR MAGIC
  const [result] = await db('accounts').where("id", id)
  return result
}

const create = async account => {
  // DO YOUR MAGIC
  const idCreated = await db('accounts').insert(account)
   const result = getById(idCreated)
  return result
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db("accounts").update(account).where("id", id)
  const result = await getById(id) 
  return result
}

const deleteById = async id => {
  // DO YOUR MAGIC
  const accountToDelete = await getById(id)
  await db("accounts").where("id",id).del()
  return accountToDelete
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
