function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var quotes = null;
/**
 * Price data model
 */

var initialData = {
  /**
   * An array of price data series in following format:
   * {symbol, o, h, l, c, date, volume}
   */
  data: null,

  /**
   * Minimum and maximum values
   */
  min: 1000000.0,
  max: 0.0,
  range: 0.0,
  minVolume: 1000000.0,
  maxVolume: 0.0,
  rangeVolume: 0.0,

  /**
   * Last change (open price - close price)
   */
  lastChange: 0.0,

  /**
   * Some extra data calculated from 'data' field
   */
  plugins: {}
};
function quotesInit(quotesData) {
  quotes = _objectSpread2({}, initialData);
  quotes.data = quotesData;

  var _iterator = _createForOfIteratorHelper(quotesData),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var quote = _step.value;
      if (quote.high > quotes.max) quotes.max = quote.high;
      if (quote.low < quotes.min) quotes.min = quote.low;
      if (quote.volume > quotes.maxVolume) quotes.maxVolume = quote.volume;
      if (quote.volume < quotes.minVolume) quotes.minVolume = quote.volume;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  quotes.range = quotes.max - quotes.min;
  quotes.rangeVolume = quotes.maxVolume - quotes.minVolume;
  quotes.lastChange = (quotesData[quotesData.length - 1].close - quotesData[quotesData.length - 2].close) / quotesData[quotesData.length - 2].close;
  quotes.lastChange = Math.round(quotes.lastChange * 10000) / 100;
  // quotes.plugins.dailyChange = pluginInitDailyChange(quotes.data);
  // quotes.plugins.variance = pluginInitVariance(quotes.data);
  return quotes;
}

function pluginInitDailyChange(quotes) {
  var data = {
    min: 1000000.0,
    max: 0,
    avg: 0,
    minDate: null,
    maxDate: null
  };
  var prevQuote = null;

  var _iterator2 = _createForOfIteratorHelper(quotes),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var quote = _step2.value;
      var prevClose = prevQuote ? prevQuote.close : quote.open;
      var change = (quote.close - prevClose) / prevClose;
      data.avg += Math.abs(change);

      if (data.min > change) {
        data.min = change;
        data.minDate = quote.timestamp;
      }

      if (data.max < change) {
        data.max = change;
        data.maxDate = quote.timestamp;
      }

      prevQuote = quote;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  data.avg = Math.round(data.avg / quotes.length * 10000) / 100;
  data.min = Math.round(data.min * 10000) / 100;
  data.max = Math.round(data.max * 10000) / 100;
  return data;
}

function pluginInitVariance(quotes) {
  function calculateVariance(quote, prevQuote) {
    var prevClose = prevQuote ? prevQuote.close : quote.open;
    var diff1 = Math.abs(prevClose - quote.high);
    var diff2 = Math.abs(prevClose - quote.low);
    return Math.max(diff1, diff2);
  }

  var data = {
    min: 1000000.0,
    max: 0,
    avg: 0,
    minDate: null,
    maxDate: null
  };
  var prevQuote = null;

  var _iterator3 = _createForOfIteratorHelper(quotes),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var quote = _step3.value;
      var variance = calculateVariance(quote, prevQuote);
      data.avg += variance;

      if (data.min > variance) {
        data.min = variance;
        data.minDate = quote.timestamp;
      }

      if (data.max < variance) {
        data.max = variance;
        data.maxDate = quote.timestamp;
      }

      prevQuote = quote;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  data.avg = Math.round(data.avg / quotes.length * 100) / 100;
  data.min = Math.round(data.min * 100) / 100;
  data.max = Math.round(data.max * 100) / 100;
  return data;
}

/**
 * Calculate human-readable price scale matching prace range
 */
