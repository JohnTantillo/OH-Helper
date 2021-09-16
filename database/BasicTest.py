import MongoBase

def test_1():
    if(MongoBase.register("Testname", "Testpass") == True):
        print("Test One Pass")
    if(MongoBase.log_in("Testname, Testpass") == True):
        print("Test Two Pass")
    namereturned = MongoBase.log_out("Testname")
    print(namereturned)
    
test_1()


       