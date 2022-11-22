'use strict';

const { browser, element, by } = require("protractor");
const CareerPage = require('../../pageObjects/careerPage');
const careerPage = new CareerPage();

class HomePage{
    constructor(){
        this.logo = element(by.css('a.header__logo-container'));
        this.navbar = element(by.css('.top-navigation-ui'));
        this.careerPagebtn = this.navbar.element(by.cssContainingText('button>span','Careers'));
    }

    load(){
        browser.get('https://www.epam.com');
        return browser.wait(ec.elementToBeClickable(this.logo), GLOBAL_TIMEOUT);
    }

    search(){
        this.careerPagebtn.click();
        return browser.wait(ec.visibilityOf(careerPage.logo), GLOBAL_TIMEOUT);
    }
}


module.exports = HomePage;