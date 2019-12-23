import rmrf from 'rimraf';

export function rimraf(path: string): Promise<void> {
  return new Promise(resolve => {
    rmrf(path, () => resolve());
  });
}