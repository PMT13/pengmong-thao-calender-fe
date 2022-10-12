# EventTracker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Component Information

nav-bar: 
  
    Displays the app name, welcome message for the user, and the logout button

login: 
  
    Login page that displays a login modal window that allows the user to either 
    login with their account or register with a new account

add-event: 

    Circle button with the plus sign in the middle located 
    at the bottom right of the screen. Allows user to add a new event. 

event-list: 

    Displays the actual event/invite lists sorted by date and time. Contains a switch 
    that when clicked on will alternate between the user's events and their invites from 
    other users. Also contains the filter by date-range feature.  

event: 

    Inputs:
      event: IEvent object containing information about an event, if user is viewing their events page
      invite: IInvite object containing information about the invite, if user is viewing their invites page
      isEventList: Boolean value used to determine which page the user is viewing
  
    Displays the event/invite information. If viewing the events page, gives the user the option to delete 
    or edit the event or to invite other users to the event. If the user is viewing the invites page, gives 
    the user the option to accept or decline the invite. If declined, the invite will dissapear from the list.

invite-users:

    Inputs:
      event: IEvent object containing information about an event

    Displays a dropdown menu of users that the user can invite

checkbox:

    Inputs:
      event: IEvent object containing information about an event
      account: IAccount object containing information about a user 

    The actual dropdown options that appear when the dropdown menu is clicked. 
    Each option is essentially linked with an account and when the checkbox is clicked
    on, the event input is added to the account input's invitations list. 
    
