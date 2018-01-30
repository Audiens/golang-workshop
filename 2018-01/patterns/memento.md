# Pattern: Memento

## Feature 

### Pattern

The memento pattern is a software design pattern that provides the ability
to restore an object to its previous state (undo via rollback).

The memento pattern is implemented with three objects: the **originator**, a **caretaker** and a **memento**.

---

### Pros

- Able to restore a previous state
- Relatively easy to implement

### Cons

- The more complex, the more difficult to restore
- Makes it hard to restore a previous state if side effects take in place

### Limits

- Not all the states can be recovered (i.e. sent notifications)

---

*Subsequent business request should be met with different reaction, in case of emergency the system should be able to reboot from a previous point-in-time*
### To add:
 - a call `'+',any,any,any` should return the sum of all the arguments plus the number of time the '+' has been called
 - a call `'+s',any,any,any` should return the sum of all the arguments plus the number of time the '+' has been called. Also create a point in time
 - a call `'+r',any,any,any` should return the sum of all the arguments plus the number of calls in the previous point in time
 - clear any previous call
 - execute `'+',1,1,1` -> 4
 - execute `'+',1,1,1` -> 5
 - execute `'+',1,1,1` -> 6
 - execute `'+',1,1,1` -> 7
 - execute `'+s',1,1,1`-> 8
 - execute `'+',1,1,1` -> 9
 - execute `'+',1,1,1` -> 10 
 - execute `'+',1,1,1` -> 11
 - execute `'+',1,1,1` -> 12
 - execute `'+r',1,1,1`-> 8
 - execute `'+',1,1,1` -> 9
  
### info

A point in time is the state of the application in a particular moment

 
 
