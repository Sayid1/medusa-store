declare const REDIS_URL: string;
declare const DATABASE_URL: string;
declare const STORE_CORS: string;
declare const ADMIN_CORS: string;
export namespace projectConfig {
    export { REDIS_URL as redis_url };
    export { DATABASE_URL as database_url };
    export const database_type: string;
    export const database_database: string;
    export { STORE_CORS as store_cors };
    export { ADMIN_CORS as admin_cors };
}
export {};
