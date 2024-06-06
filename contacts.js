// Core Module
// File System
const fs = require('fs')

const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

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

const tulisPertanyaan = (pertanyaan) => {
    return new Promise((resolve, reject) => {
        rl.question(pertanyaan, (nama) => {
            resolve(nama)
        })
    })
}

const simpanContact = (nama, email, noHp) => {
    const contact = {nama, email, noHp}
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)
    contacts.push(contact)

    fs.writeFileSync(('data/contacts.json'), JSON.stringify(contacts))

    console.log(`Terima kasih sudah memasukkan data.`)

    rl.close()
}

module.exports = {
    tulisPertanyaan,
    simpanContact,
}