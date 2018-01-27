import Injector from './Injector';
declare const _default: {
    startContainer: () => void;
    Component: ({name, dependencies}: {
        name: string;
        dependencies?: string[] | undefined;
    }) => (target: any) => void;
    Injector: typeof Injector;
};
export default _default;
