export type RenderType<T> = (value: any, rowData: T) => JSX.Element;
export type RenderTypeTitle<T> = (rowData: T) => string;
