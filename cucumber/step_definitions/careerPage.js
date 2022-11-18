'use strict';

const CucumberCareerPage = require('../../pageObjects/cucumberCareerPage');
const careerPage = new CucumberCareerPage();
const { expect } = require('chai');

const { Given, When, Then, setDefaultTimeout } = require('cucumber');
setDefaultTimeout(GLOBAL_TIMEOUT);

Given('the EPAM Careers page is opened', function () {
    careerPage.load();
});

Then('the EPAM Careers page should be opened', function () {
    expect(careerPage.logo.isDisplayed()).to.eventually.be.true;
});

When('acceptance of Cookies', function(){
    careerPage.acceptCookie();
});

Then('the Search form should be visidle', function () {
    expect(careerPage.searchForm.isDisplayed()).to.eventually.be.true;
});

When('the Location filter box is clicked', function () {
    careerPage.locationFilterBox.click();
});

When('the country {string} is selected', function (country) {
    careerPage.countryOpt(country);
});

When('the city {string} of the country {string} is selected', function (country, city) {
    careerPage.cityOpt(country,city);
});

Then('the selected location should be {string}', function (string) {
    expect(careerPage.selectedLocation.getText()).to.eventually.equal('Debrecen');
});
