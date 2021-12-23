export const lastFm: string = "last_fm"

export class LastFmAPI {

    private readonly methods: any = {
        album: {
            addTags: 'album.addTags',
            getInfo: 'album.getInfo',

        }
    }

    constructor(private readonly apiKey: string) {

    }


}