# DNA Sequence Viewer
This is a small project that allows you to add DNA strands to a table then view the base pairs of the DNA in colored syntax. 

### Features:
  - View Table of Sequences with date added to the table
  - Sort by any field by clicking on its table header
  - Zoom in on the a sequence by clicking the Zoom icon on the left of the row.
  - Narrow down the rows by searching in the input field on the top left of the table.
  - Add a sequence by clicking the Add + icon and filling out the form, prevents adding if sequence has invalid non DNA characters.
  
 ### Things to finish:
 - Better error validation so that it displays the server error code in the UI, prevent adding until a response from the server happens.
 - Add abilty to batch upload sequences by either uploading a file or manually copying and pasting.
 - Add abilty to Query NCBI directly using the public API.
 - Clean up the styling, test all UI pieces along with Redux.
 - Find more scable way to display DNA syntax.

 

## Local Setup 

Base Requirements:
  - Python 3+
  - Node 8.9.1 or higher
  - Yarn

### Server Setup
```sh
$ cd sequence_viewer_app
$ pip install -r requirements.txt
$ python manage.py migrate
$ python manage.py runserver
```
### Client
In a separate terminal window:
```sh
$ cd sequence_client
$ yarn
$ yarn start
```

Navigate to `localhost:3000`