function humanScalePrice(priceRange) {
  var ranges = [];

  for (var i = 1; i < 10; i++) {
    var powerOfTen = Math.pow(10, i);
    ranges.push(powerOfTen / 4 / 1000);
    ranges.push(powerOfTen / 2 / 1000);
    ranges.push(powerOfTen / 1000);
  }

  var scaleValue = priceRange / 8;
  var humanScaleDiff = 100000000;
  var humanScale = 0;

  for (var _i = 0, _ranges = ranges; _i < _ranges.length; _i++) {
    var range = _ranges[_i];
    var diff = Math.abs(scaleValue - range);

    if (humanScaleDiff > diff) {
      humanScaleDiff = diff;
      humanScale = range;
    }
  }

  return humanScale;
}
function formatPrice(price) {
  var unit = '';

  if (price > 999999) {
    price /= 1000000;
    unit = 'M';
  } else if (price > 9999) {
    price /= 1000;
    unit = 'K';
  }

  if (price >= 100) {
    price = Math.round(price * 1) / 1;
  } else if (price >= 10) {
    price = Math.round(price * 10) / 10;
  } else if (price >= 1) {
    price = Math.round(price * 100) / 100;
  } else {
    price = Math.round(price * 100) / 100;
  }

  return price + unit;
}
function dateToTimeScale(date, rangeMilliseconds, localeData) {
  var month = 2678400000;
  var year = 31536000000;
  var result;

  if (rangeMilliseconds > year) {
    result = date.getFullYear();
  } else if (rangeMilliseconds > month) {
    result = localeData.monthNames[date.getMonth()];

    if (date.getMonth() === 0) {
      result += ' ' + date.getFullYear();
    }
  } else {
    result = date.getDate() + ' ' + localeData.monthNames[date.getMonth()];
  }

  return result;
}
/**
 * Point inside box check
 */

function inside(point, box) {
  return point[1] > box[1] && point[1] < box[1] + box[3] && point[0] > box[0] && point[0] < box[0] + box[2];
}
function relativeFontSize(width, height, maxSize, devicePixelRatio) {
  var size = width / 30;
  return Math.min(maxSize, size);
}

/**
 * View model data structure
 * It is the data of current chart view
 */

var viewModel = {
  /**
   * Quotes model, contains all price data that is in current view
   */
  quotes: null,

  /**
   * Data user cursor points to
   */
  cursorData: null,

  /**
   * Values of the scale lines
   */
  priceLines: null,
  timeLines: null
};

function preparePriceScale(min, max) {
  var humanScale = humanScalePrice(max - min);
  var scaleLines = [];

  for (var i = 0; i < max; i += humanScale) {
    if (i > min) {
      scaleLines.push(Math.round(i * 100) / 100);
    }
  }

  return scaleLines;
}

function prepareTimeScale(quotes, localeData) {
  var min = new Date(quotes[0].timestamp).getTime();
  var max = new Date(quotes[quotes.length - 1].timestamp).getTime();
  var diff = max - min;
  var yScaleLines = [];
  var verticalUnit = null;

  for (var i = 0; i < quotes.length; ++i) {
    var newVerticalUnit = dateToTimeScale(new Date(quotes[i].timestamp), diff, localeData);

    if (newVerticalUnit !== verticalUnit) {
      yScaleLines.push([i, newVerticalUnit]);
    }

    verticalUnit = newVerticalUnit;
  }

  return yScaleLines;
}
/**
 * Chart view data model
 */


function initViewModel(capacity, offset, quotes, locale) {
  var q = quotes.slice(-capacity + offset, Math.min(quotes.length, quotes.length + offset));
  viewModel.quotes = quotesInit(q);
  viewModel.cursorData = [null, null]; // scale grid lines

  var localeData = {
    monthNames: []
  };

  for (var month = 0; month < 12; ++month) {
    var date = new Date();
    date.setTime(0);
    date.setMonth(month);
    var monthName = date.toLocaleString(locale, {
      month: "short"
    });
    localeData.monthNames.push(monthName);
  }

  viewModel.capacity = capacity;
  viewModel.priceLines = preparePriceScale(viewModel.quotes.min, viewModel.quotes.max);
  viewModel.timeLines = prepareTimeScale(viewModel.quotes.data, localeData);
}
function getViewModel() {
  return viewModel;
}

/**
 * Chart box model geometry
 */
