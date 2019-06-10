## Running the test
# First, config the .env file. Variables:
WEBAPP_HOST
WEBAPP_PORT
SERVER_HOST 
SERVER_DATABASE  
SERVER_DATABASE_USER 
SERVER_DATABASE_PASSWORD
SERVER_DATABASE_DIALECT
SERVER_DATABASE_PORT  
SERVER_EMAIL_USERNAME
SERVER_EMAIL_PASSWORD 

# Then run these scripts:
npm run dbcreate
npm run dbmigrate
npm seed

# Then start the server
npm start