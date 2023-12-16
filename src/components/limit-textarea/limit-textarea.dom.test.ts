import { fireEvent, screen } from '@testing-library/dom';

import { limitTextarea } from './limit-textarea';

beforeEach(() => {
  document.body.textContent = '';
});

test('limit-textarea renders', () => {
  limitTextarea(
    document.body,
    {
      limit: 10,
      defaultText: 'test text',
      onSubmit: (value: string) => {
        document.body.textContent = value;
      },
    },
  );

  expect(screen.getByText('Осталось 1 символов из 10')).toBeVisible();
});

test('limit-textarea disables on content over limit', () => {
  limitTextarea(
    document.body,
    {
      limit: 10,
      defaultText: 'test text',
      onSubmit: (value: string) => {
        document.body.textContent = value;
      },
    },
  );

  expect(screen.getByText('Осталось 1 символов из 10')).toBeVisible();

  const control = screen.getByRole('textbox');

  fireEvent.input(control, { target: { value: '32332322332323232' } });

  expect(screen.getByText('Вы превысили лимит в 10 символов')).toBeVisible();
});
