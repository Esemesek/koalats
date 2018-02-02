import IoCService from '../service/IoCService';

const Inject = (name: string) => (target: any, key: string) => {
  const get = () => IoCService.getInstance().getComponent(name);

  Reflect.defineProperty(target, key, {
    get,
  });
}

export default Inject;
