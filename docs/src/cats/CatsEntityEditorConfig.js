import {BaseConfig} from 'react-entity-editor';

const CatsEntityEditorConfig = BaseConfig.merge({
    item: {
        /*
         * "Item" is where you can name your entities
         * it accepts "single" and "plural" strings
         * it plural is not set here, plural entities will be the single item with an "s" on the end
         * if nothing is specified here, the default name will be "item"
         */
        single: "cat"
    },
    tasks: {
        /*
         * In most cases "tasks" will already be set for you in BaseConfig,
         * but you may want to change them or add to them.
         *
         * This overrides the "statusOutput" of the two save tasks,
         * telling them to pass down status as props instead of using the modal.
         * These props are then used in CatsItem to render the status title next to the save button.
         */
        saveOperate: {
            statusOutput: "props"
        },
        saveSuccess: {
            statusOutput: "props"
        }
    },
    operations: {
        /*
         * "Operations" is where you define what happens for each operations
         * Wer'e basing this config off of BaseConfig, so you need to provide create, update, delete for editing items
         * and go for navigating between views
         *
         * In each operation the first function signature provides an operationProps object.
         * This contains all the data modifing functions returned from operationProps
         * (and also all operation functions in this editor, which isn't used in this example)
         *
         * All operationProps functions return a promise, even when the original function does not.
         *
         * The second function signature provides an actionProps object.
         * This contains the data to use with your operations, passed from the original action function call
         *
         * Always return the promise from these functions if you have one!
         * If not, then returning nothing or true will be interpreted as a success,
         * or returning false will be interpreted as an error.
         */
        create: ({onCreate, onGo}) => ({payload}) => {
            return onCreate(payload)
                .then((result) => onGo({ // once created, navigate to the edit page for the new item
                    id: result.id,
                    view: "item"
                }));
        },
        update: ({onUpdate}) => ({id, payload}) => {
            return onUpdate(id, payload);
        },
        delete: ({onDelete, onGo}) => ({id}) => {
            return onDelete(id)
                .then(() => onGo({ // once deleted, navigate to the list page
                    id: null,
                    view: "list"
                }));
        },
        go: ({onGo}) => ({id, view}) => {
            return onGo({id, view});
        }
    },
    operationProps: (props) => {
        /*
         * "OperationProps" allows you to pass selected function props from your editor component
         * and make them always available from within your operations.
         * Here we have all write functions and navigation functions given by the CatsStore.
         *
         * ASYNC!
         * In the cats example we are using the async methods from the CatsStore.
         * These add a lag to simulate an XHR request, and they each return a promise.
         * No other code needs to change to accommodate these async functions.
         */
        return {
            onCreate: props.onCreateAsync,
            onUpdate: props.onUpdateAsync,
            onDelete: props.onDeleteAsync,
            onGo: props.onGo
        }
    }
});

export default CatsEntityEditorConfig;
