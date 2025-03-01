import { themeType } from "../../slices/theme-slice";
import { useAppSelector } from "../../store/hooks";

export const ThemedTr: React.FC<React.HTMLProps<HTMLTableRowElement>> = ({
  children,
  ...rest
}) => {
  const _themeType = useAppSelector(themeType);
  return (
    <tr
      {...rest}
      style={{
        border:
          _themeType === "dark" ? "1px solid #424242" : "1px solid #d9d9d9",
        transition: "background 0.3s ease",
      }}
    >
      {children}
    </tr>
  );
};

export const ThemedTd: React.FC<React.HTMLProps<HTMLTableCellElement>> = ({
  children,
  ...rest
}) => {
  const _themeType = useAppSelector(themeType);
  return (
    <td
      {...rest}
      style={{
        border:
          _themeType === "dark" ? "1px solid #424242" : "1px solid #d9d9d9",
        transition: "background 0.3s ease",
      }}
    >
      {children}
    </td>
  );
};

export const ThemedTh: React.FC<React.HTMLProps<HTMLTableCellElement>> = ({
  children,
  ...rest
}) => {
  const _themeType = useAppSelector(themeType);
  return (
    <th
      {...rest}
      style={{
        border:
          _themeType === "dark" ? "1px solid #424242" : "1px solid #d9d9d9",
        transition: "background 0.3s ease",
      }}
    >
      {children}
    </th>
  );
};
