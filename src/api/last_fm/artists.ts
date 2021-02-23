import { BaseAPI, HTTPQuery } from "./base_api";

export interface Artist {
    name: string;
    mbid?: string;
    match: number;
    url: string;
    image: {"#text": string, size: string}[];
    streamable: number;
}


interface SearchRequest {
    //no auth required
    limit?: number;
    page?: number;
    artist: string;
}

interface SearchResponse {
    results: {
        "opensearch:Query": {
            "#text": string;
            role: string;
            searchTerms: string;
            startPage: number;
        },
        "opensearch:totalResults": number;
        "opensearch:startIndex": number;
        "opensearch:itemsPerPage": number;
        artistmatches: {
            artist: {
                name: string;
                listeners: number;
                mbid?: string;
                url: string;
                streamable: number;
                image: {"#text": string, size: string}[];
            }
        },
        "@attr": {
            for: string;
        }
    }
}

interface GetSimilarResponse {
    similarartists: {
        artist: Artist[]
    }
}

interface GetSimilarRequest {
    //no auth required
    limit?: number;
    artist: string;
    autocorrect?: 0 | 1;
    mbid?: string;
}

interface GetInfoRequest {
    //no auth required
    artist: string;
    mbid?: string;
    lang?: string;
    autocorrect?: 0 | 1;
    username?: string
}

export interface GetInfoResponse {
    artist: {
        name: string;
        mbid?: string;
        url: string;
        image: {"#text": string, size: string}[];
        streamable: number;
        ontour: number;
        stats: {
            listeners: number;
            playcount: number;
        },
        similar: {
            artist: {
                name: string;
                url: string;
                image: {"#text": string, size: string}[];
            }

        },
        tags: {
            tag: {name: string; url: string}[];
        },
        bio: {
            links: {
                link: {
                    "#text": string;
                    rel: string;
                    href: string;
                }
            },
            published: string;
            summary: string;
            content: string;
        }

    }
}

enum Methods {
    ADD_TAGS = "artist.addTags",
    GET_CORRECTION = "artist.getCorrection",
    GET_INFO = "artist.getInfo",
    GET_SIMILAR = "artist.getSimilar",
    GET_TAGS = "artist.getTags",
    GET_TOP_ALBUMS = "artist.getTopAlbums",
    GET_TOP_TAGS = "artist.getTopTags",
    GET_TOP_TRACKS = "artist.getTopTracks",
    REMOVE_TAG = "artist.removeTag",
    SEARCH = "artist.search",
}

export class Artists extends BaseAPI {

    async getSimilar(req: GetSimilarRequest): Promise<GetSimilarResponse> {
        const query = this.queryString(req as unknown as HTTPQuery)
        return await this.fetchApi<GetSimilarResponse>(query, Methods.GET_SIMILAR)
    }

    getInfo(req: GetInfoRequest): Promise<GetInfoResponse>{
        const query = this.queryString(req as unknown as HTTPQuery)
        return this.fetchApi<GetInfoResponse>(query, Methods.GET_INFO)
    }

    search(req: SearchRequest): Promise<SearchResponse> {
        const query = this.queryString(req as unknown as HTTPQuery);
        return this.fetchApi<SearchResponse>(query, Methods.SEARCH)
    }
}