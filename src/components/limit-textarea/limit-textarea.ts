import { stringTemplateEngine } from '../../lib/string-template-engine';
import { TemplateBlock } from '../../types/TemplateEngine';

type LimitTextareaOptions = {
  limit: number;
  defaultText?: string;
  onSubmit: (value: string) => void;
};

const leftContent = (limit: number, content: string) => (
  limit < content.length ? `Вы превысили лимит в ${limit} символов` : `Осталось ${limit - content.length} символов из ${limit}`
);

const limitTextareaTemplate: (limit: number, content?: string) => TemplateBlock = (limit, content = '') => ({
  block: 'div',
  cls: 'limit-textarea',
  content: [{
    block: 'textarea',
    cls: 'limit-textarea__control',
    attrs: {
      role: 'textbox',
    },
    content,
  }, {
    block: 'div',
    cls: 'limit-textarea__left',
    content: leftContent(limit, content),
  }, {
    block: 'button',
    cls: 'limit-textarea__button',
    content: 'OK',
  },
  ],
});

function limitTextarea(
  container: HTMLElement,
  { limit, defaultText, onSubmit }: LimitTextareaOptions,
) {
  const template = limitTextareaTemplate(limit, defaultText);

  container.insertAdjacentHTML('beforeend', stringTemplateEngine(template));

  const button = container.querySelector<HTMLButtonElement>('.limit-textarea__button');
  const control = container.querySelector<HTMLButtonElement>('.limit-textarea__control');
  const left = container.querySelector<HTMLButtonElement>('.limit-textarea__left');

  if (!control || !button || !left) {
    return;
  }

  control.addEventListener('input', () => {
    const { value } = control;

    left.textContent = leftContent(limit, value);

    button.disabled = limit < value.length;
  });

  button.addEventListener('click', () => {
    onSubmit(control.value);
  });
}

export { limitTextarea };
