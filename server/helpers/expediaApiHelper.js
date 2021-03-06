var express = require('express');
var request = require('request');

module.exports = {

  unrealDeals: function (origin, destination, callback) {

    var uri = 'http://terminal2.expedia.com:80/x/deals/packages?originTLA=' + origin + '&destinationTLA=' + destination + '&startDate=2016-03-01&endDate=2016-12-31&lengthOfStay=5&roomCount=1&adultCount=1&childCount=0&infantCount=0&apikey=BAAGqgon5IWIpBxkrprhYzQDY4bZpPlE';

    request(uri, function (req, res) {
      var unrealDeals = JSON.parse(res.body).deals.packages;
      callback({unrealDeals: unrealDeals});
    });
  },

  averagePriceUnreal: function (origin, destination, callback) {

    var uri = 'http://terminal2.expedia.com:80/x/deals/packages?originTLA=' + origin + '&destinationTLA=' + destination + '&startDate=2016-03-01&endDate=2016-12-31&lengthOfStay=5&roomCount=1&adultCount=1&childCount=0&infantCount=0&apikey=BAAGqgon5IWIpBxkrprhYzQDY4bZpPlE';
    var total = 0;

    request(uri, function (req, res) {
      var unrealDeals = JSON.parse(res.body).deals.packages;
      for (var i = 0; i < unrealDeals.length; i++) {
        total += unrealDeals[i].totalPackagePrice;
      }
      callback({average: total / unrealDeals.length});
    });
  },

  topSpotsCost: function (origin, callback) {

    var topSpots = [
      'CDG',
      'JFK',
      'FCO',
      'CUN',
      'LCY',
      'MIA',
      'MCO',
      'SFO',
      'MYR',
      'BKG'
    ];

    var place = [];
    var cost = [];

    for(var i = 0; i < topSpots.length; i ++){
      var uri = 'http://terminal2.expedia.com:80/x/deals/packages?originTLA=' + origin + '&destinationTLA=' + topSpots[i] + '&startDate=2016-03-01&endDate=2016-12-31&lengthOfStay=5&roomCount=1&adultCount=1&childCount=0&infantCount=0&apikey=BAAGqgon5IWIpBxkrprhYzQDY4bZpPlE';
      request(uri, function(req, res){
        if(!(JSON.parse(res.body).deals.packages)){
          console.log("undefined here");
          place.push(topSpots[i]);
          cost.push(0);
        }
        else {
          place.push(topSpots[i]);
          cost.push((JSON.parse(res.body).deals.packages)[0]);
        }
      })
    }
  }
};