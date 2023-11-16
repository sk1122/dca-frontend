import Header from "../navigations/Header";

const Layout1 = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="bg-ternary">
        {children}
      </div>
    </div>
  )
}


export default Layout1;
