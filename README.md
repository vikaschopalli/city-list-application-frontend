# CityListApplicationFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.0.4.

## Install dependencies
After the project is cloned, please navigate inside the folder and run **npm install**  to download all the required dependencies.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Steps -:

1. Please naviagte to `http://localhost:4200/` and enter credentials as given [here](https://github.com/vikaschopalli/city-list-application-backend) to login
2. All the city are not fetched at once, they are fetched page wise there by improving performance instead of loading eveything at once.
3. If logged in via username(user) , this user does not see edit option to edit city.
4. if logged in via username(admin), this user will see esit option to edit city .
5. Even though some one managed to get edit option for username(user), we have appropriate role checking which is being done at spring boot bakend side and correspinding request will fail.





