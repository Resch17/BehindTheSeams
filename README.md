# Behind The Seams

---

**_Behind The Seams_** is an app developed for sewing enthusiasts to track their projects and keep inventory of their fabric and their patterns (both digital and paper).

### Built with

-   [React](https://reactjs.org/)
-   [.NET 5](https://dotnet.microsoft.com/)

## Technology used

### Front-end

-   React
-   Firebase authentication
-   Custom CSS styling

### Back-end

-   .NET 5
-   ASP.NET Core
-   MS SQL Server

### Design and Development

-   Figma
-   DbDiagram.io
-   Microsoft Whiteboard

---

### Entity Relationship Diagram (ERD) & Mockups

| ERD                                                   | Mockups                                                      |
| ----------------------------------------------------- | ------------------------------------------------------------ |
| ![ERD](https://www.aaronresch.com/images/bts-erd.png) | ![Mockup](https://www.aaronresch.com/images/bts-mockups.PNG) |

---

## Developer Setup

Instructions for running Behind The Seams to see it for yourself and/or aid in further development

### Requirements

-   Git
-   Visual Studio (configured to run server-side ASP.NET Web API C# code)
-   MS SQL Server (Express or higher)
-   NodeJS

### Firebase

You will need to create a Firebase project to have working authentication and authorization.

-   Go to [Firebase](https://firebase.google.com/) and create a project (can be named anything). Add authentication in the form of email/password to the project.
-   In the project settings, you will need your `Project Id` and `Web API Key`

### Clone the project

From a terminal window, in any directory you'd like, run: `git clone git@github.com:Resch17/BehindTheSeams.git`

### Back-end setup

-   In `BehindTheSeams/appsettings.json` change the `FirebaseProjectId` value to your Firebase `Project Id`
-   From `BehindTheSeams/SQL`, run the scripts `01_Db_Create.sql` and then `02_Seed_Data` to generate the database
-   To use the default test account `test@example.com`, create a user account in your Firebase project's auth section with that email address (and any password) and replace the data in that user's `FirebaseUserId` column in the database with the id generated in your Firebase project
-   Load `BehindTheSeams.sln` in Visual Studio and hit F5 to run the server (after ensuring that BehindTheSeams is selected instead of the default IIS Express server)

### Front-end Setup

-   Create a file in `BehindTheSeams/bts-client/` called `.env.local`
-   In this file, paste `REACT_APP_API_KEY=Web API Key`, replacing "Web API Key" with your unique key from your Firebase project's project settings
-   Run `npm install` in `BehindTheSeams/bts-client` to install all dependencies
-   To start the development server on `localhost:3000`, run `npm start`
-   A browser window should open with the authentication page and you can enter `test@example.com` as your email address with the password you added in Firebase
