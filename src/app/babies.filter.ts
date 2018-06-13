import {Injectable, Pipe, PipeTransform} from '@angular/core';
import { Baby } from './entities/baby';

@Pipe({name: 'filterBabies'})
@Injectable()
export class FilterBabies implements PipeTransform {
     transform(items: Baby[], args: string): any {
     
      if (args && items.length > 0) {
        let itemsFound = items.filter(
        item => item.firstname.includes(args.toLowerCase())
       );
       if (itemsFound && itemsFound.length > 0 ){
         return itemsFound;
       }
       return null; // to display error message (none found) in view.
     }
   return items;
 }
}


