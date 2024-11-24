import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import styles from "./CvaSample.module.css";

// IMPORTANT:
// CVA自体はtailwind専用ではない！素のCSSやCSS Modulesでも使える！

const button = cva(styles.base, {
  variants: {
    intent: {
      primary: styles.primary,
      secondary: styles.secondary,
    },
    size: {
      small: styles.small,
      medium: styles.medium,
    },
  },
  // 組み合わせたときに独自のスタイルを適用したい場合
  compoundVariants: [
    { intent: "primary", size: "medium", className: styles.primaryMedium },
  ],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

// VariantProps によりTypeScriptの型補完が効く

// export interface Props
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof button> {}

// 以下のように書いたほうが個人的にはわかりやすいので変更
export type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

// NOTE: button要素を継承しているのでchildrenも使える
export const CvaSample = ({ className, intent, size, ...props }: Props) => (
  <button className={button({ intent, size, className })} {...props} />
);
