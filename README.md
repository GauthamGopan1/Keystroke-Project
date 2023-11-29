# Keystroke-Project

The project Demo 1.0 Demonstrates the basic principles of how a keystroke based authentication system works. A brief about what happens in the back end is explaned below.

Event Handling

The code uses jQuery to handle events when certain elements on the webpage are interacted 
with.

1. Input Focus Event:
o The code handles the focus event for input elements inside an element with the 
ID "firstDataset".
o On focus, it sets up event handlers for keydown and keyup events.
o It captures timing information for key presses and releases, storing them in 
various arrays.

2. Button Click Event:
o The code sets up a click event for an element with the ID "insert".
o On click, it calculates averages for keypress and key release timings, checking for 
disturbances in the input values.

3. Keydown and Keyup Events for Second Dataset:
o The code sets up keydown and keyup events for an element with the ID 
"secondData".
o It captures timing information and keycodes for key presses and releases in the 
second dataset.

4. Compare Button Click Event:
o The code sets up a click event for an element with the ID "compare".
o On click, it calculates the differences between corresponding elements in the first 
and second datasets and generates a result percentage.

Calculation Functions

There are several functions for performing calculations:
1. averageCalc:
o Calculates the average of arrays, checking for disturbances based on a specified 
threshold.

2. diffCalc:
o Calculates the differences between corresponding elements of two arrays.

3. resultCalc:
o Calculates a result percentage based on an array of differences.

Chart Rendering
The code uses the Chart.js library to render a line chart on an HTML canvas element 
("myChart"). It visualizes data from the different arrays, representing keypress timings for 
training and validation datasets.

Conclusion

In summary, this code seems to be a part of a typing pattern analysis tool. It captures and 
analyzes typing patterns for training and validation datasets, calculates averages, detects 
disturbances, and visualizes the results using a line chart. The comparison between datasets is 
done to assess the similarity of typing patterns
