import ComponentContainer from '../ComponentContainer';

const Inject = (name: string) => (target: any, key: string) => {
  const get = () => ComponentContainer.getInstance().getComponent(name);

  Reflect.defineProperty(target, key, {
    get,
  });
}

export default Inject;
