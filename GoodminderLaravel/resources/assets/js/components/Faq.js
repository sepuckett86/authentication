import React, {Component} from 'react';

import Footer from './Footer';

class Faq extends Component {

  render() {
    return (
      <main>
      <div className="bgimg-2 parallax">
        <div className="caption">
          <span className="border comfortaa">FAQ</span>
        </div>
      </div>
      <div className="opaque-container">
        <div className="container">
          <br/>

          <br/>
          <p>
            <b>Question</b>: What is different about Goodminder compared to other quote websites?</p>
          <p>
            <b>Answer 1</b>: Prompts inspire you to remember the positive moments.</p>
          <p>
            <b>Answer 2</b>: All of your goodminders are private by default. Self-honesty and your well-being are the focuses here.</p>

          <hr/>
          <br/>
        </div>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>
        <br/><br/>

      </div>
      <Footer />
    </main>
  );
  }
}

export default Faq;
