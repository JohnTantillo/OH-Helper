import pymongo


# client = pymongo.MongoClient('mongodb://mongo:27017/') #Mongo DB setup for docker server
client = pymongo.MongoClient('localhost') #Mongo DB setup for Local host


Overall_Data = client["CSE442"] #Overall dataset, ie everything in the database
User_Pointer = Overall_Data["Users"] #Specific Table portion for User's login information

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

