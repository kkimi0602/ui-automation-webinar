'use strict';

const { expect } = require('chai');
const HomePage = require('../../pageObjects/homePage');
const homePage = new HomePage();

describe('Beginning of Search for job', function(){
    this.timeout(GLOBAL_TIMEOUT);

    before(() => {
        return homePage.load();
    });

    describe('Home page', () =>{
        it('should be opened', () =>{
            return expect(homePage.logo.isDisplayed()).to.eventually.be.true;
        });
    });
});