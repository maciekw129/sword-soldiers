export interface TableColumn<T> {
  label: string;
  fieldName: keyof T & string;
  transform?: (value: T) => string;
}

export interface TableAction<T> {
  icon: string;
  label: string;
  callback: (value: T) => void;
}
