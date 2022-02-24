# Overview
This part of the project is for the web-service or server-side. It basically provides two main APIs:
- /decl/api/declaration/submit-db (POST): submit a health declaration
- /decl/api/declaration/list-all-db (GET): list all health declaration

The APIs will call SQL database to save or query health declaration accordingly.

# Possible improvements
## Security
No authentication in place for the listing of all health declaration. The SPA actually caters for admin login. Thus possibility to add a new service for authentication purpose. In addition to that, a session can be issued, such as a JWT token. With this improvement, then the /list-all-db API can be secured accordingly.

## Deployment technology/architecture
For the submission of health declaration, a possible implementation is to use serverless function as a service that can push the new health declaration to an message/event queue for asynchronous and more scalable approach
