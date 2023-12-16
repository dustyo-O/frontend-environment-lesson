import { stringTemplateEngine } from '../../lib/string-template-engine';
import { limitTextarea } from './limit-textarea';

jest.mock('../../lib/string-template-engine');

(stringTemplateEngine as jest.Mock).mockReturnValue('test');

test('render limit-textarea', () => {
  const insertAdjacentHTML = jest.fn();

  limitTextarea({
    insertAdjacentHTML,
    querySelector: () => {},
  } as unknown as HTMLElement, {
    defaultText: 'test',
    limit: 10,
    onSubmit: () => {},
  });

  expect(stringTemplateEngine).toHaveBeenCalledTimes(1);
  expect(stringTemplateEngine).toHaveBeenCalledWith({
    block: 'div',
    cls: 'limit-textarea',
    content: [{
      block: 'textarea',
      cls: 'limit-textarea__control',
      attrs: {
        role: 'textbox',
      },
      content: 'test',
    }, {
      block: 'div',
      cls: 'limit-textarea__left',
      content: 'Осталось 6 символов из 10',
    }, {
      block: 'button',
      cls: 'limit-textarea__button',
      content: 'OK',
    }],
  });

  expect(insertAdjacentHTML).toHaveBeenCalledTimes(1);
  expect(insertAdjacentHTML).toHaveBeenCalledWith('beforeend', 'test');
});
