import React, { Component } from 'react';

import Footer from './Footer';
import Privacy from './Privacy';

class Legal extends Component {

  render() {
    return (
      <main>
        <div className='log-box'>
        <nav>
  <div className="nav nav-tabs" id="nav-tab" role="tablist">
    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Privacy</a>
    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Terms of Service</a>
  </div>
</nav>
<div className="tab-content" id="nav-tabContent">
  <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"><Privacy /></div>
  <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
</div>
</div>
<Footer />
	     </main>
    )
  }
};

export default Legal;
