import { song } from "./song";

interface InitProps {
    offlineAudioContext?: boolean;
}

export default {
    init(props: InitProps) {
        //Create the audio context here

        song.test();
    },
};
