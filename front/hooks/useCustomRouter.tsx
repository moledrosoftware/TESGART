// hooks/useCustomRouter.ts
import { useRouter as useNextRouter } from 'next/navigation';

const useCustomRouter = () => {
  const router = useNextRouter();

  const push = (url: string) => {
    router.push(url);
  };

  const replace = (url: string) => {
    router.replace(url);
  };

  const back = () => {
    router.back();
  };

  const reload = () => {
    router.refresh();
  };

  return {
    push,
    replace,
    back,
    reload,
  };
};

export default useCustomRouter;
