fn.ary._throw_if_empty = function (ary) {
  if (ary.length === 0) {
    throw Error("Can't take max of empty array.");
  }
};

// TODO move this into obj.js
fn.obj           = {};
fn.obj.deep_copy = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};

fn.obj.each = function (obj, func) {
  Object.keys(obj).forEach(function (key) {
    func(key, obj[key]);
  });
};

// It expects something like this { a: 1, b: 2 }
fn.obj.min_val = function (obj) {
  return fn.ary.min(fn.obj.vals(obj));
};

fn.obj.max_val = function (obj) {
  return fn.ary.max(fn.obj.vals(obj));
};

fn.obj.numeric_vals = function (obj) {
  return fn.obj.vals(obj).filter(function (val) {
    return !isNaN(parseFloat(val));
  });
};

fn.obj.min_numeric_val = function (obj) {
  var vals = fn.obj.vals(obj);

  var numeric_vals = fn.obj.numeric_vals(vals);

  return fn.ary.min(numeric_vals);
};

fn.obj.max_numeric_val = function (obj) {
  var vals = fn.obj.vals(obj);

  var numeric_vals = fn.obj.numeric_vals(vals);

  return fn.ary.max(numeric_vals);
};

// Note that this won't always keep exact order if the keys are not in order.  See https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order
fn.obj.vals = function (obj) {
  // Object.keys has a polyfill from polyfill.js
  return Object.keys(obj).map(function (key) {
    return obj[key];
  });
};

fn.ary.max = function (ary) {
  fn.ary._throw_if_empty(ary);

  return ary.reduce(function (a, b) {
    return Math.max(a, b);
  });
};

fn.ary.min = function (ary) {
  fn.ary._throw_if_empty(ary);

  return ary.reduce(function (a, b) {
    return Math.min(a, b);
  });
};

fn.ary.sum = function (ary) {
  fn.ary._throw_if_empty(ary);

  return ary.reduce(function (a, b) {
    return a + b;
  }, 0);
};

fn.ary.mean = function (ary) {
  return fn.ary.sum(ary) / ary.length;
};