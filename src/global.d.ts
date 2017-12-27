import { Context } from "koa";

declare namespace NodeJS {
    interface Global {
        test: String;
    }
}

// https://www.typescriptlang.org/docs/handbook/declaration-merging.html
interface Context {
    appID: number;
}