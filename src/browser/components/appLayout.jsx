import * as _ from 'lodash';
import React from 'react';
import { Responsive as ResponsiveGridLayout, WidthProvider } from 'react-grid-layout';
const GridLayout = WidthProvider(ResponsiveGridLayout);

// Need to update layout to work with MobX so we can add/remove items from outside this component
// TODO: Maybe use React.PureComponent? https://60devs.com/pure-component-in-react.html
// TODO: Add & render dynamic items from appLayout appropriately, see https://github.com/STRML/react-grid-layout/blob/master/test/examples/6-dynamic-add-remove.jsx
export default class AppLayout extends React.Component {
    constructor(props) {
        super(props);
        this.layout = [];
        this.state = {
            items: {

            }
        }
    }

    addUI(type) {
        const itemsLength = Object.keys(this.state.items).length;
        const id = `${type}-${itemsLength}`;
        // return (
            
        // );
    }

    removeUI(id) {

    }

    render() {
        return (
            <GridLayout
                className="layout"
                layout={ this.layout }
                onLayoutChange={this.onLayoutChange}
                onBreakpointChange={this.onBreakpointChange}
                {...this.props}>
                {_.map(this.state.items, (type) => this.addUI(type))}
            </GridLayout>
        );
    }
};
// TODO: Are these appropriate defaults?
AppLayout.defaultProps =  {
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    rowHeight: 100,
};