
// Groups an input field together with a validator and the responsible error message.
export class ErrorMessage {
    constructor(
        public forControl: string,
        public forValidator: string,
        public text: string
    ) { }
}

// Export an array with error messages for each mandatory field.
export const BookFormErrorMessages = [
    new ErrorMessage('title', 'required', 'Ein Buchtitel muss angegeben werden.'),
    new ErrorMessage('isbn', 'required', 'Es muss eine ISBN angegeben werden.'),
    new ErrorMessage('isbn', 'isbnFormat', 'Eine ISBN muss aus exakt 10 oder 13 Zeichen bestehen.'),
    new ErrorMessage('isbn', 'isbnExists', 'Die angegebene ISBN existiert bereits.'),
    new ErrorMessage('published', 'required', 'Es muss ein Erscheinungsdatum angegeben werden.'),
    new ErrorMessage('authors', 'atLeastOneAuthor', 'Es muss zwingend mindestens ein Autor angegeben werden.'),
];
