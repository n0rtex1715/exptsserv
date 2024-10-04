import HttpStatusCodes from '@src/common/HttpStatusCodes';
import ExampleService from '@src/services/ExampleService';
import Example from '@src/models/Example';

import { IReq, IRes } from './common/types';
import check from './common/check';

// Get all examples
async function getAll(_: IReq, res: IRes) {
  const examples = await ExampleService.getAll();
  return res.status(HttpStatusCodes.OK).json({ examples });
}

// Add one example
async function add(req: IReq, res: IRes) {
  const example = check.isValid(req.body, 'example', Example.isExample);
  await ExampleService.addOne(example);
  return res.status(HttpStatusCodes.CREATED).end();
}

// Update one example
async function update(req: IReq, res: IRes) {
  const example = check.isValid(req.body, 'example', Example.isExample);
  await ExampleService.updateOne(example);
  return res.status(HttpStatusCodes.OK).end();
}

// Delete one example
async function delete_(req: IReq, res: IRes) {
  const id = check.isNum(req.params, 'id');
  await ExampleService.delete(id);
  return res.status(HttpStatusCodes.OK).end();
}

export default {
  getAll,
  add,
  update,
  delete: delete_,
} as const;
