'use strict';

const { expect } = require('chai');
const CareerPage = require('../../pageObjects/careerPage');
const careerPage = new CareerPage();

describe('Search for job', function(){
    this.timeout(GLOBAL_TIMEOUT);

    before(() => {
        return careerPage.load();
    });

    describe('Careers page', () =>{
        it('should be opened', () =>{
            return expect(careerPage.logo.isDisplayed()).to.eventually.be.true;
        });
    });

    describe('Search form', () =>{
        it('should be displayed', () =>{
            return expect(careerPage.searchForm.isDisplayed()).to.eventually.be.true;
        });

        describe('Location filter box', () =>{
            beforeEach(() => {
                return careerPage.selectCityInCountry('Hungary','Debrecen');
            });

            it('should provide a way to filter to a specific location', () =>{
                return expect(careerPage.getSelectedCity('Debrecen')).to.eventually.equal('Debrecen');
            });
        });

        describe('Department filter box', () =>{
            beforeEach(() => {
                return careerPage.toggleDepartment('Solution Architecture');
            });
        
            it('should provide a way to filter to a specific department', () =>{
                return expect(careerPage.getSelectedDepartment()).to.eventually.equal('Solution Architecture'.toUpperCase());
            });
        });

        describe('Searching', () =>{
            before(() => {
                return careerPage.search();
            });
        
            it('should have proper job found', () =>{
                return expect(careerPage.searchResultItems.isDisplayed()).to.eventually.be.true;
            });

            it('should have job with proper name',() => {
                return expect(careerPage.nameOfPosition('DevOps Solution Architect').getText()).to.eventually.equal('DevOps Solution Architect');
            });

            it('should have job with proper location', () =>{
                return expect(careerPage.locationOfPosition.getText()).to.eventually.equal('Debrecen, Hungary or Remote'.toUpperCase())
                || expect(careerPage.locationOfPosition.getText()).to.eventually.equal('Hungary'.toUpperCase());
            });

            it('should have apply button for job', () =>{
                return expect(careerPage.applyLinkOfPosition.isDisplayed()).to.eventually.be.true;
            });
        });
    });
});