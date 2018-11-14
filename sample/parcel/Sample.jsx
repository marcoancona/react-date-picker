import React, { Component } from 'react';
import DatePicker from 'react-date-picker/dist/entry';

import './Sample.less';

export default class Sample extends Component {
  state = {
    value: new Date(),
  }
  inputRef = React.createRef()


  onChange = value => {
    this.setState({ value })
  }

  componentDidMount() {
    this.inputRef.current.focusOn('first');
  }

  render() {
    const { value } = this.state;

    return (
      <div className="Sample">
        <header>
          <h1>react-date-picker sample page</h1>
        </header>
        <div className="Sample__container">
          <main className="Sample__container__content">
            <DatePicker
              ref={this.inputRef}
              onChange={this.onChange}
              value={value}
              showLeadingZeros={true}
              minDate={new Date()}
              onNextNavigation={() => this.inputRef.current.focusOn('first')}
              onPrevNavigation={() => this.inputRef.current.focusOn('last')}
            />
          </main>
        </div>
      </div>
    );
  }
}
