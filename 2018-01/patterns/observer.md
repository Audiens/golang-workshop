# Pattern: Observer

## Feature 

*The application should apply further business logic when some conditions are met*

### To add:
 - When the number 5 is passed as second argument, the system should output the character @
 - When the number 1 is passed as first argument, the system should output the character ? 
 
### Explanation

   Subject: Launch a notification to all the registered observer
   Observer: Receive a notification and apply some business of logic 
 
### Pros

1) You can work on the observer without changing the subject
2) Can be shared between different objects 

### Cons

1) If not used carefully the observer pattern can add unecessary complexity
2) notification's order is not sequential
