import React from 'react';
import { connect } from 'react-redux';

function Suggestions(props) {
  const {suggestions, items} = props;
  let precipSuggestions = suggestions.precip;
  let cloudSuggestions = suggestions.cloud;
  let tempSuggestions = suggestions.temp;
  let allSuggestions = precipSuggestions.concat(cloudSuggestions).concat(tempSuggestions);


  return (
    <div>
        {allSuggestions.map(suggestion => <div key={suggestion.itemId}>{items.find(item => item.id === suggestion.itemId).name}</div>)}
    </div>
  );
}

const mapStateToProps = function(state) {
  return {
      suggestions: state.suggestions,
      items: state.items
  };
};

export default connect(mapStateToProps)(Suggestions);
