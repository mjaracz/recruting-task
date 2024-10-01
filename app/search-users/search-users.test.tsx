import { render } from '@testing-library/react';
import { SearchUsers } from "./search-users";
import Providers from '../providers';

describe('<SearchUsers />', () => {
  test('should correct match the snapshot', () => {
    const { baseElement } = render(<Providers><SearchUsers/></Providers>);

    expect(baseElement).toMatchSnapshot();
  })
})