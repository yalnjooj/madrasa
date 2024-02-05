import { getDevices, UsbScanner } from 'hid-barcode-scanner';
import allOptions from 'play-sound';
import Gtts from 'gtts';
import textToSpeech from "@google-cloud/text-to-speech";
import fs from "fs";
import util from "util";
import A from 'dotenv';

A.config()
const player = allOptions()
// console.log(getDevices());
player.opts = {}



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

    player.play('src/audio/bsmalah.mp3', function(err){
      if (err) throw err
    })
    console.log(data);

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



// FIRST WAY TO CONFERM TEXT TO SPWACH ** 2  **
  // async function textToSpeach2() {

  // const client = new textToSpeech.TextToSpeechClient();
  // // The text to synthesize
  // const text = 'سارهْ فيصلْ المُوَلّدْ';

  // // Construct the request
  // const request = {
  //   input: {text: text},
  //   // Select the language and SSML voice gender (optional)
  //   voice: {languageCode: 'ar-XA', ssmlGender: 'NEUTRAL', name: 'ar-XA-Wavenet-B'},
  //   // select the type of audio encoding
  //   audioConfig: {
  //     audioEncoding: "LINEAR16",
  //     effectsProfileId: [
  //       "small-bluetooth-speaker-class-device"
  //     ],
  //     pitch: 0,
  //     speakingRate: 1
  //   },
  // };

  //   // Performs the text-to-speech request
  //   const [response] = await client.synthesizeSpeech(request);
    
  //   // Write the binary audio content to a local file
  //   const writeFile = util.promisify(fs.writeFile);
  //   await writeFile('src/audio/output.mp3', response.audioContent, 'binary');
  //   console.log('Audio content written to file: output.mp3');
  // }
  // textToSpeach2();