import { Duplex } from 'stream';

class TransformDuplex extends Duplex {
    constructor(options) {
      super(options);
      this._buffer = '';
    }

    _write(chunk, encoding, callback) {
        const upper = chunk.toString().toUpperCase();
        this._buffer += upper;
        callback();
    }

    _read(size) {
        if (this._buffer.length === 0) {
          this.push(null);
          return;
        }
    
        const chunk = this._buffer.slice(0, size);
        this._buffer = this._buffer.slice(size);
        this.push(chunk.toLowerCase());
      }
    }

export default TransformDuplex;