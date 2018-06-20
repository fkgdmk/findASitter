import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Sitter } from './entities/sitter';

@Pipe({name: 'filterSitters'})
@Injectable()
export class FilterSitters implements PipeTransform {
     transform(items: Sitter[], input: string): any {
     
      if (input && items.length > 0) {
        let itemsFound = items.filter(
          item => item.firstname && item.firstname.toLowerCase().includes(input.toLowerCase())
        );
       if (itemsFound && itemsFound.length > 0 ){
         return itemsFound;
       }
       return null; // to display error message (none found) in view.
     }
   return items;
 }
}
