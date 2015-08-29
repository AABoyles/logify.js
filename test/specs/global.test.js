/*global test, expect, QUnit*/
var deepEqual = QUnit.deepEqual;
var ok = QUnit.ok;

test("globals set up", function () {
    expect(1);
    ok(logify, "global logify object created");
});

test("API options", function () {
    expect(7);
    // methods
    deepEqual(typeof logify.reset, "function", "reset part of the API");
    deepEqual(typeof logify.log, "function", "log method part of the API");
    deepEqual(typeof logify.content, "function", "content method part of the API");
    deepEqual(typeof logify.success, "function", "success notification part of the API");
    deepEqual(typeof logify.warning, "function", "warning notification part of the API");
    deepEqual(typeof logify.error, "function", "error notification part of the API");
    deepEqual(typeof logify.maxLogItems, "function", "maxLogItems part of the API");
});
