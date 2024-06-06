// get arguments from the command line
const contacts = require('./contacts')
const yargs = require("yargs")


yargs.command({
    command: "add",
    describe: "Add a new contact",
    builder: {
        name: {
            describe: "Name of the contact",
            demandOption: true,
            type: "string",
        },
        email: {
            describe: "Email of the contact",
            demandOption: false,
            type: "string",
        },
        noHp: {
            describe: "No.HP of the contact",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        contacts.saveContact(argv.name, argv.email,argv.noHp)
    },
}).demandCommand()

// list contacts
yargs.command({
    command: "list",
    describe: "List all contacts",
    handler() {
        contacts.listContacts()
    },
})

// detail contacts
yargs.command({
    command: "detail",
    describe: "Detail contacts",
    builder: {
        name: {
            describe: "Name of the contact",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        contacts.detailContact(argv.name);
    },
})

// remove contact
yargs.command({
    command: "remove",
    describe: "Remove a contact",
    builder: {
        name: {
            describe: "Name of the contact",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        contacts.removeContact(argv.name);
    },
})

yargs.parse()


// const {writeQuestion, saveContact} = require('./contacts');
//
// const main = async () => {
//     const name = await writeQuestion('Masukan nama anda: ')
//     const email = await writeQuestion('Masukan email anda: ')
//     const noHp = await writeQuestion('Masukan no.HP anda: ')
//
//     saveContact(name, email, noHp)
// }
//
// main()