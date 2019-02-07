import PropTypes from 'prop-types';
import React from 'react';

const Entry = ({
  addEntry, entries, entry, handleChange,
}) => (
  <div id="entries" className="column">
    <form id="search" onSubmit={addEntry}>
      <input
        id="input"
        type="text"
        autoComplete="off"
        value={entry} 
        onChange={handleChange}
      />
      <button type="submit">
        Get
      </button>
    </form>
    <div className="allEntries">
      { entries.map(ele => (
        <div className={ele.class}>
          {ele.word}
        </div>)) }
    </div>
  </div>
);

Entry.propTypes = {
  addEntry: PropTypes.func.isRequired,
  entries: PropTypes.arrayOf(PropTypes.string).isRequired,
  entry: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
export default Entry;
