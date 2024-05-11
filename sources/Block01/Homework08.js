/**
 * Generates a unique ID.
 * @returns {string}
 */
const genId = require("../utils/genHash");

/**
 * Class Book represents a book with properties such as title, author, ISBN, price, and availability.
 * It also includes methods to access and modify these properties.
 */
class Book {
  #id;
  #title;
  #author;
  #ISBN;
  #price;
  #availability;

  /**
   * Creates an instance of the Book class.
   * @param {string} idBook - ID of the book.
   * @param {string} title - Title of the book.
   * @param {string} author - Author of the book.
   * @param {string} ISBN - ISBN of the book.
   * @param {number} price - Price of the book.
   * @param {boolean} availability - Availability of the book.
   */

  constructor(title, author, ISBN, price, availability) {
    this.#id = genId();
    this.#title = title;
    this.#author = author;
    this.#ISBN = ISBN;
    this.#price = price;
    this.#availability = availability;
  }

  // Getters and setters to access and modify private properties.
  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get author() {
    return this.#author;
  }

  get ISBN() {
    return this.#ISBN;
  }

  get price() {
    return this.#price;
  }

  get availability() {
    return this.#availability;
  }

  // Setters to modify private properties.
  set id(idBook) {
    this.#id = idBook;
  }

  set title(title) {
    this.#title = title;
  }

  set author(author) {
    this.#author = author;
  }

  set ISBN(ISBN) {
    this.#ISBN = ISBN;
  }

  set price(price) {
    this.#price = price;
  }

  set availability(availability) {
    this.#availability = availability;
  }
}

class FictionBook extends Book {
  constructor(title, author, isbn, price, availability) {
    super(title, author, isbn, price, availability);
    this.tag = "fiction"; // Tag that identifies the book as non-fiction.
    this.genre = "fantasy"; // Genre of the non-fiction book.
  }
}

class NonFictionBook extends Book {
  constructor(title, author, isbn, price, availability) {
    super(title, author, isbn, price, availability);
    this.tag = "non-fiction"; // Tag that identifies the book as non-fiction.
    this.genre = "dystopia"; // Genre of the non-fiction book.
  }
}

class SalesOff extends Book {
  #price = 0;
  constructor(title, author, isbn, price, availability) {
    super(title, author, isbn, price, availability);
    this.#price = price;
    this.tag = "sales-off"; // Tag that identifies the book as on sale.
  }

  /**
   * Gets the discounted price of the book.
   * @returns {number} The discounted price of the book.
   */
  get price() {
    return this.#price * 0.9; // 10% discount on the original price.
  }
}

/**
 * Class User represents a user of the bookstore with properties like name, email, and ID.
 */
class User {
  #id;
  #name;
  #email;

  /**
   * Creates an instance of the User class.
   * @param {string} name - Name of the user.
   * @param {string} email - Email of the user.
   */
  constructor(name, email) {
    this.#id = genId(); // Generates a unique ID for the user.
    this.#name = name;
    this.#email = email;
  }

  // Getters and setters for accessing and modifying private properties.

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get email() {
    return this.#email;
  }

  set id(idUser) {
    this.#id = idUser;
  }

  set name(name) {
    this.#name = name;
  }

  set email(email) {
    this.#email = email;
  }
}

class Cart {
  #id;
  #idUser;
  #books;
  #total;

  /**
   * Creates an instance of the Cart class.
   * @param {string} idUser - ID of the user associated with the cart.
   */
  constructor(idUser) {
    this.#id = genId();
    this.#idUser = idUser;
    this.#books = [];
    this.#total = 0;
  }

  /**
   * Adds a book to the cart.
   * @param {Book} book - The book to be added to the cart.
   * @throws {Error} If the book is not available.
   */
  addBook(book) {
    if (!book.availability) throw new Error("Book is not available");
    this.#books.push(book);
    this.#total += book.price;
  }

