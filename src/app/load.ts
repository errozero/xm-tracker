import { songStore } from "@ui/stores/songStore";
import { xmSongLoader } from "./songLoaders/xmSongLoader";

async function fromUrl(url: string) {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const dataBlob = await response.blob();

        await xmSongLoader(dataBlob);
    } catch (error: any) {
        console.error(error.message);
    }
}

export const load = {
    fromUrl,
};
