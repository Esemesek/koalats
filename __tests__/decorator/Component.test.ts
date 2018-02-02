import Component from 'decorator/Component';
import IoCService from 'service/IoCService';

describe('Component decorator', () => {
  const container = IoCService.getInstance();
  const containerMock = jest.fn();
  let originalRegister = container.registerComponent;

  beforeAll(() => {
    container.registerComponent = containerMock;
  });

  afterAll(() => {
    container.registerComponent = originalRegister;
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should register basic component', () => {
    const COMPONENT_NAME = 'BasicComponent';
    const COMPONENT_DEPS = ['ComponentOne', 'ComponentTwo'];

    Component({
      name: COMPONENT_NAME,
      dependencies: COMPONENT_DEPS
    })(Object);

    expect(containerMock.mock.calls.length).toEqual(1);
    expect(containerMock.mock.calls[0][0]).toEqual(COMPONENT_NAME);
    expect(containerMock.mock.calls[0][1]).toEqual(Object);
    expect(containerMock.mock.calls[0][2]).toEqual(COMPONENT_DEPS);
  });

  test('should register component without dependencies', () => {
    const COMPONENT_NAME = 'SomeComponent';

    Component({
      name: COMPONENT_NAME,
    })(Array);

    expect(containerMock.mock.calls.length).toEqual(1);
    expect(containerMock.mock.calls[0][0]).toEqual(COMPONENT_NAME);
    expect(containerMock.mock.calls[0][1]).toEqual(Array);
    expect(containerMock.mock.calls[0][2]).toEqual([]);
  });
});
