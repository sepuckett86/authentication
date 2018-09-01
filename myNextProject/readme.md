See https://github.com/francescomalatesta/laravel-api-boilerplate-jwt for more info on how this project was created.

# How to use this repository via Homestead
### Note: I haven't actually tried the following instructions for this project -- they are based on previous project experience. I may be missing something.
1) update `homestead.yaml` folders and sites to include your repo followed by `vagrant up --provision`
2) update `/etc/hosts` to include new site
3) `composer install` within Laravel folder within ssh virtual machine
4) duplicate `.env.example` and rename copy `.env` in the Laravel folder
5) `php artisan key:generate`
6) `php artisan migrate`
7) `npm install`
8) `npm run dev`


<h2>Current Goal</h2>
              <p>Hook up a RESTful Laravel API with React Frontend SPA</p>
              <h2>Objectives of this App</h2>
              <ul>
                <li>Enable at least 2 users to log in and log out</li>
                <li>Enable users to access only their specific gminder in the Example component</li>
                <li>Only ONE view as the gateway for single web page React app: app.blade.php</li>
                <li>All navbars in front-end</li>
                <li>Navbar changes depending on whether user is logged in</li>
                <li>JSON web tokens (JWT) utilized</li>
              </ul>
              <h2>Break Down</h2>
              <div className='row'>
                <div className='col col-12 col-sm-6'>
                  <ul className="list-group">
                    <h3><li className="list-group-item active">Client</li></h3>
                    <li className="list-group-item">Send request with user info to server to generate JWT</li>
                    <li className="list-group-item">Store JWT received from server in local storage</li>
                    <li className="list-group-item">Send request with JWT to server API</li>
                    <li className="list-group-item">Single Page App (ReactJS) notes when user logs in, changes template accordingly</li>
                    <li className="list-group-item">If a response from server contains an error, redirect to login page</li>
                  </ul>
                </div>
                <div className='col col-12 col-sm-6'>
                  <ul className="list-group">
                    <h3><li className="list-group-item active">Server</li></h3>
                    <li className="list-group-item">Generate JWT and send in response to client request</li>
                    <li className="list-group-item">RESTful API only sends data for specific user in responses</li>
                    <li className="list-group-item">If JWT is expired or corrupted in client request, return error</li>
                  </ul>
                </div>
              </div>
              <br />
              <h2>Resources</h2>
              <ul>
                <li><a href='https://hptechblogs.com/using-json-web-token-react/' target='_blank' rel="noopener noreferrer">JSON Web Token and React Tutorial: HP Tech Blogs</a></li>
                <li><a href='https://github.com/lijujohn13/react-laravel-auth' target='_blank' rel="noopener noreferrer">React + Laravel Login</a>
</li>
      <li><a href='https://github.com/francescomalatesta/laravel-api-boilerplate-jwt' target='_blank' rel="noopener noreferrer">Laravel API boilerplate JWT</a></li>
              </ul>
