import axios, {AxiosResponse} from "axios";
import {SearchModel} from "../models/search.model";
import {AnimeModel} from "../models/anime.model";
import qs from "qs";
type GetUserResponse = {
    data: {
        request_hash: string,
        request_cached: boolean,
        request_cache_expiry: number,
        API_DEPRECATION: boolean,
        API_DEPRECATION_DATE: string,
        API_DEPRECATION_INFO: string
        results: AnimeModel[],
        last_page: number,
    }
}
export const getAnimeList = async (query: SearchModel): Promise<GetUserResponse | any> => {
    try {
        const queryParams = qs.stringify(query);
        const url = `https://api.jikan.moe/v3/search/anime?${queryParams}`
        const { data } = await axios.get(
            url,
        );
        console.log('data', data);
        return data;
    } catch (err) {
        return err;
    }
}
