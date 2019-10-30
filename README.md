# Tortilla deploy
This tool will help you create a development enviroment for a divi-child theme in Wordpress. I expect you have wordpress already running on your server. This tool is made to help you create a local enviroment to develop, while concatting SCSS & JS, and compiling it to single usable files. 

## Step 1 - Installation
First, we will need to install / download certain tools to make this whole thing work. 
- [MAMP](https://www.mamp.info/en/downloads/)
- [Wordpress](https://nl.wordpress.org/download/)
- [NodeJs](https://nodejs.org/en/download/)
- [Git for Windows](https://git-scm.com/download/win)

Install MAMP, NodeJs & Git, the order doesn't matter. Watch out with MAMP for installing ad-ons. Just choose default settings on everything.
Make sure Git for Windows adds the path so you can use it in CMD. 

## Step 2 - Preparing Wordpress
Once MAMP is up & running, you'll need to install Wordpress on the localserver. For this you need to turn on the localhost.

### Preparing the Database
Press `Open Webstart page` in the UI. It should look something like this:
[MAMP start page](https://documentation.mamp.info/en/MAMP-Windows/Preferences/Open-WebStart-Page/WebStart.png)
Press the 'phpMyAdmin' link under the MySQL header. Create a new database, I called it `wordpress` for the ease of it. The name doesn't matter, as long as you remember what it is. 

### Installing Wordpress
Move to the directory `htdocs`. If you installed MAMP in the default location, your path on windows should be something like `C:\MAMP\htdocs`. 
Once you've found the folder, drop the _unzipped_ folders of Wordpress into it. Now go to the MAMP GUI and press on `Start Servers`.
From here just follow the installation process of Wordpress. Remember the name of your database. Check if Wordpress actually works.

## Step 3 - Installing the Divi theme
Go to [Divi theme](https://www.elegantthemes.com/) and download the zip. Install the theme on your server, by opening the wordpress dashboard and in the themes section uploading the zipped Divi folder. For the localhost, unzip the folder, and drag and drop it in the `C:\MAMP\htdocs\wp-content\themes`. The theme should be working. Try it out via wordpress. 

## Step 4 - Downloading the package
Move back `wp-content\themes` and open this folder in your CMD or powershell (e.g. in Visual Code) & 
run this code `git clone https://github.com/khualu/tortilla_deploy.git`. Wait untill it's done cloning the repository. 
You should see a new folder called `Tortilla-deploy` (or something like it) with a bunch of different files and directories in it. 

## Step 5 - Installing the dependencies
Move into the new directory, open your CMD and in the same directory execute `npm install`. This should take bit. 
After it's done, you can test if it works, by executing `gulp watch`. The terminal should show that it's working properly. 
The `gulp deploy` command doesn't work yet. 

## Step 6 - Making the credentials file 
For this step you're gonna need to make a `config.json` file. This file has the FTP credentials needed to make connections and push changes to the live version of the site. 
In the same folder you're already working in, create a file called `config.json`. Copy paste the json object shown here. And change what's between the quotation marks on the right side to your credentials. Save it. 

```json
{
    "host": "host link",
    "user": "name of the user",
    "password": "your password"   
}
```

## Step 7 - Setting the path for pushing
If you open `gulpfile.js`, you'll see in the deploy function that the path to push content to is set to `/domains/andrespinto.nl/public_html/wp-content/themes/divi-child`. 
This might need to be changed for your server. This is the path from the root of my server to where the theme folder is. 

If everything is installed correctly, the tool should work now. 

`gulp watch` to start developing and make changes to the scss.
`gulp deploy` to push the changes to the live server.