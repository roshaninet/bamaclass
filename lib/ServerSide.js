import Requests from "./Requests";

export const ServerSide = async (path, ctx, pager, params = null) => {
    const query = ctx.query;
    if(params) {
        Object.assign(query, params);
    }
    if(pager) {
        query.pager = pager;
    }
    const result = await Requests.getData(path, query, ctx);
    let results = [];
    if (result.success) {
        results = result.response;
    }

    delete query.page;
    delete query.pager;
    return {props: {results: results, parameters: ctx.query}};
}