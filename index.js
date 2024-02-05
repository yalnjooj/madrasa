import { getDevices, UsbScanner } from 'hid-barcode-scanner';
// console.log(getDevices());

 let scanner = new UsbScanner({
      vendorId: 3599,
      productId: 6
 });
 scanner.events.on('data', (data) => {
   console.log('Okay!');
   console.log(data);

});
 scanner.events.on('error', (error) => {
      console.log(error);
 });

 scanner.startScanning();