import path from 'path';
export const getHooks = async (hooks: string[]) => {
  const len = hooks.length;
  const result: any[] = []
  for (let i = 0;i < len;i++) {
    const hook = await import(path.join(__dirname, "../hooks", hooks[i]));
    result.push(hook)
  }
  return result
}