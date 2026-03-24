export type FieldType = "string" | "number" | "date";

export interface FieldConfig {
  id: number;
  name: string;
  type: FieldType;
}