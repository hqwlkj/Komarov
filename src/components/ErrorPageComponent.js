'use strict';

import React from 'react';

require('styles//ErrorPage.less');

class ErrorPageComponent extends React.Component {
  render() {
    return (
      <div className="errorpage-component">
        Please edit src/components///ErrorPageComponent.js to update this component!
      </div>
    );
  }
}

ErrorPageComponent.displayName = 'ErrorPageComponent';

// Uncomment properties you need
// ErrorPageComponent.propTypes = {};
// ErrorPageComponent.defaultProps = {};

export default ErrorPageComponent;
