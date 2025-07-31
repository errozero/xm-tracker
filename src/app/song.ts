async function getData() {
    //const url = "/songs/cerror_-_je_vader.xm";
    //const url = "/songs/DEADLOCK.XM";
    const url = "songs/elw-sick.xm";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const dataBlob = await response.blob();

        async function getBytes(offset: number, length: number) {
            const sliced = dataBlob.slice(offset, offset + length);
            const arrBuff = await sliced.arrayBuffer();
            const bytes = new Uint8Array(arrBuff);
            return bytes;
        }

        async function getText(offset: number, length: number) {
            const bytes = await getBytes(offset, length);
            const decoder = new TextDecoder("utf-8");
            const text = decoder.decode(bytes);
            return text;
        }

        const id = await getText(0, 17);
        const moduleName = await getText(17, 20);

        // console.log("Bytes: ", bytes);
        console.log(id, moduleName);

        // return bytes;
    } catch (error: any) {
        console.error(error.message);
    }
}

export const song = {
    test() {
        getData();
    },
};