var geometry = {
  boxPrice: null,
  boxVolume: null
};
function makeBox(viewportWidth, viewportHeight, boxConfig, devicePixelRatio) {
  var marginT = boxConfig.margin[0] * devicePixelRatio;
  var marginR = boxConfig.margin[1] * devicePixelRatio;
  var marginB = boxConfig.margin[2] * devicePixelRatio;
  var marginL = boxConfig.margin[3] * devicePixelRatio;
  var boxTop = marginT + viewportHeight * boxConfig.top * devicePixelRatio;
  var boxLeft = marginL;
  var boxWidth = viewportWidth * devicePixelRatio - marginL - marginR;
  var boxHeight = viewportHeight * boxConfig.height * devicePixelRatio - marginT - marginB;
  var padding = boxConfig.padding * devicePixelRatio;
  var box = {};
  box.padding = [Math.round(boxLeft) + 0.5, Math.round(boxTop) + 0.5, Math.round(boxWidth), Math.round(boxHeight)];
  box.content = [Math.round(boxLeft + padding) + 0.5, Math.round(boxTop + padding) + 0.5, Math.round(boxWidth - padding * 2), Math.round(boxHeight - padding * 2)];
  return box;
}
function initGeometry(geometryConfig, width, height, devicePixelRatio) {
  geometry.boxPrice = makeBox(width, height, geometryConfig.boxPrice, devicePixelRatio);

  if (geometryConfig.boxVolume) {
    geometry.boxVolume = makeBox(width, height, geometryConfig.boxVolume, devicePixelRatio);
  } else {
    geometry.boxVolume = null;
  }

  return geometry;
}

