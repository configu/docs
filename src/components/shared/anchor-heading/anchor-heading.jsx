import clsx from 'clsx';
import React from 'react';

import AnchorIcon from 'icons/anchor.inline.svg';
import getIdFromChildren from 'utils/get-id-from-children';

const AnchorHeading =
  (Tag) =>
  // eslint-disable-next-line react/prop-types
  ({ children }) => {
    const id = getIdFromChildren(children);

    return (
      <Tag id={id} className="group relative flex">
        {children}
        <a
          className="anchor ml-2.5 flex !pt-0 !text-black opacity-0 transition-opacity duration-200 hover:opacity-100 group-hover:opacity-100 dark:!text-white "
          href={`#${id}`}
          tabIndex="-1"
          aria-hidden
        >
          <AnchorIcon className={clsx(Tag === 'h2' && 'w-5', Tag === 'h3' && 'w-4')} />
        </a>
      </Tag>
    );
  };

export default AnchorHeading;
