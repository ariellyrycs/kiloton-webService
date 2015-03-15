# kiloton-webService
WebService for kiloton-app with nodejs <br>
Using mongodb mongoose and express

###Instalation:<br>
=================
**Clone the repository:**<br><br>
```git clone git@github.com:ariellyrycs/kiloton-webService.git```<br><br>
**Install NodeJS:**<br>
```brew install node```<br><br>
**Install dependencies:**<br><br>
```npm install```<br><br>
**Mongodb instalation:** (*with this method homebrew is required*)<br><br>
```brew mondgodb```<br><br>
**Create a dbpath and give permisions:**<br><br>
```sudo mkdir -p /data/db```<br><br>
<code>sudo chown &#96;id -u&#96; /data/db </code><br><br>
**Connect mongoose with mongodb:**<br><br>
```mongod --dbpath /data/db```<br><br>
**Run server:**<br>
```node ./api/server.js```
