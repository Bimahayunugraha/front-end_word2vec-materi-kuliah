const Breadcrumbs = ({ className = "", children }) => {
  return <div className={"z-10 w-full px-0 md:px-0 " + className}>{children}</div>;
};

const Content = ({ children }) => {
  return (
    <nav className="relative flex flex-wrap" aria-label="Breadcrumb">
      <ol className="inline-flex flex-wrap items-center space-x-1">{children}</ol>
    </nav>
  );
};

const Link = ({ className = "", children }) => {
  return (
    <li>
      <div className={"flex items-center " + className}>{children}</div>
    </li>
  );
};

Breadcrumbs.Content = Content;
Breadcrumbs.Link = Link;

export default Breadcrumbs;
