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
        element.all(by.css('.babies li')).then(function(babies)
        {
            const babiesBefore = babies.length;
            element(by.id('registerNav')).click();
            element(by.id('radio')).click();
            element(by.id('firstname')).sendKeys('firstname');
            element(by.id('postalCode')).sendKeys('postal');
            element(by.id('age')).sendKeys('age');
            element(by.id('gender')).sendKeys('gender');
            element(by.id('createBaby')).click();
            element(by.id('userlistNav')).click();
            browser.sleep(1000);
            element.all(by.css('.babies li')).then(function(babies) 
            {
                const babiesAfter = babies.length;
                expect(babiesAfter).toBe(babiesBefore + 1);
                browser.sleep(1000);
            });
        });
    });

    it ('should delete a baby', async() => 
    {
        element.all(by.css('.babies li')).then(function (babies) 
        {
            const babiesBefore = babies.length;          
            element.all(by.css('.deleteBtn')).get(0).click();
            element.all(by.css('.babies li')).then(function (babies) 
            {
                const babiesAfter = babies.length;
                expect(babiesAfter).toBe(babiesBefore - 1);
                browser.sleep(1000);
            });
        }); 
    });

});
