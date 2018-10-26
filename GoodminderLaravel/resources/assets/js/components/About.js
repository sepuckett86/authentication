import React from 'react';
import Footer from './Footer';
import logo_dark from '../../images/logo_dark.png';

export default () => {
  return(
    <main>

      <div className="bgimg-2 parallax">
        <div className="caption">
          <span className="border comfortaa">About</span>
        </div>
      </div>
      <div className="opaque-container">
        <div className="container">

          <br/><br/>
          <h1>Living in a digital age</h1>

          <p>
            It is easy to be distracted by social media and entertainment rather than focus on our own lives. How can we remember to appreciate the positive things in our day-to-day reality while continuing to participate in this digital age?</p>
          <br/>
          <hr/>
          <br />
          <h1>Enter
            <img src={logo_dark} alt="logoDark" height="60px"/>Goodminder</h1>
          <p>
            <b>Explicitly you.</b>
          </p>

          <p>Goodminder is a similar to a journal, yet is more focused. Prompts help you think of things worth recording in your life. You can also save quotes or custom text that is meaningful to you. </p>
          <p>Having a bad day? Log into Goodminder and read a randomly chosen memory -- a
            <b> reminder </b>
            of the
            <b> good </b>
            in your life.</p>
          <br/>
          <hr/>
          <br />
          <h1>Inspirations</h1>
          <p>
            "A human being is not one in pursuit of happiness but rather in search of a reason to be happy."
          </p>
          <p>
            <a href="https://www.amazon.com/Mans-Search-Meaning-classic-Holocaust-ebook/dp/B00EKOC0HI" target="_blank" rel="noopener noreferrer">--Man's Search for Meaning</a>
            {' '}by Viktor E. Frankl</p>
            <br />
          <hr/>
          <br />
          <h1>Who we are</h1>


          <img src='https://avatars1.githubusercontent.com/u/29714675?s=400&v=4' alt='sepuckett86_picture' height='100px' width='auto' style={{borderRadius:'50%', margin: '2%'}}/>
          <img src='https://avatars1.githubusercontent.com/u/17328443?s=400&v=4' alt='codegold79_picture' height='100px' width='auto' style={{borderRadius:'50%', margin: '2%'}}/>
          <p>
            <a href="https://github.com/sepuckett86" target="_blank" rel="noopener noreferrer">sepuckett86</a>
            {' '} and {' '}
             <a href="https://github.com/codegold79" target="_blank" rel="noopener noreferrer">codegold79</a>
          </p>
          <p>
            We are two friends who met in college and majored in something other than computer science. We both currenty share a passion for learning coding and web development.
          </p>

          <br />
          <hr/>
          <br />
          <h1>Resources</h1>
          <p>A big thanks go to all of the great resources available online for free listed here:
          </p>

          <div className="container">
            <div className="row">
              <div className="col-sm">
                <ul className='clean'>
                  <dl>
                    <b>Visual Elements</b>
                  </dl>
                  <li>
                    <a href="https://getbootstrap.com/docs/4.0/getting-started/introduction/" rel="noopener noreferrer" target="_blank">Bootstrap 4</a>
                  </li>
                  <li>
                    <a href="https://fontawesome.com/icons?d=gallery" rel="noopener noreferrer" target="_blank">Font Awesome 5</a>
                  </li>
                  <li>
                    <a href="https://www.freelogodesign.org/index.html" rel="noopener noreferrer" target="_blank">Free Logo Design</a>
                  </li>
                  <li>
                    <a href="https://fonts.google.com/" rel="noopener noreferrer" target="_blank">Google Fonts</a>
                  </li>
                </ul>
              </div>
              <div className="col-sm">
                <ul className='clean'>
                  <dl>
                    <b>Tutorials and Help</b>
                  </dl>
                  <li title="Tania Rascia">
                    <a href="https://www.taniarascia.com/" rel="noopener noreferrer" target="_blank">Tania Rascia</a>
                  </li>
                  <li>
                    <a href="https://www.w3schools.com/" rel="noopener noreferrer" target="_blank">w3schools</a>
                  </li>
                  <li>
                    <a href="https://www.freecodecamp.org/" rel="noopener noreferrer" target="_blank">freeCodeCamp</a>
                  </li>
                  <li>
                    <a href="https://www.codecademy.com/" rel="noopener noreferrer" target="_blank">codecademy</a>
                  </li>
                  <li>
                    <a href="https://stackoverflow.com/" rel="noopener noreferrer" target="_blank">stack overflow</a>
                  </li>
                </ul>
              </div>
              <div className="col-sm"></div>
            </div>
          </div>

          <p>
            <button className="btn btn-small" type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapseExample">
              Show goodminder fonts
            </button>{' '}
            <button className="btn btn-small" type="button" data-toggle="collapse" data-target="#collapse2" aria-expanded="false" aria-controls="collapseExample">
              Show something else
            </button>
          </p>
          <div className="collapse" id="collapse1">
            <div className="card card-body">
              <ul className='clean'>
                <dl>
                  <b>Fonts</b>
                </dl>
                <li>
                  <a className="header-font" href="https://fonts.google.com/specimen/Comfortaa" rel="noopener noreferrer" target="_blank">Comfortaa</a>
                </li>
                <li>
                  <a className="paragraph-font" href="https://fonts.google.com/specimen/Lato" rel="noopener noreferrer" target="_blank">Lato</a>
                </li>

              </ul>
            </div>
          </div>
          <div className="collapse" id="collapse2">
            <div className="card card-body">
              Hi there!
            </div>
          </div>
          <br />
          <hr/>
          <br />

          <h1>Support Us!</h1>
          <p>The more support we get, the more we will work on this site to improve it.</p>
          <p>If you'd like to donate, please contact us
            {' '}<a href="/contact">here</a>. Thanks a lot!</p>

          <p>
            <button className="btn btn-small" type="button" data-toggle="collapse" data-target="#collapse3" aria-expanded="false" aria-controls="collapseExample">
              "Secret" Projects!!
            </button>
          </p>
          <div className="collapse" id="collapse3">
            <div className="card card-body">
              <ul className='clean'>
                <dl>
                  <b>Projects for the future</b>
                </dl>
                <li>Goodminder phone app</li>
                <li>More layout options</li>
                <li>Fun rewards for using our site</li>
              </ul>
            </div>
          </div>
<br />

          <br/><br/><br/><br/>
        </div>
      </div>
      <Footer />
    </main>

  )
}
