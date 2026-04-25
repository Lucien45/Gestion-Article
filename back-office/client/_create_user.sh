#!/usr/bin/env bash
# creer un utilisateur administrateur par defaut

curl -X POST http://localhost:3000/users/register \
    -H "Content-Type: application/json" \
    -d '{ 
        "email" : "lucien@gmail.com", 
        "password" : "lucien" ,
        "usrname": "Lucien",
        "role": "admin"
    }'
