import Providers from "../../providers/Context";
import { WalletContext } from "../../providers/WalletContext";
import Header from "../navigations/Header";

const Layout1 = ({ children }) => {
  return (
    <div>
      <WalletContext>
        <Providers>
          
        <Header />
        <div className="bg-ternary">
          {children}
        </div>
        </Providers>
      </WalletContext>
    </div>
  )
}


export default Layout1;
