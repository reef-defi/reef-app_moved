import React from 'react';
import './icon-upload.css';
import Uik from '@reef-defi/ui-kit';
import { faImage } from '@fortawesome/free-regular-svg-icons';

export interface Props {
  value?: string,
  onChange?: (value: string) => void
}

// eslint-disable-next-line
export const toBase64 = (file: File): any => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

const IconUpload = ({
  value,
  onChange,
}: Props): JSX.Element => {
  const processFile = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    // eslint-disable-next-line
    toBase64(file).then((res: any) => {
      if (res && onChange) onChange(res);
    }).catch(() => {
      if (onChange) onChange('');
    });
  };

  return (
    <div className="icon-upload">
      {/* eslint-disable-next-line */}
      <label className='icon-upload__area' htmlFor="token-icon-upload">
        {
          value
            ? (
              <img
                className="icon-upload__image"
                src={value}
                alt="Token icon"
                key={value}
              />
            )
            : <Uik.Icon className="icon-upload__icon" icon={faImage} />
        }
      </label>

      <input
        id="token-icon-upload"
        accept="image/*"
        type="file"
        onChange={processFile}
      />
    </div>
  );
};

export default IconUpload;
