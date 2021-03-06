//~import modules
import errorAPI from './errorController.js';
import assert from 'assert';
import { List } from '../models/index.js';

//~controller
//~ ------------------------------------------------ ALL LISTS
async function fetchAllLists(req, res) {
  try {
    const lists = await List.findAll({
      attributes: {
        exclude: ['created_at', 'updated_at']
      },
      order: [['order', 'ASC']]
    });

    return res.json(lists);
  } catch (err) {
    errorAPI(err, req, res,500);
  }
}

//~ ------------------------------------------------ CREATE LIST
async function createList(req, res) {
  try {

    let { title, description, user_id } = req.body;

    //^conditions
    assert.ok(title, `Invalid body. Should provide at least a 'title' or 'order' property`);
    assert.ok(user_id, `User must be provided`);

    await List.create({
      ...req.body
    });

    return res.json(`The list [ ${req.body.title} ] is created !`);
  } catch (err) {
     errorAPI(err, req, res,500);
  }
}

//~ ------------------------------------------------ ONE LIST
async function fetchOneList(req, res) {
  try {
    const listId = Number(req.params.id);

    assert.ok(!isNaN(listId), `Please verify the provided id, it's not a number`);

    const list = await List.findByPk(listId, {
      attributes: ['title', 'description']
    });

    assert.ok(list, `This list doesn't exist !`);

    return res.json(list);
  } catch (err) {
     errorAPI(err, req, res,500);
  }
}

//~ ------------------------------------------------ UPDATE LIST
async function updateList(req, res) {
  try {
    let { title, description, order, user_id } = req.body;

    const listId = +req.params.id;

    const list = await List.findOne({
      where: {
        id: listId
      }
    });

    //^conditions
    assert.ok(list, `This list doesn't exist !`);
    assert.ok(!isNaN(order), `Invalid body parameter 'order'. Should provide a number`);
    assert.ok(user_id, `User must be provided`);

    await List.update(
      // [values, conditions]
      {
        ...req.body
      },
      {
        where: {
          ...req.params
        }
      }
    );

    return res.json(`Everything is up-to-date !`);
  } catch (err) {
     errorAPI(err, req, res, 500);
  }
}
//~ ------------------------------------------------ DELETE LIST
async function deleteList(req, res) {
  try {
    const listId = Number(req.params.id);

    assert.ok(!isNaN(listId), `Please verify the provided id, it's not a number`);

    const list = await List.findOne({ where: { id: listId } });

    //^conditions
    assert.ok(list, `This list doesn't exist !`);

    await List.destroy({ where: { ...req.params } });

    return res.json(`List deleted !`);
  } catch (err) {
     errorAPI(err, req, res,500);
  }
}

export { fetchAllLists, fetchOneList, createList, updateList, deleteList };
