import slugify from 'slugify';

const getIdFromChildren = (children) => {
  if (typeof children === 'string') {
    return slugify(children, { strict: true }).toLocaleLowerCase();
  }

  if (typeof children?.props?.children === 'string') {
    return slugify(children.props.children, { strict: true }).toLocaleLowerCase();
  }

  throw new Error('Incorrect anchor URL configuration');
};

export default getIdFromChildren;
