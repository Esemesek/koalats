import Injector from 'Injector';
import ComponentContainer from 'ComponentContainer';
import ComponentNotFoundError from 'error/ComponentNotFoundError';

const PROP_VALUE = 'someValue';
const FUNC_VALUE = 'value';

class TestComponent {
  property = PROP_VALUE;
  func() {
    return FUNC_VALUE;
  }
}

describe('Injector', () => {
  afterEach(() => {
    ComponentContainer.getInstance()['registeredComponents'] = {};
    ComponentContainer.getInstance()['components'] = {};
  });

  test('should inject components from container', () => {
    const container = ComponentContainer.getInstance();

    container.registerComponent('SomeComponent', TestComponent, []);
    container.startContainer();

    const component = Injector.get<TestComponent>('SomeComponent');

    expect(component).toBeInstanceOf(TestComponent);
    expect(component.property).toEqual(PROP_VALUE);
    expect(component.func()).toEqual(FUNC_VALUE);
  });

  test('should not inject non-existent component', () => {
    const container = ComponentContainer.getInstance();

    container.startContainer();

    expect(() => {
      Injector.get<Object>('NonExistentComponent')
    }).toThrowError(ComponentNotFoundError);
  });
});
