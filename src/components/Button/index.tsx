import React from 'react'
import styles from '../../app/colorchange.module.css'
import { useAppSelector } from '@/lib/redux/hooks/hooks'

interface ButtonProps {
  persona: any,
  action: () => void,
  theme: 'pending' | 'success' | 'error' | 'default',
  value?: number
  type: 'stake' | 'unstake'
}

const ButtonComponent: React.FC<ButtonProps> = ({ persona, action, theme, value, type }) => {
  const { edgeBalance, sEdgeBalance } = useAppSelector(state => state.accountAddressReducer)
  const getButtonText = () => {
    if (!persona) {
      return "Connect your wallet";
    }

    switch (theme) {
      case 'pending':
        return "Sending transaction";
      case 'success':
        return "Your EDGs is safe";
      case 'error':
        return "Transaction Error";
      default:
        return type === 'stake' ? "STAKE" : "UNSTAKE";
    }
  };

  const isDisabled = !persona ||
    theme === 'pending' ||
    theme === 'success' ||
    theme === 'error' ||
    value == null ||
    value <= 0 ||
    value > parseFloat(type === 'stake' ? edgeBalance : sEdgeBalance);

  return (
    <button
      disabled={isDisabled}
      onClick={action}
      className="rounded-md flex items-center gap-4 justify-center bg-white text-[#fe9ea4] py-4 disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      {getButtonText()}
      {theme === 'pending' && <div className={`${styles.spinner}`}></div>}
    </button>
  );
}

export default ButtonComponent;
