import { browser, by, element } from 'protractor';
import { DataService } from '../src/app/data.service';

export class AppPage {

  navigateToRegister() {
    return browser.get('/register');
  }

  navigateToUserlist() {
    return browser.get('/userlist');
  }


  // getBabies () {
  //   element.all(by.css('.babies li')).then(function(babies) {
  //     this.numb1 = babies.length;
  //   });
  // }

  countBabiesAndCreateNewBaby () {
    var babiesBefore;
    element.all(by.css('.babies li')).then(function(babies) {
      babiesBefore = babies.length;
      element(by.id('registerNav')).click();
      element(by.id('radio')).click();
      element(by.id('firstname')).sendKeys('firstname');
      element(by.id('postalCode')).sendKeys('postal');
      element(by.id('age')).sendKeys('age');
      element(by.id('gender')).sendKeys('gender');
      element(by.id('createBaby')).click();
      element(by.id('userlistNav')).click();
      browser.sleep(1000);
    });
    return babiesBefore;
  }

  

  checkIfBabyWasCreatedSuccessfully (babiesBefore) {
    element.all(by.css('.babies li')).then(function(babies) {
      const newLength = babies.length;
      expect(newLength).toBe(babiesBefore + 1);
      browser.sleep(1000);
  });
  }

  deleteBaby () {
    element.all(by.css('.babies li')).then(function(babies) {

    });

  }

  checkIfBabyWasDeletedSuccessfully () {
    element.all(by.css('.babies li')).then(function(babies) {
      const newLength = babies.length - 1;
      expect(newLength < babies.length);
    });
  }

}
