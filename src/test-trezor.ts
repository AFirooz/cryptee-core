// test-decrypt.ts
import TrezorConnect from 'trezor-connect';

console.log('TrezorConnect object is:', TrezorConnect);
// should display an object with .manifest, .cipherKeyValue, etc.

// // use this to make trezor work with a borwser
// TrezorConnect.manifest({
//     email: 'dev@xyz.com',
//     appUrl: 'http://your.application.com'
// });

// use this to work purely with node and make trezor listen to Trezor Bridge
(async function main() {
  try {
    await TrezorConnect.init({
      manifest: { email: 'developer@xyz.com', appUrl: 'http://localhost' },
      popup: false,
      webusb: false,
      debug: true,
    });

    // Rest of your code goes here
    console.log('Trezor init success!');
  } catch (err) {
    console.error('Error during Trezor test:', err);
  }
})();


console.log('TrezorConnect object after manifest init:', TrezorConnect);
