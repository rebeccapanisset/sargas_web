# SARGAS

This is the front-end of SARGAS project. This project was developed to help with the management, control and generation of storage tank sales contracts for a company.

In the past, such tasks were performed manually by the client, who has to edit text filesfor each new tank budget or contract.

Now, with the new application, the following topics have been developed:

1. Users CRUD;
2. Clients CRUD;
3. Trucks CRUD;
4. Products CRUD (Aerial Tank, Fuel Tank, Pipa Tank e Water Tank);
5. Authenticated access;
6. Budget creation;
7. Budget negotiation;
8. Sanding budget by e-mail;
9. Contract creation;
10. General settings;
11. Customization of budget and contract documents;
12. Automatic budget archiving and expiration;
13. Manual budget unarchiving.

## Used Technologies

* ReactJS
* Bootstrap
* Unform (https://github.com/unform/unform)
* cep-promise (https://github.com/BrasilAPI/cep-promise)
* date-fns (https://github.com/date-fns/date-fns)
* suneditor-react (https://github.com/JiHong88/SunEditor)
* yup (https://github.com/jquense/yup)

## How to Install and Run

1. ``` git clone https://github.com/rebeccapanisset/sargas_web.git ```
2. Open the project folder ``` cd sargas_web ```
3. ``` yarn install ``` (install all dependencies)
4. Make a copy of the base file ``` .env.example ``` and rename it to ``` .env ```
5. Fill the file ``` .env ``` with the necessary information
6. ``` yarn start ``` (to run)
