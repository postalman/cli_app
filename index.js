import * as contact from "./contacts.js";
import { Command } from 'commander';

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contact.listContacts();
      return console.log(allContacts);

    case "get":
      const contactId = await contact.getContactById(id);
      return console.log(contactId);

    case "add":
      const add = await contact.addContact({ name, email, phone });
      return console.log(add);

    case "remove":
      const remove = await contact.removeContact(id);
      return console.log(remove);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
