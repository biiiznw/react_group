import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import Recipe from './containers/Recipe/Recipe';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Recipe/>
        </Layout>
      </div>
    );
  }
}

export default App;
