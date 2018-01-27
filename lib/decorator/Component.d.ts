declare const Component: ({name, dependencies}: {
    name: string;
    dependencies?: string[] | undefined;
}) => (target: any) => void;
export default Component;
