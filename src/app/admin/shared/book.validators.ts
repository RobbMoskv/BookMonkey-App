import { FormControl, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BookStoreService } from '../../shared/book-store.service';

export class BookValidators {

    // Make sure isbn was entered in a correct format
    static isbnFormat(control: FormControl): { [error: string]: any } {

        // Handle empty object straight away
        if (!control.value) { return null; }

        // remove minus (-) values
        const isolatedNumber = control.value.replace(/-/g, '');

        // isbn pattern that matches ten or thirteen digits
        const isbnPattern = /(^\d{10}$)|(^\d{13}$)/;

        // Run the test against the pattern
        return isbnPattern.test(isolatedNumber) ? null : { isbnFormat: { valid: false } };
    }

    // Make at least one author was entered
    static atLeastOneAuthor(controlArray: FormArray): { [error: string]: any } {

        // .some returns true if at least one array elemet contains a value
        const check = controlArray.controls.some(el => {
            return (el.value) ? true : false;
        });

        // Run the test against the "check" result
        return check ? null : { atLeastOneAuthor: { valid: false } };
    }

    // Async Validator: Check against data store if isbn already exists
    static isbnExists(bs: BookStoreService) {
        // return a validation function
        return function (control: FormControl): Observable<{ [error: string]: any }> {
            return bs.check(control.value)
                .pipe(
                    map(exists => (exists === false) ? null : {
                        isbnExists: { valid: false }
                    }),
                );
        };
    }

}
