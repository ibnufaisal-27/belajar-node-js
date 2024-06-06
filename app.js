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
            demandOption: true,
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