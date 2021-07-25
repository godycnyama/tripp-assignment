# assessement-godycnyama

This repo consists of two projects, front-end and api which are located in their respective folders.

The api is a .Net Core GraphQL server based on the awesome HotChocolate GraphQL library. The database is SQL Server Express LocalDB. The front-end is a single page appplication based on React.js. This front-end performs GraphQL queries and mutations based on the equally awesome Apollo Client (a graphql client library). This app is used to create, update, delete and manage users. Application state in the React.js front-end is managed using the Redux Toolkit.

## Installation

For installation, ensure you clone the repo to your computer. To run the front-end, first of all cd into the front-end folder and run yarn install to install all the dependencies. Make sure node.js is installed on your computer. To run the front-end in development mode, issue the yarn start command.

To run the api ensure the .Net Core 5 SDK or run Runtime is installed on your computer. Furthermore, ensure that SQL Server/SQL Server Express and Entity Framework Core tools are installed on your computer. Issue the following commands in the command line in  that order:
dotnet ef database update (to run the migrations and create the database tables), 
dotnet restore  ( to install the project dependencies),  
dotnet run (to run the app in development mode).You can interact with the graphql server directly by typing http://localhost:5000/graphql and use the Banana Cake Pop interface.
The client is configured to interact with the api through the http://localhost:5000/graphql end point. This configuration is found in the apolloClient file in the shared folder of the front-end project.
