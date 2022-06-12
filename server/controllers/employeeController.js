const client = require('../connection')

class EmployeeController {
  async getAll(req, res) {
    const selectQuery = `select u.id_user,
                                concat(u.name, ' ', u.lastname, ' ', u.patronymic) as name,
                                p.name                                             as position,
                                p.wage
                         from users u
                                  join employees e on u.id_user = e.id_user
                                  join positions p on p.id_position = e.id_position`;
    try{
      const workers = (await client.query(selectQuery)).rows;
      return res.json(workers)
    } catch (e) {
      console.log(e)
      return res.json({error: e.message});
    }
  }
}

module.exports = new EmployeeController()