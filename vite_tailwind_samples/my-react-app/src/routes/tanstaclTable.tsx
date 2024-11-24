import { NavLink } from "react-router-dom";

export const TanstaclTable = () => {
  return (
    <>
      <li>
        <NavLink to="/tstable-basic">Tanstack Table Basic</NavLink>
      </li>
      <li>
        <NavLink to="/tstable-resize">Tanstack Table Resize</NavLink>
      </li>
      <li>
        <NavLink to="/tstable-pagination">Tanstack Table Pagination</NavLink>
      </li>
      <li>
        <NavLink to="/tstable-filter">Tanstack Table Filter</NavLink>
      </li>
      <li>
        <NavLink to="/tstable-faceted-filter">
          Tanstack Table Faceted Filter
        </NavLink>
      </li>
      <li>
        <NavLink to="/tstable-sort">Tanstack Table Sort</NavLink>
      </li>
      <li>
        <NavLink to="/tstable-row-selection">
          Tanstack Table Row Selection
        </NavLink>
      </li>
      <li>
        <NavLink to="/tstable-column-visibility">
          Tanstack Table Column Visibility
        </NavLink>
      </li>
      <li>
        <NavLink to="/tstable-header-group">
          Tanstack Table Header Groups
        </NavLink>
      </li>
    </>
  );
};
