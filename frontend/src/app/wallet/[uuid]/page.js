"use client";
import { EthHashInfo } from "@safe-global/safe-react-components";
import { ThemeProvider } from "@mui/material";
import { SafeThemeProvider } from "@safe-global/safe-react-components";
import SSOButton from "../../components/SSOButton";
import useAuth from "./context/useAuth";
import {
  CreateWalletContextProvider,
  useCreateWallet,
} from "./context/CreateWalletContext";
import Relay from "./components/Relay";
import config from "../../../config";

const Page = () => {
  console.log("config", config, process.env);
  return (
    <SafeThemeProvider mode="dark">
      {(safeTheme) => (
        <ThemeProvider theme={safeTheme}>
          <CreateWalletContextProvider>
            <App2 />
          </CreateWalletContextProvider>
        </ThemeProvider>
      )}
    </SafeThemeProvider>
  );
};

const App2 = () => {
  const {
    userInfo,
    ownerAddress,
    chain,
    safes,
    isAuthenticated,
    web3Provider,
    loginWeb3Auth,
    logoutWeb3Auth,
  } = useCreateWallet();

  if (isAuthenticated && web3Provider) {
    return <Relay />;
  }

  return (
    <>
      <SSOButton
        onLogin={loginWeb3Auth}
        onLogout={logoutWeb3Auth}
        userInfo={userInfo}
        isLoggedIn={!!isAuthenticated}
      />
      {ownerAddress && (
        <div style={{ display: "flex", columnGap: "4rem" }}>
          <div>
            <h3>Account</h3>
            <hr />
            <EthHashInfo
              address={ownerAddress}
              showCopyButton
              showPrefix
              prefix={getPrefix("0x5")}
            />
          </div>
          <div>
            <h3>Available Safes</h3>
            <hr />
            {safes.length ? (
              safes.map((safe) => (
                <div key={safe}>
                  <EthHashInfo
                    address={safe}
                    showCopyButton
                    shortAddress={false}
                  />
                </div>
              ))
            ) : (
              <p>No Available Safes</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const App = () => {
  const {
    userInfo,
    ownerAddress,
    chain,
    safes,
    isAuthenticated,
    web3Provider,
    loginWeb3Auth,
    logoutWeb3Auth,
  } = useAuth();

  return (
    <>
      <SSOButton
        onLogin={loginWeb3Auth}
        onLogout={logoutWeb3Auth}
        userInfo={userInfo}
        isLoggedIn={!!isAuthenticated}
      />
      {ownerAddress && (
        <div style={{ display: "flex", columnGap: "4rem" }}>
          <div>
            <h3>Account</h3>
            <hr />
            <EthHashInfo
              address={ownerAddress}
              showCopyButton
              showPrefix
              prefix={getPrefix("0x5")}
            />
          </div>
          <div>
            <h3>Available Safes</h3>
            <hr />
            {safes.length ? (
              safes.map((safe) => (
                <div key={safe}>
                  <EthHashInfo
                    address={safe}
                    showCopyButton
                    shortAddress={false}
                  />
                </div>
              ))
            ) : (
              <p>No Available Safes</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const getPrefix = (chainId) => {
  switch (chainId) {
    case "0x1":
      return "eth";
    case "0x5":
      return "gor";
    case "0x100":
      return "gno";
    case "0x137":
      return "matic";
    default:
      return "eth";
  }
};

export default Page;
