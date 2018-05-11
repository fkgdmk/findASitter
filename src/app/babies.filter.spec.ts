import { TestBed, async } from '@angular/core/testing';
import { FilterBabies } from './babies.filter';

describe('App: Babies', () => {
 beforeEach(() => {
   this.babies = [
       {_id: '11', firstname: 'Per'},
       {_id: '11', firstname: 'Jens'},
       {_id: '12', firstname: 'Helle'},
       {_id: '13', firstname: 'Jørgen'},
       {_id: '14', firstname: 'Berit'},
      
   ];
   TestBed.configureTestingModule({
     declarations: [
       FilterBabies
     ],
   });
   
   describe('FilterBabies', () => {
    let pipe = new FilterBabies();
    it('No search string returns input', () => {
        let result = pipe.transform(this.babies, '');
        expect(result.length).toBe(5);
    });

    it('Empty array returns empty array', () => {
        let result = pipe.transform(null, 'Hi');
        expect(result.length).toBe(null);
    });

    //...More tests
  });
});

 });
