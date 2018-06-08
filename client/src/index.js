import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css'
import Amplify from 'aws-amplify';
// import aws_exports from './aws-exports';
import 'typeface-roboto'


// Amplify.configure(aws_exports);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
