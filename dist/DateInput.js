'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactLifecyclesCompat = require('react-lifecycles-compat');

var _Divider = require('./Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _DayInput = require('./DateInput/DayInput');

var _DayInput2 = _interopRequireDefault(_DayInput);

var _MonthInput = require('./DateInput/MonthInput');

var _MonthInput2 = _interopRequireDefault(_MonthInput);

var _YearInput = require('./DateInput/YearInput');

var _YearInput2 = _interopRequireDefault(_YearInput);

var _NativeInput = require('./DateInput/NativeInput');

var _NativeInput2 = _interopRequireDefault(_NativeInput);

var _dateFormatter = require('./shared/dateFormatter');

var _dates = require('./shared/dates');

var _propTypes3 = require('./shared/propTypes');

var _utils = require('./shared/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaultMinDate = new Date(-8.64e15);
var defaultMaxDate = new Date(8.64e15);
var allViews = ['century', 'decade', 'year', 'month'];
var allValueTypes = [].concat(_toConsumableArray(allViews.slice(1)), ['day']);

var datesAreDifferent = function datesAreDifferent(date1, date2) {
  return date1 && !date2 || !date1 && date2 || date1 && date2 && date1.getTime() !== date2.getTime();
};

/**
 * Returns value type that can be returned with currently applied settings.
 */
var getValueType = function getValueType(maxDetail) {
  return allValueTypes[allViews.indexOf(maxDetail)];
};

var getValueFrom = function getValueFrom(value) {
  if (!value) {
    return null;
  }

  var rawValueFrom = value instanceof Array && value.length === 2 ? value[0] : value;

  if (!rawValueFrom) {
    return null;
  }

  var valueFromDate = new Date(rawValueFrom);

  if (isNaN(valueFromDate.getTime())) {
    throw new Error('Invalid date: ' + value);
  }

  return valueFromDate;
};

var getDetailValueFrom = function getDetailValueFrom(value, minDate, maxDate, maxDetail) {
  var valueFrom = getValueFrom(value);

  if (!valueFrom) {
    return null;
  }

  var detailValueFrom = (0, _dates.getBegin)(getValueType(maxDetail), valueFrom);

  return (0, _utils.between)(detailValueFrom, minDate, maxDate);
};

var getValueTo = function getValueTo(value) {
  if (!value) {
    return null;
  }

  var rawValueTo = value instanceof Array && value.length === 2 ? value[1] : value;

  if (!rawValueTo) {
    return null;
  }

  var valueToDate = new Date(rawValueTo);

  if (isNaN(valueToDate.getTime())) {
    throw new Error('Invalid date: ' + value);
  }

  return valueToDate;
};

var getDetailValueTo = function getDetailValueTo(value, minDate, maxDate, maxDetail) {
  var valueTo = getValueTo(value);

  if (!valueTo) {
    return null;
  }

  var detailValueTo = (0, _dates.getEnd)(getValueType(maxDetail), valueTo);

  return (0, _utils.between)(detailValueTo, minDate, maxDate);
};

var getDetailValueArray = function getDetailValueArray(value, minDate, maxDate, maxDetail) {
  if (value instanceof Array) {
    return value;
  }

  return [getDetailValueFrom(value, minDate, maxDate, maxDetail), getDetailValueTo(value, minDate, maxDate, maxDetail)];
};

var findPreviousInput = function findPreviousInput(element) {
  var previousElement = element.previousElementSibling; // Divider between inputs
  if (!previousElement) {
    return null;
  }
  return previousElement.previousElementSibling; // Actual input
};

var findNextInput = function findNextInput(element) {
  var nextElement = element.nextElementSibling; // Divider between inputs
  if (!nextElement) {
    return null;
  }
  return nextElement.nextElementSibling; // Actual input
};

var focus = function focus(element) {
  return element && element.focus();
};

var removeUnwantedCharacters = function removeUnwantedCharacters(str) {
  return str.replace(/[年月日]/g, '/').split('').filter(function (a) {
    return (
      // We don't want spaces in dates
      a.charCodeAt(0) !== 32
      // Internet Explorer specific
      && a.charCodeAt(0) !== 8206
      // Remove non-ASCII characters
      && /^[\x20-\x7F]*$/.test(a)
    );
  }).join('');
};

var DateInput = function (_PureComponent) {
  _inherits(DateInput, _PureComponent);

  function DateInput() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateInput.__proto__ || Object.getPrototypeOf(DateInput)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      year: null,
      month: null,
      day: null
    }, _this.isValidDate = function (date) {
      var formElements = [_this.dayInput, _this.monthInput, _this.yearInput].filter(Boolean);
      var isValid = date >= (_this.props.minDate || defaultMinDate) && date <= (_this.props.maxDate || defaultMaxDate);
      if (isValid) {
        formElements.forEach(function (el) {
          return el.setCustomValidity('');
        });
        return true;
      } else {
        formElements.forEach(function (el) {
          return el.setCustomValidity('Invalid range');
        });
        return false;
      }
    }, _this.onKeyDown = function (event) {
      switch (event.key) {
        case 'ArrowUp':
          {
            event.preventDefault();
            var key = event.target.name;
            var value = _this.state.value;

            var nextValue = new Date(value);
            if (key === 'day') {
              nextValue.setDate(nextValue.getDate() + 1);
            } else if (key === 'month') {
              nextValue.setMonth(nextValue.getMonth() + 1);
            } else if (key === 'year') {
              nextValue.setFullYear(nextValue.getFullYear() + 1);
            }
            _this.onChangeKeyEvent(nextValue);
            break;
          }
        case 'ArrowDown':
          {
            event.preventDefault();
            var _key2 = event.target.name;
            var _value = _this.state.value;

            var _nextValue = new Date(_value);
            if (_key2 === 'day') {
              _nextValue.setDate(_nextValue.getDate() - 1);
            } else if (_key2 === 'month') {
              _nextValue.setMonth(_nextValue.getMonth() - 1);
            } else if (_key2 === 'year') {
              _nextValue.setFullYear(_nextValue.getFullYear() - 1);
            }
            _this.onChangeKeyEvent(_nextValue);
            break;
          }
        case 'ArrowLeft':
          {
            event.preventDefault();
            var onPrevNavigation = _this.props.onPrevNavigation;

            var input = event.target;
            var previousInput = findPreviousInput(input);
            focus(previousInput);
            if (!previousInput && onPrevNavigation) onPrevNavigation();
            break;
          }
        case 'Tab':
        case 'ArrowRight':
        case _this.divider:
          {
            event.preventDefault();
            var onNextNavigation = _this.props.onNextNavigation;

            var _input = event.target;
            var nextInput = findNextInput(_input);
            focus(nextInput);
            if (!nextInput && onNextNavigation) onNextNavigation();
            break;
          }
        default:
      }
    }, _this.onChange = function (event) {
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;


      _this.setState(_defineProperty({}, name, value ? parseInt(value, 10) : null), _this.onChangeExternal);
    }, _this.onChangeNative = function (event) {
      var onChange = _this.props.onChange;
      var value = event.target.value;


      if (!onChange) {
        return;
      }

      var processedValue = function () {
        if (!value) {
          return null;
        }

        var _value$split = value.split('-'),
            _value$split2 = _slicedToArray(_value$split, 3),
            yearString = _value$split2[0],
            monthString = _value$split2[1],
            dayString = _value$split2[2];

        var year = parseInt(yearString, 10);
        var monthIndex = parseInt(monthString, 10) - 1 || 0;
        var date = parseInt(dayString, 10) || 1;

        return new Date(year, monthIndex, date);
      }();

      onChange(processedValue, false);
    }, _this.onChangeKeyEvent = function (proposedValue) {
      var onChange = _this.props.onChange;


      if (!onChange) {
        return;
      }
      if (_this.isValidDate(proposedValue)) {
        var processedValue = _this.getProcessedValue(proposedValue);
        onChange(processedValue, false);
      }
    }, _this.onChangeExternal = function () {
      var onChange = _this.props.onChange;


      if (!onChange) {
        return;
      }

      var formElements = [_this.dayInput, _this.monthInput, _this.yearInput].filter(Boolean);
      var activeElement = formElements.find(function (el) {
        return document.activeElement === el;
      });

      var values = {};
      formElements.forEach(function (formElement) {
        values[formElement.name] = formElement.value;
      });
      if (formElements.every(function (formElement) {
        return !formElement.value;
      })) {
        onChange(null, false);
      } else if (Date.parse(values.year + '-' + values.month + '-' + values.day)) {
        var proposedValue = new Date(values.year, (values.month || 1) - 1, values.day || 1);
        if (_this.isValidDate(proposedValue)) {
          var processedValue = _this.getProcessedValue(proposedValue);
          onChange(processedValue, false);
        }
      } else if (activeElement) {
        activeElement.setCustomValidity('Invalid date');
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateInput, [{
    key: 'focusOn',
    value: function focusOn(elName) {
      var _this2 = this;

      if (elName === 'first' || elName === 'last') {
        var allInputs = ['yearInput', 'monthInput', 'dayInput'];
        var elementName = allInputs.find(function (el) {
          return !!_this2[el];
        });
        if (elementName) {
          var inputEl = this[elementName];
          var findSibling = elName === 'first' ? findPreviousInput : findNextInput;
          while (findSibling(inputEl)) {
            inputEl = findSibling(inputEl);
          }
          focus(inputEl);
        }
      } else {
        focus(this[elName + 'Input']);
      }
    }
  }, {
    key: 'getProcessedValue',


    /**
     * Gets current value in a desired format.
     */
    value: function getProcessedValue(value) {
      var _props = this.props,
          minDate = _props.minDate,
          maxDate = _props.maxDate,
          maxDetail = _props.maxDetail,
          returnValue = _props.returnValue;


      switch (returnValue) {
        case 'start':
          return getDetailValueFrom(value, minDate, maxDate, maxDetail);
        case 'end':
          return getDetailValueTo(value, minDate, maxDate, maxDetail);
        case 'range':
          return getDetailValueArray(value, minDate, maxDate, maxDetail);
        default:
          throw new Error('Invalid returnValue.');
      }
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'renderDay',
    value: function renderDay() {
      var _props2 = this.props,
          maxDetail = _props2.maxDetail,
          showLeadingZeros = _props2.showLeadingZeros;

      // Do not display if maxDetail is "year" or less

      if (allViews.indexOf(maxDetail) < 3) {
        return null;
      }

      var value = this.state.day;


      return _react2.default.createElement(_DayInput2.default, _extends({
        key: 'day'
      }, this.commonInputProps, {
        maxDetail: maxDetail,
        showLeadingZeros: showLeadingZeros,
        value: value
      }));
    }
  }, {
    key: 'renderMonth',
    value: function renderMonth() {
      var _props3 = this.props,
          maxDetail = _props3.maxDetail,
          showLeadingZeros = _props3.showLeadingZeros;

      // Do not display if maxDetail is "decade" or less

      if (allViews.indexOf(maxDetail) < 2) {
        return null;
      }

      var value = this.state.month;


      return _react2.default.createElement(_MonthInput2.default, _extends({
        key: 'month'
      }, this.commonInputProps, {
        maxDetail: maxDetail,
        showLeadingZeros: showLeadingZeros,
        value: value
      }));
    }
  }, {
    key: 'renderYear',
    value: function renderYear() {
      var year = this.state.year;


      return _react2.default.createElement(_YearInput2.default, _extends({
        key: 'year'
      }, this.commonInputProps, {
        value: year,
        valueType: this.valueType
      }));
    }
  }, {
    key: 'renderCustomInputs',
    value: function renderCustomInputs() {
      var _this3 = this;

      var divider = this.divider,
          placeholder = this.placeholder;


      return placeholder.split(divider).map(function (part) {
        switch (part) {
          case 'day':
            return _this3.renderDay();
          case 'month':
            return _this3.renderMonth();
          case 'year':
            return _this3.renderYear();
          default:
            return null;
        }
      }).filter(Boolean).reduce(function (result, element, index) {
        if (index) {
          result.push(
          // eslint-disable-next-line react/no-array-index-key
          _react2.default.createElement(
            _Divider2.default,
            { key: 'separator_' + index },
            divider
          ));
        }

        result.push(element);

        return result;
      }, []);
    }
  }, {
    key: 'renderNativeInput',
    value: function renderNativeInput() {
      var _props4 = this.props,
          disabled = _props4.disabled,
          maxDate = _props4.maxDate,
          minDate = _props4.minDate,
          name = _props4.name,
          required = _props4.required,
          value = _props4.value;


      return _react2.default.createElement(_NativeInput2.default, {
        key: 'date',
        disabled: disabled,
        maxDate: maxDate || defaultMaxDate,
        minDate: minDate || defaultMinDate,
        name: name,
        onChange: this.onChangeNative,
        required: required,
        value: value,
        valueType: this.valueType
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var className = this.props.className;


      return _react2.default.createElement(
        'div',
        { className: className },
        this.renderNativeInput(),
        this.renderCustomInputs()
      );
    }
  }, {
    key: 'divider',
    get: function get() {
      return '/';
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'placeholder',
    get: function get() {
      var locale = this.props.locale;

      if (locale === 'en-US') {
        return 'month/day/year';
      }
      return 'day/month/year';
    }
  }, {
    key: 'commonInputProps',
    get: function get() {
      var _this4 = this;

      var _props5 = this.props,
          className = _props5.className,
          disabled = _props5.disabled,
          isCalendarOpen = _props5.isCalendarOpen,
          maxDate = _props5.maxDate,
          minDate = _props5.minDate,
          required = _props5.required;


      return {
        className: className,
        disabled: disabled,
        maxDate: maxDate || defaultMaxDate,
        minDate: minDate || defaultMinDate,
        onChange: this.onChange,
        onKeyDown: this.onKeyDown,
        // This is only for showing validity when editing
        required: required || isCalendarOpen,
        itemRef: function itemRef(ref, name) {
          // Save a reference to each input field
          _this4[name + 'Input'] = ref;
        }
      };
    }
  }, {
    key: 'valueType',
    get: function get() {
      var maxDetail = this.props.maxDetail;


      return getValueType(maxDetail);
    }

    /**
     * Called when non-native date input is changed.
     */


    /**
     * Called when native date input is changed.
     */


    /**
     * Called after internal onChange. Checks input validity. If all fields are valid,
     * calls props.onChange.
     */

  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var minDate = nextProps.minDate,
          maxDate = nextProps.maxDate,
          maxDetail = nextProps.maxDetail;


      var nextState = {};

      /**
       * If isCalendarOpen flag has changed, we have to update it.
       * It's saved in state purely for use in getDerivedStateFromProps.
       */
      if (nextProps.isCalendarOpen !== prevState.isCalendarOpen) {
        nextState.isCalendarOpen = nextProps.isCalendarOpen;
      }

      /**
       * If the next value is different from the current one  (with an exception of situation in
       * which values provided are limited by minDate and maxDate so that the dates are the same),
       * get a new one.
       */
      var nextValue = getDetailValueFrom(nextProps.value, minDate, maxDate, maxDetail);
      var values = [nextValue, prevState.value];
      if (
      // Toggling calendar visibility resets values
      nextState.isCalendarOpen // Flag was toggled
      || datesAreDifferent.apply(undefined, _toConsumableArray(values.map(function (value) {
        return getDetailValueFrom(value, minDate, maxDate, maxDetail);
      }))) || datesAreDifferent.apply(undefined, _toConsumableArray(values.map(function (value) {
        return getDetailValueTo(value, minDate, maxDate, maxDetail);
      })))) {
        if (nextValue) {
          nextState.year = (0, _dates.getYear)(nextValue);
          nextState.month = (0, _dates.getMonth)(nextValue);
          nextState.day = (0, _dates.getDay)(nextValue);
        } else {
          nextState.year = null;
          nextState.month = null;
          nextState.day = null;
        }
        nextState.value = nextValue;
      }

      return nextState;
    }
  }]);

  return DateInput;
}(_react.PureComponent);

exports.default = DateInput;


DateInput.defaultProps = {
  maxDetail: 'month',
  name: 'date',
  returnValue: 'start'
};

DateInput.propTypes = {
  className: _propTypes2.default.string.isRequired,
  disabled: _propTypes2.default.bool,
  isCalendarOpen: _propTypes2.default.bool,
  locale: _propTypes2.default.string,
  maxDate: _propTypes3.isMaxDate,
  maxDetail: _propTypes2.default.oneOf(allViews),
  minDate: _propTypes3.isMinDate,
  name: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  onPrevNavigation: _propTypes2.default.func,
  onNextNavigation: _propTypes2.default.func,
  returnValue: _propTypes2.default.oneOf(['start', 'end', 'range']),
  required: _propTypes2.default.bool,
  showLeadingZeros: _propTypes2.default.bool,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(Date)])
};

(0, _reactLifecyclesCompat.polyfill)(DateInput);