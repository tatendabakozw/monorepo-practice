/* eslint-disable @typescript-eslint/ban-types */
import React, { FC, ReactElement } from 'react';

type Props = {
  text: string;
  dark?: boolean;
  outline?: boolean;
  onClick?: () => void;
  loading?: boolean;
};

const PrimaryButton: FC<Props> = (props: Props): ReactElement => {
  return (
    <button
      disabled={props.loading}
      onClick={props.loading ? () => console.log('loading') : props.onClick}
      className={`${
        props.outline
          ? `bg-white text-primary-original border border-primary-light hover:bg-primary-original hover:text-white `
          : `${
              props.dark
                ? 'bg-primary-superdark hover:bg-primary-dark '
                : 'bg-primary-original hover:bg-primary-dark '
            } text-white `
      } rounded font-semibold text-center p-3`}
    >
      {props.loading ? (
        <div className="flex flex-row items-center justify-center font-semibold capitalize">
          <div
            className={`animate-spin rounded-full h-4 w-4 mr-2 border-t-2  border-b-2 ${
              props.outline
                ? 'border-primary-original hover:border-white'
                : 'border-white'
            }`}
          ></div>
          <p className="font-semibold capitalize">Loading...</p>
        </div>
      ) : (
        <>{props.text}</>
      )}
    </button>
  );
};

export default PrimaryButton;
