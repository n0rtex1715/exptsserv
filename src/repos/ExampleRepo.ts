import { ExampleType } from '@src/models/Example';
import { getRandomInt } from '@src/util/misc';
import orm from './MockOrm';

// Get one example
async function getOne(id: number): Promise<ExampleType | null> {
  const db = await orm.openDb();

  for (const example of db.examples) {
    if (example.id === id) {
      return example;
    }
  }

  return null;
}

// Check if example with given id exists
async function persists(id: number): Promise<boolean> {
  const db = await orm.openDb();

  for (const example of db.examples) {
    if (example.id === id) {
      return true;
    }
  }

  return false;
}

// Get all examples
async function getAll(): Promise<ExampleType[]> {
  const db = await orm.openDb();

  return db.examples;
}

// Add one example
async function add(example: ExampleType): Promise<void> {
  const db = await orm.openDb();

  example.id = getRandomInt();

  db.examples.push(example);

  return orm.saveDb(db);
}

// Update an example
async function update(example: ExampleType): Promise<void> {
  const db = await orm.openDb();

  for (let i = 0; i < db.examples.length; i++) {
    if (db.examples[i].id === example.id) {

      const dbExamples = db.examples[i];

      db.examples[i] = {
        ...dbExamples,
        name: example.name
      };
      return orm.saveDb(db);
    }
  }
}

// Delete one example
async function delete_(id: number): Promise<void> {
  const db = await orm.openDb();

  for (let i = 0; i < db.examples.length; i++) {
    if (db.examples[i].id === id) {
      db.examples.splice(i, 1);
      return orm.saveDb(db);
    }
  }
}

export default {
  getOne,
  persists,
  getAll,
  add,
  update,
  delete: delete_,
} as const;
