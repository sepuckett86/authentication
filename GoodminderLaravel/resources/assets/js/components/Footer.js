import React, { Component } from 'react';

import '../../css/Footer.css';

class Footer extends Component {

  render() {
    return (
			<footer>
				<p className="full-text"><span style={{float: "left"}}>{" "}{" "}{" "}{" "}</span>Copyright © 2018{" "}|{" "}<a href="https://github.com/sepuckett86" className="button-clear">sepuckett86</a>{" "}and
					 <a href="https://github.com/codegold79" className="button-clear">{" "}codegold79</a><span style={{float: "right"}}>{" "}{" "}{" "}{" "}</span></p>

			  <p className="short-text"><span style={{float: "left"}}>{" "}{" "}{" "}{" "}
				</span> © 2018  | <a href="https://github.com/sepuckett86" className="button-clear">sepuckett86</a> &
				<a href="https://github.com/codegold79" className="button-clear">{" "}codegold79</a><span style={{float: "right"}}>{" "}{" "}{" "}{" "}</span></p>

      </footer>
    )
  }
};

export default Footer;
