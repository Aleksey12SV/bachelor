import {
  ComponentType,
  Suspense,
} from "react";

export const SuspenseComponent =
  <T extends JSX.IntrinsicAttributes>(Component: ComponentType<T>) =>
  (props: T) =>
    (
      <Suspense fallback={null}>
        <Component {...props} />
      </Suspense>
    );
