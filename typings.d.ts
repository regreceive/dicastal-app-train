declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

interface PortalWindow extends Window {
  $$_K2_SDK: {};
}

interface Window {
  ht: any;
  $$K2RootWindow: PortalWindow;
  $$k2App: {};
  $$_k2: {
    project: {
      service: {};
    };
  };
  env: { [key: string]: any };
}

interface OptionType {
  text: string;
  value: any;
}
