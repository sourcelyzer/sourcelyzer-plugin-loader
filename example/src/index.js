import * as d3 from 'd3';
import axios from 'axios';

/**
 * This plugin will bundle d3, but will try to load
 * axios from the Sourcelyzer app instead
 */
sourcelyzer_plugin(function() {
  return {
    run() {
      axios.get('/somewhere')
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.error(error);
      });
    }
  };
});