var eventListeners = null;
function initEventListeners() {
  eventListeners = {
    moveCursor: []
  };
}
function addEventListener(eventName, listener) {
  if (!eventListeners[eventName]) {
    throw new Error("The event name ".concat(eventName, " is invalid"));
  }

  eventListeners[eventName].push(listener);
}
function removeEventListener(eventName, listener) {
  if (!eventListeners[eventName]) {
    throw new Error("The event name ".concat(eventName, " is invalid"));
  }

  var listenerIndex = eventListeners[eventName].indexOf(listener);

  if (listenerIndex > -1) {
    eventListeners[eventName].splice(listenerIndex, 1);
  }
}
function triggerEvent(eventName, event) {
  if (!eventListeners[eventName]) {
    throw new Error("The event name ".concat(eventName, " is invalid"));
  }

  if (eventListeners[eventName].length) {
    var _iterator = _createForOfIteratorHelper(eventListeners[eventName]),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var listener = _step.value;
        listener(event);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
}

/**
 * Translate price to screen coordinate
 */
function toScreen(value, height, min, max) {
  var ratio = height / (max - min);
  return Math.round(height - (value - min) * ratio);
}
/**
 * Translate screen coordinate to price
 */

function fromScreen(value, height, min, max) {
  var ratio = height / (max - min);
  return height / ratio + min - value / ratio;
}

function crosshair(view, quotes, cursorData, cursor) {
  var _cursor = _slicedToArray(cursor, 2),
      x = _cursor[0],
      y = _cursor[1];

  var boxPricePadding = view.geometry.boxPrice.padding;
  var boxVolumePadding = view.geometry.boxVolume ? view.geometry.boxVolume.padding : null;
  var insidePrice = inside(cursor, boxPricePadding);
  var insideVolume = boxVolumePadding ? inside(cursor, boxVolumePadding) : false;
  if (!insidePrice && !insideVolume) return [null, null];
  drawCrosshair(view.crosshairCtx, x, y, boxPricePadding, boxVolumePadding, view, cursorData);
  return getCursorData(view, cursor, quotes);
}

function getCursorData(view, cursor, quotes) {
  var _cursor2 = _slicedToArray(cursor, 2),
      x = _cursor2[0],
      y = _cursor2[1];

  var boxPrice = view.geometry.boxPrice.content;
  var boxPricePadding = view.geometry.boxPrice.padding;
  var boxVolume = view.geometry.boxVolume ? view.geometry.boxVolume.content : null;
  var boxVolumePadding = view.geometry.boxVolume ? view.geometry.boxVolume.padding : null;
  var insidePrice = inside(cursor, boxPricePadding);
  var insideVolume = boxVolumePadding ? inside(cursor, boxVolumePadding) : false;
  var yValue;

  if (insidePrice) {
    yValue = fromScreen(y - boxPrice[1], boxPrice[3], quotes.min, quotes.max);
  } else if (insideVolume) {
    yValue = fromScreen(y - boxVolume[1], boxVolume[3], 0, quotes.maxVolume);
  }

  var stickNumber = Math.round((x - view.stickLength / 2 - boxPrice[0]) / view.stickLength);
  var xValue = quotes.data[stickNumber] ? quotes.data[stickNumber] : null;
  var eventData = [xValue, yValue];
  return eventData;
}

function drawCrosshair(ctx, x, y, boxPrice, boxVolume, chartView, cursorData) {
  var fontSize = relativeFontSize(chartView.width, chartView.height, chartView.fontSize, chartView.devicePixelRatio);
  var style = chartView.style;
  ctx.strokeStyle = style.colorCrosshair;
  ctx.beginPath();
  ctx.moveTo(x, boxPrice[1]);

  if (boxVolume) {
    ctx.lineTo(x, boxVolume[1] + boxVolume[3]);
  } else {
    ctx.lineTo(x, boxPrice[1] + boxPrice[3]);
  }

  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(boxPrice[0], y);
  ctx.lineTo(boxPrice[0] + boxPrice[2], y);
  ctx.stroke();
  ctx.font = "".concat(fontSize, "px \"Arial\"");
  var yValue = cursorData[1];
  var text = formatPrice(yValue);
  ctx.fillStyle = style.colorScale;
  ctx.fillText(text, boxPrice[0] + boxPrice[2] + chartView.config.padding * 2, y + fontSize / 3);
}

function scale(view, quotes, priceLines, timeLines, cursorData) {
  var priceBox = view.geometry.boxPrice.padding;
  drawPriceScale(view.crosshairCtx, priceLines, quotes, view, cursorData);
  drawTimeScale(view.crosshairCtx, priceBox, timeLines, view);
}

function drawPriceScale(ctx, scaleValues, quotes, chartView, cursorData) {
  var priceBox = chartView.geometry.boxPrice.padding;
  var priceBoxContent = chartView.geometry.boxPrice.content;
  var style = chartView.style;
  var fontSize = relativeFontSize(chartView.width, chartView.height, chartView.fontSize, chartView.devicePixelRatio);
  var ratio = priceBoxContent[3] / quotes.range;

  var _iterator = _createForOfIteratorHelper(scaleValues),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var scaleValue = _step.value;
      var screenY = priceBoxContent[0] + priceBoxContent[3] - (scaleValue - quotes.min) * ratio;
      ctx.strokeStyle = style.colorScale;
      ctx.beginPath();
      ctx.moveTo(priceBox[0] + priceBox[2], screenY);
      ctx.lineTo(priceBox[0] + priceBox[2] + chartView.config.padding, screenY);
      ctx.stroke();
      var atCursor = false;

      if (cursorData) {
        var cursorY = toScreen(cursorData[1], priceBoxContent[3], quotes.min, quotes.max);

        if (cursorY > screenY - 2 * fontSize && cursorY < screenY) {
          atCursor = true;
        }
      }

      if (!atCursor) {
        ctx.fillStyle = style.colorScale;
        ctx.font = "".concat(fontSize, "px \"Arial\"");
        ctx.fillText(scaleValue, priceBox[0] + priceBox[2] + chartView.config.padding * 2, screenY + fontSize / 3);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function drawTimeScale(ctx, boxPrice, scaleValues, chartView) {
  var style = chartView.style;
  var fontSize = relativeFontSize(chartView.width, chartView.height, chartView.fontSize, chartView.devicePixelRatio);
  var previousLabelX = Number.MAX_SAFE_INTEGER;

  for (var i = scaleValues.length - 1; i > 0; --i) {
    var verticalLine = scaleValues[i];
    ctx.strokeStyle = style.colorGrid;
    var drawingStickBegin = boxPrice[0] + (verticalLine[0] + 0.5) * chartView.stickLength;
    ctx.fillStyle = style.colorScale;
    ctx.font = "".concat(fontSize, "px \"Arial\"");
    var labelWidth = ctx.measureText(verticalLine[1]).width; // prevent drawing labels on top each other

    if (drawingStickBegin + labelWidth < previousLabelX) {
      ctx.fillText(verticalLine[1], drawingStickBegin, boxPrice[0] + boxPrice[3] + fontSize);
    }

    previousLabelX = drawingStickBegin;
  }
}

function scaleGrid(view, quotes, priceLines, timeLines) {
  drawPriceScaleGrid(view.ctx, priceLines, quotes.min, quotes.range, view);
  drawTimeScaleGrid(view.ctx, timeLines, view);
}

function drawPriceScaleGrid(ctx, scaleValues, priceMin, priceRange, chartView) {
  var priceBox = chartView.geometry.boxPrice.padding;
  var priceBoxContent = chartView.geometry.boxPrice.content;
  var style = chartView.style;
  var ratio = priceBoxContent[3] / priceRange;

  var _iterator = _createForOfIteratorHelper(scaleValues),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var scaleValue = _step.value;
      var screenY = priceBoxContent[0] + priceBoxContent[3] - (scaleValue - priceMin) * ratio;
      ctx.strokeStyle = style.colorGrid;
      ctx.beginPath();
      ctx.moveTo(priceBox[0], screenY);
      ctx.lineTo(priceBox[0] + priceBox[2], screenY);
      ctx.stroke();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function drawTimeScaleGrid(ctx, scaleValues, chartView) {
  var boxPrice = chartView.geometry.boxPrice.padding;
  var boxVolume = chartView.geometry.boxVolume ? chartView.geometry.boxVolume.padding : null;
  var style = chartView.style;

  for (var i = 0; i < scaleValues.length; ++i) {
    var verticalLine = scaleValues[i];
    ctx.strokeStyle = style.colorGrid;
    var drawingStickBegin = boxPrice[0] + (verticalLine[0] + 0.5) * chartView.stickLength;
    ctx.beginPath();
    ctx.moveTo(drawingStickBegin, boxPrice[1]);

    if (boxVolume) {
      ctx.lineTo(drawingStickBegin, boxVolume[1] + boxVolume[3]);
    } else {
      ctx.lineTo(drawingStickBegin, boxPrice[1] + boxPrice[3]);
    }

    ctx.stroke();
  }
}

function price(view, quotes) {
  var _view$ctx;

  var box = view.geometry.boxPrice.padding;
  var boxContent = view.geometry.boxPrice.content;
  view.ctx.strokeStyle = view.style.colorBorder;

  (_view$ctx = view.ctx).strokeRect.apply(_view$ctx, _toConsumableArray(box));

  var quotesLength = quotes.data.length;
  var q = quotes.data;
  var prevC = q[0].open;

  for (var i = 0; i < quotesLength; ++i) {
    if (view.chartType === 'candlestick') {
      priceCandlestick(view.ctx, quotes, i, boxContent, view.stickLength, view.stickMargin, view.style);
    } else {
      priceLine(view.ctx, quotes, i, boxContent, view.stickLength, view.style);
    }

    prevC = q[i].close;
  }
}

function priceLine(ctx, quotes, i, boxContent, stickLength, style) {
  var xStart = boxContent[0] + i * stickLength;
  var xEnd = boxContent[0] + (i + 1) * stickLength;
  var q = quotes.data;
  var c = q[i].close;
  var prevC = i===0 ? q[i].open : q[i - 1].close;
  ctx.strokeStyle = style.colorLine;
  ctx.beginPath();
  ctx.moveTo(xStart, toScreen(prevC, boxContent[3], quotes.min, quotes.max) + boxContent[1]);
  ctx.lineTo(xEnd, toScreen(c, boxContent[3], quotes.min, quotes.max) + boxContent[1]);
  ctx.stroke();
}

function priceCandlestick(ctx, quotes, i, boxContent, stickLength, stickMargin, style) {
  var xStart = boxContent[0] + i * stickLength + stickMargin;
  var xEnd = boxContent[0] + (i + 1) * stickLength - stickMargin;

  if (xEnd < xStart) {
    xEnd = xStart;
  }

  var q = quotes.data;
  var o = q[i].oopen;
  var h = q[i].high;
  var l = q[i].low;
  var c = q[i].close;
  var borderColor, fillColor;

  if (o <= c) {
    borderColor = style.colorBullBorder;
    fillColor = style.colorBull;
  } else {
    borderColor = style.colorBearBorder;
    fillColor = style.colorBear;
  }

  candlestick(ctx, toScreen(o, boxContent[3], quotes.min, quotes.max) + boxContent[1], toScreen(h, boxContent[3], quotes.min, quotes.max) + boxContent[1], toScreen(l, boxContent[3], quotes.min, quotes.max) + boxContent[1], toScreen(c, boxContent[3], quotes.min, quotes.max) + boxContent[1], xStart, xEnd, fillColor, borderColor);
}

function candlestick(ctx, o, h, l, c, xStart, xEnd, fillColor, borderColor) {
  var width = xEnd - xStart;

  if (width % 2) {
    width += 1;
  }

  var boxStick = [xStart, o, width, c - o];
  ctx.strokeStyle = borderColor;
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.moveTo(boxStick[0] + boxStick[2] / 2, h);
  ctx.lineTo(boxStick[0] + boxStick[2] / 2, l);
  ctx.stroke();

  if (width >= 2) {
    ctx.fillRect.apply(ctx, boxStick);
    ctx.strokeRect.apply(ctx, boxStick);
  }
}

function volume(view, quotes) {
  var _view$ctx;

  var box = view.geometry.boxVolume.padding;
  var boxContent = view.geometry.boxVolume.content;
  view.ctx.strokeStyle = view.style.colorBorder;

  (_view$ctx = view.ctx).strokeRect.apply(_view$ctx, _toConsumableArray(box));

  var quotesLength = quotes.data.length;

  for (var i = 0; i < quotesLength; ++i) {
    if (view.chartType === 'candlestick') {
      volumeBars(view.ctx, quotes, i, boxContent, view.stickLength, view.stickMargin, view.style);
    } else {
      volumeLines(view.ctx, quotes, i, boxContent, view.stickLength, view.stickMargin, view.style);
    }
  }
}

function volumeLines(ctx, quotes, i, boxContent, stickLength, stickMargin, style) {
  var xStart = boxContent[0] + i * stickLength + stickLength / 2;
  ctx.strokeStyle = style.colorLine;
  ctx.beginPath();
  ctx.moveTo(xStart, toScreen(0, boxContent[3], 0, quotes.maxVolume) + boxContent[1]);
  ctx.lineTo(xStart, toScreen(quotes.data[i].volume, boxContent[3], 0, quotes.maxVolume) + boxContent[1]);
  ctx.stroke();
}

function volumeBars(ctx, quotes, i, boxContent, stickLength, stickMargin, style) {
  var xStart = boxContent[0] + i * stickLength + stickMargin;
  var xEnd = boxContent[0] + (i + 1) * stickLength - stickMargin;

  if (xEnd < xStart) {
    xEnd = xStart;
  }

  var borderColor, fillColor;

  if (quotes.data[i].open <= quotes.data[i].close) {
    borderColor = style.colorBullBorder;
    fillColor = style.colorBull;
  } else {
    borderColor = style.colorBearBorder;
    fillColor = style.colorBear;
  }

  drawVolumeBar(ctx, toScreen(0, boxContent[3], 0, quotes.maxVolume) + boxContent[1], toScreen(quotes.data[i].volume, boxContent[3], 0, quotes.maxVolume) + boxContent[1], xStart, xEnd, fillColor, borderColor);
}

function drawVolumeBar(ctx, o, c, xStart, xEnd, fillColor, borderColor) {
  var width = xEnd - xStart;

  if (width % 2) {
    width += 1;
  }

  var boxStick = [xStart, o, xEnd - xStart, c - o];
  ctx.strokeStyle = borderColor;
  ctx.fillStyle = fillColor;

  if (width >= 2) {
    ctx.fillRect.apply(ctx, boxStick);
    ctx.strokeRect.apply(ctx, boxStick);
  } else {
    ctx.beginPath();
    ctx.moveTo(boxStick[0] + boxStick[2] / 2, o);
    ctx.lineTo(boxStick[0] + boxStick[2] / 2, c);
    ctx.stroke();
  }
}

var defaultConfig = {
  chartType: 'candlestick',
  locale: 'en',
  stickMargin: 2,
  fontSize: 14,
  padding: 5,
  geometry: {
    boxPrice: {
      height: 0.8,
      top: 0,
      padding: 5,
      margin: [10, 48, 10, 10]
    },
    boxVolume: {
      height: 0.2,
      top: 0.8,
      padding: 5,
      margin: [10, 48, 10, 10]
    }
  }
};

var themes = {
  light: {
    colorBackground: '#fff',
    colorBear: '#ff4444',
    colorBull: '#fff',
    colorBearBorder: '#ff4444',
    colorBullBorder: '#000',
    colorGrid: '#f4f4f4',
    colorBorder: '#e8e8e8',
    colorScale: '#666',
    colorCrosshair: '#ccc',
    colorLine: '#666'
  },
  dark: {
    colorBackground: '#000',
    colorBear: '#aa2222',
    colorBull: '#000',
    colorBearBorder: '#aa2222',
    colorBullBorder: '#00aa22',
    colorGrid: '#222',
    colorBorder: '#333',
    colorScale: '#aaa',
    colorCrosshair: '#666',
    colorLine: '#aaa'
  }
};

var quotes$1 = [];
var chartView = {};
var cursor = [];
function chartDefaultConfig() {
  var config = _objectSpread2({}, defaultConfig);

  config.geometry = {};
  config.geometry.boxPrice = _objectSpread2({}, defaultConfig.geometry.boxPrice);
  config.geometry.boxVolume = _objectSpread2({}, defaultConfig.geometry.boxVolume);
  return config;
}
function chartThemes() {
  return themes;
}
function chartGetViewModel() {
  return getViewModel();
}
function chartSetCursor(x, y) {
  cursor[0] = x * chartView.devicePixelRatio;
  cursor[1] = y * chartView.devicePixelRatio;
}
function chartInit(data, canvasLayers, _ref) {
  var width = _ref.width,
      height = _ref.height,
      zoom = _ref.zoom || 1,
      offset = _ref.offset || 0,
      config = _ref.config,
      theme = _ref.theme;
  var maxDimension = 8192;

  if (width > maxDimension || height > maxDimension) {
    throw new Error("Maximum chart dimensions exceeded: [".concat(width, "x").concat(height, "]"));
  }

  cursor[0] = 0;
  cursor[1] = 0;
  quotes$1 = data;
  var min = 2;
  var max = 13;
  if (zoom < min) zoom = min;
  if (zoom > max) zoom = max;
  var devicePixelRatio = 1//window.devicePixelRatio;
  canvasLayers.base.width = width * devicePixelRatio;
  canvasLayers.base.height = height * devicePixelRatio;
  canvasLayers.scale.width = width * devicePixelRatio;
  canvasLayers.scale.height = height * devicePixelRatio;
  chartView.ctx = canvasLayers.base.getContext("2d");
  chartView.crosshairCtx = canvasLayers.scale.getContext("2d");
  chartView.width = width;
  chartView.height = height;
  chartView.devicePixelRatio = devicePixelRatio;
  chartView.style = theme;
  chartView.config = config;
  chartView.geometry = initGeometry(config.geometry, chartView.width, chartView.height, devicePixelRatio);
  chartView.chartType = config.chartType;
  chartView.stickLength = zoom * devicePixelRatio;
  chartView.stickMargin = chartView.config.stickMargin * devicePixelRatio;
  chartView.offset = offset;
  chartView.fontSize = chartView.config.fontSize * devicePixelRatio;
  chartView.locale = config.locale;
  initEventListeners();
}
function chartDraw() {
  if (!chartView.ctx) return; // clear drawing

  chartView.ctx.clearRect(0, 0, chartView.width * chartView.devicePixelRatio, chartView.height * chartView.devicePixelRatio); // init current view model

  var width = chartView.geometry.boxPrice.content[2];
  var capacity = Math.floor(width / chartView.stickLength);
  initViewModel(capacity, Math.round(chartView.offset), quotes$1, chartView.locale); // draw all the elements

  var viewModel = getViewModel();
  scaleGrid(chartView, viewModel.quotes, viewModel.priceLines, viewModel.timeLines);
  price(chartView, viewModel.quotes);

  if (chartView.geometry.boxVolume) {
    volume(chartView, viewModel.quotes);
  }

  chartDrawCrosshair();
}
function chartDrawCrosshair() {
  if (!chartView.crosshairCtx) return; // clear drawing

  chartView.crosshairCtx.clearRect(0, 0, chartView.width * chartView.devicePixelRatio, chartView.height * chartView.devicePixelRatio);
  var viewModel = getViewModel();
  scale(chartView, viewModel.quotes, viewModel.priceLines, viewModel.timeLines, viewModel.cursorData);
  var cursorData = crosshair(chartView, viewModel.quotes, viewModel.cursorData, cursor);

  if (viewModel.cursorData[0] !== cursorData[0] || viewModel.cursorData[1] !== cursorData[1]) {
    viewModel.cursorData = cursorData;
    triggerEvent('moveCursor', cursorData);
  }
}
function chartAddEventListener(eventName, listener) {
  addEventListener(eventName, listener);
}
function chartRemoveEventListener(eventName, listener) {
  removeEventListener(eventName, listener);
}

export default { chartAddEventListener, chartDefaultConfig, chartDraw, chartDrawCrosshair, chartGetViewModel, chartInit, chartRemoveEventListener, chartSetCursor, chartThemes };
