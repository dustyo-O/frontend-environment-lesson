export type TemplateBlock = string | number | boolean | null | undefined | TemplateBlock[] | {
  block: string,
  cls?: string | string[],
  attrs?: { [key: string]: string },
  content?: TemplateBlock | TemplateBlock[],
};
