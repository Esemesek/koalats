import ComponentContainer, { ConstructorMap } from 'ComponentContainer';
import CircularDependencyError from 'error/CircularDependencyError';
import ComponentAlreadyExistError from 'error/ComponentAlreadyExistError';
import ComponentNotFoundError from 'error/ComponentNotFoundError';
import fixture from './registeredComponents.fixure';

describe('ComponentContainer', () => {
  afterEach(() => {
    ComponentContainer.getInstance()['registeredComponents'] = {};
    ComponentContainer.getInstance()['components'] = {};
  });

  test('should be singleton', () => {
    expect(new ComponentContainer()).toBe(new ComponentContainer());
  });

  test('should register component and get it', () => {
    const container = ComponentContainer.getInstance();
    container.registerComponent('exampleComponent', Object, []);
    container.startContainer();

    expect(container.getComponent('exampleComponent')).toBeInstanceOf(Object);
  });

  test('should not register component with the same name twice', () => {
    const container = ComponentContainer.getInstance();
    container.registerComponent('exampleComponent', Object, []);
    expect(() => {
      container.registerComponent('exampleComponent', Object, []);
    }).toThrow(ComponentAlreadyExistError);
  });

  test('should not get non existent component', () => {
    const container = ComponentContainer.getInstance();
    expect(() => {
      container.getComponent('nonExistentComponent');
    }).toThrow(ComponentNotFoundError);
  });

  test('should work for single component', () => {
    const container = ComponentContainer.getInstance();
    container['registeredComponents'] = fixture.basic;

    container.startContainer();

    expect(container.getComponent('componentA')).toBeInstanceOf(Object);
  });

  test('should work for two components', () => {
    const container = ComponentContainer.getInstance();
    container['registeredComponents'] = fixture.complex1;

    container.startContainer();

    expect(container.getComponent('componentA')).toBeInstanceOf(Object);
    expect(container.getComponent('componentB')).toBeInstanceOf(Object);
  });

  test('should work for multiple components', () => {
    const container = ComponentContainer.getInstance();
    container['registeredComponents'] = fixture.complex2;

    container.startContainer();

    expect(container.getComponent('componentA')).toBeInstanceOf(Object);
    expect(container.getComponent('componentB')).toBeInstanceOf(Object);
    expect(container.getComponent('componentC')).toBeInstanceOf(Object);
  });

  test('should not work for circular self dependency', () => {
    const container = ComponentContainer.getInstance();
    container['registeredComponents'] = fixture.selfDep;

    expect(container.startContainer).toThrow(CircularDependencyError);
  });

  test('should not work for direct circular dependency', () => {
    const container = ComponentContainer.getInstance();
    container['registeredComponents'] = fixture.cycleDep1;

    expect(container.startContainer).toThrow(CircularDependencyError);
  });

  test('should not work for indirect circular dependency', () => {
    const container = ComponentContainer.getInstance();
    container['registeredComponents'] = fixture.cycleDep2;

    expect(container.startContainer).toThrow(CircularDependencyError);
  });

  test('should not work for unresolved dependencies', () => {
    const container = ComponentContainer.getInstance();
    container['registeredComponents'] = fixture.depNotFound;

    expect(container.startContainer).toThrow(ComponentNotFoundError);
  });
});
