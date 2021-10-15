import pymongo
import os
import sys
import hashlib
from random import randint
username = os.environ['DB_NAME']
password = os.environ['DB_PASS']
client = pymongo.MongoClient("mongodb+srv://heroku_online:" + password +"@cluster0.hok05.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

# client = pymongo.MongoClient('localhost') #Mongo DB setup for Local host

Overall_Data = client["CSE442p"] #Overall dataset, ie everything in the database
User_Pointer = Overall_Data["Users"] #Specific Table portion for User's login information
Statistics_Pointer = Overall_Data["Stats"] #Specific Table portion for User's login information

#Used to update a set statistic, name scheme revamp on 9/24/2021 
def Update_Statistics(Name_of_Stat, new_number):
    Number_Exist = Statistics_Pointer.count_documents({"Statistic_Name": Name_of_Stat}, limit = 1) #checks to see if the statistic has already been created
    if Number_Exist == 0:
        Create_Statistic(Name_of_Stat, 1)
        return new_number #after created return back original number
    else:
        old_statistics = Statistics_Pointer.find({"Statistic_Name": Name_of_Stat}) #finds old row tied to statistic
        statistic_to_update = 0
        for i in old_statistics:
            if i["Statistic_Name"] == Name_of_Stat:
                statistic_to_update = int(i["Number"])
        new_statistic = statistic_to_update + new_number
        Statistics_Pointer.update_one({"Statistic_Name" : Name_of_Stat},{"$set": {"Number": new_statistic}}) #updates new row with that statistic
        return new_statistic

def Create_Statistic(Name_of_Stat, default_number): #creates new statistic
    Statistics_Pointer.insert_one({"Statistic_Name" : Name_of_Stat, "Number": default_number})

#Finds corresponding accType associated with user
def accType_Lookup(Email):
    Actypes = User_Pointer.find({"Email": Email})
    accType = ""
    for i in Actypes:
        if i["Email"] == Email:
            accType= i["accType"]
    return accType
    
def Account_information_public(Email):
    Userinfo = User_Pointer.find({"Email": Email})
    for i in Userinfo:
        if i["Email"] == Email:
            print("found it")
            return [i["Name"], i["Ubit"], i["accType"]]
    print("No i didnt")
    return []

#Finds corresponding password associated with user
def grabpass(Email):
    Passonline = User_Pointer.find({"Email": Email})
    password = ""
    for i in Passonline:
        if i["Email"] == Email:
            password = i["Password"]
    return password

#Registers new account
#TODO 
#1 Add Hashing and encrypyion to passwords
#2 Add Duplication Checks
#3 Gather what other information we want stored when user is registered from other team members

def checkEmailUniqueness(Email):
    UniqueUsers = User_Pointer.count_documents({"Email": Email}, limit = 1)
    if UniqueUsers == 0:
        return True
    else:
        return False

#updates a user's acctype
def accType_Update(Email, accType):
    User_Pointer.update_one({"Email": Email}, {"$set": {"accType": accType}}) 
    return True

#registers a user
def register(Email, Password, Classification, Name, Ubit):
    salt = randint(10000000, 99999999)
    salted_hashedpass = str(salt) + Password 
    if not checkEmailUniqueness(Email):
        return False
    User_Pointer.insert_one({"Email": Email, "Password": salted_hashedpass, "Online": False, "accType": Classification, "Name": Name, "Ubit": Ubit}) #Logs user in with online status of False by default (not logged in)
    return True

#Logs Out an Account based off email
#TODO
#1 Ask team if any if there is any information they would like changed on logout

def log_out(Email):
    contents = User_Pointer.find_one({"Email"})
    User_Pointer.update_one({"Email": Email}, {"$set": {"Online": False}}) #Sets Coresponding user to offline status
    return contents

    
#Logs In an Account bassed off of Email and HASHED password
#TODO
#1 Add A password checker that works with a salted and hashed password
#2 See if teammates want anything returned to them on login

def log_in(Email, Password):
    Password_Stored = grabpass(Email)
    storedPass_desalted = Password_Stored[8:]
    if storedPass_desalted != Password:
        print([False, "NULL"])
        return [False, "NULL"]
    User_Pointer.update_one({"Email" : Email}, {"$set": {"Online": "True"}}) #Sets user to online
    print([True, accType_Lookup(Email)])
    return [True, accType_Lookup(Email)]
