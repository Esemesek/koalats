import Inject from 'decorator/Inject';
import IoCService from 'service/IoCService';

class TestClass {
  @Inject('prop')
  public property;
}

describe('Inject decorator', () => {
  let container = IoCService.getInstance();
  let originalFn = container.getComponent;
  let mockFn = jest.fn();

  beforeAll(() => {
    container.getComponent = mockFn;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    container.getComponent = originalFn;
  });

  test('should inject component from container', () => {
    new TestClass().property;

    expect(mockFn.mock.calls.length).toEqual(1);
    expect(mockFn.mock.calls[0]).toEqual(['prop']);
  });
});
