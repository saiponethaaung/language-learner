"use client";
import { Provider } from "react-redux";
import makeStore from "./store";

interface IProps extends React.PropsWithChildren {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialReduxState: any;
}

export default function StoreProvider({ children, initialReduxState }: IProps) {
  const store = makeStore(initialReduxState);
  return <Provider store={store}>{children}</Provider>;
}
