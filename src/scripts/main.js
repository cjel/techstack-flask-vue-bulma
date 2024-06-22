import '../styles/app.sass';
import { createApp }  from 'vue';
import app            from './app.vue.coffee'
import camelCase      from "lodash/camelCase";
import upperFirst     from "lodash/upperFirst";
import test2 from '../components/test2.vue'
//import test3 from './actions/test3.vue.js'
import test4 from './actions/test4.vue.coffee'

const appInstance = createApp(app);
//const appInstance = createApp();
appInstance.component('test2', test2);
//appInstance.component('test3', test3);
appInstance.component('test4', test4);

//var components = {};
//const requireComponent = require.context(
//  ".",
//  true,
//  /^\.\/(?!legacy)[\w\/-]+\/[\w-]+\.vue\.(js|coffee)$/
//);
//requireComponent.keys().forEach(fileName => {
//  const componentConfig = requireComponent(fileName);
//  const componentName = upperFirst(
//    camelCase(fileName.match(/([^\/]*)\.vue\.(js|coffee)$/)[1])
//  );
//  var component = appInstance.component(
//    componentName,
//    componentConfig.default || componentConfig
//  );
//  components[componentName] = component;
//
//});

appInstance.mount('#app');
