
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
    new ErrorMessage('isbn', 'minlength', 'Die ISBN muss mindestens 10 Zeichen enthalten.'),
    new ErrorMessage('isbn', 'maxlength', 'Eine ISBN darf höchstens 13 Zeichen haben.'),
    new ErrorMessage('published', 'required', 'Es muss ein Erscheinungsdatum angegeben werden.'),
    new ErrorMessage('author', 'required', 'Es muss zwingend ein Autor angegeben werden.'),
];
