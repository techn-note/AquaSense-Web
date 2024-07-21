# Aquasense Web!

## Description
This PR introduces user authentication functionality to the Aquasense Web project. Users can now securely sign up, log in, and access personalized features. The implementation follows the MVC architecture and leverages Express, Node.js, and MongoDB.

## Changes Made
- Created a new `authController.js` to handle user authentication logic.
- Implemented registration and login routes in `userRoutes.js`.
- Utilized Mongoose to interact with the MongoDB database.
- Added necessary views (login form, registration form) in the `views` directory.
- Updated the `README.md` with instructions for setting up the authentication system.

## Checklist
- [x] Implemented user registration and login.
- [x] Tested authentication flow locally.
- [x] Updated documentation.

## Screenshots
### LandingPage
![Figura 8 - LandingPage1](https://github.com/techn-note/AquaSense-Web/assets/126106533/b4c55494-9932-418c-a75e-697ae7a17a49)
### Login
![Figura 11 - Login Web](https://github.com/techn-note/AquaSense-Web/assets/126106533/f4b43cbe-1d2f-4ed4-a78c-0855e690f549)

## Additional Notes
- The authentication middleware ensures secure access to protected routes.
- Passwords are hashed using bcrypt for security.
- Feel free to review and provide feedback!
