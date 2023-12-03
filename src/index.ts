import { limitTextarea } from './components/limit-textarea/limit-textarea';
import './index.css';
import { helloWorld } from './lib/hello-world';

const message: string = 'app started';

console.log(message);

limitTextarea(
  document.body,
  {
    limit: 100,
    defaultText: helloWorld('unit tests'),
    onSubmit: (value: string) => {
      document.body.textContent = value;
    },
  },
);
