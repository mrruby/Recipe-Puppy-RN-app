import {renderHook} from '@testing-library/react-hooks';
import {useApi} from './index.js';
import mockedData from '../test/mock/data.json';

describe('the useApi hook', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockedData),
      }),
    );
  });
  afterEach(() => {
    global.fetch.mockClear();
  });
  afterAll(() => {
    global.fetch.mockRestore();
  });

  it('should make the api call to fetch and return loading state', async () => {
    const {result, waitForNextUpdate} = renderHook(() => useApi(1, 'test'));
    expect(result.current).toEqual([true, [], 10]);
    await waitForNextUpdate();
    expect(result.current).toEqual([false, mockedData.results, 10]);
  });
});
