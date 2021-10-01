import pymongo
import os
import sys
username = os.environ['DB_NAME']
password = os.environ['DB_PASS']
client = pymongo.MongoClient("mongodb+srv://heroku_online:" + password +"@cluster0.hok05.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

# client = pymongo.MongoClient('localhost') #Mongo DB setup for Local host


Overall_Data = client["CSE442"] #Overall dataset, ie everything in the database
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


#Registers new account
#TODO 
#1 Add Hashing and encrypyion to passwords
#2 Add Duplication Checks
#3 Gather what other information we want stored when user is registered from other team members

def register(Username, Password_unhashed):
    User_Pointer.insert_one({"Username" : Username, "Password": Password_unhashed, "Online": False}) #Logs user in with online status of False by default (not logged in)
    return True

#Logs Out an Account based off username
#TODO
#1 Ask team if any if there is any information they would like changed on logout

def log_out(Username):
    contents = User_Pointer.find_one({"Username"})
    User_Pointer.update_one({"Username" : Username}, {"$set": {"Online": False}}) #Sets Coresponding user to offline status
    return contents

    
#Logs In an Account bassed off of username and HASHED password
#TODO
#1 Add A password checker that works with a salted and hashed password
#2 See if teammates want anything returned to them on login

def log_in(username):
    User_Pointer.update_one({"Username" : username}, {"$set": {"Online": "True"}}) #Sets user to online
    return True

