import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isbn'
})
export class IsbnPipe implements PipeTransform {

  transform(value: any, addPrefix: boolean): string {
    // Filter value that is not valid
    if (!value || value.length !== 10 && value.length !== 13) {
      return null;
    }

    // Decide which prefix should be used
    let prefix = '';
    if (addPrefix) {
      prefix = (value.length === 10) ? 'ISBN-10: ' : 'ISBN-13: ';
    }

    // Return ISBN 10 OR ISBN 13 string
    if (value.length === 10) {
      return prefix + value;
    } else {
      return `${prefix}${value.substr(0, 3)}-${value.substr(3)}`;
    }
  }

}
