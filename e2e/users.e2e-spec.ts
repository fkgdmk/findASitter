import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';
import { create } from 'domain';

describe('Babies test', () => {

    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });
    
    it('should create a new baby', async() => 
    {
        page.navigateToUserlist();
        browser.sleep(3000);
        element.all(by.css('.baby-card')).then(function(babiesbefore)
        {
            const babiesBefore = babiesbefore.length;
            browser.sleep(2000);
            element(by.id('register')).click();
            element(by.id('radio-baby')).click();
            element(by.id('firstname')).sendKeys('firstname - test');
            element(by.id('postalCode')).sendKeys('postal - test');
            element(by.id('age')).sendKeys('age - test');
            element(by.id('select-genders')).click();
            element(by.cssContainingText('mat-option', 'Male')).click();
            element(by.id('createBaby')).click();
            browser.sleep(2000);
            element(by.id('userlist')).click();
            browser.sleep(5000);
            element.all(by.css('.baby-card')).then(function(babiesafter) 
            {
                const babiesAfter = babiesafter.length;
                expect(babiesAfter).toBe(babiesBefore + 1);
                browser.sleep(1000);
            });
        });
    });

    it ('should delete a baby', async() => 
    {
        page.navigateToUserlist();
        browser.sleep(3000);
        element.all(by.css('.baby-card')).then(function (babiesbefore) 
        {
            const babiesBefore = babiesbefore.length;
            
            element(by.cssContainingText('mat-card', 'firstname - test')).element(by.id('deleteBtn')).click();
              
            browser.sleep(3000);
            element.all(by.css('.baby-card')).then(function (babiesafter) 
            {
                const babiesAfter = babiesafter.length;
                expect(babiesAfter).toBe(babiesBefore - 1);
                browser.sleep(1000);
            });
        }); 
    });

});
