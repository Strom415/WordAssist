import React from 'react';
import axios from 'axios';
import Board from './Board';
import Entry from './Entry';
import List from './List';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anagrams: [],
      definition: { word: 'Type your letters and click Get to see all possible anagrams' },
      entry: '',
      entries: [],
      letters: [],
      longest: '',
      round: 'pre',
      timer: 1,
      uniques: 0,
    };

    this.addEntry = this.addEntry.bind(this);
    this.addLetter = this.addLetter.bind(this);
    this.autofill = this.autofill.bind(this);
    this.getAnagrams = this.getAnagrams.bind(this);
    this.getDefinition = this.getDefinition.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.tick = this.tick.bind(this);
  }

  getAnagrams() {
    const { letters } = this.state;
    const query = letters.join('').toLowerCase();
    axios.get('/anagrams', { params: { data: query } }).then((res) => {
      this.setState({ anagrams: res.data });
    });
  }

  getDefinition(e) {
    const query = e.target.textContent;
    axios.get('/definition', { params: { data: query } }).then((res) => {
      this.setState({
        definition: { word: res.data.word, pos: res.data.category, def: res.data.definition },
      });
    });
  }

  addLetter(e, cb) {
    const { letters } = this.state;
    const pool = e.target.id === 'vowel'
      ? ['A', 'A', 'A', 'A', 'A', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'O', 'O', 'O', 'O', 'U', 'U']
      : ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'F', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'J', 'K', 'K', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'M', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P', 'Q', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'V', 'V', 'V', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'X', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Z'];
    const num = Math.floor(Math.random() * pool.length);
    // const occurences = letters.filter(letter => letter === pool[num]).length;

    if (letters.length < 9) { this.setState({ letters: letters.concat(pool[num]) }, cb); }
  }

  autofill(counter = 9) {
    if (counter < 1) { return; }
    const pool = Math.floor(Math.random() * 2) === 1 ? { target: { id: 'con' } } : { target: { id: 'vowel' } };
    this.addLetter(pool, this.autofill.bind(this, counter - 1));
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ entry: e.target.value, letters: [...e.target.value].slice(0, 9) });
  }

  addEntry(e) {
    this.setState({
      definition: { word: 'click a word for its definition' },
      entry: '',
    }, this.getAnagrams());
    e.preventDefault();
  }

  tick() {
    const { timer } = this.state;
    if (timer === 0) {
      clearInterval(this.intervalHandle);
      this.checkEntries();
      this.setState({
        definition: { word: 'click a word for its definition' },
        round: 'post',
      });
    } else { this.setState({ timer: timer - 1 }); }
  }

  startTimer() {
    const { letters, round } = this.state;
    if (round === 'pre' && letters.length === 9) {
      document.getElementById('input').focus();
      this.getAnagrams();
      this.setState({ round: 'active', definition: { pos: 'good luck' } });
      this.intervalHandle = setInterval(this.tick, 1000);
    }
  }

  checkEntries() {
    const { anagrams } = this.state; let { entries } = this.state;
    const set = new Set();
    let longest = '';

    entries = entries.map((entry) => {
      if (anagrams.includes(entry.word)) {
        set.add(entry.word);
        if (entry.word.length > longest.length) { longest = entry.word; }
        return { class: 'correct', word: entry.word };
      } return { class: 'wrong', word: entry.word };
    });
    this.setState({ entries, longest, uniques: set.size });
  }

  reset() {
    this.setState({
      round: 'pre',
      anagrams: [],
      definition: { word: 'Add 9 letters by clicking the vowel & consonant buttons above. Click Start to begin the round' },
      entries: [],
      letters: [],
      timer: 45,
    });
  }

  render() {
    const {
      anagrams, definition, entries, entry, letters, longest, round, timer, uniques,
    } = this.state;
    return (
      <div>
        <span id="stamp">
          game by
          <a href="https://www.linkedin.com/in/matt-strom/" target="_blank">Matt Strom</a>
        </span>
        <Board
          addLetter={this.addLetter}
          autofill={this.autofill}
          definition={definition}
          letters={letters}
          longest={longest}
          reset={this.reset}
          round={round}
          startTimer={this.startTimer}
          timer={timer}
          uniques={uniques}
        />
        <div id="container">
          <Entry
            addEntry={this.addEntry}
            entries={entries}
            entry={entry}
            handleChange={this.handleChange}
          />
          <List
            anagrams={anagrams}
            getDefinition={this.getDefinition}
          />
        </div>
      </div>
    );
  }
}
export default App;
