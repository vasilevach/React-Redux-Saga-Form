import form from '../common/form/saga';
import example from '../example/saga';

export default function* sagas() {
  yield [
    form(),
    example()
  ];
}
