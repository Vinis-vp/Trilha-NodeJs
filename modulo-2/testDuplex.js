import TransformDuplex from "./duplex-stream.js";

const duplex = new TransformDuplex();

duplex.write('Modern JavaScript');
duplex.end();

duplex.on('data', (chunk) => {
  console.log('Read:', chunk.toString());
});
