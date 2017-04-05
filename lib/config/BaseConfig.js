'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _EntityEditorConfig = require('./EntityEditorConfig');

var _EntityEditorConfig2 = _interopRequireDefault(_EntityEditorConfig);

var _Modal = require('../modal/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _ModalContent = require('../modal/ModalContent');

var _ModalContent2 = _interopRequireDefault(_ModalContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseConfig = (0, _EntityEditorConfig2.default)({
    item: {
        single: "item"
    },
    actions: {
        get: {
            description: "Gets a single item based on an id. Data about items is received via props, so this object exists just so we can provide an error message.",
            tasks: {
                error: {
                    type: "prompt",
                    prompt: function prompt(_ref) {
                        var item = _ref.item;
                        return {
                            title: "Error",
                            message: _react2.default.createElement(
                                'span',
                                null,
                                'An error has occurred, this ',
                                item,
                                ' could not be loaded right now.'
                            )
                        };
                    }
                }
            }
        },
        list: {
            description: "Lists all items. Data about lists of items is received via props, so this object exists just so we can provide an error message.",
            tasks: {
                error: {
                    type: "prompt",
                    prompt: function prompt(_ref2) {
                        var item = _ref2.item;
                        return {
                            title: "Error",
                            message: function message(_ref3) {
                                var items = _ref3.items;
                                return _react2.default.createElement(
                                    'span',
                                    null,
                                    'An error has occurred, these ',
                                    items,
                                    ' could not be loaded right now.'
                                );
                            }
                        };
                    }
                }
            }
        },
        save: {
            description: "If the item already exists this calls the onUpdate operation, or calls onCreate for new items.",
            workflow: {
                task: "operation",
                onSuccess: {
                    task: "success"
                },
                onError: {
                    task: "error"
                }
            },
            tasks: {
                operation: {
                    type: "operation",
                    operation: function operation(_ref4) {
                        var operations = _ref4.operations;
                        return function (actionProps) {
                            if (!actionProps.payload) {
                                throw 'EntityEditor: config.actions.save: actionProps.payload is not defined';
                            }

                            if (actionProps.id) {
                                return operations.onUpdate(actionProps);
                            }
                            return operations.onCreate(actionProps);
                        };
                    }
                },
                success: {
                    type: "prompt",
                    prompt: function prompt(_ref5) {
                        var Item = _ref5.Item;
                        return {
                            title: "Success",
                            message: _react2.default.createElement(
                                'span',
                                null,
                                Item,
                                ' saved.'
                            ),
                            yes: "Okay"
                        };
                    }
                },
                error: {
                    type: "prompt",
                    prompt: function prompt(_ref6) {
                        var item = _ref6.item;
                        return {
                            title: "Error",
                            message: _react2.default.createElement(
                                'span',
                                null,
                                'An error has occurred, this ',
                                item,
                                ' could not be saved right now.'
                            ),
                            yes: "Okay"
                        };
                    }
                }
            }
        },
        saveNew: {
            description: "Always calls onCreate to make a new item, regardless of whether the data was loaded from an existing item.",
            workflow: {
                task: "confirm",
                onYes: {
                    task: "operation",
                    onSuccess: {
                        task: "success"
                    },
                    onError: {
                        task: "error"
                    }
                }
            },
            tasks: {
                operation: {
                    type: "operation",
                    operation: function operation(_ref7) {
                        var operations = _ref7.operations;
                        return function (actionProps) {
                            if (!actionProps.payload) {
                                throw 'EntityEditor: config.actions.saveNew: actionProps.payload is not defined';
                            }
                            return operations.onCreate(actionProps);
                        };
                    }
                },
                confirm: {
                    type: "prompt",
                    prompt: function prompt(_ref8) {
                        var item = _ref8.item;
                        return {
                            title: "Confirm",
                            message: _react2.default.createElement(
                                'span',
                                null,
                                'Are you sure you want to save this as a new ',
                                item,
                                '?'
                            ),
                            yes: 'Save as new',
                            no: 'Cancel'
                        };
                    }
                },
                success: {
                    type: "prompt",
                    prompt: function prompt(_ref9) {
                        var item = _ref9.item;
                        return {
                            title: "Success",
                            message: _react2.default.createElement(
                                'span',
                                null,
                                'New ',
                                item,
                                ' saved.'
                            ),
                            yes: "Okay"
                        };
                    }
                },
                error: {
                    type: "prompt",
                    prompt: function prompt(_ref10) {
                        var item = _ref10.item;
                        return {
                            title: "Error",
                            message: _react2.default.createElement(
                                'span',
                                null,
                                'An error has occurred, this ',
                                item,
                                ' could not be saved right now.'
                            ),
                            yes: "Okay"
                        };
                    }
                }
            }
        },
        delete: {
            description: "Confirms if the user wants to delete, and calls the onDelete operation for an item.",
            workflow: {
                task: "confirm",
                onYes: {
                    task: "operation",
                    onSuccess: {
                        task: "success"
                    },
                    onError: {
                        task: "error"
                    }
                }
            },
            tasks: {
                operation: {
                    task: "operation",
                    operation: function operation(_ref11) {
                        var operations = _ref11.operations;
                        return function (actionProps) {
                            if (!actionProps.id) {
                                throw 'EntityEditor: config.actions.delete: actionProps.id is not defined';
                            }
                            return operations.onDelete(actionProps);
                        };
                    }
                },
                confirm: {
                    type: "prompt",
                    prompt: function prompt(_ref12) {
                        var item = _ref12.item;
                        return {
                            title: "Confirm",
                            message: _react2.default.createElement(
                                'span',
                                null,
                                'Are you sure you want to delete this ',
                                item,
                                '?'
                            ),
                            yes: 'Delete',
                            no: 'Cancel'
                        };
                    }
                },
                success: {
                    type: "prompt",
                    prompt: function prompt(_ref13) {
                        var Item = _ref13.Item;
                        return {
                            title: "Success",
                            message: _react2.default.createElement(
                                'span',
                                null,
                                Item,
                                ' deleted.'
                            ),
                            yes: "Okay"
                        };
                    }
                },
                error: {
                    type: "prompt",
                    prompt: function prompt(_ref14) {
                        var item = _ref14.item;
                        return {
                            title: "Error",
                            message: _react2.default.createElement(
                                'span',
                                null,
                                'An error has occurred, this ',
                                item,
                                ' could not be deleted right now.'
                            ),
                            yes: "Okay"
                        };
                    }
                }
            }
        },
        dirty: {
            description: "Sets the 'dirty' state of the editor. The editor is dirty when there are unsaved changes.",
            workflow: {
                task: "operation"
            },
            tasks: {
                operation: {
                    task: "operation",
                    operation: function operation(_ref15) {
                        var operations = _ref15.operations;
                        return function (actionProps) {
                            return operations.onDirty({ dirty: actionProps.dirty });
                        };
                    }
                }
            }
        }
    },
    operations: {
        onDirty: function onDirty(_ref16) {
            var setEditorState = _ref16.setEditorState;
            return function (operationProps) {
                setEditorState.dirty(operationProps.dirty);
            };
        },
        onCreateSuccess: function onCreateSuccess(_ref17) {
            var operations = _ref17.operations;
            return function () {
                return operations.onGoList();
            };
        },
        onDeleteSuccess: function onDeleteSuccess(_ref18) {
            var operations = _ref18.operations;
            return function () {
                return operations.onGoList();
            };
        }
    },
    components: {
        loader: function loader(props) {
            return _react2.default.createElement(
                'p',
                null,
                'Loading...'
            );
        },
        /*error: ({title, Message, item}) => {
            return <div>
                <p><strong>{title}</strong></p>
                <Message {...item} />
            </div>;
        },*/
        prompt: function prompt(props) {
            return _react2.default.createElement(_Modal2.default, props);
        },
        promptContent: function promptContent(props) {
            return _react2.default.createElement(_ModalContent2.default, props);
        }
    }
});
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

exports.default = BaseConfig;