import React, { Component } from "react";
import { PropTypes } from "prop-types";

export default class ComponentChunk extends Component {
  static RenderComponent = null;
  state = { RenderComponent: ComponentChunk.RenderComponent };
  componentWillMount() {
    const { chunk } = this.props;
    // Check if the component is not loaded already
    if (!this.state.RenderComponent) {
      chunk.then(module => module.default).then((component) => {
        ComponentChunk.RenderComponent = component;
        this.setState({ RenderComponent: component });
      });
    }
  }
  render() {
    const { RenderComponent } = this.state;
    const { componentProps } = this.props;
    if (RenderComponent) {
      return <RenderComponent {...componentProps} />;
    }
    return null;
  }
}

ComponentChunk.propTypes = {
  chunk: PropTypes.instanceOf(Promise).isRequired,
  componentProps: PropTypes.object
};
ComponentChunk.defaultProps = {
  componentProps: null
};
