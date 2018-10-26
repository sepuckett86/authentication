# GoodminderLaravel

## How to use this repository via Homestead

1) update `homestead.yaml` folders and sites to include your repo followed by `vagrant up --provision`
2) update `/etc/hosts` to include new site
3) `composer install` within Laravel folder within ssh virtual machine
4) duplicate `.env.example` and rename copy `.env` in the Laravel folder
5) `php artisan key:generate`
6) `php artisan migrate`
7) `npm install`
8) `npm run dev`

Note: you may need to type
`npm install cross-env`
before `npm run dev`

<h2>Resources</h2>
    <ul>
      <li><a href='https://hptechblogs.com/using-json-web-token-react/' target='_blank' rel="noopener noreferrer">JSON Web Token and React Tutorial: HP Tech Blogs</a></li>
      <li><a href='https://github.com/lijujohn13/react-laravel-auth' target='_blank' rel="noopener noreferrer">React + Laravel Login</a>
</li>
      <li><a href='https://github.com/francescomalatesta/laravel-api-boilerplate-jwt' target='_blank' rel="noopener noreferrer">Francesco Malatesta Laravel API boilerplate JWT</a></li>
  <li><a href='https://www.udemy.com/react-redux-tutorial/' target='_blank' rel="noopener noreferrer">Stephen Grider's Authentication Udemy Class</a></li>
              </ul>
