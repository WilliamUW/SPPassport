import React from "react";
import { useConnect } from "wagmi";

interface ConnectWalletProps {
  onConnect: () => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ onConnect }) => {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
    onSuccess: onConnect,
  });

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          className="btn btn-primary mb-2"
          disabled={!connector.ready || isLoading}
        >
          {connector.name}
          {isLoading && connector.id === pendingConnector?.id && " (connecting)"}
        </button>
      ))}
      {error && <div className="text-error mt-2">{error.message}</div>}
    </div>
  );
};

export default ConnectWallet;