## app-extension

This extension show the data of querystring in the Applicaiton Customizer.

### Building the code

run npm install command to include all the dependencies.

Set the https://DOCUMENTLIBRARY/Forms/AllItems.aspx URL as pageURL in Server.json file.

Steps to reproduce the issue.

Create the library with folder Structure. i.e., create document library named Dev. Create one folder in it.

Run the extension. on the Root Folder you will see undefined in the Bottom placeholder as below.


![RootFolder](https://github.com/dhruvp29/SPFxExtentions/blob/master/RootFolder.PNG)

Now navigate to the folder. Under the folder you should see the relative path of the folder in the bottom placeholder.


![InsideFolder](https://github.com/dhruvp29/SPFxExtentions/blob/master/InsideFolder.PNG)


But, we have to refresh the page. Which is the wrong behavior.
