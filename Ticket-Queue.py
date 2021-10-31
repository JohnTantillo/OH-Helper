class Ticket:
    def __init__(self, prios, name, message):
        self.prios = prios
        self.name = name
        self.message = message

    def get_prios(self):
        return self.prios

    def get_name(self):
        return self.name

    def get_message(self):
        return self.message

    def to_string(self):
        print("Name: " + self.get_name())
        print("Priority: " + str(self.get_prios()))
        print("Issue: " + self.get_message())

if __name__ == "__main__":
    tix = Ticket(1, 'Johntant', 'This is a test')
    tix.to_string()
    tix2 = Ticket(0, '', '') # This shouldn't be possible because of input filtering, but being thorough 
    tix2.to_string()