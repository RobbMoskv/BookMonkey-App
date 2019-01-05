import { Book } from './book';

export class BookFactory {

    // Method: Returns an empty Book object
    static empty(): Book {
        return new Book('', '', [''], new Date(), '', 0, [{ url: '', title: '' }], '');
    }

    // Method: Creates Book object based on plain JS object
    static fromObject(rawBook: any): Book {
        return new Book(
            rawBook.isbn,
            rawBook.title,
            rawBook.authors,
            // Create date object in case date was delivered as string
            typeof (rawBook.published) === 'string' ? new Date(rawBook.published) : rawBook.published,
            rawBook.subtitle,
            rawBook.rating,
            rawBook.thumbnails,
            rawBook.description
        );
    }
}
