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

# Example of unit test result
```
[INFO] --- maven-war-plugin:2.2:war (default-war) @ declaration-server ---
[INFO] Packaging webapp
[INFO] Assembling webapp [declaration-server] in [/home/butter/git-repo/declaration-server/server/target/declaration-server]
[INFO] Processing war project
[INFO] Copying webapp resources [/home/butter/git-repo/declaration-server/server/src/main/webapp]
[INFO] Webapp assembled in [203 msecs]
[INFO] Building war: /home/butter/git-repo/declaration-server/server/target/declaration-server.war
[INFO] WEB-INF/web.xml already added, skipping
[INFO] 
[INFO] >>> jetty-maven-plugin:11.0.6:start (start-jetty) > validate @ declaration-server >>>
[INFO] 
[INFO] <<< jetty-maven-plugin:11.0.6:start (start-jetty) < validate @ declaration-server <<<
[INFO] 
[INFO] 
[INFO] --- jetty-maven-plugin:11.0.6:start (start-jetty) @ declaration-server ---
[INFO] Configuring Jetty for project: declaration-server
[INFO] Classes = /home/butter/git-repo/declaration-server/server/target/classes
[INFO] Context path = /
[INFO] Tmp directory = /home/butter/git-repo/declaration-server/server/target/tmp
[INFO] web.xml file = file:///home/butter/git-repo/declaration-server/server/src/main/webapp/WEB-INF/web.xml
[INFO] Webapp directory = /home/butter/git-repo/declaration-server/server/src/main/webapp
[INFO] Web defaults = org/eclipse/jetty/webapp/webdefault.xml
[INFO] Web overrides =  none
[INFO] jetty-11.0.6; built: 2021-06-29T16:16:33.537Z; git: 69469432898becda3aed32a32d4b0adbb7b6daee; jvm 11.0.9+11
[INFO] Session workerName=node0
Feb 24, 2022 12:07:22 PM org.glassfish.jersey.server.wadl.WadlFeature configure
WARNING: JAXBContext implementation could not be found. WADL feature is disabled.
[INFO] Started o.e.j.m.p.MavenWebAppContext@5e3d2765{/,[file:///home/butter/git-repo/declaration-server/server/src/main/webapp/],AVAILABLE}{file:///home/butter/git-repo/declaration-server/server/src/main/webapp/}
[INFO] Started ServerConnector@6065bcb7{HTTP/1.1, (http/1.1)}{0.0.0.0:8999}
[INFO] Started Server@13cc31ae{STARTING}[11.0.6,sto=0] @13349ms
[INFO] 
[INFO] --- maven-failsafe-plugin:3.0.0-M5:integration-test (integration-test) @ declaration-server ---
[INFO] 
[INFO] -------------------------------------------------------
[INFO]  T E S T S
[INFO] -------------------------------------------------------
[INFO] Running test.declaration.DeclarationRestTest
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.592 s - in test.declaration.DeclarationRestTest
[INFO] 
[INFO] Results:
[INFO] 
[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0
[INFO] 
[INFO] 
[INFO] --- jetty-maven-plugin:11.0.6:stop (stop-jetty) @ declaration-server ---
[INFO] Stopped Server@13cc31ae{STOPPING}[11.0.6,sto=0]
[INFO] Stopped ServerConnector@6065bcb7{HTTP/1.1, (http/1.1)}{0.0.0.0:8999}
[INFO] 
[INFO] --- maven-failsafe-plugin:3.0.0-M5:verify (verify) @ declaration-server ---
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time:  13.156 s
[INFO] Finished at: 2022-02-24T12:07:26Z
[INFO] ------------------------------------------------------------------------
```
