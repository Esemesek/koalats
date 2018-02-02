import InjectorService from './service/InjectorService';
declare const _default: {
    Bootstrap: (target: any) => void;
    Component: ({ name, dependencies }: {
        name: string;
        dependencies?: string[] | undefined;
    }) => (target: any) => void;
    Inject: (name: string) => (target: any, key: string) => void;
    InjectorService: typeof InjectorService;
};
export default _default;
