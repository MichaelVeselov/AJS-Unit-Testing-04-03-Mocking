import getLevel from '../user.js';
import fetchData from '../http.js';

jest.mock('../http.js');

beforeEach(() => {
  jest.resetAllMocks();
});

describe('function getLevel should return current level', () => {
  test('getLevel returned ok', () => {
    fetchData.mockReturnValue({ status: 'ok', level: '2' });
    const response = getLevel(1);
    expect(response).toBe('Ваш текущий уровень: 2');
  });

  test('getLevel returned not available', () => {
    fetchData.mockReturnValue({ status: 'not available' });
    const response = getLevel(1);
    expect(response).toBe('Информация об уровне временно недоступна');
  });

  test('control fetchData after run of getLevel', () => {
    fetchData.mockReturnValue(JSON.stringify({}));
    const response = getLevel(1);
    expect(fetchData).toBeCalledWith('https://server/user/1');
    expect(fetchData).toBeCalledTimes(1);
  });
});
