import InjectorService from 'service/InjectorService';
import IoCService from 'service/IoCService';
import ComponentNotFoundError from 'error/ComponentNotFoundError';

const PROP_VALUE = 'someValue';
const FUNC_VALUE = 'value';

class TestComponent {
  property = PROP_VALUE;
  func() {
    return FUNC_VALUE;
  }
}

describe('InjectorService', () => {
  afterEach(() => {
    IoCService.getInstance()['registeredComponents'] = {};
    IoCService.getInstance()['components'] = {};
  });

  test('should inject components from container', () => {
    const container = IoCService.getInstance();

    container.registerComponent('SomeComponent', TestComponent, []);
    container.startContainer();

    const component = InjectorService.get<TestComponent>('SomeComponent');

    expect(component).toBeInstanceOf(TestComponent);
    expect(component.property).toEqual(PROP_VALUE);
    expect(component.func()).toEqual(FUNC_VALUE);
  });

  test('should not inject non-existent component', () => {
    const container = IoCService.getInstance();

    container.startContainer();

    expect(() => {
      InjectorService.get<Object>('NonExistentComponent')
    }).toThrowError(ComponentNotFoundError);
  });
});
