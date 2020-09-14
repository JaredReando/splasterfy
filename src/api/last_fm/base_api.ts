//accept an object with any key names, and with those keys having values of any type, including nested objects
export type HTTPQuery = { [key: string]: string | number | null | boolean | Array<string | number | null | boolean> | HTTPQuery }

export class BaseAPI {
    private readonly baseUrl: string = "http://ws.audioscrobbler.com/2.0"

    protected async fetchApi<T>(params: string, method: string): Promise<T> {
        const url = this.baseUrl + `?method=${method}&` + params + `&api_key=${process.env.REACT_APP_LAST_FM_KEY}&format=json`
        const response = await fetch(url);
        return await response.json()
    }

    queryString(params: HTTPQuery, prefix: string = ''): string {
        return Object.keys(params)
            .map((key) => {
                const fullKey = prefix + (prefix.length ? `[${key}]` : key);
                const value = params[key];
                if (value instanceof Array) {
                    const multiValue = value.map(singleValue => encodeURIComponent(String(singleValue)))
                        .join(`&${encodeURIComponent(fullKey)}=`);
                    return `${encodeURIComponent(fullKey)}=${multiValue}`;
                }
                if (value instanceof Object) {
                    return this.queryString(value as HTTPQuery, fullKey);
                }
                return `${encodeURIComponent(fullKey)}=${encodeURIComponent(String(value))}`;
            })
            .filter(part => part.length > 0)
            .join('&');
    }

}