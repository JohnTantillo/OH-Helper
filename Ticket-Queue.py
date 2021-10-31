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

class PriorityQueue:
    def __init__(self, q):
        self.q = [Queue()]*4

    def insert(self, tic):
        priority = tic.get_prios()
        ticket_queue = self.q[priority]
        ticket_queue.put(tic)

    def admit_next(self):
        ind = 0
        while self.q[ind].empty():
            ind += 1
        return self.q[ind].get()

if __name__ == "__main__":
    tix = Ticket(1, 'Johntant', 'This is a test')
    tix2 = Ticket(0, 'Me', 'This should be the correct message')
    print(tix2.get_prios())
    pq = PriorityQueue([])
    pq.insert(tix)
    pq.insert(tix2)
    print(pq.admit_next().get_message())    