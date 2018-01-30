# Pattern: Strategy

## Feature 

*New condition is required*

### Pattern
The pattern allows the programmer to easily change the behaviour of the application
depending on the context.

---

### Pros

- The strategies can be reused (modularity)
- The algorithms are loosely coupled, allowing a very fast and easy logics replacement
- Better code reading (decide the strategy, let the strategy do the job)
- Less code mess (duplication / etc)

### Cons

- Number of dependencies increase
- The more strategies, the more complex in few lines (worse to test if integration test applied)

---

### To add:
 - Add a new condition ? that concatenate the 2nd, 3rd and 4th input parameters  
   example : `'?',5,4,9` should output 549
