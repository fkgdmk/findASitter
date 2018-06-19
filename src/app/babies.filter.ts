import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { Baby } from './entities/baby';

@Pipe({name: 'filterBabies'})
@Injectable()
export class FilterBabies implements PipeTransform {
     transform(items: Baby[], input: string): any {
     
      if (input && items.length > 0) {
        let itemsFound = items.filter(
          item => item.firstname && item.firstname.toLocaleLowerCase().includes(input.toLowerCase())
        );
       if (itemsFound && itemsFound.length > 0 ){
         return itemsFound;
       }
       return null; // to display error message (none found) in view.
     }
   return items;
 }
}


