export interface Template {
  id: string;
  name: string;
  template: string;
  fields: Field[];
  userId: string;
}

export interface Field {
  id: string;
  placeholder: string;
}
