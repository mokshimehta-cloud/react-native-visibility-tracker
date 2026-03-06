import type { ViewProps } from 'react-native';
type Props = ViewProps & {
    threshold?: number;
    onFocus?: () => void;
    onBlur?: () => void;
};
export default function VisibilityView({ threshold, onFocus, onBlur, ...rest }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=VisibilityView.d.ts.map