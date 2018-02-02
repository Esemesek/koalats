import IoCService, { ConstructorMap } from 'service/IoCService';
import CircularDependencyError from 'error/CircularDependencyError';
import ComponentAlreadyExistError from 'error/ComponentAlreadyExistError';
import ComponentNotFoundError from 'error/ComponentNotFoundError';
import fixture from './registeredComponents.fixure';

describe('IoCService', () => {
  afterEach(() => {
    IoCService.getInstance()['registeredComponents'] = {};
    IoCService.getInstance()['components'] = {};
  });

  test('should be singleton', () => {
    expect(new IoCService()).toBe(new IoCService());
  });

  test('should register component and get it', () => {
    const container = IoCService.getInstance();
    container.registerComponent('exampleComponent', Object, []);
    container.startContainer();

    expect(container.getComponent('exampleComponent')).toBeInstanceOf(Object);
  });

  test('should not register component with the same name twice', () => {
    const container = IoCService.getInstance();
    container.registerComponent('exampleComponent', Object, []);
    expect(() => {
      container.registerComponent('exampleComponent', Object, []);
    }).toThrow(ComponentAlreadyExistError);
  });

  test('should not get non existent component', () => {
    const container = IoCService.getInstance();
    expect(() => {
      container.getComponent('nonExistentComponent');
    }).toThrow(ComponentNotFoundError);
  });

  test('should work for single component', () => {
    const container = IoCService.getInstance();
    container['registeredComponents'] = fixture.basic;

    container.startContainer();

    expect(container.getComponent('componentA')).toBeInstanceOf(Object);
  });

  test('should work for two components', () => {
    const container = IoCService.getInstance();
    container['registeredComponents'] = fixture.complex1;

    container.startContainer();

    expect(container.getComponent('componentA')).toBeInstanceOf(Object);
    expect(container.getComponent('componentB')).toBeInstanceOf(Object);
  });

  test('should work for multiple components', () => {
    const container = IoCService.getInstance();
    container['registeredComponents'] = fixture.complex2;

    container.startContainer();

    expect(container.getComponent('componentA')).toBeInstanceOf(Object);
    expect(container.getComponent('componentB')).toBeInstanceOf(Object);
    expect(container.getComponent('componentC')).toBeInstanceOf(Object);
  });

  test('should not work for circular self dependency', () => {
    const container = IoCService.getInstance();
    container['registeredComponents'] = fixture.selfDep;

    expect(container.startContainer).toThrow(CircularDependencyError);
  });

  test('should not work for direct circular dependency', () => {
    const container = IoCService.getInstance();
    container['registeredComponents'] = fixture.cycleDep1;

    expect(container.startContainer).toThrow(CircularDependencyError);
  });

  test('should not work for indirect circular dependency', () => {
    const container = IoCService.getInstance();
    container['registeredComponents'] = fixture.cycleDep2;

    expect(container.startContainer).toThrow(CircularDependencyError);
  });

  test('should not work for unresolved dependencies', () => {
    const container = IoCService.getInstance();
    container['registeredComponents'] = fixture.depNotFound;

    expect(container.startContainer).toThrow(ComponentNotFoundError);
  });
});
