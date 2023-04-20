// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.line.width.valid
// Description:Setting lineWidth to valid values works
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("Setting lineWidth to valid values works");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var canvas = new OffscreenCanvas(100, 50);
var ctx = canvas.getContext('2d');

ctx.lineWidth = 1.5;
_assertSame(ctx.lineWidth, 1.5, "ctx.lineWidth", "1.5");

ctx.lineWidth = "1e1";
_assertSame(ctx.lineWidth, 10, "ctx.lineWidth", "10");

ctx.lineWidth = 1/1024;
_assertSame(ctx.lineWidth, 1/1024, "ctx.lineWidth", "1/1024");

ctx.lineWidth = 1000;
_assertSame(ctx.lineWidth, 1000, "ctx.lineWidth", "1000");
t.done();

});
done();