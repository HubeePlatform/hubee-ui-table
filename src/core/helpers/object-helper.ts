export default class ObjectHelper {
    static isNullOrUndefined(object: any): boolean {
        return object === null || object === undefined;
    }

    static clone<T>(newInstance: T, data: T): T {
        return Object.assign(newInstance, data as T);
    }
}
