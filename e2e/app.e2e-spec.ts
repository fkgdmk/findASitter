import { AppPage } from './app.po';
import { browser } from 'protractor';
import { DataService } from '../src/app/data.service';

describe('findasittercs App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  // it('should create baby item to array', () => {
  //   page.navigateToRegister();
  //   page.createBaby();
  //   browser.sleep(100);
  //   page.checkIfBabyWasCreatedSuccessfully();
  //   browser.sleep(10000);
  // });
});
