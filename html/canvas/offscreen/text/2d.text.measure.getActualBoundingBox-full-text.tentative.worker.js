// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.text.measure.getActualBoundingBox-full-text.tentative
// Description:Test TextMetrics::getActualBoundingBox() for the full length of the string for some edge cases.
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("Test TextMetrics::getActualBoundingBox() for the full length of the string for some edge cases.");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

  var canvas = new OffscreenCanvas(800, 200);
  var ctx = canvas.getContext('2d');

  // Use measureText to create a rect for the whole text
  function getFullTextBoundingBox(text) {
    const tm = ctx.measureText(text);
    return {
      x: -tm.actualBoundingBoxLeft,
      y: -tm.actualBoundingBoxAscent,
      width: tm.actualBoundingBoxLeft + tm.actualBoundingBoxRight,
      height: tm.actualBoundingBoxAscent + tm.actualBoundingBoxDescent
    };
  }

  function checkRectsMatch(rect_a, rect_b) {
    assert_approx_equals(rect_a.x, rect_b.x, 1.0);
    assert_approx_equals(rect_a.y, rect_b.y, 1.0);
    assert_approx_equals(rect_a.width, rect_b.width, 1.0);
    assert_approx_equals(rect_a.height, rect_b.height, 1.0);
  }

  const kAligns = [
    'left',
    'center',
    'right',
  ];

  const kBaselines = [
    'top',
    'hanging',
    'middle',
    'alphabetic',
    'ideographic',
    'bottom',
  ];

  const kTexts = [
    'UNAVAILABLE',
    '🏁🎶🏁',
    '）（あ）（',
  ]

  ctx.font = '50px sans-serif';
  for (const align of kAligns) {
    for (const baseline of kBaselines) {
      ctx.textAlign = align;
      ctx.textBaseline = baseline;
      for (const text of kTexts) {
        const tm = ctx.measureText(text);
        const rect_from_api = tm.getActualBoundingBox(0, text.length - 1);
        const rect_from_full_bounds = getFullTextBoundingBox(text);
        checkRectsMatch(rect_from_api, rect_from_full_bounds)
      }
    }
  }
  t.done();
});
done();
