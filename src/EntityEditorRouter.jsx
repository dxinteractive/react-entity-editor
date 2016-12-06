/* @flow */

import React, {Component, PropTypes} from 'react';
import {Route, IndexRoute, withRouter} from 'react-router';
import {List, fromJS} from 'immutable';

type Params = {
    itemComponent: ReactClass<any>,
    listComponent: ReactClass<any>,
    paramId: string
};

const routePatterns: List<RegExp> = List.of(
    /^new$/,
    /\/edit$/
);

export function createEditorRoutes(params: Params): ReactClass<Route> {
    const {
        itemComponent,
        listComponent,
        paramId = 'id'
    } = params;

    if(!itemComponent) {
        throw `EntityEditorRouteer.createEditorRoutes() must be passed an object with an itemComponent property, which should be a React components to be rendered when editing an item`;
    }

    return <Route>
        {listComponent && <IndexRoute component={wrapListComponent()(listComponent)} />}
        <Route path="new" component={wrapItemComponent({paramId})(itemComponent)} />
        <Route path={`:${paramId}/edit`} component={wrapItemComponent({paramId})(itemComponent)} />
    </Route>;
}




/*
function ItemComponentWrapper(paramId: string): ReactClass<any> {

    class EntityEditorItemWrapper extends Component {

        componentWillMount() {
            this.onLeaveHook = (callback) => {
                this.props.router.setRouteLeaveHook(this.props.route, callback);
            };
        }
}*/

function getBasePath(routes: Array<any>): string {
    return "/" + fromJS(routes)
        .filter(ii => !!ii.get('path') && ii.get('path') != "/") // remove routes that don't add to the path
        .map(ii => ii.get('path')) // get path for each route
        .takeWhile(path => { // only keep routes not made by entity editor
            return !routePatterns.some(test => test.test(path));
        })
        .join("/");
}

function getRouteProps(props: Object): Object {
    const {
        router,
        routes
    } = props;

    const base: string = getBasePath(routes);
    const paths: Function = (id: string) => ({
        base,
        list: base,
        new: `${base}/new`,
        edit: `${base}/${id}/edit`
    });

    const callbacks: Object = {
        onGoList: () => {
            router.push(paths().list);
        },
        onGoNew: () => {
            router.push(paths().new);
        },
        onGoEdit: (props: {id: string}) => {
            router.push(paths(props.id).edit);
        }
    };

    return {
        paths,
        callbacks
    };
}

function wrapItemComponent(config: Object = {}): HockApplier {
    const {
        paramId
    } = config;

    return (ComposedComponent: ReactClass<any>): ReactClass<any> => {

        class EntityEditorItemWrapper extends Component {

            /*
            componentWillMount() {
                this.onLeaveHook = (callback) => {
                    this.props.router.setRouteLeaveHook(this.props.route, callback);
                };
            }
            */

            getChildContext() {
                return {
                    entityEditorRoutes: getRouteProps(this.props)
                };
            }

            render() {
                const entityEditorRoutesProps: Object = {
                    ...getRouteProps(this.props),
                    id: this.props.params[paramId]
                };

                return <ComposedComponent
                    {...this.props}
                    entityEditorRoutes={entityEditorRoutesProps}
                />;
            }
        }

        EntityEditorItemWrapper.propTypes = {
            routes: PropTypes.array.isRequired,
            params: PropTypes.object.isRequired,
            router: PropTypes.object
        };

        EntityEditorItemWrapper.childContextTypes = {
            entityEditorRoutes: PropTypes.object
        };

        return withRouter(EntityEditorItemWrapper);
    };
}

function wrapListComponent(config: Object = {}): HockApplier {

    return (ComposedComponent: ReactClass<any>): ReactClass<any> => {

        class EntityEditorListWrapper extends Component {

            getChildContext() {
                return {
                    entityEditorRoutes: getRouteProps(this.props)
                };
            }

            render() {
                return <ComposedComponent
                    {...this.props}
                    entityEditorRoutes={getRouteProps(this.props)}
                />;
            }
        }

        EntityEditorListWrapper.propTypes = {
            routes: PropTypes.array.isRequired,
            params: PropTypes.object.isRequired,
            router: PropTypes.object
        };

        EntityEditorListWrapper.childContextTypes = {
            entityEditorRoutes: PropTypes.object
        };

        return withRouter(EntityEditorListWrapper);
    };
}
