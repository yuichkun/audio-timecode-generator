class AudioManager {
  constructor({sampleRate}) {
      this.audioContext = new AudioContext();
      this.sampleRate = sampleRate;

      const downloadButton = document.getElementById("download");
      downloadButton.onclick = () => {
        const sec = document.getElementById('sec').value;
        this.createBuffer(sec);
        this.createPulseWave();
        this.saveFile();
      };

  }

  createBuffer(sec) {
    this.buffer = this.audioContext.createBuffer(1, this.sampleRate * sec, this.sampleRate);
    console.log(this);
  }
  createPulseWave() {
    const intervalInSec = document.getElementById('interval').value || 1.0;
    const samples = this.buffer.getChannelData(0); 
    for (let i = 0; i < samples.length; i++){
      const block = Math.floor(i / (this.sampleRate * intervalInSec));
      const isOne = block % 2 === 0; 
      samples[i] = isOne ? 1.0 : -1.0;
    }
  }
  
  saveFile() {
      console.log("Saving file");
      const wav = audioBufferToWav(this.buffer);
      const blob = new Blob([new DataView(wav)], {
          type: "audio/wav"
      });
      const url = window.URL.createObjectURL(blob);
      debugger;
      window.open(url);
      console.log('done');
  }
  genSamples(data, pixels) {
      function limiter(source) {
          return Math.max(-1.0, Math.min(1.0, source));
      }
      function normalize(sample) { 
          return ((sample / 255) * 2) - 1.0;
      }
      for (let i = 0; i < pixels.length; i++) { 
          let sample = pixels[i]; 
          data[i] = normalize(sample);
      }
  }
}