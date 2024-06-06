// Core Module
// File System
const fs = require('fs')
const validator = require('validator')

// create directory if not exists
const dirPath = './data'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
}

// create file contacts.json if not exists
const dataPath = './data/contacts.json'
if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify([]), 'utf-8')
}

const saveContact = (name, email, noHp) => {
    const contact = {name, email, noHp}
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)

    // check duplicates
    const isDuplicate = contacts.find(c => c.name === name)
    if (isDuplicate) {
        console.log(`Nama ${name} sudah terdaftar.`)
        return
    }

    // check format email
    if (email) {
        if (!validator.isEmail(email)) {
            console.log(`Email ${email} tidak valid.`)
            return
        }
    }

    // check format mobile phone
    if (!validator.isMobilePhone(noHp, 'id-ID')) {
        console.log(`Nomor HP ${noHp} tidak valid.`)
        return
    }


    contacts.push(contact)
    fs.writeFileSync(('data/contacts.json'), JSON.stringify(contacts))

    console.log(`Terima kasih sudah memasukkan data.`)

}

module.exports = {
    saveContact,
}