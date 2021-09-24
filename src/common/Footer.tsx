import React from "react"


const Footer: React.FC<unknown> = ({children}): JSX.Element => (
  <div className="footer py-3">
    <div className="container">
      {children}
    </div>
  </div>
);

export default Footer;