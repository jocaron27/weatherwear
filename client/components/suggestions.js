import React from 'react';
import { connect } from 'react-redux';

function Suggestions(props) {
  const {suggestions, items} = props;
  let precipSuggestions = suggestions.precip;
  let cloudSuggestions = suggestions.cloud;
  let tempSuggestions = suggestions.temp;
  let allSuggestions = precipSuggestions.concat(cloudSuggestions).concat(tempSuggestions);


  return (
    <div id="suggestions" className="suggestions">
      <div className="suggestions-header"><h2>Today's Wearables</h2><hr /></div>
      <div className="suggestions-items">
        {allSuggestions.map(suggestion => <div className="suggestions-single" key={suggestion.itemId}><img className="suggestions-single-icon" src={items.find(item => item.id === suggestion.itemId).icon} /><p>{items.find(item => item.id === suggestion.itemId).name}</p></div>)}
      </div>
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
