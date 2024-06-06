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

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    return JSON.parse(file)
}

const saveContact = (name, email, noHp) => {
    const contact = {name, email, noHp}
    // const file = fs.readFileSync('data/contacts.json', 'utf-8')
    // const contacts = JSON.parse(file)
    const contacts = loadContact()

    // check name
    if (!name) {
        console.log(`Nama tidak boleh kosong.`)
        return
    }

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

// list contacts
const listContacts = () => {
    const contacts = loadContact()
    console.log(`Daftar Kontak:`)
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. Nama: ${contact.name} - ${contact.noHp}`)
    })
}

// detail contact
const detailContact = (name) => {
    const contacts = loadContact()
    const contact = contacts.find(c => c.name.toLowerCase() === name.toLowerCase())
    if (!contact) {
        console.log(`Kontak ${name} tidak ditemukan.`)
        return
    }
    console.log(`Nama: ${contact.name}`)
    console.log(`No.HP: ${contact.noHp}`)
    if (contact.email) {
        console.log(`Email: ${contact.email}`)
    }
}

// remove contact
const removeContact = (name) => {
    const contacts = loadContact()
    const newContacts = contacts.filter(c => c.name.toLowerCase() != name.toLowerCase())

    if (contacts.length === newContacts.length) {
        console.log(`Kontak ${name} tidak ditemukan.`)
        return
    }

    fs.writeFileSync(('data/contacts.json'), JSON.stringify(newContacts))
    console.log(`Kontak ${name} berhasil dihapus.`)
}

module.exports = {
    saveContact,
    listContacts,
    detailContact,
    removeContact
}