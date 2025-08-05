type Pattern = [number, number, number, number, number][][];

export class Song {
	bpm: number = 125;
	speed: number = 6;
	patternOrder: number[] = [];
	patterns: Pattern[] = [];
	instruments: [] = [];
	channels: [] = [];

	constructor(props?: Partial<Song>) {
		if (props) {
			Object.assign(this, props);
		}
	}
}
