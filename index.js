import { getDevices, UsbScanner } from 'hid-barcode-scanner';
import allOptions from 'play-sound';
import Gtts from 'gtts';
import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import util from "util";
import A from 'dotenv';
import sqlite3 from 'sqlite3';

const mainList = [];

sqlite3.verbose()
A.config()

const player = allOptions()
player.opts = {}
// console.log(getDevices());
let sql;

// connect to database
const db = new sqlite3.Database('src/db/database.db', sqlite3.OPEN_READWRITE, (err)=>{
     if(err) return console.error(err.message);
})



// { timeout: 300 } will be passed to child process
// player.play('foo.mp3', { timeout: 300 }, function(err){
//   if (err) throw err
// })

// configure arguments for executable if any
// player.play('foo.mp3', { afplay: ['-v', 1 ] /* lower volume for afplay on OSX */ }, function(err){
//   if (err) throw err


// })

// access the node child_process in case you need to kill it on demand
// var audio = player.play('foo.mp3', function(err){
//   if (err && !err.killed) throw err
// })
// audio.kill()



 let scanner = new UsbScanner({
      vendorId: 3599,
      productId: 6
 });

 scanner.events.on('data', (data) => {

     data = +data.replace(/[^0-9\.]+/g, "")

          sql = `SELECT personId FROM madrasah WHERE barcodeKey = ?`;

          db.get(sql, [data], (err, personId)=>{

               if(err) return console.error(err.message);
               if(personId == undefined) {
                    console.log('THARE IS NO DATA!!')
               } else {
                    mainList.push(personId.personId)
                    console.log('ADD: ', personId.personId)
               }
               
          }); 
        
});


 scanner.events.on('error', (error) => {
      console.log(error);
 });
 scanner.startScanning();

//  To stop scanning, you can use:
// scanner.stopScanning();

// FIRST WAY TO CONFERM TEXT TO SPWACH ** 1  **
// async function textToSpeach1() {
//   const gtts = new Gtts('فِراسْ بِنْ عمرْ', 'ar');


//   gtts.save('src/audio/hello.mp3', function (err, result) {
//     if(err) { throw new Error(err) }
//     console.log('Success! Open file src/audio/hello.mp3 to hear result.');
//   });
// }
// textToSpeach1();



// SECOND WAY TO CONFERM TEXT TO SPWACH ** 2  **

//   async function textToSpeach2(name, barcode) {

  
          
     
//   const client = new textToSpeech.TextToSpeechClient();
//   // The text to synthesize
//   const text = name;

//   // Construct the request
//   const request = {
//     input: {text: text},
//     // Select the language and SSML voice gender (optional)
//     voice: {languageCode: 'ar-XA', ssmlGender: 'NEUTRAL', name: 'ar-XA-Wavenet-B'},
//     // select the type of audio encoding
//     audioConfig: {
//       audioEncoding: "MP3",
//       effectsProfileId: [
//         "small-bluetooth-speaker-class-device"
//       ],
//       pitch: 0,
//       speakingRate: 1
//     },
//   };


// //flac - m4a
//     // Performs the text-to-speech request
//     const [response] = await client.synthesizeSpeech(request);
    
//     // Write the binary audio content to a local file
//     const writeFile = util.promisify(fs.writeFile);
//     await writeFile(`src/audio/${barcode}.MP3`, response.audioContent, 'binary');
//     console.log(`Audio content written to file: ${barcode}.MP3`);


//   }


  





          // let db = open({
          //   filename: 'src/db/database.db',
          //   driver: sqlite3.Database
          // })

          // CREATE TABLE
               // sql = `CREATE TABLE madrasah(id INTEGER PRIMARY KEY AUTOINCREMENT, personId INTEGER UNIQUE, dadIdnefacation INTEGER,  barcodeKey INTEGER UNIQUE, fullName varchar(255), editFullName varchar(255), phoneNumber INTEGER, geder varchar(255), lang varchar(255), soundPath varchar(255))`;
               // db.run(sql, (err)=>{
               //           if(err) return console.error(err.message);
               //      });
          

          // DROP TABLE
          // db.run('DROP TABLE madrasah');

          // INSERT DATA INTO TABLE
          // sql = `INSERT INTO madrasah(personId, dadIdnefacation,  barcodeKey, fullName, editFullName, phoneNumber, geder, lang, soundPath) VALUES (?,?,?,?,?,?,?,?,?)`;
          // db.run(sql,[1129415771, 1479453541, 3438547, 'خالد بن محمد العمري', 'خالد بن محمد العمري', 966542154879, 'female', 'ar', 'path'], (err)=>{
          //      if(err) return console.error(err.message);
          // });


          // UPDATE DATA
          // sql = `UPDATE madrasah SET barcodeKey=? WHERE personId=?`;
          // db.run(sql,[3438965, 1125874525], (err)=>{
          //      if(err) return console.error(err.message);
          // });

          // DELATE DATA
          // sql = `DELETE FROM madrasah WHERE id = ?`;
          // db.run(sql, [3], (err)=>{
          //      if(err) return console.error(err.message);
          // });


          // QUERY THE DATA
          // sql = `SELECT * FROM madrasah`;

          // db.all(sql, [], (err, rows)=>{
          //      if(err) return console.error(err.message);
          //      rows.forEach(row =>{
          //           // console.log(row)
          //           console.log(`${row.personId} - ${row.barcodeKey}`)
          //           // textToSpeach2(row.fullName, row.personId);
          //      })
          // });



          setInterval(() => {
               
               if (!(mainList === undefined || mainList.length == 0)) {
   
                    player.play(`src/audio/${mainList[0]}.MP3`, function(err){
                         if (err) return console.log(err.message)
                    })
                    // console.log(`src/audio/${mainList[0]}.mp3`)
                    console.log('DELEATE: ', mainList[0])
                    mainList.shift()
               } else {
                    console.log('no requests!!')
               }


          }, 2000);


          player.play(`src/audio/bsmalah.mp3`, function(err){
          
               if (err) return console.log(err.message)
          })
