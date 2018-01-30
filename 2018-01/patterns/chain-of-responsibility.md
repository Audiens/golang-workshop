# Pattern: Chain of responsibility

## Feature 

*New condition are required*

## Pros

- Simplifies objects because they are unaware of the chain structure
- Easy add or remove of handlers in the chain

## Cons

- Hard to observe the run-time characteristics and debug

### To add:
 - Add a new condition ? that concatenate the 2nd, 3rd and 4th input parameters  
   example : `'?',5,4,9` should output 549
