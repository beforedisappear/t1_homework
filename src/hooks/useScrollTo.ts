import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {
  ref: React.MutableRefObject<HTMLElement | null>;
}

export function useScrollTo({ ref }: IProps) {
  const navigate = useNavigate();
  const { state, pathname } = useLocation();

  useEffect(() => {
    if (typeof state === "object" && state !== null && "to" in state) {
      if (ref.current?.id === state.to) {
        window.scrollTo({ top: ref.current?.offsetTop });
        //clear state
        navigate(pathname, { state: {}, preventScrollReset: true });
      }
    }
  }, [state]);

  return null;
}
