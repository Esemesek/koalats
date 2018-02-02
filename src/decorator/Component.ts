import IoCService from '../service/IoCService';

const Component = ({ name, dependencies = [] }: { name: string, dependencies?: string[] }) => {
  return (target: any) => {
    IoCService.getInstance().registerComponent(name, target, dependencies);
  }
}

export default Component;
