interface ArvishTestOptions {
  envs: object;
  vars: object;
  version: string;
}

export default function (options: ArvishTestOptions): (script: string) => Promise<any>;
