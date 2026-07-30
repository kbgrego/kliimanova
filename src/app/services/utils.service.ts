import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class UtilsService {

  public formatWithSpaces(num?: number): string {
    
    if(num === undefined || num === null) {
      return '';
    }
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    console.log('format ' + num + '; res: ' + formatter
      .formatToParts(num)
      .map(part => (part.type === 'group' ? ' ' : part.value))
      .join(''));

    return formatter
      .formatToParts(num)
      .map(part => (part.type === 'group' ? ' ' : part.value))
      .join('');
  }

}
