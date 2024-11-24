import { Outlet, NavLink } from "react-router-dom";
import boxStyle from "../every-layout/box.module.css";
import switcherStyle from "../every-layout/switcher.module.css";
// import centerStyle from "../every-layout/center.module.css";
import { TanstaclTable } from "./tanstaclTable";

export const Root = () => {
  const borderCssVal = { "--border-thin": "0px" } as React.CSSProperties;
  return (
    <>
      <ul>
        <li className={boxStyle.box} style={borderCssVal}>
          <NavLink to="/">Home</NavLink>
        </li>
        <div className={switcherStyle.switcher}>
          <div className={boxStyle.box} style={borderCssVal}>
            <li>
              <NavLink to="/clsx-and-cva-sample">clsx-and-cva-sample</NavLink>
            </li>
            <li>
              <NavLink to="/shadcn-badge">shadcn-badge</NavLink>
            </li>
          </div>
          <div className={boxStyle.box} style={borderCssVal}>
            <li>
              <NavLink to="/error-boundary">Error Boundary</NavLink>
            </li>
          </div>
          <div className={boxStyle.box} style={borderCssVal}>
            <TanstaclTable />
          </div>
        </div>
      </ul>
      <div style={{ marginTop: "2rem" }}></div>
      <div className={boxStyle.box}>
        <Outlet />
      </div>
    </>
  );
};
