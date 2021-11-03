# Open Notes Page Web Sequence Diagram for SPA

The web sequence diagram for loading the notes page using the single page application follows a near identical process to the old app.

1. Submit a GET request to retrieve HTML data
2. The link to `styles.css` triggers a new GET request to retrieve styling sheets
3. The link to the `.js` file triggers a new GET to retreieve javascript code
4. Javascript begin to execute which triggers a final GET request to retrieve notes data
5. Note data is displayed

The full diagram can be seen below:

![excercise 0.4 solution](./images/web-sequence-diagram.PNG)
