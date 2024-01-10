
# My store App

The application is based on a database in Mongo, a server built in NODEJS and a frontend built in React.
In the application, a store can be managed by the employees so that each employee has different privileges.
There are 4 types of employees - Admin, PersonnelManager, PurchasingManager, Salesman.


## Installation

run npm i in the project folder
open 2 terminal one for the server and one for the fronted.

in the fronted :
```bash
    npm i
    npm start
```
in the server :
```bash
    npm i
    npm run dev
```
after this you need to create a Admin in the Database without the app.(you can import the file from the main folder)
    
## Usage/Example

Permissions for- 

Admin:

Access/edit employee data.
Access/edit product data.
Access/edit customer data.
Access/edit supplier data.

PersonnelManager:

Access/edit employee data.
Access/edit customer data.
Access product data.

PurchasingManager:

Access/edit customer data.
Access/edit product data.
Access/edit supplier data.

Salesman:

Access/edit customer data.
Access product data.


## type of model:

customer - details of customer include arrrey of orders.

worker - details of worker include arrrey of orders.

provider - details of provider.

prodact - details of prodact include provider.

order - customer ,worker number, arrey of prodacts and other like total price , date...




## The main page looks like this:

hedear - logo off the store.

NavBar - with login/logout button , myOrders , cart , homePage, The number of the employee connected to the system and togle to move from darkmode to light mode.

MainPage - with 2-3-4 button (Depends on the type of employee who is connected)

Footer - with logo and contact us number.





## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
(you have a example file).
to add a admin in the first time you need to run the function in tha app file only one time.

`MONGO_URI`=mongodb://127.0.0.1/myStore

`PORT`=3000

`JWT_SECRET`=your secret word

if you wont to work on atlas data-base take the string from atlas website and put it in `MONGO_URI`

## License

[MIT](https://choosealicense.com/licenses/mit/)

