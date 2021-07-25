import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const PageTransitionAnimation = (WrappedComponent) => {
    const TransitionedComponent = (props) => (
        <ReactCSSTransitionGroup
                    transitionAppear={true}
                    transitionAppearTimeout={600}
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={200}
                    transitionName="slide">
                    <WrappedComponent {...props} />
        </ReactCSSTransitionGroup>
    );
    return TransitionedComponent;
};

export default PageTransitionAnimation;