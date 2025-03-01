import { themeType } from "../../slices/theme-slice";
import { useAppSelector } from "../../store/hooks";

type CustomDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {};

export default function CustomDiv({ children, ...rest }: CustomDivProps) {
  const _themeType = useAppSelector(themeType);

  return (
    <div
      {...rest}
      style={{
        border:
          _themeType === "dark" ? "1px solid #424242" : "1px solid #d9d9d9",
        transition: "background 0.3s ease",
      }}
    >
      {children}
    </div>
  );
}