  /**
   * Removes a book from the cart.
   * @param {Book} book - The book to be removed from the cart.
   */
  removeBook(book) {
    const indexBook = this.#books.findIndex((b) => b.id === book.id);
    if (indexBook === -1) return;
    this.#books = this.#books.filter((_b, i) => i !== indexBook);
    this.#total -= book.price;
  }

  /**
   * Calculates the total price of all books in the cart.
   * @returns {number} The total price of all books in the cart.
   */
  calcTotalPrice() {
    return this.#total;
  }

  // Getters and setters for accessing and modifying private properties.
  get id() {
    return this.#id;
  }

  get idUser() {
    return this.#idUser;
  }

  get books() {
    return this.#books;
  }

  get total() {
    return this.#total;
  }

  set id(idCart) {
    this.#id = idCart;
  }

  set idUser(idUser) {
    this.#idUser = idUser;
  }

  set books(books) {
    this.#books = books;
  }

  set total(total) {
    this.#total = total;
  }
}

class Order {
  #id;
  #user;
  #cart;

  /**
   * Creates an instance of the Order class.
   * @param {User} user - The user who placed the order.
   * @param {Cart} cart - The cart containing the ordered books.
   */
  constructor(user, cart) {
    this.#id = genId();
    this.#user = user;
    this.#cart = cart;
  }

  /**
   * Gets the books in the order.
   * @returns {Book[] | FictionBook[] | NonFictionBook[]} Array of books in the order.
   */
  orderBooks() {
    return this.#cart.books;
  }

  /**
   * Gets information about the books in the order.
   * @returns {Object[]} Information about the books in the order.
   */
  infoBooks() {
    return this.#cart.books.map((b) => {
      return {
        id: b.id,
        title: b.title,
        author: b.author,
        ISBN: b.ISBN,
        price: b.price,
        ...(b.tag && { tag: b.tag }),
        ...(b.genre && { tag: b.genre }),
      };
    });
  }

  /**
   * Calculates the total payment amount for the order.
   * @returns {number} The total payment amount for the order.
   */
  payment() {
    return this.#cart.calcTotalPrice();
  }

  /**
   * Gets the number of books in the order.
   * @returns {number} The number of books in the order.
   */
  numberBooks() {
    return this.#cart.books.length;
  }

  // Getters for accessing private properties.

  /**
   * Gets the cart associated with the order.
   * @returns {Cart} The cart associated with the order.
   */
  get cart() {
    return this.#cart;
  }

  /**
   * Gets the user who placed the order.
   * @returns {User} The user who placed the order.
   */
  get user() {
    return this.#user;
  }

  /**
   * Gets the ID of the order.
   * @returns {string} The ID of the order.
   */
  get id() {
    return this.#id;
  }
}

const createBook = (title, author, ISBN, price, availability) => {
  const book = new Book(title, author, ISBN, price, availability);
  return book;
};

const createUser = (name, email) => {
  const user = new User(name, email);
  return user;
};

// Create some objects and testing them in the console.
const book01 = createBook("title01", "author01", "ISBN01", 100, true);
const book02 = createBook("title02", "author02", "ISBN02", 200, true);
const book03 = createBook("title03", "author03", "ISBN03", 300, true);
const book04 = createBook("title04", "author04", "ISBN04", 400, false);
const book05 = new SalesOff("title04", "author04", "ISBN04", 200, true);
const book06 = new FictionBook("title06", "author06", "ISBN06", 100, true);
const user01 = createUser("name", "email");
const user02 = createUser("name2", "email2");

const cart01 = new Cart(user01.id);
const cart02 = new Cart(user01.id);

cart01.addBook(book01);
cart01.addBook(book02);
cart01.addBook(book03);
cart01.addBook(book06);

cart02.addBook(book02);
cart02.addBook(book03);
cart02.addBook(book03);
cart02.removeBook(book03);
cart02.addBook(book05);

try {
  cart02.addBook(book04);
} catch (error) {
  console.log(error.message);
}

const order01 = new Order(user01, cart01);
const order02 = new Order(user02, cart02);

console.log(order01.infoBooks());
console.log(order02.infoBooks());
console.log(order01.payment());
console.log(order02.payment());
