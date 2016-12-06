/* @flow */

import React, {Component, PropTypes} from 'react';
import EntityEditorLoader from './EntityEditorLoader';
import {
    mergeWithBaseConfig,
    getConfigAsProps
} from './Config';

export default (userConfig: Object = {}): HockApplier => {
    const  {
        fetchComponent,
        errorComponent,
        receivedWhen = (props) => !!props.list
    } = userConfig;

    return (ComposedComponent: ReactClass<any>): ReactClass<any> => {

        class EntityEditorList extends Component {

            render() {
                const config: Object = mergeWithBaseConfig(this.context.entityEditorRoutes, userConfig);
                const entityEditorProps: Object = {
                    ...getConfigAsProps(config)
                };

                return <ComposedComponent
                    {...this.props}
                    entityEditor={entityEditorProps}
                    entityEditorRoutes={this.context.entityEditorRoutes}
                />;
            }
        }

        EntityEditorList.contextTypes = {
            entityEditorRoutes: PropTypes.object
        };

        return EntityEditorLoader({
            fetchComponent,
            errorComponent,
            receivedWhen
        })(EntityEditorList);
    }
};
