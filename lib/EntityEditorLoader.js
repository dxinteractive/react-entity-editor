'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


    return function (ComposedComponent) {
        var EntityEditorLoader = function (_Component) {
            _inherits(EntityEditorLoader, _Component);

            function EntityEditorLoader() {
                _classCallCheck(this, EntityEditorLoader);

                return _possibleConstructorReturn(this, (EntityEditorLoader.__proto__ || Object.getPrototypeOf(EntityEditorLoader)).apply(this, arguments));
            }

            _createClass(EntityEditorLoader, [{
                key: 'render',
                value: function render() {
                    var _props = this.props,
                        fetch = _props.fetch,
                        error = _props.error,
                        fetchComponent = _props.fetchComponent,
                        errorComponent = _props.errorComponent,
                        passThroughWhen = _props.passThroughWhen,
                        receivedWhen = _props.receivedWhen;


                    if (passThroughWhen && passThroughWhen(this.props)) {
                        return this.renderComposedComponent();
                    }
                    if (fetch) {
                        return fetchComponent(this.props);
                    }
                    if (error) {
                        return errorComponent(this.props);
                    }
                    if (receivedWhen && !receivedWhen(this.props)) {
                        return null;
                    }
                    return this.renderComposedComponent();
                }
            }, {
                key: 'renderComposedComponent',
                value: function renderComposedComponent() {
                    var filteredProps = Object.assign({}, this.props);
                    delete filteredProps.fetch;
                    delete filteredProps.error;
                    delete filteredProps.fetchComponent;
                    delete filteredProps.errorComponent;
                    delete filteredProps.passThroughWhen;
                    delete filteredProps.receivedWhen;

                    return _react2.default.createElement(ComposedComponent, filteredProps);
                }
            }]);

            return EntityEditorLoader;
        }(_react.Component);

        EntityEditorLoader.propTypes = {
            fetch: _react.PropTypes.bool,
            error: _react.PropTypes.object,
            fetchComponent: _react.PropTypes.func,
            errorComponent: _react.PropTypes.func,
            passThroughWhen: _react.PropTypes.func,
            receivedWhen: _react.PropTypes.func
        };

        EntityEditorLoader.defaultProps = {
            fetch: false,
            error: null,
            fetchComponent: config.fetchComponent ? config.fetchComponent : function () {
                return _react2.default.createElement(
                    'p',
                    null,
                    'Loading...'
                );
            },
            errorComponent: config.errorComponent ? config.errorComponent : function () {
                return _react2.default.createElement(
                    'p',
                    null,
                    'Error'
                );
            },
            passThroughWhen: config.passThroughWhen || null,
            receivedWhen: config.receivedWhen || null
        };

        return EntityEditorLoader;
    };
};