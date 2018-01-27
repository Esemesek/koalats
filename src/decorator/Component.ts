import ComponentContainer from '../ComponentContainer';

const Component = ({ name, dependencies = [] }: { name: string, dependencies?: string[] }) => {
  return (target: any) => {
    ComponentContainer.getInstance().registerComponent(name, target, dependencies);
  }
}

export default Component;
