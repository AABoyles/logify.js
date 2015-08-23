/* global angular: false */

angular.module("ngLogify", []).factory("logify", function() {

  "use strict";

  // A quick hack to avoid exposing logify to the window scope.
  var module = { exports: true };

  /* logify.js */

  return module.exports;

});
