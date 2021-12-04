from queue import Queue 

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

    def set_prios(self, prios):
        self.prios = prios

    def to_string(self):
        print("Name: " + self.get_name())
        print("Priority: " + str(self.get_prios()))
        print("Issue: " + self.get_message())

    def equals(self, tic):
        return (self.name == tic.name) and (self.message == tic.message)

class PriorityQueue:
    def __init__(self, q):
        self.q = []
        for i in range(0,4):
            self.q.append(Queue())

    def insert(self, tic):
        priority = int(tic.get_prios())
        if self.uniqueTicket():
            ticket_queue = self.q[priority]
            ticket_queue.put(tic)

    def admit_next(self):
        ind = 0
        while self.q[ind].empty():
            ind += 1
            if ind > 3:
                return None
        return self.q[ind].get()

    def to_string(self):
        for priority in self.q:
            for ticket in priority.queue:
                print(ticket.to_string())

    def get_all_info(self):
        info = {"Queue": []}
        for priority in self.q:
            for ticket in priority.queue:
                info["Queue"].append({"Name": ticket.get_name(), "Priority": ticket.get_prios(), "Message": ticket.get_message()})
        return info

    def remove(self, student):
        for q in self.q:
            updated = Queue()
            prios = -1
            while not q.empty():
                tic = q.get()
                prios = tic.get_prios()
                if not student.equals(tic):
                    updated.put(tic)
            if prios >= 0:
                self.q[prios] = updated

    def uniqueTicket(self):
        return True
        # unique = True
        # name = self.get_name()
        # for ticket in self.q:
        #     if ticket.getname() == name:
        #         unique = False
        # return unique
    def update_priority(self, tic, new_prios):
        self.remove(tic)
        tic.set_prios(new_prios)
        self.insert(tic)

if __name__ == "__main__":
    tix = Ticket(2, 'Johntant', 'This is a test')

    tix2 = Ticket(1, 'Me', 'This should be the correct message')
    pq = PriorityQueue([])
    pq.insert(tix)
    # # print(pq.admit_next().get_message())
    pq.insert(tix2)
    print(pq.get_all_info())
    pq.update_priority(tix, 0)
    print(pq.get_all_info())
    # pq.remove('Him')
    # print(pq.get_all_info())
    # pq2 = PriorityQueue([])
    # print(pq2.admit_next())
