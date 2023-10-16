import { connection } from '../src/db/connection.js';

const { schema } = connection;

await schema.dropTableIfExists('user');
await schema.dropTableIfExists('job');
await schema.dropTableIfExists('company');

await schema.createTable('company', (table) => {
  table.text('id').notNullable().primary();
  table.text('name').notNullable();
  table.text('description');
});

await schema.createTable('job', (table) => {
  table.text('id').notNullable().primary();
  table.text('companyId').notNullable()
    .references('id').inTable('company');
  table.text('title').notNullable();
  table.text('description');
  table.text('createdAt').notNullable();
});

await schema.createTable('user', (table) => {
  table.text('id').notNullable().primary();
  table.text('companyId').notNullable()
    .references('id').inTable('company');
  table.text('email').notNullable().unique();
  table.text('password').notNullable();
});

await connection.table('company').insert([
  {
    id: 'FjcJCHJALA4i',
    name: "Kiki's Delivery Service",
    description: 'A local small business delivering your goods by broomstick',
  },
  {
    id: 'Gu7QW9LcnF5d',
    name: 'Le Blank',
    description: 'We are a small aesthetic cafe serving aromatic curry and locally-grown coffee.',
  },
]);

await connection.table('job').insert([
  {
    id: 'ALLNJMXFax6n',
    companyId: 'FjcJCHJALA4i',
    title: 'Bonus Job',
    description: 'Secret job for a secret witch (to test pagination). Shh!',
    createdAt: '2023-09-23T11:00:00.000Z',
  },
  {
    id: '6mA0SADxvS1R',
    companyId: 'Gu7QW9LcnF5d',
    title: 'Customer Service Manager',
    description: 'We are looking for a capable manager with excellent social competence.',
    createdAt: '2023-09-24T11:00:00.000Z',
  },
  {
    id: '6mA05AOKIS1R',
    companyId: 'Gu7QW9LcnF5d',
    title: 'IT consultant',
    description: 'We are looking for a part-time worker student IT consultant.',
    createdAt: '2023-09-25T11:00:00.000Z',
  },
  {
    id: 'f3YzmnBZpK0o',
    companyId: 'FjcJCHJALA4i',
    title: 'Delivery Specialist',
    description: 'We are looking for a delivery professional with extensive exprerience and a broom-flying lisence.',
    createdAt: '2023-09-26T11:00:00.000Z',
  },
  {
    id: 'XYZNJMXFax6n',
    companyId: 'FjcJCHJALA4i',
    title: 'Black Cat',
    description: 'We are looking for an experienced black cat with exceptional communication skills.',
    createdAt: '2023-09-27T11:00:00.000Z',
  },
  {
    id: '6mA05AZxvS1R',
    companyId: 'Gu7QW9LcnF5d',
    title: 'Cafe Assistant',
    description: 'We are looking for a quick-witted and capable part-time staff cafe assitant.',
    createdAt: '2023-10-10T11:00:00.000Z',
  },
]);

await connection.table('user').insert([
  {
    id: 'AcMJpL7b413Z',
    companyId: 'FjcJCHJALA4i',
    email: 'kiki@delivery.io',
    password: 'kiki123',
  },
  {
    id: 'BvBNW636Z89L',
    companyId: 'Gu7QW9LcnF5d',
    email: 'boss@leblank.co',
    password: 'boss123',
  },
]);

process.exit();
