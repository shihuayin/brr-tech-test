const React = require("react");

module.exports = {
  // mock Navigate component
  Navigate: ({ to }) =>
    React.createElement("div", null, `MockNavigate to ${to}`),

  useNavigate: () => () => {},
  MemoryRouter: ({ children }) => children,
  Link: ({ children }) => children,
  NavLink: ({ children }) => children,
};
