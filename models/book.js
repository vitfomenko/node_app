const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

class Book {
    constructor(title, price, img) {
        this.title = title,
        this.price = price,
        this.img = img,
        this.id = uuid.v4()
    }

    toJSON() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    static async update(book) {
        const books = await Book.getAll();

        const idx = books.findIndex(b => b.id === book.id);

        books[idx] = book;

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'books.json'), 
            JSON.stringify(books),
            (err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async save() {
        const books = await Book.getAll();
        books.push(this.toJSON());

        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'books.json'), 
            JSON.stringify(books),
            (err) => {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'books.json'), 
                'utf-8', 
                (err, content) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content));
                    };
    
    
                });
        });
    }

    static async getById(id) {
        const books = await Book.getAll();
        return books.find(b => b.id === id);
    }
}

module.exports = Book;