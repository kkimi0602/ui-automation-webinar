'use strict';

const { browser, element, by } = require("protractor");

class CucumberCareerPage{
    constructor(){
        this.logo = element(by.css('a.header__logo-container'));
        this.searchForm = element(by.css('#jobSearchFilterForm'));
        this.accept = element(by.css('#onetrust-accept-btn-handler'));
        this.searchButton = this.searchForm.element(by.css('.recruiting-search__submit'));
    
        this.locationFilterBox = this.searchForm.element(by.css('.recruiting-search__location'));
        this.selectedLocation = this.locationFilterBox.element(by.css('.select2-selection'));
        this.getCountryOfLocation = country => this.locationFilterBox.element(by.cssContainingText('strong.select2-results__group',country));
        this.getCityOfLocation = city => this.locationFilterBox.element(by.cssContainingText('li.select2-results__option[role=option]',city));

        this.departmentSelect = this.searchForm.element(by.css('div.multi-select-filter'));
        this.getDepartmentCheckbox = department => this.departmentSelect.element(by.cssContainingText('span.checkbox-custom-label',department));
       
        this.searchResultItems = element(by.css('ul.search-result__list'));
        this.nameOfPosition = position => this.searchResultItems.element(by.cssContainingText('.search-result__item-name',position));
        this.locationOfPosition = element(by.css('.search-result__list .search-result__location'));
        this.applyLinkOfPosition = element(by.css('.search-result__item-apply'));

    }

    load(){
        browser.get('https://www.epam.com/careers');
        return browser.wait(ec.elementToBeClickable(this.logo), GLOBAL_TIMEOUT);
    }

    acceptCookie(){
        browser.wait(ec.elementToBeClickable(this.accept), GLOBAL_TIMEOUT);
        return this.accept.click();
    }

    countryOpt(country){
        this.getCountryOfLocation(country).isDisplayed().then(displayed => {
            if(!displayed){
                this.locationFilterBox.click();
            }
        }, e => this.locationFilterBox.click());
        browser.wait(ec.elementToBeClickable(this.getCountryOfLocation(country)), GLOBAL_TIMEOUT);
    }

    cityOpt(country,city){
        this.getCityOfLocation(city).isDisplayed().then(displayed => {
            if(!displayed){
                this.getCountryOfLocation(country).click();
            }
        }, e => this.getCountryOfLocation(country).click());
        browser.wait(ec.elementToBeClickable(this.getCityOfLocation(city)), GLOBAL_TIMEOUT);
        return this.getCityOfLocation(city).click();   
    }

    toggleDepartment(department){
        //browser.wait(ec.elementToBeClickable(this.accept), GLOBAL_TIMEOUT);
        //this.accept.click();
        const departmentCheckbox = this.getDepartmentCheckbox(department);
        departmentCheckbox.isDisplayed().then(displayed => {
            if(!displayed){
                this.departmentSelect.click();
            }
        },e => this.departmentSelect.click());
        browser.wait(ec.elementToBeClickable(departmentCheckbox), GLOBAL_TIMEOUT);
        return departmentCheckbox.click();
    }

    getSelectedCity(city){
        return this.selectedLocation.getText()
    }

    getSelectedDepartment(){
        return element(by.css('li.filter-tag')).getText();
    }

    search(){
        this.searchButton.click();
        return browser.wait(ec.visibilityOf(this.searchResultItems), GLOBAL_TIMEOUT);
    }
}

module.exports = CucumberCareerPage;