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

if __name__ == "__main__":
    tix = Ticket(1, 'Johntant', 'This is a test')
    print(tix.get_prios())
    print(tix.get_name())
    print(tix.get_message())