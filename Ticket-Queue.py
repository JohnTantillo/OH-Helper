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
        self.q = []
        for i in range(0,4):
            self.q.append(Queue())

    def insert(self, tic):
        priority = tic.get_prios()
        ticket_queue = self.q[priority]
        ticket_queue.put(tic)

    def admit_next(self):
        ind = 0
        while self.q[ind].empty():
            ind += 1
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
                if student != tic.get_name():
                    updated.put(tic)
            if prios >= 0:
                self.q[prios] = updated

if __name__ == "__main__":
    tix = Ticket(1, 'Johntant', 'This is a test')
    tix2 = Ticket(0, 'Me', 'This should be the correct message')
    pq = PriorityQueue([])
    pq.insert(tix)
    pq.insert(tix2)
    # print(pq.admit_next().get_message())
    # pq.insert(tix2)
    print(pq.get_all_info())
    pq.remove('Him')
    print(pq.get_all_info())
