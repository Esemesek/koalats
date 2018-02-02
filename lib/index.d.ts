import Injector from './Injector';
declare const _default: {
    Bootstrap: (target: any) => void;
    Component: ({ name, dependencies }: {
        name: string;
        dependencies?: string[] | undefined;
    }) => (target: any) => void;
    Inject: (name: string) => (target: any, key: string) => void;
    Injector: typeof Injector;
};
export default _default;
