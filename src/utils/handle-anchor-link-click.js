export default (e, id) => {
  e.preventDefault();
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
  const anchor = `#${id}`;
  // changing hash without default jumps to anchor
  // eslint-disable-next-line no-restricted-globals
  if (history.pushState) {
    // eslint-disable-next-line no-restricted-globals
    history.pushState(false, false, anchor);
  } else {
    // old browser support
    window.location.hash = anchor;
  }
};
