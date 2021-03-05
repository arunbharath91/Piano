export interface IOptions {
  notes?: notes[];
}

interface notes {
  note: string,
  keycolor: 'white' | 'black',
  keyboardNotes: string
}

const defaultOption: IOptions = {
  notes: [
    { note: 'C', keycolor: 'white', keyboardNotes: 'z' },
    { note: 'Db', keycolor: 'black', keyboardNotes: 's' },
    { note: 'D', keycolor: 'white', keyboardNotes: 'x' },
    { note: 'Eb', keycolor: 'black', keyboardNotes: 'd' },
    { note: 'E', keycolor: 'white', keyboardNotes: 'c' },
    { note: 'F', keycolor: 'white', keyboardNotes: 'v' },
    { note: 'Gb', keycolor: 'black', keyboardNotes: 'g' },
    { note: 'Ab', keycolor: 'black', keyboardNotes: 'h' },
    { note: 'A', keycolor: 'white', keyboardNotes: 'n' },
    { note: 'Bb', keycolor: 'black', keyboardNotes: 'j' },
    { note: 'B', keycolor: 'white', keyboardNotes: 'm' }
  ]
}

export class Piano {
  private selector: HTMLElement;
  private options: IOptions;
  constructor(selector: string, options?: IOptions) {
    this.selector = document.querySelector(selector) as HTMLElement;
    this.options = { ...defaultOption, ...options };
    this.projectTemplate();
    document.addEventListener('keydown', (e: any) => {
      if (e.repeat) return;
      const index = this.options.notes?.findIndex(x => x.keyboardNotes === e.key);
      if (index !== undefined && this.options.notes) {
        this.playNote(this.options.notes[index].note);
        console.log(this.options.notes[index].note)
      }
    })
  }

  protected projectTemplate() {
    const piano = document.createElement('piano');
    let audio = '';
    this.options.notes?.forEach((n, i) => {
      const noteElem = document.createElement('div');
      noteElem.setAttribute('data-note', n.note);
      noteElem.classList.add(...['key', n.keycolor]);
      noteElem.innerHTML = `${n.keyboardNotes}`
      piano.appendChild(noteElem);
      audio += `<audio id="${n.note}" src="assets/notes/${n.note}.mp3"></audio>`;
      noteElem.addEventListener('click', () => this.playNote(n.note))
    });
    piano.insertAdjacentHTML('beforeend', audio);
    this.selector.appendChild(piano);
  }

  playNote(note: string) {
    const noteAudio = this.selector.querySelector<HTMLAudioElement>(`#${note}`);
    const noteElem = this.selector.querySelector<HTMLDivElement>(`[data-note='${note}']`);
    if (noteAudio && noteElem) {
      noteAudio.currentTime = 0;
      noteAudio.play()
      noteElem.classList.add('active')
      noteAudio.addEventListener('ended', () => {
        noteElem.classList.remove('active')
      })
    }

  }

}
