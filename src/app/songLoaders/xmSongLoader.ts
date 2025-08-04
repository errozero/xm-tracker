export async function xmSongLoader(dataBlob: Blob) {
    async function getBytes(offset: number, length: number) {
        const sliced = dataBlob.slice(offset, offset + length);
        const arrBuff = await sliced.arrayBuffer();
        const bytes = new Uint8Array(arrBuff);
        return bytes;
    }

    async function getWord(offset: number, length: number) {
        const sliced = dataBlob.slice(offset, offset + length);
        const arrBuff = await sliced.arrayBuffer();
        const view = new DataView(arrBuff);
        const dword = view.getUint16(0, true);
        return dword;
    }

    async function getDWord(offset: number, length: number) {
        const sliced = dataBlob.slice(offset, offset + length);
        const arrBuff = await sliced.arrayBuffer();
        const view = new DataView(arrBuff);
        const dword = view.getUint32(0, true);
        return dword;
    }

    async function getText(offset: number, length: number) {
        const bytes = await getBytes(offset, length);
        const decoder = new TextDecoder("utf-8");
        const text = decoder.decode(bytes);
        return text;
    }

    const id = await getText(0, 17);
    const moduleName = await getText(17, 20);
    const trackerName = await getText(38, 20);
    const versionNumber = await getBytes(58, 2);
    const headerSize = await getDWord(60, 4);
    const songLength = await getWord(64, 2);
    const songRestartPosition = await getWord(66, 2);
    const channelCount = await getWord(68, 2);
    const patternCount = await getWord(70, 2);
    const instrumentCount = await getWord(72, 2);
    const flags = await getWord(74, 2);
    const defaultTempo = await getWord(76, 2);
    const defaultBpm = await getWord(78, 2);
    const patternOrderTable = await getBytes(80, 256);

    const patterns = [];

    //const firstPatternOffset = 80 + 256;
    let patternOffset = 60 + headerSize;

    //Patterns
    for (let i = 0; i < patternCount; i++) {
        const patternHeaderLength = await getWord(patternOffset, 4);
        const numRows = await getWord(patternOffset + 5, 2);
        const packedPatternDataSize = await getWord(patternOffset + 7, 2);
        const nextPatternOffset = patternOffset + patternHeaderLength + packedPatternDataSize;

        const dataBytes = await getBytes(
            patternOffset + patternHeaderLength,
            packedPatternDataSize
        );
        const data = [];
        let byteIndex = 0;

        //Rows
        for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
            data.push([]);
            const rowData: number[][] = data[rowIndex];

            //Channels / Columns
            for (let chIndex = 0; chIndex < channelCount; chIndex++) {
                const chData: number[] = [];
                const byte = dataBytes[byteIndex++];
                const note = byte & 1 ? dataBytes[byteIndex++] : 0;
                const instrument = byte & (1 << 1) ? dataBytes[byteIndex++] : 0;
                const volume = byte & (1 << 2) ? dataBytes[byteIndex++] : 0;
                const effectId = byte & (1 << 3) ? dataBytes[byteIndex++] : 0;
                const effectValue = byte & (1 << 4) ? dataBytes[byteIndex++] : 0;

                chData[0] = note;
                chData[1] = instrument;
                chData[2] = volume;
                chData[3] = effectId;
                chData[4] = effectValue;

                rowData.push(chData);
            }
        }

        patterns.push(data);

        patternOffset = nextPatternOffset;
    }

    console.log(id, moduleName);
    console.log(versionNumber[1], versionNumber[0]);
    console.log("HeaderSize:", headerSize);
    console.log("SongLength", songLength);
    console.log("Restart Pos: ", songRestartPosition);
    console.log("Channel Count:", channelCount);
    console.log("Pattern Count", patternCount);
    console.log("Instrument Count", instrumentCount);
    console.log("Flags", flags);
    console.log("Default tempo", defaultTempo);
    console.log("Default BPM", defaultBpm);
    console.log("Pattern Order Table", patternOrderTable);
    console.log("Patterns", patterns);
}
