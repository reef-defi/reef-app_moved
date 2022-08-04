import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './overlay-action.css';
import Uik from '@reef-defi/ui-kit';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export interface Props {
  isOpen: boolean,
  onClose?: () => any,
  className?: string,
  title?: string,
  children: any
}

const OverlayAction = ({
  isOpen,
  onClose,
  className,
  title,
  children,
}: Props): JSX.Element => {
  const wrapper = useRef(null);

  const opened = (): void => {
    document.body.style.overflow = 'hidden';
  };

  const closed = (): void => {
    document.body.style.overflow = '';
  };

  return (
    <div
      className={`
        overlay-action
        ${className || ''}
      `}
    >
      <CSSTransition
        in={isOpen}
        className="overlay-action__wrapper"
        nodeRef={wrapper}
        timeout={500}
        unmountOnExit
        onEnter={opened}
        onExited={closed}
      >
        <div
          ref={wrapper}
          className="overlay-action__wrapper"
        >
          <div className="overlay-action__content">
            <div className="overlay-action__head">
              <div className="overlay-action__title">{ title }</div>

              <button
                className="overlay-action__close-btn"
                type="button"
                onClick={onClose}
              >
                <Uik.Icon
                  className="overlay-action__close-btn-icon"
                  icon={faXmark}
                />
              </button>
            </div>

            <div className="overlay-action__slot">
              { children }
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default OverlayAction;
