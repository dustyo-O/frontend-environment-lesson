import { stringTemplateEngine } from '../../lib/string-template-engine';
import { TemplateBlock } from '../../types/TemplateEngine';

type LimitTextareaOptions = {
  limit: number;
  defaultText?: string;
  onSubmit: (value: string) => void;
};

const limitTextareaTemplate: (limit: number, content?: string) => TemplateBlock = (limit, content = '') => ({
  block: 'div',
  cls: 'limit-textarea',
  content: [{
    block: 'textarea',
    cls: 'limit-textarea__control',
    content,
  }, {
    block: 'div',
    cls: 'limit-textarea__left',
    content: limit < content.length ? 'Вы превысили лимит' : `Осталось ${limit - content.length} символов`,
  }, {
    block: 'button',
    cls: 'limit-textarea__button',
    content: 'OK',
  },
  ],
});

function limitTextarea(
  container: HTMLElement,
  { limit, defaultText }: LimitTextareaOptions,
) {
  const template = limitTextareaTemplate(limit, defaultText);

  container.insertAdjacentHTML('afterend', stringTemplateEngine(template));
}

export { limitTextarea };
