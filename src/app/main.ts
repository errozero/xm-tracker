import { load } from "./load";

interface InitProps {
    offlineAudioContext?: boolean;
}

//const url = "/songs/cerror_-_je_vader.xm";
//const url = "/songs/DEADLOCK.XM";
//const url = "songs/elw-sick.xm";
//const url = "songs/external.xm";
//const url = "songs/4mat_-_broken_heart.xm";
const url = "https://api.modarchive.org/downloads.php?moduleid=149049#__lightning__.xm";

export default {
    init(props: InitProps) {
        //Create the audio context here

        load.fromUrl(url);
    },
};
