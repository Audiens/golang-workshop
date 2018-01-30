# Pattern: Command

## Feature

*The combination of parameters `'+',1,1,2` are core to the business and will be needed around all the project*

### Pattern

The objective of the pattern is to make the client's action different depending on the request, without knowing the request itself.

---

### Pros

- It allows to create a queue of commands, delegating the execution to an agent

### Cons

- Over-engineering (too many classes to accomplish a task (4 classes for 1 job))

---

### To add:
 - call `'+',1,1,2` 10 times 
